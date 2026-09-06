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

<span data-uuid="e601f5ab-8af7-47d1-836a-ae7790675d34" style="display:none"></span>

| Term | Description | Example |
| :--- | :--- | :--- |
| <span class="mb-label mb-label-stone">:lucide-calendar-clock: Submit interval</span> | A defined period of time that represents the maximum between submissions. | An Annual Service requirement would have a submit interval of <span class="mb-label mb-label-stone">1 year</span>. |
| <span class="mb-label mb-label-neutral">:lucide-clock-arrow-left: Lead time</span> | A defined period of time that represents advance notice. | An Annual Service requirement may have a lead time of <span class="mb-label mb-label-neutral">14 days</span>, allowing sufficient time to schedule the service. |
| <span class="mb-label mb-label-green">:lucide-check: Requirement fulfilled</span> | The time since the most recent submission is within the requirement's defined submit interval and before the lead time begins. | An Annual Service was last submitted 6 months ago. It is currently fulfilled. |
| <span class="mb-label mb-label-amber">:lucide-bell-ring: Requirement due</span> | The time since the most recent submission is within the requirement's defined submit interval and after the lead time begins. | An Annual Service was last submitted 11 months and 20 days ago. It is not yet overdue, but is within its 14 day lead time. |
| <span class="mb-label mb-label-rose">:lucide-alert-circle: Requirement overdue</span> | The time since the most recent submission is beyond the requirement's defined submit interval. |  |