---
icon: lucide/calendar-clock
search:
  exclude: true
tags:
  - Managing OCC
---

# Intervals & Lead Times
<span data-uuid="6a8709f3-2f71-41a8-8e33-b252e23b9f4e" style="display:none"></span>

**Submit Intervals** and **Lead Times** can be configured for requirements such as documents, e-learning, and checklists. This guide explains how these concepts work, along with how they define due and overdue states.

<span data-uuid="396762ae-7d65-451d-847a-89924b6b7225" style="display:none"></span>
```mermaid
---
config:
  theme: base
  gantt:
    useWidth: 800
    barHeight: 28
    fontSize: 14
  themeVariables:
    sectionBkgColor: transparent
    altSectionBkgColor: transparent
    sectionBkgColor2: transparent
  themeCSS: "[id$='-i']{fill:#9ca3af26 !important;stroke:#7d8590 !important;stroke-width:2px;}[id$='-l']{fill:#7d859026 !important;stroke:#57606a !important;stroke-width:2px;}[id$='-s']{fill:#22c55e26 !important;stroke:#16a34a !important;stroke-width:2px;}[id$='-d']{fill:#f59e0b26 !important;stroke:#d97706 !important;stroke-width:2px;}[id$='-o']{fill:#ef444426 !important;stroke:#dc2626 !important;stroke-width:2px;}[id$='-m1']{fill:#57606a !important;stroke:#374151 !important;}.grid .tick line{stroke:none !important;}.grid .tick:first-of-type line{stroke:#9ca3af !important;}.grid .tick text{display:none;}.sectionTitle{display:none;}rect.section{fill:transparent !important;}text.taskText,text.taskTextOutsideRight,text.taskTextOutsideLeft,text.taskTextOutside0,text.taskTextOutside1,text.milestoneText{fill:currentColor !important;}"
---
gantt
  dateFormat YYYY-MM-DD
  axisFormat %e %b
  todayMarker off
  section Interval
    Submit Interval : i, 2026-09-01, 11d
    Lead Time : l, 2026-09-08, 4d
  section Status
    Fulfilled : s, 2026-09-01, 7d
    Due : d, 2026-09-08, 4d
    Overdue : o, 2026-09-12, 4d
    Last submission : milestone, m1, 2026-09-01, 0d
```

<span data-uuid="a7fd5d91-310d-4ae7-8705-7ae89ca8f0f2" style="display:none"></span>

<div class="nowrap-first" markdown>

| Term | Description | Example |
| :--- | :--- | :--- |
| <span class="mb-label mb-label-slate">Submit interval</span> | A defined period of time representing the maximum interval between submissions. | An Annual Service requirement would have a submit interval of <span class="mb-label mb-label-slate">1 year</span>. |
| <span class="mb-label mb-label-neutral">Lead time</span> | A defined period of time that represents advanced notice before the end of an interval. | An Annual Service requirement may have a lead time of <span class="mb-label mb-label-neutral">14 days</span>, allowing sufficient time to schedule the service. |
| <span class="mb-label mb-label-green">Requirement fulfilled</span> | The time between the last submission and the start of the lead time. | An Annual Service was last submitted 6 months ago. It is currently fulfilled. |
| <span class="mb-label mb-label-orange">Requirement due</span> | The time since the last submission is within the requirement's defined submit interval but after the lead time begins. | An Annual Service was last submitted 11 months and 20 days ago. It is not yet overdue, but it is within its 14-day lead time. It is currently due. |
| <span class="mb-label mb-label-rose">Requirement overdue</span> | The time passed since the last submission is beyond the requirement's defined submit interval. | An Annual Service was last submitted 13 months ago. It is currently overdue. |

</div>