/**
 * Neural network animated background.
 * Active on the homepage only. Adapts to light and dark mode.
 */

(function () {
  if (window.__neuralBg) return;
  window.__neuralBg = true;

  /* Inject Three.js then run — avoids any external CDN dependency */
  function loadAndRun() {
    if (window.THREE) { run(); return; }
    var s = document.createElement('script');
    var neuralTag = document.querySelector('script[src*="neural.js"]');
    if (!neuralTag) { console.error('[neural] Cannot locate neural.js script tag.'); return; }
    s.src = neuralTag.src.replace('neural.js', 'three.min.js');
    s.onload = run;
    s.onerror = function () { console.error('[neural] Three.js failed to load.'); };
    document.head.appendChild(s);
  }

  function run() {

  /* ── Config ───────────────────────────────────────────────────────────── */
  var CFG = {
    nodeCount:   400,   // total number of nodes (spheres) scattered in 3-D space
    spread:      30,    // diameter of the spherical volume nodes are placed within
    connectDist: 4,     // max distance between two nodes for an edge to be drawn
    nodeRadius:  0.09,  // base radius of each node sphere (world units)
    pulseSpeed:  1,     // world-units per second a pulse travels along an edge
    nodeDecay:   0.25,  // how quickly a fired node's energy fades (fraction remaining per second; lower = faster fade)
    triggerEvery: 1.2,  // seconds between automatic random node firings
    triggerCount: 5,    // number of nodes fired each trigger interval

    // Opening zoom animation
    introRadiusStart: 50,  // camera distance at the very start of the intro zoom
    introRadiusEnd:    12,  // camera distance when the intro zoom finishes and random movement begins
    introDuration:      10,  // seconds the intro zoom takes

    // Camera drift & random-shift settings
    camOrbitMin:    12,   // minimum orbit radius (distance from origin)
    camOrbitMax:    50,   // maximum orbit radius
    camSpeedMin:  -0.05,  // minimum angular speed (radians/second)
    camSpeedMax:  0.05,  // maximum angular speed (radians/second)
    camElevMin:   -90,    // minimum elevation angle (degrees; negative = below the network)
    camElevMax:    90,    // maximum elevation angle (degrees; 90 = directly above)
    camShiftEvery: [15, 20], // [min, max] seconds between random camera shifts
    camTransition:  100,  // seconds to smoothly blend to the new camera position

    // Node scale animation — controls how fast a node inflates/deflates when fired
    nodeInflateSpeed: 6, // scale units per second when energy rises  (999 = instant, matching default behaviour)
    nodeDeflateSpeed: 1, // scale units per second when energy falls  (999 = instant, matching default behaviour)

    // LOD (Level of Detail) settings — closer nodes render with more geometry
    lodDistHigh:  0,    // switch to high-detail below this distance from camera
    lodDistMid:   8,    // switch to mid-detail below this distance
    lodDistLow:   20,   // switch to low-detail below this distance (everything beyond uses lowest)
    lodSegHigh:   20,   // sphere segments for high detail (close nodes)
    lodSegMid:    15,   // sphere segments for medium detail
    lodSegLow:    10,    // sphere segments for low detail (distant nodes)
  };

  /* ── Colour palettes ──────────────────────────────────────────────────── */
  var PALETTES = {
    slate: {                          // dark-mode palette (MkDocs "slate" scheme)
      bg:        '#0B0B0F',           // scene background — near-black with a blue tint
      nodeA:     '#193d71',           // idle node colour — dark muted blue
      nodeB:     '#ABDAD9',           // fully-fired node colour — bright cyan-blue; nodes lerp from A→B as energy rises
      pulse:     '#ABDAD9',           // travelling pulse dot colour — vivid cyan
      edge:      '#193d71',           // static edge line colour — very dark teal
      edgeOpacity: 0.16,               // opacity of edge lines (0 = invisible, 1 = opaque)
    },
    default: {                        // light-mode palette
      bg:        '#FFFFFF',           // scene background — soft off-white with a blue tint
      nodeA:     '#4e64a0',           // idle node colour — light blue-grey
      nodeB:     '#000609',           // fully-fired node colour — medium slate blue; nodes lerp from A→B as energy rises
      pulse:     '#2a5268',           // travelling pulse dot colour — soft steel blue
      edge:      '#4e64a0',           // static edge line colour — very pale blue-grey
      edgeOpacity: 0.07,               // opacity of edge lines — lighter than dark mode to avoid overpowering the pale bg
    }
  };

  /* ── Helpers ──────────────────────────────────────────────────────────── */
  function scheme() {
    return document.body.getAttribute('data-md-color-scheme') === 'slate'
      ? 'slate' : 'default';
  }

  function isHomePage() {
    return document.querySelector('.home-hero') !== null;
  }

  function lerp(a, b, t) { return a + (b - a) * t; }

  function hexToRgb(hex) {
    var n = parseInt(hex.slice(1), 16);
    return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255];
  }

  /* ── Node class ───────────────────────────────────────────────────────── */
  var THREE = window.THREE;
  var nodeGeoHigh = new THREE.SphereGeometry(CFG.nodeRadius, CFG.lodSegHigh, CFG.lodSegHigh);
  var nodeGeoMid  = new THREE.SphereGeometry(CFG.nodeRadius, CFG.lodSegMid,  CFG.lodSegMid);
  var nodeGeoLow  = new THREE.SphereGeometry(CFG.nodeRadius, CFG.lodSegLow,  CFG.lodSegLow);

  function Node(pos) {
    this.pos          = pos;
    this.energy       = 0;
    this.prevEnergy   = 0;
    this.displayScale = 1;
    this.inflating    = false;
    this.connections  = [];
    this.pulseCooldown = 0;
    this.mat  = new THREE.MeshBasicMaterial({ color: PALETTES[scheme()].nodeA });
    this.mesh = new THREE.LOD();
    this.mesh.addLevel(new THREE.Mesh(nodeGeoHigh, this.mat), CFG.lodDistHigh);
    this.mesh.addLevel(new THREE.Mesh(nodeGeoMid,  this.mat), CFG.lodDistMid);
    this.mesh.addLevel(new THREE.Mesh(nodeGeoLow,  this.mat), CFG.lodDistLow);
    this.mesh.position.copy(pos);
  }

  Node.prototype.fire = function () { this.energy = 1.0; };

  Node.prototype.update = function (dt, rgbA, rgbB) {
    this.energy        = Math.max(0, this.energy * Math.pow(CFG.nodeDecay, dt));
    this.pulseCooldown = Math.max(0, this.pulseCooldown - dt);
    var e = this.energy;
    var targetScale = 1 + e * 1.8;
    // Enter inflate phase when a pulse hits (energy spikes above last frame).
    // Stay inflating until displayScale reaches the target, then deflate.
    if (this.energy > this.prevEnergy) { this.inflating = true; }
    if (this.inflating) {
      var inflateDelta = CFG.nodeInflateSpeed * dt;
      if (this.displayScale + inflateDelta >= targetScale) {
        this.displayScale = targetScale;
        this.inflating = false;
      } else {
        this.displayScale += inflateDelta;
      }
    } else {
      var deflateDelta = CFG.nodeDeflateSpeed * dt;
      this.displayScale = (this.displayScale - 1 <= deflateDelta)
        ? 1
        : this.displayScale - deflateDelta;
    }
    this.prevEnergy = this.energy;
    // Derive display energy from display scale so colour tracks inflate/deflate speed.
    var de = (this.displayScale - 1) / 1.8;
    this.mat.color.setRGB(
      lerp(rgbA[0], rgbB[0], de),
      lerp(rgbA[1], rgbB[1], de),
      lerp(rgbA[2], rgbB[2], de)
    );
    this.mesh.scale.setScalar(this.displayScale);
  };

  /* ── Pulse class ──────────────────────────────────────────────────────── */
  var pulseRadius = 0.055;
  var pulseGeoHigh = new THREE.SphereGeometry(pulseRadius, CFG.lodSegHigh, CFG.lodSegHigh);
  var pulseGeoMid  = new THREE.SphereGeometry(pulseRadius, CFG.lodSegMid,  CFG.lodSegMid);
  var pulseGeoLow  = new THREE.SphereGeometry(pulseRadius, CFG.lodSegLow,  CFG.lodSegLow);

  function Pulse(from, to, scene, palette) {
    this.from     = from;
    this.to       = to;
    this.t        = 0;
    this.done     = false;
    this.duration = from.pos.distanceTo(to.pos) / CFG.pulseSpeed;
    this.mat = new THREE.MeshBasicMaterial({
      color:       palette.pulse,
      blending:    scheme() === 'slate' ? THREE.AdditiveBlending : THREE.NormalBlending,
      transparent: true,
      opacity:     1,
      depthWrite:  false,
    });
    this.mesh = new THREE.LOD();
    this.mesh.addLevel(new THREE.Mesh(pulseGeoHigh, this.mat), CFG.lodDistHigh);
    this.mesh.addLevel(new THREE.Mesh(pulseGeoMid,  this.mat), CFG.lodDistMid);
    this.mesh.addLevel(new THREE.Mesh(pulseGeoLow,  this.mat), CFG.lodDistLow);
    this._scene = scene;
    scene.add(this.mesh);
  }

  Pulse.prototype.update = function (dt) {
    this.t += dt / this.duration;
    if (this.t >= 1) {
      this.t    = 1;
      this.done = true;
      this.to.energy = Math.min(1, this.to.energy + 0.65);
    }
    this.mat.opacity = 0.7 + 0.6 * (1 - Math.pow(this.t, 3));
    this.mesh.position.lerpVectors(this.from.pos, this.to.pos, this.t);
  };

  Pulse.prototype.dispose = function () {
    this._scene.remove(this.mesh);
    this.mat.dispose();
  };

  /* ── Scene setup (runs once) ──────────────────────────────────────────── */
  if (!window.WebGLRenderingContext) return;

  /* Container div — fixed behind all page content */
  var heroDiv = document.createElement('div');
  heroDiv.id = 'neural-hero';
  document.body.appendChild(heroDiv);

  var renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.NoToneMapping;
  heroDiv.appendChild(renderer.domElement);

  var scene  = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, CFG.introRadiusStart + 100);
  camera.position.set(0, 0, 16);

  window.addEventListener('resize', function () {
    var w = window.innerWidth, h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });

  /* ── Build graph (once) ───────────────────────────────────────────────── */
  var nodes  = [];
  var pulses = [];

  for (var i = 0; i < CFG.nodeCount; i++) {
    var pos;
    do {
      pos = new THREE.Vector3(
        (Math.random() - 0.5) * CFG.spread,
        (Math.random() - 0.5) * CFG.spread,
        (Math.random() - 0.5) * CFG.spread
      );
    } while (pos.length() > CFG.spread / 2);
    var node = new Node(pos);
    nodes.push(node);
    scene.add(node.mesh);
  }

  var edgePos = [];
  for (var a = 0; a < nodes.length; a++) {
    for (var b = a + 1; b < nodes.length; b++) {
      if (nodes[a].pos.distanceTo(nodes[b].pos) < CFG.connectDist) {
        nodes[a].connections.push(nodes[b]);
        nodes[b].connections.push(nodes[a]);
        edgePos.push.apply(edgePos, nodes[a].pos.toArray());
        edgePos.push.apply(edgePos, nodes[b].pos.toArray());
      }
    }
  }

  var edgeGeo = new THREE.BufferGeometry();
  edgeGeo.setAttribute('position', new THREE.Float32BufferAttribute(edgePos, 3));
  var edgeMat = new THREE.LineBasicMaterial({ transparent: true });
  var edgeLines = new THREE.LineSegments(edgeGeo, edgeMat);
  scene.add(edgeLines);

  /* ── Palette application ──────────────────────────────────────────────── */
  function applyPalette() {
    var pal = PALETTES[scheme()];
    scene.background = new THREE.Color(pal.bg);
    edgeMat.color.set(pal.edge);
    edgeMat.opacity = pal.edgeOpacity;
    // Additive blending washes out to white on light backgrounds; use normal blending in light mode
    edgeMat.blending = scheme() === 'slate' ? THREE.AdditiveBlending : THREE.NormalBlending;
    edgeMat.needsUpdate = true;
    /* Node idle colours are updated per-frame; pulse colour is set at spawn */
  }

  applyPalette();

  var schemeObserver = new MutationObserver(applyPalette);
  schemeObserver.observe(document.body, { attributes: true, attributeFilter: ['data-md-color-scheme'] });

  /* ── Animation loop ───────────────────────────────────────────────────── */
  var animId       = null;
  var triggerTimer = 0;
  var last         = null;

  /* ── Camera state ─────────────────────────────────────────────────────── */
  function randBetween(a, b) { return a + Math.random() * (b - a); }

  // Intro zoom state
  var introProgress = 0; // 0→1 over introDuration seconds; 1 = intro complete

  // Current orbit parameters (spherical coords)
  var camTheta  = 0;     // horizontal angle (radians)
  var camPhi    = 0;     // elevation angle (radians; 0 = equator, π/2 = top)
  var camSpeed  = 0.018; // horizontal angular speed (radians/second)
  var camRadius = CFG.introRadiusStart;

  // Target parameters (blended toward on each shift)
  var camSpeedT  = camSpeed;
  var camRadiusT = camRadius;
  var camPhiT    = camPhi;

  var camShiftTimer    = randBetween(CFG.camShiftEvery[0], CFG.camShiftEvery[1]);
  var camTransProgress = 1; // 1 = transition complete

  function pickNewCamera() {
    camSpeedT  = randBetween(CFG.camSpeedMin, CFG.camSpeedMax);
    camRadiusT = randBetween(CFG.camOrbitMin, CFG.camOrbitMax);
    camPhiT    = randBetween(CFG.camElevMin,  CFG.camElevMax) * (Math.PI / 180);
    camTransProgress = 0;
  }

  function spawnPulse(from, to) {
    if (from.pulseCooldown > 0) return;
    from.pulseCooldown = 0.15;
    pulses.push(new Pulse(from, to, scene, PALETTES[scheme()]));
  }

  function tick(now) {
    animId = requestAnimationFrame(tick);
    var dt = last === null ? 0.016 : Math.min((now - last) / 1000, 0.05);
    last = now;

    var pal  = PALETTES[scheme()];
    var rgbA = hexToRgb(pal.nodeA);  // parsed once per frame, not once per node
    var rgbB = hexToRgb(pal.nodeB);

    triggerTimer += dt;
    if (triggerTimer >= CFG.triggerEvery) {
      triggerTimer = 0;
      for (var k = 0; k < CFG.triggerCount; k++)
        nodes[Math.floor(Math.random() * nodes.length)].fire();
    }

    for (var i = 0; i < nodes.length; i++) {
      nodes[i].update(dt, rgbA, rgbB);
      nodes[i].mesh.update(camera);
      if (nodes[i].energy > 0.7) {
        var conns = nodes[i].connections;
        for (var c = 0; c < conns.length; c++) {
          if (Math.random() < 0.08) spawnPulse(nodes[i], conns[c]);
        }
      }
    }

    for (var j = pulses.length - 1; j >= 0; j--) {
      pulses[j].update(dt);
      pulses[j].mesh.update(camera);
      if (pulses[j].done) { pulses[j].dispose(); pulses.splice(j, 1); }
    }

    if (introProgress < 1) {
      // Intro zoom: ease in from far away to introRadiusEnd, then hand off to random movement
      introProgress = Math.min(1, introProgress + dt / CFG.introDuration);
      var t = introProgress;
      var ease = t * t * t * (t * (t * 6 - 15) + 10); // smootherstep — gentler acceleration and tail-off than smoothstep
      camRadius = lerp(CFG.introRadiusStart, CFG.introRadiusEnd, ease);
      if (introProgress >= 1) {
        // Intro done — seed random movement from current position
        camRadiusT = camRadius;
        camShiftTimer = randBetween(CFG.camShiftEvery[0], CFG.camShiftEvery[1]);
      }
    } else {
      // Camera shift timer
      camShiftTimer -= dt;
      if (camShiftTimer <= 0) {
        pickNewCamera();
        camShiftTimer = randBetween(CFG.camShiftEvery[0], CFG.camShiftEvery[1]);
      }

      // Smoothly blend current params toward targets
      if (camTransProgress < 1) {
        camTransProgress = Math.min(1, camTransProgress + dt / CFG.camTransition);
        var blend = camTransProgress * camTransProgress * (3 - 2 * camTransProgress); // smoothstep
        camSpeed  = lerp(camSpeed,  camSpeedT,  blend);
        camRadius = lerp(camRadius, camRadiusT, blend);
        camPhi    = lerp(camPhi,    camPhiT,    blend);
      }
    }

    camTheta += dt * camSpeed;
    var cosP = Math.cos(camPhi);
    camera.position.x = camRadius * cosP * Math.cos(camTheta);
    camera.position.z = camRadius * cosP * Math.sin(camTheta);
    camera.position.y = camRadius * Math.sin(camPhi);
    camera.lookAt(0, 0, 0);

    // Keep far plane just beyond the camera to maintain depth buffer precision
    var newFar = camRadius + CFG.spread + 20;
    if (Math.abs(camera.far - newFar) > 1) {
      camera.far = newFar;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);
  }

  /* ── Show / hide ──────────────────────────────────────────────────────── */
  /* Canvas is z-index:-1; all styling handled via body.neural-active in CSS */

  function activate() {
    heroDiv.style.display = 'block';
    document.body.classList.add('neural-active');
    applyPalette();
    if (animId === null) { last = null; animId = requestAnimationFrame(tick); }
  }

  function deactivate() {
    heroDiv.style.display = 'none';
    document.body.classList.remove('neural-active');
  }

  function updateVisibility() {
    if (isHomePage()) { activate(); } else { deactivate(); }
  }

  /* ── Navigation hooks ─────────────────────────────────────────────────── */
  window.addEventListener('popstate', updateVisibility);

  var _push = history.pushState.bind(history);
  history.pushState = function () {
    _push.apply(history, arguments);
    updateVisibility();
  };

  updateVisibility();
  } // end run()

  loadAndRun();
})();

// this was a lot of fun to build and tweak! leaving this note for future self - ollie