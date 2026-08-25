---
icon: lucide/lock
search:
  exclude: true
tags:
  - Managing OCC
---

# Task sensitivity
<span data-uuid="f770aa2b-e00a-4e10-a24c-0a331926180d" style="display:none"></span>

Certain tasks may be flagged as sensitive because they contain sensitive information. As a result, these tasks are required to have additional access controls.

!!! note

    <span data-uuid="83e20d5a-96c0-4271-a16d-6cc1e32f8205" style="display:none"></span>
    This guide explains how task sensitivity behaves by default. Your organisation may have modified this feature to suit its specific business needs.

## What do sensitive tasks look like?
<span data-uuid="e62be4a8-1798-4e07-aa50-46512a90f123" style="display:none"></span>

When viewing from the site inbox or task reports, sensitive tasks will appear redacted.

<span data-uuid="83fb63c1-95a6-41d5-aaa9-6ed9312a9b41" style="display:none"></span>
![](../assets/media/occ-captures/sites/uuid/sensitive-task-light-mode.png#only-light){ style="border-radius: 8px" loading=lazy }
![](../assets/media/occ-captures/sites/uuid/sensitive-task-dark-mode.png#only-dark){ style="border-radius: 8px" loading=lazy }

## Kinds of sensitive tasks
<span data-uuid="6cc9d5be-dc46-40d2-b1a4-a3efd5d2aa92" style="display:none"></span>

There are different kinds of sensitive task, depending on the data they contain. Certain types of sensitive tasks require additional authorisation before you can access them. Below are three types of sensitive tasks you are most likely to encounter.

<span data-uuid="6c545462-785b-43d9-b296-5bd5cf68d156" style="display:none"></span>

<div class="nowrap-first" markdown>

| Type of task | Sensitive label | Required authorisation |
| :--- | :--- | :--- |
| :lucide-monitor-dot: DSE assessment corrective actions | <span class="mb-label mb-label-slate">:lucide-lock: DSE related data</span> | <span class="mb-label mb-label-fuchsia">Health related data authorisation</span> |
| :lucide-stethoscope: Health surveillance corrective actions | <span class="mb-label mb-label-slate">:lucide-lock: Health related data</span> | <span class="mb-label mb-label-fuchsia">Health related data authorisation</span> |
| :lucide-cross: Resolved injury related incidents | <span class="mb-label mb-label-slate">:lucide-lock: Injury related data</span> | No additional authorisation required |

</div>

## Authorisations
<span data-uuid="d1e6d765-67c8-43f1-8aa0-e5e0c98c6358" style="display:none"></span>

Authorisations are things you can apply to employees that typically give them access to certain kinds of sensitive data. You can see the authorisations an employee has on their record.

<span data-uuid="ec574a81-0569-4d0a-b55f-c71fe6f45801" style="display:none"></span>
![](../assets/media/occ-captures/admin/sites/uuid/dashboard/authorisations-and-tags-a-health-related-data-light-mode.png#only-light){ style="border-radius: 8px" width="500" loading=lazy }
![](../assets/media/occ-captures/admin/sites/uuid/dashboard/authorisations-and-tags-a-health-related-data-dark-mode.png#only-dark){ style="border-radius: 8px" width="500" loading=lazy }

### How to grant authorisations to employees.
<span data-uuid="48703411-60aa-455e-bdfd-2ac409a717e8" style="display:none"></span>

Sensitive tasks containing DSE or health-related data typically require a <span class="mb-label mb-label-fuchsia">Health related data authorisation</span> to be granted on the employee’s record. The steps below explain how to grant this authorisation to an employee.

:lucide-info: *The Health-Related Data authorisation is intended for selected managers or administrators only. It should not be granted to employees with standard user access.*

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

!!! step

    <span data-uuid="8e93945b-28cb-4456-801f-dd295138c9bc" style="display:none"></span>

    Grant the relevant authorisations or tags if the employee needs them (you can only configure this if you possess the tag yourself).

    `authorised/health` — Assigning this tag grants the employee authorisation to access sensitive health data (e.g. Health Surveillance corrective actions) for the employees they manage.

    <span data-uuid="c50ac3c9-6183-443e-9e89-14a2b1a9217d" style="display:none"></span>
    ![](../assets/media/occ-captures/admin/sites/uuid/employees/uuid/access/edit/authorisations-tags-light-mode.png#only-light)
    ![](../assets/media/occ-captures/admin/sites/uuid/employees/uuid/access/edit/authorisations-tags-dark-mode.png#only-dark)

    !!! note

        <span data-uuid="36fde108-b92b-4e10-8c05-75cf74aeab6e" style="display:none"></span>

        By default, all sites will have the `authorised/health` tag available, but depending on your site configuration you may have more.

!!! step

    <span data-uuid="1648dd99-d913-4a23-ad3a-7b6b094d6c0e" style="display:none"></span>
    Once you have selected the authorisation(s), click **Apply changes**.

    <span data-uuid="55704db4-7e87-47f0-9293-e7ae7b91649b" style="display:none"></span>
    ![](../assets/media/occ-captures/admin/sites/uuid/employees/uuid/access/edit/apply-changes-light-mode.png#only-light){ style="height: 50px" loading=lazy }
    ![](../assets/media/occ-captures/admin/sites/uuid/employees/uuid/access/edit/apply-changes-dark-mode.png#only-dark){ style="height: 50px" loading=lazy }