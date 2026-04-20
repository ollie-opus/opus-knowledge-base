---
tags:
    - System
icon: lucide/chart-no-axes-column-increasing
---

# System Status

## Services

<div class="grid" markdown>

!!! status-available "Server"

    **Status:** AVAILABLE

!!! status-available "Account Login"

    **Status:** AVAILABLE

!!! status-available "Files"

    **Status:** AVAILABLE

!!! status-available "Tasks"

    **Status:** AVAILABLE

!!! status-available "Notifications"

    **Status:** AVAILABLE

</div>

---
## Open Incidents


---

## Past Incidents

??? outline "View past incidents"

    !!! status-outage "Server"

        - **Service Impact:** OUTAGE
        - **Current Status:** `Resolved`
        - **Description:** System offline
        - **Reported:** 2026-03-24 12:15
        - **Resolved:** 2026-03-24 13:30
        - **Causation:** Database Locking Issue, though root cause was not definitively pinpointed. Additional logging tools have been implemented to help identify and prevent this occurring in the future.

    !!! status-outage "Server"

        - **Service Impact:** OUTAGE
        - **Current Status:** `Resolved`
        - **Description:** System offline
        - **Reported:** 2026-01-08 16:45
        - **Resolved:** 2026-01-08 16:54
        - **Causation:** Failing NVMe drive, now removed from server

    !!! status-outage "Server"

        - **Service Impact:** OUTAGE
        - **Current Status:** `Resolved`
        - **Description:** System offline
        - **Reported:** 2026-01-06 16:04
        - **Resolved:** 2026-01-06 16:20
        - **Causation:** Newly added NVMe partially failed; new storage process being implemented

    !!! status-outage "Server"

        - **Service Impact:** OUTAGE
        - **Current Status:** `Resolved`
        - **Description:** System offline
        - **Reported:** 2025-06-24 16:07
        - **Resolved:** 2025-06-24 18:30
        - **Causation:** Simultaneous failure of primary and backup hardware

    !!! status-outage "Server"

        - **Service Impact:** OUTAGE
        - **Current Status:** `Resolved`
        - **Description:** Users unable to log in
        - **Reported:** 2024-11-13 10:00
        - **Resolved:** 2024-11-13 10:24
        - **Causation:** Memory leak causing server exhaustion

    !!! status-disruption "Files"

        - **Service Impact:** DISRUPTION
        - **Current Status:** `Resolved`
        - **Description:** File uploader unavailable (drag & drop still worked)
        - **Reported:** 2024-07-01 17:49
        - **Resolved:** 2024-07-03 02:28
        - **Causation:** OpenSSH update introduced compatibility issue with security configuration
