---
icon: lucide/lock
search:
  exclude: true
tags:
  - Managing OCC
---

# Task sensitivity
<span data-uuid="f770aa2b-e00a-4e10-a24c-0a331926180d" style="display:none"></span>

Certain tasks may be flagged as sensitive because they contain sensitive information. As a result, these tasks require additional access controls.

!!! note

    <span data-uuid="83e20d5a-96c0-4271-a16d-6cc1e32f8205" style="display:none"></span>
    This guide explains how task sensitivity behaves by default. Your organisation may have modified this feature to suit its specific business needs.

## General information
<span data-uuid="0f29ee79-597d-4e53-a79f-447e9cec8cb6" style="display:none"></span>


!!! outline "<span class="mb-label mb-label-slate">What controls task sensitivity?</span>"

    <span data-uuid="7bd5f233-7b69-4074-b4e6-481f70cb4fbc" style="display:none"></span>
    Task sensitivity is controlled via labels. There are currently 3 kinds of sensitive labels you may encounter.

    <span data-uuid="4afeeb50-b745-4e2f-b3fb-6135d79d9412" style="display:none"></span>

    <div class="nowrap-first" markdown>

    | Sensitive label | How it is used | Requires access exception? | Required authorisation |
    | :--- | :--- | :---: | :--- |
    | DSE related data | DSE Assessment corrective actions | :lucide-check: | Health related data authorisation |
    | Health related data | Health surveillance corrective actions | :lucide-check: | Health related data authorisation |
    | Injury related data | Resolved incidents with injury tasks | :lucide-check: | No additional authorisation is required beyond manager access |

    </div>

!!! outline "<span class="mb-label mb-label-slate">What do sensitive tasks look like?</span>"

    <span data-uuid="67f8fc25-2041-48e9-8861-30c94be2a1c2" style="display:none"></span>
    When viewing from the site inbox or task reports, sensitive tasks will appear redacted.

<span data-uuid="9440483a-de9c-4673-916a-7546f5418a3b" style="display:none"></span>
![](../assets/media/occ-captures/sites/uuid/severity-major-light-mode.png#only-light)
![](../assets/media/occ-captures/sites/uuid/severity-major-dark-mode.png#only-dark)

## How does task sensitivity work?
<span data-uuid="6cc9d5be-dc46-40d2-b1a4-a3efd5d2aa92" style="display:none"></span>

Tasks become sensitive when a sensitive label is applied to them. Certain types of sensitive tasks require additional authorisation before you can access them. Below are three types of sensitive tasks you are most likely to encounter.

<span data-uuid="6c545462-785b-43d9-b296-5bd5cf68d156" style="display:none"></span>

<div class="nowrap-first" markdown>

| Type of task | Sensitive label | Required authorisation |
| :--- | :--- | :--- |
| :lucide-monitor-dot: DSE assessment corrective actions | <span class="mb-label mb-label-slate">:lucide-lock: DSE related data</span> | <span class="mb-label mb-label-fuchsia">Health related data authorisation</span> |
| :lucide-stethoscope: Health surveillance corrective actions | <span class="mb-label mb-label-slate">:lucide-lock: Health related data</span> | <span class="mb-label mb-label-fuchsia">Health related data authorisation</span> |
| :lucide-cross: Resolved injury related incidents | <span class="mb-label mb-label-slate">:lucide-lock: Injury related data</span> | No additional authorisation required |

</div>

## How to grant authorisations to employees.
<span data-uuid="48703411-60aa-455e-bdfd-2ac409a717e8" style="display:none"></span>

As mentioned above, sensitive tasks containing DSE or health-related data typically require a <span class="mb-label mb-label-fuchsia">Health related data authorisation</span> to be granted on the employee’s record. The steps below explain how to grant this authorisation to an employee.

!!! warning

    <span data-uuid="96656cae-4a5b-44f0-90f4-48a4508266e3" style="display:none"></span>
    You can only grant this authorisation to other employees if you have the authorisation yourself. As a result, we recommend being conservative with who should be granted this access.

!!! step

    <span data-uuid="abfd1916-909f-4a56-afcb-3ea08ac0a246" style="display:none"></span>
    From [My Dashboard](https://cloud.opus-safety.co.uk/dashboard), click on **Pick workspace** and select the site where the employee is located.

    <span data-uuid="5474d1c7-5af7-4e8d-a77d-a11300e010f5" style="display:none"></span>
    ![](../assets/media/occ-captures/dashboard/pick-workspace-light-mode.png#only-light){ style="height: 50px" loading=lazy }
    ![](../assets/media/occ-captures/dashboard/pick-workspace-dark-mode.png#only-dark){ style="height: 50px" loading=lazy }

!!! step

    <span data-uuid="e248ba6a-d765-4995-86a0-6ba85f7b3a92" style="display:none"></span>

    From the site inbox, click the **Switch to Manage Mode** button.

    <span data-uuid="8b3ec5ba-6544-4347-996d-c9b188005180" style="display:none"></span>
    ![](../assets/media/occ-captures/sites/uuid/switch-to-manage-mode-light-mode.png#only-light){ style="height: 50px" loading=lazy }
    ![](../assets/media/occ-captures/sites/uuid/switch-to-manage-mode-dark-mode.png#only-dark){ style="height: 50px" loading=lazy }

!!! step

    <span data-uuid="bcd323ab-c1c4-49e1-9d0f-60ff26a074b4" style="display:none"></span>

    Click **Employee records** on the manage sidebar.

    <span data-uuid="a094685d-4212-46e1-81e3-48f9a2da96ca" style="display:none"></span>
    ![](../assets/media/occ-captures/admin/sites/uuid/employee-records-light-mode.png#only-light){ style="height: 50px" loading=lazy }
    ![](../assets/media/occ-captures/admin/sites/uuid/employee-records-dark-mode.png#only-dark){ style="height: 50px" loading=lazy }

!!! step

    <span data-uuid="591f0ccd-9226-4da8-a30c-dcb822fc1727" style="display:none"></span>

    Find the employee from the list and click on their name

    <span data-uuid="36d0ef8f-94ce-491b-8895-3a7f99a17b00" style="display:none"></span>
    ![](../assets/media/occ-captures/admin/sites/uuid/employees/list-light-mode.png#only-light){ width="400" loading=lazy }
    ![](../assets/media/occ-captures/admin/sites/uuid/employees/list-dark-mode.png#only-dark){ width="400" loading=lazy }

!!! step

    <span data-uuid="76e06950-a378-4719-a9a5-d38c608a22f7" style="display:none"></span>
    On the employee's record, select **Change access**

    <span data-uuid="acacd892-d29e-4542-985a-a57c127d1a9a" style="display:none"></span>
    ![](../assets/media/occ-captures/admin/sites/uuid/dashboard/change-access-light-mode.png#only-light){ style="height: 50px" loading=lazy }
    ![](../assets/media/occ-captures/admin/sites/uuid/dashboard/change-access-dark-mode.png#only-dark){ style="height: 50px" loading=lazy }