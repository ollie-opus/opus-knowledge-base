---
icon: lucide/user-plus
status: new
---

# Adding a New Employee

!!! note "Restricted Access"
    You might not have access to add employees if your company manages this centrally.

---

## Creating the Employee Record

!!! step "Step 1"
    From [My Dashboard](https://cloud.opus-safety.co.uk/dashboard), click on **Pick workspace** and select the site where you want to add the employee.

    ![](../assets/occ-captures/dashboard/pick-workspace-dark-mode.png#only-dark){ style="height: 50px" }
    ![](../assets/occ-captures/dashboard/pick-workspace-light-mode.png#only-light){ style="height: 50px" }


!!! step "Step 2"
    From the site inbox, click the **Switch to Manage Mode** button.

    ![](../assets/occ-captures/sites/switch-to-manage-mode-dark-mode.png#only-dark){ style="height: 50px" }
    ![](../assets/occ-captures/sites/switch-to-manage-mode-light-mode.png#only-light){ style="height: 50px" }

!!! step "Step 3"
    Click **Employee records** on the manage sidebar.

    ![](../assets/occ-captures/admin/sites/employee-records-dark-mode.png#only-dark){ style="height: 50px" }
    ![](../assets/occ-captures/admin/sites/employee-records-light-mode.png#only-light){ style="height: 50px" }

!!! step "Step 4"
    Click the **+New** button at the top right of the page.

    ![](../assets/occ-captures/admin/sites/employees/new-employee-dark-mode.png#only-dark){ style="height: 50px" }
    ![](../assets/occ-captures/admin/sites/employees/new-employee-light-mode.png#only-light){ style="height: 50px" }

!!! step "Step 5"
    Fill in the employee's details:
    
    !!! outline "Full name"

        ![](../assets/occ-captures/admin/sites/employees/new/full-name-dark-mode.png#only-dark)
        ![](../assets/occ-captures/admin/sites/employees/new/full-name-light-mode.png#only-light)

    !!! outline "Photo (optional)"

        Upload a photo for this employee record

        ![](../assets/occ-captures/admin/sites/employees/new/photo-dark-mode.png#only-dark)
        ![](../assets/occ-captures/admin/sites/employees/new/photo-light-mode.png#only-light)

    !!! outline "Roles"

        Select the role(s) for this employee.

        ![](../assets/occ-captures/admin/sites/employees/new/role-dark-mode.png#only-dark)
        ![](../assets/occ-captures/admin/sites/employees/new/role-light-mode.png#only-light)

        !!! warning 
        
            Please ensure you select the appropriate roles, as these determine the employee's required training, e-learning modules, and checklist items. You may select multiple roles where required.

        !!! tip
            Additional supplementary roles may be available, typically indicated with a "+" prefix (e.g. "+Fire Marshal"). These are designed to be used alongside a core role. To view the specific requirements for each role, hover over the ellipsis (…) to the right of the role title.

!!! step "Step 6"
    Under **Located at**, select the site the record will be located at.

    Depending on your site configuration, you may only have one option. If multiple options are available, select the employee's primary place of work.

    ![](../assets/occ-captures/admin/sites/employees/new/located-at-dark-mode.png#only-dark)
    ![](../assets/occ-captures/admin/sites/employees/new/located-at-light-mode.png#only-light)

!!! step "Step 7"
    Under **Own employee record access**, select which level of access the employee should be granted against their own employee record.

    ![](../assets/occ-captures/admin/sites/employees/new/own-employee-record-access-dark-mode.png#only-dark)
    ![](../assets/occ-captures/admin/sites/employees/new/own-employee-record-access-light-mode.png#only-light)

!!! step "Step 8"
    Under **Site access to mirror employee access**:

    - **Yes** (recommended) — automatically grants the employee the same access rights for their site as selected in Step 7.
    - **No** — access will need to be configured manually instead.

    ![](../assets/occ-captures/admin/sites/employees/new/site-access-to-mirror-employee-access-dark-mode.png#only-dark)
    ![](../assets/occ-captures/admin/sites/employees/new/site-access-to-mirror-employee-access-light-mode.png#only-light)

!!! step "Step 9 (optional)"
    Enable **Site access fine-tune** if you need to customise the employee's access settings further — for example, if they require access to multiple sites or need additional authorisations.

    ![](../assets/occ-captures/admin/sites/employees/new/configure-or-fine-tune-access-after-adding-this-em-dark-mode.png#only-dark)
    ![](../assets/occ-captures/admin/sites/employees/new/configure-or-fine-tune-access-after-adding-this-em-light-mode.png#only-light)

!!! step "Step 10"
    Click **Save employee** at the bottom of the page.

    ![](../assets/occ-captures/admin/sites/employees/new/save-employee-dark-mode.png#only-dark){ style="height: 50px" }
    ![](../assets/occ-captures/admin/sites/employees/new/save-employee-light-mode.png#only-light){ style="height: 50px" }

    After saving, you will be redirected to the employee's access page.

---

## Fine-Tune Site Access

!!! info "Optional"
    This section only applies if you selected the fine-tune option in Step 9.

!!! step "Step 11: Review Site Access Settings"
    After creating the employee record with the fine-tune option selected, you will be redirected to the employee site access page.

    ![](../assets/screenshots/APaQ0SQO8NjVOTfsdXmzig_VgL0Rs-AK8HgUMrX3_3fbca2b7.png)

!!! step "Step 12: Authorisations & Tags"
    Grant the relevant authorisations or tags if the employee needs them (you can only configure this if you possess the tag yourself).

    `authorised/health` — Assigning this tag grants the employee authorisation to access sensitive health data (e.g. Health Surveillance corrective actions) for the employees they manage.

    ![](../assets/screenshots/APaQ0SQHyzRGmDZmMPw8dZrpE4mxRMviECCc82oa_a6388f75.png)

    !!! note
        By default, all sites will have the `authorised/health` tag available, but depending on your site configuration you may have more.

!!! step "Step 13: Own Employee Record Access"
    Configure whether this employee can manage their own record. Defaults to **user**.

    `user`
    :   Can fulfil employee-scoped tasks such as their own e-learning completion. Cannot open their own confidential tasks unless assigned.

    `manager`
    :   Can change their own requirements and deal with their own confidential tasks even when not assigned.

    `administrator`
    :   Can make administrative-level changes to the employee record, such as adding requirements to their roles.

    ![](../assets/screenshots/APaQ0SQZwEvL137hVTrA8B7u6DSTm4e74vJ5BTLt_72f421e7.png)

!!! step "Step 14: Configure Site Access"
    === "Single Site"

        Choose whether the employee should access the site as a **user**, **manager**, or **administrator** using the drop-down menu. To remove access, select the **-** option.

        !!! note
            Granting user access automatically gives user access to assets, allowing employees to report defects, view asset documentation, and complete checklists where required.

        ![](../assets/screenshots/APaQ0ST_UgoGam1x7NuixSy7GtD8fAnNNkSZd6b1_013f3a85.gif)

    === "Multiple Sites"

        Click the double up-arrows next to the site name to give access higher up your organisational hierarchy — across other sites, regions, or your entire organisation.

        !!! tip
            Access cascades down the site hierarchy. Granting access at a site automatically applies the same access to all of its sub-sites.

        ![](../assets/screenshots/APaQ0SRL-eDqthpF8jrV9xBNKwEhqf67e9IeA91W_d2fe5420.gif)

!!! step "Step 15: Apply Changes"
    Once you have made the changes, click **Apply changes**.

    ![](../assets/screenshots/APaQ0SSoNrdYt3xIq8xU4HVlNdma4AJok-fsBX7__e3727d83.png)

---

!!! tip "Next Step: Register the Employee"
    Now that you've added an employee, you may want to register them so they can log in to access the system. [Follow the guide on how to register an employee.](/opus-safety.co.uk/opus-help/employees/employee-management/registering-an-employee)
