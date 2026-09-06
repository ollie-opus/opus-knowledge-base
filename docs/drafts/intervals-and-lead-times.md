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

<span data-uuid="a7fd5d91-310d-4ae7-8705-7ae89ca8f0f2" style="display:none"></span>

<div class="nowrap-first" markdown>

| Term | Description | Example |
| :--- | :--- | :--- |
| <span class="mb-label mb-label-slate">:lucide-calendar-clock: Submit interval</span> | A defined period of time representing the maximum interval between submissions. | An Annual Service requirement would have a submit interval of <span class="mb-label mb-label-slate">1 year</span>. |
| <span class="mb-label mb-label-neutral">:lucide-clock-arrow-left: Lead time</span> | A defined period of time that represents advanced notice before the end of an interval. | An Annual Service requirement may have a lead time of <span class="mb-label mb-label-neutral">14 days</span>, allowing sufficient time to schedule the service. |
| <span class="mb-label mb-label-green">:lucide-check: Requirement fulfilled</span> | The time since the most recent submission is within the requirement's defined submit interval and before the lead time begins. | An Annual Service was last submitted 6 months ago. It is currently fulfilled. |
| <span class="mb-label mb-label-amber">:lucide-bell-ring: Requirement due</span> | The time since the most recent submission is within the requirement's defined submit interval and after the lead time begins. | An Annual Service was last submitted 11 months and 20 days ago. It is not yet overdue, but it is within its 14-day lead time. It is currently due. |
| <span class="mb-label mb-label-rose">:lucide-alert-circle: Requirement overdue</span> | The time since the most recent submission is beyond the requirement's defined submit interval. | An Annual Service was last submitted 13 months ago. It is currently overdue. |

</div>

<span data-uuid="91afd139-6f21-4293-acb5-21e5984c39ac" style="display:none"></span>
```mermaid
block-beta
  columns 16
  i["Submit Interval"]:11 space:5
  space:7 l["Lead Time"]:4 space:5
  s["Fulfilled"]:7 d["Due"]:4 o["Overdue"]:5

  classDef interval stroke:#7d8590,fill:#9ca3af26,color:#374151,stroke-width:2px;
  classDef lead stroke:#57606a,fill:#7d859026,color:#374151,stroke-width:2px;
  classDef ful stroke:#16a34a,fill:#22c55e26,color:#14532d,stroke-width:2px;
  classDef due stroke:#d97706,fill:#f59e0b26,color:#78350f,stroke-width:2px;
  classDef over stroke:#dc2626,fill:#ef444426,color:#7f1d1d,stroke-width:2px;

  class i interval
  class l lead
  class s ful
  class d due
  class o over
```