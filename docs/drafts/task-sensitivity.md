---
icon: lucide/lock
search:
  exclude: true
tags:
  - Managing OCC
---

# Task sensitivity
<span data-uuid="f770aa2b-e00a-4e10-a24c-0a331926180d" style="display:none"></span>

Certain tasks may be flagged as sensitive because they contain personal health information. As a result, these tasks require additional access controls.

Examples of tasks that may typically be flagged as sensitive include:

- :lucide-monitor-dot: DSE Assessment corrective actions
- :lucide-stethoscope: Health Surveillance corrective actions
- :lucide-cross: Resolved Incidents with Injury tasks

!!! note

    <span data-uuid="83e20d5a-96c0-4271-a16d-6cc1e32f8205" style="display:none"></span>
    This guide explains how task sensitivity behaves by default. Your organisation may have modified this feature to suit its specific business needs.

## General information
<span data-uuid="0f29ee79-597d-4e53-a79f-447e9cec8cb6" style="display:none"></span>


!!! outline "<span class="mb-label mb-label-slate">What controls task sensitivity?</span>"

    <span data-uuid="7bd5f233-7b69-4074-b4e6-481f70cb4fbc" style="display:none"></span>
    Task sensitivity is controlled via labels. There are currently 3 kinds of sensitive labels you may encounter.

    <span data-uuid="4afeeb50-b745-4e2f-b3fb-6135d79d9412" style="display:none"></span>

    | Sensitive label | How it is used | Requires access exception? | Required authorisation |
    | :--- | :--- | :---: | :--- |
    | DSE related data | DSE Assessment corrective actions | :lucide-check: | Health related data authorisation |
    | Health related data | Health surveillance corrective actions | :lucide-check: | Health related data authorisation |
    | Injury related data | Resolved incidents with injury tasks | :lucide-check: | No additional authorisation is required beyond manager access |

!!! outline "<span class="mb-label mb-label-slate">What do sensitive tasks look like?</span>"

    <span data-uuid="67f8fc25-2041-48e9-8861-30c94be2a1c2" style="display:none"></span>
    When viewing from the site inbox or task reports, sensitive tasks will appear redacted.

<span data-uuid="9440483a-de9c-4673-916a-7546f5418a3b" style="display:none"></span>
![](../assets/media/occ-captures/sites/uuid/severity-major-light-mode.png#only-light)
![](../assets/media/occ-captures/sites/uuid/severity-major-dark-mode.png#only-dark)