---
tags:
    - System
icon: lucide/chart-no-axes-column-increasing
---

# System Status

## Services

<div class="grid" markdown>

!!! status-outage "Server"

    <span data-uuid="3e7c2ce8-ef4d-495a-a1b8-b9917838617c" style="display:none"></span>

    **Status:** OUTAGE
!!! status-available "Account Login"

    <span data-uuid="86d36e3b-2dab-44cc-b863-2cf64213b28a" style="display:none"></span>

    **Status:** AVAILABLE
!!! status-outage "Files"

    <span data-uuid="698e7760-160a-4edd-b535-9bbeb16af1f8" style="display:none"></span>

    **Status:** OUTAGE
!!! status-available "Tasks"

    <span data-uuid="a5a84566-b9e1-48ab-8aa1-e547edbbddd4" style="display:none"></span>

    **Status:** AVAILABLE
!!! status-available "Notifications"

    <span data-uuid="3bf0ddc2-b721-4031-844b-55961b163655" style="display:none"></span>

    **Status:** AVAILABLE
</div>

---
## Open Incidents

!!! status-outage "Server, Files"

    <span data-uuid="b56c45d4-9c09-438d-b842-50ff3d62c816" style="display:none"></span>

    - **Service Impact:** OUTAGE
    - **Current Status:** `Ongoing`
    - **Description:** test
    - **Reported:** 2026-04-24 20:21
    - **Resolved:** 
    - **Causation:** 

---

## Past Incidents

??? outline "View past incidents"

    !!! status-outage "Server"

        <span data-uuid="7cc25a0a-b8a9-4671-8f90-b2cb57413fa6" style="display:none"></span>

        - **Service Impact:** OUTAGE
        - **Current Status:** `Resolved`
        - **Description:** System offline
        - **Reported:** 2026-03-24 12:15
        - **Resolved:** 2026-03-24 13:30
        - **Causation:** Database Locking Issue, though root cause was not definitively pinpointed. Additional logging tools have been implemented to help identify and prevent this occurring in the future.
    !!! status-outage "Server"

        <span data-uuid="e54f65e8-68b3-4f01-b26c-6335064dfed6" style="display:none"></span>

        - **Service Impact:** OUTAGE
        - **Current Status:** `Resolved`
        - **Description:** System offline
        - **Reported:** 2026-01-08 16:45
        - **Resolved:** 2026-01-08 16:54
        - **Causation:** Failing NVMe drive, now removed from server
    !!! status-outage "Server"

        <span data-uuid="c079e75a-a7e6-4f43-9bab-fac4e7d065fa" style="display:none"></span>

        - **Service Impact:** OUTAGE
        - **Current Status:** `Resolved`
        - **Description:** System offline
        - **Reported:** 2026-01-06 16:04
        - **Resolved:** 2026-01-06 16:20
        - **Causation:** Newly added NVMe partially failed; new storage process being implemented
    !!! status-outage "Server"

        <span data-uuid="04930615-0c96-4b6a-9daf-9dbee37b7cb1" style="display:none"></span>

        - **Service Impact:** OUTAGE
        - **Current Status:** `Resolved`
        - **Description:** System offline
        - **Reported:** 2025-06-24 16:07
        - **Resolved:** 2025-06-24 18:30
        - **Causation:** Simultaneous failure of primary and backup hardware
    !!! status-outage "Server"

        <span data-uuid="6a1028ea-4896-44a0-8ad9-8ebfaab6de83" style="display:none"></span>

        - **Service Impact:** OUTAGE
        - **Current Status:** `Resolved`
        - **Description:** Users unable to log in
        - **Reported:** 2024-11-13 10:00
        - **Resolved:** 2024-11-13 10:24
        - **Causation:** Memory leak causing server exhaustion
    !!! status-disruption "Files"

        <span data-uuid="4d477ca9-63a7-426c-b70c-fa277a98da83" style="display:none"></span>

        - **Service Impact:** DISRUPTION
        - **Current Status:** `Resolved`
        - **Description:** File uploader unavailable (drag & drop still worked)
        - **Reported:** 2024-07-01 17:49
        - **Resolved:** 2024-07-03 02:28
        - **Causation:** OpenSSH update introduced compatibility issue with security configuration