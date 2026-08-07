---
icon: lucide/key-round
tags:
  - Managing OCC
---

# Access & Authorisations
<span data-uuid="3606b572-c16f-440b-88ae-08f893b52339" style="display:none"></span>

Employees can be assigned specific levels of access to sites, as well as authorisation to access particular content. This guide explains the different access levels and types of authorisation that can be assigned to employees.

## Access levels
<span data-uuid="2aebb6f5-f7dd-42b3-b45f-3ffb7febba22" style="display:none"></span>

Employees can have their access defined on their employee record. Depending on their role within your organisation, an employee may have access to a single site or multiple sites. There are three levels of access available, allowing you to assign the appropriate level of access to each employee.

- <span class="mb-label mb-label-blue">User</span> access is the standard level of access, designed for employees who do not have managerial responsibilities.
- <span class="mb-label mb-label-purple">Manager</span> access is designed for employees with managerial responsibilities, such as General Managers and Assistant Managers. Managers have additional permissions that enable them to oversee and manage their site(s).
- <span class="mb-label mb-label-pink">Administrator</span> access is intended for employees with elevated management responsibilities, typically spanning regions or the organisation as a whole. Administrators have advanced permissions that allow them to make fundamental changes to their company's Opus Compliance Cloud configuration.

<span data-uuid="c460aa2b-adc2-4fc7-a193-d9166884c952" style="display:none"></span>

| Ability | <span class="mb-label mb-label-blue">User</span> | <span class="mb-label mb-label-purple">Manager</span> | <span class="mb-label mb-label-pink">Administrator</span> |
| :--- | :---: | :---: | :---: |
| Complete their own requirements, such as e-learning courses and employee checklists | :lucide-check: | :lucide-check: | :lucide-check: |
| Access to a site's View mode to report events, such as incidents | :lucide-check: | :lucide-check: | :lucide-check: |
| Complete tasks that have been made available to users, such as vehicle pre-use checks | :lucide-check: | :lucide-check: | :lucide-check: |
| Access site assets to report defects or complete user-scoped checks | :lucide-check: | :lucide-check: | :lucide-check: |
| View documents that are set to be available to users, such as company policies and risk assessments. | :lucide-check: | :lucide-check: | :lucide-check: |
| Manage their notification subscriptions to receive in-system and email notifications | :lucide-check: | :lucide-check: | :lucide-check: |
| Access confidential tasks, including incidents and employee interventions |  | :lucide-check: | :lucide-check: |
| View documents that are set to be available to managers. |  | :lucide-check: | :lucide-check: |
| View and complete checklists that are set to be completable by managers, such as site fire safety checks. |  | :lucide-check: | :lucide-check: |
| Access Manage mode for their assigned site(s) |  | :lucide-check: | :lucide-check: |
| Manage employees (add, edit, archive, and link) |  | :lucide-check: | :lucide-check: |
| Manage assets (add, edit, and archive) |  | :lucide-check: | :lucide-check: |
| Manage documents (add, edit, and archive) |  | :lucide-check: | :lucide-check: |
| Manage checklists and playbooks (add, edit, and archive) |  | :lucide-check: | :lucide-check: |
| Generate reports using Task Reports and the Site Snapshot |  | :lucide-check: | :lucide-check: |
| Create and edit resource templates, including Documents, Checklists, Playbooks, and Training |  |  | :lucide-check: |
| Create and manage employee roles, asset types, and (if [Contractor Management](contractors-overview.md) is enabled) contractor and project types |  |  | :lucide-check: |
| Edit site structures, including renaming and moving sites |  |  | :lucide-check: |
| Access additional task management capabilities, such as extended task snooze periods |  |  | :lucide-check: |

!!! info

    <span data-uuid="e3858757-a181-4425-9d3f-63f7c522f04f" style="display:none"></span>


    <span class="mb-label mb-label-pink">Administrator</span> access is a relatively new permission level, introduced to provide a clear distinction between site managers and administrators with regional or organisation-wide responsibilities.

## Authorisations
<span data-uuid="8d5dfa78-d3ba-4e20-8094-29c7da26e264" style="display:none"></span>

Authorisations are separate permissions that can be assigned to employees. Employees with an authorisation can access specific types of sensitive data.

Currently, the system supports a <span class="mb-label mb-label-teal">Sensitive Health</span> authorisation out of the box. This can be assigned to managers who need to view, export, and interact with tasks containing employee sensitive health data, such as corrective actions arising from Health Surveillance.