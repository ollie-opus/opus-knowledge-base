---
tags:
    - System
icon: lucide/chart-no-axes-column-increasing
---

# System Status

## Services

<div class="grid" markdown>

!!! status-disrupted "Server"

    **Status:** DISRUPTED  

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

!!! status-outage "Server - FULL OUTAGE"

    - **Incident Status:** `Investigating`
    - **Description:** System offline
    - **Reported:** 24/03/2026 12:15
    - **Resolved:** 24/03/2026 13:30
    - **Root Cause:** tbd

---

## Past Incidents

??? outline "View past incidents"

    !!! status-outage "Server - FULL OUTAGE"

        - **Incident Status:** `Resolved`
        - **Description:** System offline
        - **Reported:** 08/01/2026 16:45
        - **Resolved:** 08/01/2026 16:54
        - **Root Cause:** Failing NVMe drive, now removed from server

    !!! status-outage "Server - FULL OUTAGE"

        - **Incident Status:** `Resolved`
        - **Description:** System offline
        - **Reported:** 06/01/2026 16:04
        - **Resolved:** 06/01/2026 16:20
        - **Root Cause:** Newly added NVMe partially failed; new storage process being implemented

    !!! status-outage "Server - FULL OUTAGE"

        - **Incident Status:** `Resolved`
        - **Description:** System offline
        - **Reported:** 24/06/2025 16:07
        - **Resolved:** 24/06/2025 18:30
        - **Root Cause:** Simultaneous failure of primary and backup hardware

    !!! status-outage "Server - FULL OUTAGE"

        - **Incident Status:** `Resolved`
        - **Description:** Users unable to log in
        - **Reported:** 13/11/2024 10:00
        - **Resolved:** 13/11/2024 10:24
        - **Root Cause:** Memory leak causing server exhaustion

    !!! status-disrupted "Files - PARTIAL OUTAGE"

        - **Incident Status** `Resolved`
        - **Description:** File uploader unavailable (drag & drop still worked)
        - **Reported:** 01/07/2024 17:49
        - **Resolved:** 03/07/2024 02:28
        - **Root Cause:** OpenSSH update introduced compatibility issue with security configuration