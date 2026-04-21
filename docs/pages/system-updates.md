---
tags:
    - System
icon: lucide/clock-arrow-up
---

# System Updates

This page highlights the main user-facing improvements, additions and feature releases to the system.

!!! question "Have an idea, suggestion or question?"
    We'd love to hear from you! Please [get in touch](https://sites.google.com/opus-safety.co.uk/opus-help/hidden-pages/groove-get-in-touch).

## 2026

---
### April 2026

??? improvement "Improvement: test<br><small style="opacity: 0.6">22nd April 2026</small>"

    <span data-uuid="4c101e57-43bc-4384-ba4a-e78865d38e04" style="display:none"></span>
    test

??? new-addition "New addition: Update 2<br><small style="opacity: 0.6">21st April 2026</small>"

    <span data-uuid="00785174-8a97-47e2-a29b-cb956de228ab" style="display:none"></span>

    test
### March 2026

??? improvement "Improvement: Incident Report - Days Lost Table<br><small style="opacity: 0.6">17th March 2026</small>"

    <span data-uuid="f4708510-3406-4d58-ae6e-5fcee0caf93a" style="display:none"></span>
    The Days lost by site table in the incident report has been updated. In the 'Days lost' column, a warning icon will appear for incidents where the number of days lost has not been specified. Hovering over the icon displays a message showing the count of the calendar days since the incident. 

    ![Animation](../assets/animations/APaQ0SRsFACNA8iJKinXvz4imuNFmvul5rTV6NW8_523747c5.gif){ width="700" align=right }
??? feature-release "Feature release: Task Export / Print<br><small style="opacity: 0.6">8th March 2026</small>"

    <span data-uuid="7e5eb1d0-3ce3-4a76-bd2d-564be70b5f98" style="display:none"></span>

    ![Animation](../assets/screenshots/APaQ0SQInzcG3RyMonCImE0WTcdVLJkyuTsbF3XR_555fdcf1.png){ width="700" loading=lazy }

    The new Export Task button allows you to generate a "clean" version of any task page. This automatically strips away system interface elements (like navigation bars and buttons) and allows you to customise the view to ensure the recipient sees only the information they need.

    **Customisation Options**

    - **Date Filtering:** Hide comments or messages written after a specific date.
    - **Display Toggles:** Choose whether to show or hide task labels, task state, or task status messages.
    - **Granular Exclusions:** Manually tick the "Exclude" checkbox on individual comments to remove them from view.

    **How it Works**

    1. Navigate to any task page and click the **Export** button in the top right corner.
    2. Configure your filtering and exclusions.
    3. Click **Apply options & excludes** to save your changes.
    4. Click **Print this page** — this triggers your browser's print dialogue where you can print or save as PDF.

    !!! tip
        Comments display relative time (e.g. "3mo ago"). Hover over the relative time text to reveal the exact date for filtering purposes.

    ![Animation](../assets/screenshots/APaQ0SRUpAYhmBsk6i9g25m0DxvSzWoVV-P5vroc_499f3329.png){ width="700" loading=lazy }

    ![Animation](../assets/screenshots/APaQ0STMQlR2Zgpfxq0uTkrgAeuDE8k6lg2bb0x6_667ca9f5.png){ width="700" loading=lazy }
### February 2026

??? new-addition "New addition: Administrator & Manager Access<br><small style="opacity: 0.6">23rd February 2026</small>"

    <span data-uuid="01a0c96a-6c3a-4949-a1fa-bf7405c53036" style="display:none"></span>
    New options for configuring employee site access to give you more control:

    - **Manager → Administrator:** The former Manager access level has been renamed to Administrator. Permissions remain exactly the same.
    - **New "Manager" role:** A new, restricted Manager access level. Operates similarly to Administrator but restricts advanced site configuration — the Manager cannot:
        - Create or configure roles.
        - Set up new templates.

    !!! warning "Important"
        To ensure no disruption, all Managers are now Administrators (as of Sat 21st Feb 2026).

    If you would like to bulk reduce any employee's access to the new Manager level, please contact us or submit [a support request.](https://sites.google.com/opus-safety.co.uk/opus-help/hidden-pages/groove-get-in-touch)

    ![Animation](../assets/animations/APaQ0ST4wuGMEIs0gTX1NM70Px7BxiUfNB2uoGLL_34f1a9e9.gif){ width="300" loading=lazy }
??? improvement "Improvement: Streamlined Process for Adding New Employees<br><small style="opacity: 0.6">23rd February 2026</small>"

    <span data-uuid="55356b33-d920-4ffb-888b-7a5efc24df41" style="display:none"></span>
    We've combined employee creation and standard site access into a single step. This speeds things up and ensures nobody is accidentally added without a role.

    We've also removed the automatic redirect to the site access page afterward. If you need to adjust specific permissions, check **"Configure or fine-tune access after adding this employee"** and you'll be taken there.

    [See the latest guide on adding employees for full instructions](https://sites.google.com/opus-safety.co.uk/opus-help/employees/employee-management/adding-a-new-employee) — steps 7–9 outline the new changes in detail.

    ![Animation](../assets/screenshots/APaQ0SS0iS_GT-LmInc6mJXAxarAch-sXSivsGny_47019667.png){ width="700" loading=lazy }
??? new-addition "New addition: Disable Reminder Tasks<br><small style="opacity: 0.6">5th February 2026</small>"

    <span data-uuid="c969ded2-a178-46b7-970d-d6ab2385cd3d" style="display:none"></span>
    A new feature has been added to all resources (checklists, playbooks, etc) that allows reminder tasks to be disabled. This is particularly useful if you want to make a resource truly ad hoc.

    For example, it can be used for pre-use checks or procedure-based playbooks. Resources with their reminders disabled can be identified via the snoozed clock icon.

    ![Animation](../assets/screenshots/APaQ0SQjSwrhd4uLyfKzVUaYpSq5JSY93C9TIpop_10504f62.png){ width="700" loading=lazy }

    ![Animation](../assets/screenshots/APaQ0SQnwUuTB8lCmx4MVkaTPibmv0jgcmGIRDIg_9ac3dcad.png){ width="700" loading=lazy }
### January 2026

??? feature-release "Feature release: Inbox Coach<br><small style="opacity: 0.6">29th January 2026</small>"

    <span data-uuid="a3f629aa-8f60-4f08-8572-556eb38cf960" style="display:none"></span>
    We've added an Inbox Coach to help you quickly understand the health of your tasks at a glance. The message and colour update automatically based on task age:

    - **Red** – You have tasks over 6 months old
    - **Amber** – You have tasks over 3 months old
    - **Blue** – All tasks are under 3 months old
    - **Green** – All tasks are assigned and nothing is older than 3 months

    We also now resurface "forgotten" assigned tasks that are over 3 months old, so nothing slips through the cracks. Snoozed tasks continue to be hidden from the inbox.

    ![Animation](../assets/screenshots/APaQ0STtkioc1IVyInHfyFgohGiMus5dDOI-F2Wg_e56dd507.png){ width="700" loading=lazy }

    ![Animation](../assets/screenshots/APaQ0STP18ZKF1iUY6E193er6PwMotSAh96RiMML_e1f28867.png){ width="700" loading=lazy }

    ![Animation](../assets/screenshots/APaQ0SSZDPLKtgWGoS7Vz4zFtN4Ul-lWkOZCit3a_0cf38f65.png){ width="700" loading=lazy }

    ![Animation](../assets/screenshots/APaQ0SS0EkHeSpJXoIsxnEV69VWsM00yBqIWXlCC_8ae7ae0d.png){ width="700" loading=lazy }
??? new-addition "New addition: Checklists - Visibility of Date Last Submitted<br><small style="opacity: 0.6">29th January 2026</small>"

    <span data-uuid="1bffc13b-d575-4eaf-90ee-d054487e1d7c" style="display:none"></span>
    We now show when checklists were last submitted without having to open the record.

    This is especially useful for non-managers, who can now clearly see and demonstrate when a checklist was last submitted — for example, showing when an LGV daily check was completed if stopped at the roadside.

    ![Animation](../assets/screenshots/APaQ0SRcT5qiJXgonegY4Ymo2ypWguYj3Rof7mpg_56d4d5ff.png){ width="700" loading=lazy }
??? improvement "Improvement: Incident Email Notifications Enhanced<br><small style="opacity: 0.6">29th January 2026</small>"

    <span data-uuid="58ba988b-d912-46c3-8060-e5aa0472428c" style="display:none"></span>
    Incident email notifications now include the initial incident description.

    This means you can quickly understand what's happened and how serious it is, helping you decide whether it needs urgent attention — without having to log into the system first.

    Note: If a user receives a notification after the incident summary has been completed, the email will show the summary instead of the original description.

    ![Animation](../assets/screenshots/APaQ0SS2NjerY_f9fh3ntJh8lL5n4LgCf6R4f8DS_bab1c410.png){ width="700" loading=lazy }
## 2025

---

### December 2025

??? new-addition "New addition: Employee List Linked Filter<br><small style="opacity: 0.6">18th December 2025</small>"

    <span data-uuid="8b4a12f6-3571-480e-bf0b-00b59c109ef8" style="display:none"></span>
    We have added a 'Linked' filter on both the All Employees and Employees with Site Access pages. This allows you to filter and see which employee records have been linked to an Opus account — it defaults to 'Both'.

    ![Animation](../assets/screenshots/APaQ0STSdwZfmndIc4irE6dR3w17vQfjYVgNhA-b_10bfe3cf.png){ width="700" loading=lazy }
??? new-addition "New addition: Role + Asset Type Requirements - Schedule Added to Hover-overs<br><small style="opacity: 0.6">18th December 2025</small>"

    <span data-uuid="a44721bf-63df-4014-962a-b2977bab65c9" style="display:none"></span>
    When you hover over an asset type or role in the Manage Employee or Manage Asset pages, you'll now see the schedule of the linked requirement directly in the pop-up.

    This also extends to the Manage Asset Types and Manage Roles pages — making it easier to check requirement schedules without opening each one.

    ![Animation](../assets/screenshots/APaQ0SQ0sEBVxqSItwzuADbVQr93xLo5XGUAVQZm_bb704345.png){ width="700" loading=lazy }

    ![Animation](../assets/screenshots/APaQ0SSoF2jInMgXQue64PmSjlSyzpSO1kXW6wD4_88990b10.png){ width="700" loading=lazy }
### October 2025

??? feature-release "Feature release: Task Query<br><small style="opacity: 0.6">23rd October 2025</small>"

    <span data-uuid="477c87a6-dc49-44af-af25-dc115facab7b" style="display:none"></span>
    We've introduced an enhanced Task Query feature on both the All Tasks and Task Report pages. You can now pick and combine various parameters.

    Autocomplete suggestions appear for: site, author, assignee, label. *(Role and Type coming soon.)*

    ![Animation](../assets/screenshots/APaQ0SQ3TCzlH8J9V8DnYL73g-80weLGqmWJbPu3_10536174.png){ width="700" loading=lazy }

    ![Animation](../assets/animations/APaQ0SScXT4EoGhq_ZDCCDotDmMrRFlOSPAW8B7M_81e7996c.gif){ width="700" loading=lazy }

    You can use the following operators to refine your search: **has**, **has one of**, **does not have**. You can also combine parameter searches with free text search (which searches task titles).

    ![Animation](../assets/screenshots/APaQ0SRTKd5R40CBvZQ1UzP3zKSkZ7ONiAb8AALW_a3957aa3.png){ width="700" loading=lazy }

    Our Knowledge Base article on [Task Queries](https://sites.google.com/opus-safety.co.uk/opus-help/reports-searches-exports/searching-tasks-task-reports?authuser=0#h.qlh475jipz8v) has been updated.
??? improvement "Improvement: Site Inbox<br><small style="opacity: 0.6">23rd October 2025</small>"

    <span data-uuid="2f21eea7-8596-42be-9c0d-03077cbae9f9" style="display:none"></span>
    We've refreshed the Site Inbox with a cleaner, more intuitive design — based directly on client feedback.

    - Simplified layout for easier navigation.
    - Helpful triage information at the top to guide you through open, unassigned tasks.
    - System-created tasks are now clearly marked with a chip icon showing 'reminder', 'automation', or 'audit'.
    - Old tasks (older than six months) are highlighted in red with an 'old task' icon.

    Note: This threshold will likely change to three months in a future update.

    ![Animation](../assets/screenshots/APaQ0SRPMm8p6LmcctcT8Z_FuuLtCBXr8Xw5f39U_f41a091e.png){ width="700" loading=lazy }
??? improvement "Improvement: All Tasks<br><small style="opacity: 0.6">23rd October 2025</small>"

    <span data-uuid="7f126fab-38c0-43f2-bd3d-6bdb0cb2d0c4" style="display:none"></span>
    The All Tasks list has been upgraded following the same design improvements as the Site Inbox, with a few small differences in layout and behaviour. These changes make it easier to review and manage tasks across all sites at a glance.

    ![Animation](../assets/screenshots/APaQ0STsZTjacbOomWpLUzkR4up7wfcr8feE3KP8_fee091f5.png){ width="700" loading=lazy }
??? new-addition "New addition: Uploading Documents - Report Something Option<br><small style="opacity: 0.6">1st October 2025</small>"

    <span data-uuid="391ab77b-f4cf-40dc-9ccc-8ba446b35aef" style="display:none"></span>
    When you add a new document in OCC, you'll now see a **Report Something** option. This allows you to instantly raise a related report at the same time as uploading the file.

    **Example use case:** An engineer's inspection report highlights a defect. As you upload the document, you can immediately log a corrective action — keeping the evidence and the follow-up action linked together in one place.

    This new workflow makes it easier to:

    - Capture issues at the point of upload
    - Link documents and corrective actions together
    - Ensure nothing gets lost between paperwork and action

    ![Animation](../assets/screenshots/APaQ0SRBykOIV5-A8OJQ1VYTF15C2eHSkNjQ0et9_4461d0ff.png){ width="700" loading=lazy }
### September 2025

??? improvement "Improvement: Future Starter UI Tweaks<br><small style="opacity: 0.6">4th September 2025</small>"

    <span data-uuid="8f2a0892-32ef-4148-8814-4c7dabe969eb" style="display:none"></span>
    We've made some slight changes for employees with a future start date. They will now show with a specific future date style, along with an informational panel explaining that tasks won't be generated until their start date (they can still carry out E-learning etc. ahead of that time).

    ![Animation](../assets/screenshots/APaQ0STBc3ZZXgHNNJVKkrCu_917q_5jfz69noz8_1b3fa9bd.png){ width="700" loading=lazy }

    ![Animation](../assets/screenshots/APaQ0SRAsEo8g3aXy-0NHgztoyllVKWJw9GMCFY9_532009e8.png){ width="700" loading=lazy }
### August 2025

??? feature-release "Feature release: Temporary Access for Non-Registered Employees<br><small style="opacity: 0.6">28th August 2025</small>"

    <span data-uuid="08b29cc4-8f01-4157-85d1-cbf676a77756" style="display:none"></span>
    Give non-registered staff access to E-learning, Employee Checklists, and Playbooks with a single QR code or link!

    Instead of a separate QR code / link for each item, you can now generate one for temporary access — valid for 1 week after first use. When the employee uses it, they get access to a simplified My Dashboard.

    You can find the option to generate the QR code / link on the employee dashboard in the Training, E-learning and Playbooks sections. Once expired, it can be regenerated. Individual links can still be used if preferred.

    ![Animation](../assets/screenshots/APaQ0SRn7L9CgesiO1aYQgFV5KhTsJacylYcCteZ_e1c7a359.png){ width="700" loading=lazy }

    ![Animation](../assets/screenshots/APaQ0STi-oZDxLBaSINC1BcuYqtV5fR-bWW3VoFf_fe4357d2.png){ width="700" loading=lazy }

    ![Animation](../assets/screenshots/APaQ0SRoO99DmmuCIuthnktVpTMb5xsdnfpl9m8V_23dac82c.png){ width="700" loading=lazy }
??? improvement "Improvement: Playbooks - Ability to Check Progress<br><small style="opacity: 0.6">28th August 2025</small>"

    <span data-uuid="61b836ba-d07a-4242-a753-b408d19fd79e" style="display:none"></span>
    You can now see what section a playbook is on via the Playbook submission history. Hovering over will give you the name of the section.

    ![Animation](../assets/screenshots/APaQ0SSBklO1F1kn4U-pu0MgbfTSYS46em3xkDle_da665236.png){ width="700" loading=lazy }
??? improvement "Improvement: Checklist Cadence Graphs<br><small style="opacity: 0.6">20th August 2025</small>"

    <span data-uuid="dd19690a-46d1-4c3c-a6b9-edc99bf8ea03" style="display:none"></span>
    We've made a number of improvements based on your feedback:

    - Open circle icon = at least one action raised
    - Closed circle icon = all raised actions resolved
    - Clearer layout — months are now slightly separated for easier viewing
    - Hover feature — hover over a day to see the number of actions raised
    - Date filtering — selecting a day on the Manage Checklist page now filters the submission table to that date

    !!! tip
        If you'd like a custom page showing multiple checklist cadence graphs (e.g. across multiple sites), please speak to Opus and we can help set this up.

    ![Animation](../assets/screenshots/APaQ0STTkoRqELPB7XrEIo0AMAAJENqjuwO0sYxf_95484d8f.png){ width="700" loading=lazy }
### July 2025

??? improvement "Improvement: Terminology Change from 'Diverge' to 'Override'<br><small style="opacity: 0.6">29th July 2025</small>"

    <span data-uuid="b5284ecd-0b9d-4a51-90cc-a2eee85834b6" style="display:none"></span>
    This was changed to make the function more obvious and to be consistent with language used elsewhere in the system.

    You'll see an **Override** button on certain records like checklists or training where individual editing may be allowed. This means the item was originally created from a template set at company level. By clicking Override, you're choosing to override the template for this specific instance only — it won't affect the original template or other instances.

    If you're unsure about overriding or how templates work, please contact Opus Safety for guidance.

    ![Animation](../assets/screenshots/APaQ0SR9jArHQDeXV-4jKE-uk_F5SSaYs-GKV2S-_00423586.png){ width="700" loading=lazy }
??? new-addition "New addition: Introducing 'Immediate' Task Severity<br><small style="opacity: 0.6">29th July 2025</small>"

    <span data-uuid="1bf25532-4010-4aac-b168-761a23788146" style="display:none"></span>
    We've introduced a new top severity — **Immediate**.

    **When to use:** Issues that must be actioned now, ahead of all other work. Examples: a serious threat to life (e.g. live electrics, unprotected edge), an active breach of the law, or a live incident that poses substantial business risk.

    **How it appears:** Tasks marked Immediate show a red flashing alarm icon.

    You can use this now by changing the severity of an existing task. If you'd like Opus to update any checklists so that specific triggering responses create an Immediate corrective action, please get in touch.

    ![Animation](../assets/animations/APaQ0STIv57hNZ0yKFJ1tqpqzpaX_6t9OB-L9n4N_e14aa31f.gif){ width="700" loading=lazy }
??? new-addition "New addition: Search Bar Added to 'My Sites' Page<br><small style="opacity: 0.6">24th July 2025</small>"

    <span data-uuid="1a6a5aae-d207-4d34-9827-68c0ac1172c1" style="display:none"></span>
    You'll now see a live search bar at the top of your 'My Sites' page. As you type, the list instantly filters to match your input — no more scrolling or relying on your browser's search function.

    ![Animation](../assets/screenshots/APaQ0STsuzSRQkklOTjbefyi_vFX-ccqnV2quxq6_146c6d8f.png){ width="700" loading=lazy }
??? new-addition "New addition: Adding Linked Actions to Document Submissions<br><small style="opacity: 0.6">24th July 2025</small>"

    <span data-uuid="3dcd65f3-53c3-4efb-9b0d-24b6493c5f2e" style="display:none"></span>
    You can now add actions directly from the Manage Documents page.

    This is especially useful for external audits (e.g. ISO audits) — upload the audit document and link any follow-up actions to it. Actions stay linked to that specific document revision, keeping everything neatly connected.

    The task will show document details with links to download / view or navigate to the manage document page. It will also appear on the manage document page under **Related Tasks**.

    ![Animation](../assets/screenshots/APaQ0SSK7BZKp_GweT7f6oecXlvJorS_huozrp_4_7ccdb102.png){ width="700" loading=lazy }

    ![Animation](../assets/screenshots/APaQ0STrNKcmMQxWL_4yRQp3mjc93Sj4mobsmyHl_be0a174e.png){ width="700" loading=lazy }
??? new-addition "New addition: Report Templates - Repeat Report<br><small style="opacity: 0.6">24th July 2025</small>"

    <span data-uuid="1cb2407b-ec86-4c00-965d-3bf0f2ab1dfa" style="display:none"></span>
    You can now quickly add another task straight after submitting the first one.

    This is especially useful when adding multiple sub tasks — once you add the first, check this box and keep adding more until you're done.

    ![Animation](../assets/screenshots/APaQ0SSwNKBPiAt6EOW7kcBLruquTzaGlcUKfQxL_c13a7bf4.png){ width="700" loading=lazy }

    ![Animation](../assets/screenshots/APaQ0SQ__-AP0wLJ-5wRj1JGmdq_UUvSrgSxHpv9_ba14f531.png){ width="700" loading=lazy }
??? new-addition "New addition: Role Required Documents<br><small style="opacity: 0.6">10th July 2025</small>"

    <span data-uuid="50e2a355-c2b8-4edc-8cda-603ea43d55d4" style="display:none"></span>
    You can now assign required documents to specific roles in OCC.

    This is ideal for anything you want to make compulsory that isn't training — such as a new starter form, driver declaration, or licence check.

    ![Animation](../assets/screenshots/APaQ0SSF4eRPRcqye57Z0024teyWwyjlLN9yV31H_63e43dcd.png){ width="700" loading=lazy }
??? feature-release "Feature release: Playbooks<br><small style="opacity: 0.6">10th July 2025</small>"

    <span data-uuid="42ffee43-91a7-4600-8eac-ea19e1b1b69e" style="display:none"></span>
    Playbooks are similar to checklists but let you direct someone to do something step-by-step, rather than simply confirm it's been checked. Think of them as interactive, guided procedures.

    Previously you could shoehorn these into a checklist, but that meant users could tick "No" (unhelpful) or generate unnecessary actions. Playbooks solve that.

    **Example Use Cases**

    - New-starter induction – e.g. Show the fire-escape plan, point out first-aid kit locations
    - Opening routine – e.g. Switch off the alarm, turn on display lights, unlock the customer entrance
    - Machinery start-up – any safety-critical start-up sequence that needs to be followed precisely

    **Key Features**

    - **Section-by-section progress & save** – Complete part of the Playbook, save, and return later without losing your place.
    - **Flexible completion windows** – Set a deadline that fits the task: seven days for an induction, three hours for an opening routine, etc.
    - **Control who can resume** – Allow any authorised user to pick up where the Playbook was left, or restrict it to the original submitter.

    Playbooks can be site, employee or asset-based and can be role or asset type requirements. We can also combine any checklist option with a playbook (Y/N, free text, photo, etc).

    ![Animation](../assets/screenshots/APaQ0SSrGGxd96GwbKybdh070G9lorz-2bl18UrA_83bdadee.png){ width="700" loading=lazy }

    ![Animation](../assets/screenshots/APaQ0SQvnlvHcmPCqzmn-wRQGNzOVpRvlGHMqHLS_05cfb70c.png){ width="700" loading=lazy }
### June 2025

??? new-addition "New addition: Alternative Notification Style<br><small style="opacity: 0.6">18th June 2025</small>"

    <span data-uuid="4cc1ebd3-5360-4193-8685-0fca168af5c1" style="display:none"></span>
    You can now customise how your in-system (bell icon) notifications appear.

    A new option allows you to show only unread notifications — ideal if you receive a high volume and want a clear, distraction-free list.

    To update your settings, go to: [Profile > Preferences](https://cloud.opus-safety.co.uk/my/profile#:~:text=Save%20changes-,Preferences,-Change%20the%20behaviour)

    We've also optimised the code around in-system notifications so the count updates quicker.

    ![Animation](../assets/screenshots/APaQ0SQzZ27B2eUrZuv1zhpli2qi9teSKa9vrXq1_e9ce61be.png){ width="700" loading=lazy }
??? new-addition "New addition: Custom Quick Filters<br><small style="opacity: 0.6">12th June 2025</small>"

    <span data-uuid="486bade8-f7cc-4206-8c00-4e14262d6f58" style="display:none"></span>
    The Quick Filters on Task Reports and the All Tasks page can now be edited by Opus.

    So if there are search queries you use regularly — for example 'Corrective Actions from Employee Checklists' — Opus can add that for you to save time.

    ![Animation](../assets/screenshots/APaQ0SSGi-9YKJuehHisDB-EzBNeWM__Fm9Vtdkv_54843a53.png){ width="700" loading=lazy }
??? feature-release "Feature release: Document Sharing<br><small style="opacity: 0.6">5th June 2025</small>"

    <span data-uuid="31eddf36-4c59-44b9-9310-d0d33a8aebbe" style="display:none"></span>
    You can now generate a link or QR code for any document in OCC — they will always take users to the latest attached file, no matter when they access it.

    - **Shareable Link:** Anyone with OCC access can click to view the most up-to-date attached file.
    - **QR Code:** Each shared document gets its own QR code, ideal for physical materials or signage.

    **Examples:** Add a link into a checklist, message a policy to a team member, or print a QR code onto a poster or asset for instant access to a user guide or training video.

    Note: If you have access to multiple sites you can choose which site to view the document at, as they may have different files attached.

    ![Animation](../assets/screenshots/APaQ0SRrOZjvqmVCLSJ5Y3rIO3YifujZnBF-i2DC_f10a2b08.png){ width="700" loading=lazy }

    ![Animation](../assets/screenshots/APaQ0SR7eYTN5WL_rgoW_7G-Tj45ZvY1XyW9IlBf_ffc702bf.png){ width="700" loading=lazy }
### May 2025

??? feature-release "Feature release: Checklist Completion by Non-Logged-In and Anonymous Users<br><small style="opacity: 0.6">22nd May 2025</small>"

    <span data-uuid="13e8203f-b12f-4ae0-91a3-0a644214f034" style="display:none"></span>
    You can now configure checklists to be completed by non-logged-in users.

    Note — while this is more 'friction free' it does:

    1. Weaken the audit trail, as you're relying on the user to manually enter their name rather than logging in.
    2. Mean that anyone with access to the QR code (including the public and visitors) can carry out the checklist.

    You can make this change by editing the checklist and changing the **'Submittable by'** setting.

    ![Animation](../assets/screenshots/APaQ0SQWFKBLis0SzhleL6f1nlbWcGrDVhZ0PfjY_6107f70c.png){ width="700" loading=lazy }

    ![Animation](../assets/screenshots/APaQ0SR3rDi0L8jjXXQy0JpJLEcRE4huU_p_gmoI_686035a3.png){ width="700" loading=lazy }
??? new-addition "New addition: Ability to Preview E-learning Courses<br><small style="opacity: 0.6">22nd May 2025</small>"

    <span data-uuid="5c9f44a3-4bb0-4cbc-aef6-f7bebbc1f4b6" style="display:none"></span>
    You can now preview E-learning content directly from your E-learning templates.

    You can reach an E-learning template via:

    - **Role Requirements:** Navigate to your role requirements and click on a course.
    - **Your E-learning Templates Page:** via Site Manage, then the **...** 'other options' in the top right.

    ![Animation](../assets/screenshots/APaQ0SQsZIvFLLglqe0u2OmrIjSlz5hCx3yfTtAQ_8971ca43.png){ width="700" loading=lazy }
??? new-addition "New addition: Checklist Informationals<br><small style="opacity: 0.6">14th May 2025</small>"

    <span data-uuid="7a2fa6f6-9fac-4971-b0dc-5a69311d2750" style="display:none"></span>
    We can now add information to your checklists to provide additional context or guidance to the person completing it. This could be:

    - Text based instructions
    - Reference images
    - Links to OCC or external documents or resources
    - Videos showing how to complete checks

    As a reminder — in addition to standard yes / no questions, we also have free text entry and upload image question types.

    ![Animation](../assets/screenshots/APaQ0SRPwWMKhMG79dI9FSikDMGNlC48EhWW3_4o_b9bf8446.png){ width="700" loading=lazy }
### April 2025

??? improvement "Improvement: Alternative Audit Report Views<br><small style="opacity: 0.6">6th April 2025</small>"

    <span data-uuid="65868026-24d0-4a07-a56a-ca037424a4f4" style="display:none"></span>
    You can now tailor your view of published audits to focus on the most relevant information. Choose from:

    - **Summary** – The default view; sections are collapsed. Any section with a marked-down score is highlighted in bold.
    - **Detailed** – Displays all details of the audit.
    - **Commented** – Shows only audit points that have received comments.
    - **Actionable** – Focuses exclusively on actions.

    You can print any of these views — the print view has been improved too. See our guide on [How to Save Pages as PDFs / Print Pages](https://sites.google.com/opus-safety.co.uk/opus-help/tips-faqs/faqs#h.5hyvad1kyv6b).

    ![Animation](../assets/screenshots/APaQ0STZW54svmc5g6o3m6TxsTlyE5l65iYOSvF8_df887892.png){ width="700" loading=lazy }
### March 2025

??? improvement "Improvement: Employee List Authorisation Filters<br><small style="opacity: 0.6">20th March 2025</small>"

    <span data-uuid="639c2431-219a-4575-be7c-5cd2a19f69a5" style="display:none"></span>
    You can now filter your staff list to see who has the sensitive health authorisation, if this is used in your organisation.

    ![Animation](../assets/screenshots/APaQ0STxD2ZsfnEhFosrfrSMXdGS1TuuTZqm1DQ-_1422c27c.png){ width="700" loading=lazy }
??? improvement "Improvement: Staff Export - Additional Columns Added<br><small style="opacity: 0.6">20th March 2025</small>"

    <span data-uuid="c271382e-d998-413f-97cc-a51a583de2e3" style="display:none"></span>
    Based on feedback, we've added Created Date, Start Date and Health Data Authorisation columns to the export.

    ![Animation](../assets/screenshots/APaQ0SRl-4mDHDdVjs_61c1ZHdGIyVfYRzWmLVWI_aadcb7cf.png){ width="700" loading=lazy }
??? improvement "Improvement: Subtask Title Prefix<br><small style="opacity: 0.6">20th March 2025</small>"

    <span data-uuid="2b414b0e-f311-45a4-80d5-1c2e2d6d67bd" style="display:none"></span>
    We now auto-add the master task name as a prefix to the sub task name. This makes it easier to understand the context of a sub task when seen in the tasks list. You can still update the title to whatever you'd like.

    ![Animation](../assets/screenshots/APaQ0SQ1Z4OK-XlMXRA0CGA5oP4FkOktdlI7aSdl_70bc90b3.png){ width="700" loading=lazy }

    ![Animation](../assets/screenshots/APaQ0SR3MltRAaYUhtzdZl2G_3BdGp39sD0w4rfx_25e83a5c.png){ width="700" loading=lazy }
??? new-addition "New addition: Assign Myself<br><small style="opacity: 0.6">18th March 2025</small>"

    <span data-uuid="b496c611-57aa-476a-adee-2d92f615290f" style="display:none"></span>
    The new **Assign Myself** button allows you to assign tasks to yourself with just one click, bypassing the need to search through a list.

    ![Animation](../assets/screenshots/APaQ0SRHrHDEY_mr1TcaeMjPIIfzCVj_wW-qrUsw_83289617.png){ width="700" loading=lazy }
### February 2025

??? feature-release "Feature release: Health Data Access Controls<br><small style="opacity: 0.6">15th February 2025</small>"

    <span data-uuid="3dd3d2ac-9bd8-42e8-9e77-af8a7e5cec52" style="display:none"></span>
    To ensure compliance with legislation, we have introduced stricter access controls for Health Surveillance and DSE records, which contain sensitive personal information classified as 'special category data'.

    Previously, any OCC manager could view these records for their staff. Now, an additional authorisation is required.

    As a precaution, most users will not currently have this authorisation by default. If you need access, please contact us — once granted, you will be able to assign this authorisation to others. Each client has at least one user who can access this.

    Note: We haven't automatically granted this to all OCC managers because doing so would allow them to view the records of other OCC managers, including those who line-manage them.

    Please read the updated [Health Data: Access Controls](https://sites.google.com/opus-safety.co.uk/opus-help/employee-users/employee-management/health-surveillance-access) article.

    ![Animation](../assets/screenshots/APaQ0STTq5PqR9XSFwcSxPl09_I687au8fbnmagt_d0227883.png){ width="700" loading=lazy }
??? new-addition "New addition: Report Type Filter<br><small style="opacity: 0.6">10th February 2025</small>"

    <span data-uuid="d98d6485-ac65-4c75-8c8d-4d55c6d80a46" style="display:none"></span>
    Opus Support can now provide you with a web link that displays only a single report type. This also means we can generate a QR code for the customised link if required.
??? improvement "Improvement: Employee Site Access - Warning Note Added<br><small style="opacity: 0.6">7th February 2025</small>"

    <span data-uuid="58f0f382-c57c-43c7-bbfc-d34d4588c91d" style="display:none"></span>
    When you add an employee, you will always be taken to a page to add site access. If you fail to complete this step, a warning will now be displayed both on this page and on the employee's profile.

    ![Animation](../assets/screenshots/APaQ0STD1oBtV9i9UkMOZuWxCHX1Wb_UzlFAJStN_081ae2c1.png){ width="700" loading=lazy }
### January 2025

??? improvement "Improvement: Accident Form - Enhanced Employee Selection<br><small style="opacity: 0.6">30th January 2025</small>"

    <span data-uuid="ff230999-f620-4a7b-bd4f-c999b398aea2" style="display:none"></span>
    1. You can now select archived employees in the "Injured Employee" field if the accident occurred during their employment period, using the employee's start and last day dates for accurate record-keeping.
    2. For clients managing multiple sites, the "Injured Employee" field now pulls employees from the site where the accident occurred as well as the site specified in the "Against Which Site Should This Be Logged?" field.

    ![Animation](../assets/screenshots/APaQ0SSziqK63_rstknQFlSLas6984hT-_kUtBvs_1b44d31b.png){ width="700" loading=lazy }
??? new-addition "New addition: Irregular Schedules<br><small style="opacity: 0.6">16th January 2025</small>"

    <span data-uuid="5a7e1f77-b1ee-44af-a2be-0e53583ee1e2" style="display:none"></span>
    We now support irregular schedules where training or documents don't conform to a regular time-based schedule (e.g. 3 yearly).

    This feature allows you to set the date of the new training / document and then manually add the review date. Please get in touch if you would like to use this feature.

    ![Animation](../assets/screenshots/APaQ0SQlnKaYWE8r1Xrzgt8AcVsdaia29HBCUkvh_7af14cef.png){ width="700" loading=lazy }
??? feature-release "Feature release: Bespoke Task Labels<br><small style="opacity: 0.6">2nd January 2025</small>"

    <span data-uuid="b9ff90ba-9eb9-4bf1-ac01-0bc56d7757f0" style="display:none"></span>
    You can now create custom task labels tailored to your organisation's needs. These labels can be applied to tasks and subscribed to by relevant team members.

    Useful for tagging incidents by machinery type or area of production to assist with reporting, or for alerting specific groups of colleagues by applying a custom label they've subscribed to.

    Please get in touch if you would like to discuss this.

    ![Animation](../assets/screenshots/APaQ0SQkHaXzUFqMw_x5521U1owHGU0fCnyFAGBE_9d1daaf6.png){ width="700" loading=lazy }
??? new-addition "New addition: Bespoke Checklist Style Report Templates<br><small style="opacity: 0.6">2nd January 2025</small>"

    <span data-uuid="582739fa-de4c-4d82-a32a-7b56f40abf78" style="display:none"></span>
    We can now create bespoke report templates for 'ad hoc' checklists.

    This is useful for clients who want to conduct a checklist on an off-site installation — where a normal checklist wouldn't be appropriate as it wouldn't be scheduled and each submission would be independent of previous ones.

    Please get in touch if you think this feature would be of use.

    ![Animation](../assets/screenshots/APaQ0STZ2Yi3HZFqIg7Cfi_bjeP5tZD8H-TsFagq_0a9d985c.png){ width="700" loading=lazy }
## 2024

---

### December 2024

??? new-addition "New addition: Requirement Intervals - Public Release<br><small style="opacity: 0.6">22nd December 2024</small>"

    <span data-uuid="f353ba4f-af45-4ade-8c43-25f296cc4763" style="display:none"></span>
    This feature has been refined and released for public use.

    It allows you to see on one page what the default schedules are for training and E-learning templates, and identify any divergences — indicating employees have records not using the default schedules (usually because a manager has altered the schedule).

    ![Animation](../assets/screenshots/APaQ0SR0QgTy9DnyJpqqcUEQvz59XRsiWcV7vjG5_326d76ce.png){ width="700" loading=lazy }

    ![Animation](../assets/screenshots/APaQ0SSfeTdIHeVgFk1yCYB3OTv4_UBi6EkGG630_0503796f.png){ width="700" loading=lazy }
??? improvement "Improvement: Briefings & Sign-off Sheets Global View<br><small style="opacity: 0.6">20th December 2024</small>"

    <span data-uuid="74e1b9ca-e797-49fe-b4b2-b9bf8716f45d" style="display:none"></span>
    You can now see briefings and staff sign-off sheets across all your sites.

    ![Animation](../assets/screenshots/APaQ0STUeNJ5FEAqQgzb2ghhvE59vRqZyOV7kWup_ce76a188.png){ width="700" loading=lazy }
??? improvement "Improvement: To-do Tasks Automatic Reopen<br><small style="opacity: 0.6">20th December 2024</small>"

    <span data-uuid="50b3a3d0-f311-4ad7-a0fc-10854d8aac66" style="display:none"></span>
    If a user tries to resolve a task without completing the requirement — e.g. adding a training record or completing a checklist — the task will now reopen straight away, rather than closing and generating a new task.

    ![Animation](../assets/screenshots/APaQ0SR3EvGF2EgDQLaFzws1baz_gcGnfWlspg3__d66de581.png){ width="700" loading=lazy }
??? improvement "Improvement: Warning if Assignee Cannot Complete the Task<br><small style="opacity: 0.6">20th December 2024</small>"

    <span data-uuid="08345ddf-79ab-4ffa-80fb-b33961e3c72c" style="display:none"></span>
    OCC now shows a pop-up warning when the person assigned to a task cannot directly complete it themselves — e.g. the assignee is not a manager but the task is to upload a training certificate, or the task is E-learning for someone else.

    A warning icon also appears next to the assigned user.

    ![Animation](../assets/screenshots/APaQ0STAt5OcLi3n-4ThBJHpIYtAQ7e8Hk8eAGz3_93f20240.png){ width="700" loading=lazy }

    ![Animation](../assets/screenshots/APaQ0SR2mL8I3qaY84gv_VfcxyKTqPowJPMy8-PX_d4fbdcc7.png){ width="700" loading=lazy }
??? improvement "Improvement: Easily Identify Role or Type-Specific Requirements<br><small style="opacity: 0.6">19th December 2024</small>"

    <span data-uuid="5da7515b-7b8a-4d11-9811-ab801bd38252" style="display:none"></span>
    You can now click on an employee role or asset type to see which records relate to that role / type.

    ![Animation](../assets/screenshots/APaQ0STW1Z4P-Wlfg1A_Ns2pW1w-at9-00d8REKT_3331c681.png){ width="700" loading=lazy }
??? new-addition "New addition: My Assigned Tasks - Snoozed and Resolved Filters<br><small style="opacity: 0.6">18th December 2024</small>"

    <span data-uuid="f5e5983e-6beb-4d9b-95dd-f9d247266e5d" style="display:none"></span>
    My assigned tasks now has filters for snoozed and resolved tasks to help you manage your workload.

    ![Animation](../assets/screenshots/APaQ0SQYaharoty_a6H_HyjvvfBLxk94IPHWnyMq_cfd37c2e.png){ width="700" loading=lazy }
??? improvement "Improvement: Site Snapshot - Archived Records<br><small style="opacity: 0.6">18th December 2024</small>"

    <span data-uuid="18c5b3bd-4827-4912-9793-681cd9d2185e" style="display:none"></span>
    You can now opt to see archived records in the snapshot pages.

    ![Animation](../assets/screenshots/APaQ0SQKVfKDZN8XvjAkgcIhroc1uol7I4lolPcg_2fa8e0d1.png){ width="700" loading=lazy }
??? feature-release "Feature release: My Dashboard Full Release<br><small style="opacity: 0.6">16th December 2024</small>"

    <span data-uuid="2f36f7ed-bb15-4a7b-a886-cc6c0feb7939" style="display:none"></span>
    My Dashboard is where you will now land when logging in.

    Designed based on feedback, it gives quicker access to your own E-learning / checklists, provides launch points to your inbox(es), highlights your top priority task, and prompts you to update your display name and add an avatar.

    Thank you to the beta testers!

    ![Animation](../assets/screenshots/APaQ0SROHVSqM_zh6UMt7sq2nJsV_vVgr6lNTpp9_86739f64.png){ width="700" loading=lazy }
??? new-addition "New addition: Spillage Report Type<br><small style="opacity: 0.6">7th December 2024</small>"

    <span data-uuid="f2dc6605-a141-44d5-a9ee-406eefb05768" style="display:none"></span>
    We've added a new optional report type specifically designed for recording spillages. Particularly useful for clients who are ISO 14001 accredited and require detailed spillage documentation.

    ![Animation](../assets/screenshots/APaQ0SQlG3cLjcuk6JRA1W3N4US88YL_J7ubcFVV_b75b117d.png){ width="700" loading=lazy }
??? improvement "Improvement: Accident Report Template - Contact Details Tweaks<br><small style="opacity: 0.6">5th December 2024</small>"

    <span data-uuid="2d0fb5ee-a446-4f18-9638-f8c7a9b056a4" style="display:none"></span>
    The form now has explicit separate areas for contact details for the person reporting and the injured party.

    ![Animation](../assets/screenshots/APaQ0SRtUFDjNHejJId4m7sebj_DnC60sK2q-uck_99c2ded7.png){ width="700" loading=lazy }

    ![Animation](../assets/screenshots/APaQ0SQC6Ewl8v6kzdUbYjfYzYzogh2o-lb06eF3_56a41965.png){ width="700" loading=lazy }
??? improvement "Improvement: Accident Form - 'Days off Work' Change<br><small style="opacity: 0.6">5th December 2024</small>"

    <span data-uuid="c8f263b1-3c42-4df8-a939-b8705cc62f87" style="display:none"></span>
    The form now asks if the employee has had time off — if answered 'Yes', a separate field appears to add the days lost.

    This prevents users submitting '0' when they don't yet know if the employee has had time off, and then failing to update it later.

    ![Animation](../assets/screenshots/APaQ0SQo01Zc4T6915nKuTVhGtrfYJjYvDqwucQ4_9c22e527.png){ width="700" loading=lazy }

    ![Animation](../assets/screenshots/APaQ0SSZcxHejbRHQ6YGVtVId9CW_5TyMaeve3ZL_39c33bf4.png){ width="700" loading=lazy }
### November 2024

??? improvement "Improvement: Document Path Automation<br><small style="opacity: 0.6">10th November 2024</small>"

    <span data-uuid="7ed57513-4e62-4601-83cd-a2652a5eeeab" style="display:none"></span>
    The system now creates a file / folder path for you automatically. You can choose from existing folders. This should speed up the adding of new documents.

    ![Animation](../assets/screenshots/APaQ0SRznIzP73YNW1mim6dPOTQVLgoYkuuMZmPN_59e348cc.png){ width="700" loading=lazy }
??? improvement "Improvment: Role / Asset Type Requirements - Visual Indicator<br><small style="opacity: 0.6">10th November 2024</small>"

    <span data-uuid="26a4828a-6a4a-4e92-8f9c-6b4698f07853" style="display:none"></span>
    It's now easy to see whether a record is there because it was added to the asset / employee individually, or because it's a role or asset type requirement.

    ![Animation](../assets/screenshots/APaQ0SRD1h6FwSWYexnWruJlcuyurAIOr-oNv0hl_6b36d265.png){ width="700" loading=lazy }

    ![Animation](../assets/screenshots/APaQ0SSPd0dPqiYeL2prmKHZAMBBCAltjH82qzmm_a0a0a3f6.png){ width="700" loading=lazy }
??? improvement "Improvement: Checklist Tab Tree View<br><small style="opacity: 0.6">10th November 2024</small>"

    <span data-uuid="3f43fe7d-cbde-4d84-bd16-0927a49d8449" style="display:none"></span>
    It's now easier to see in one place which checklists across all sites and assets are due.

    ![Animation](../assets/screenshots/APaQ0SRZOCebEZPRHAQn7ssJuFA8khvvSFeKctaa_567a91ff.png){ width="700" loading=lazy }
??? new-addition "New addition: My Dashboard Beta Release<br><small style="opacity: 0.6">10th November 2024</small>"

    <span data-uuid="13297a80-736a-4eff-97b0-fd3996a22431" style="display:none"></span>
    The profile settings now allow you to opt into a new landing page featuring quick links and nudges to take you to the right locations.

    Opt in [here](https://cloud.opus-safety.co.uk/my/profile#:~:text=Save%20changes-,Preferences,-Change%20the%20behaviour) and let us know your thoughts.

    ![Animation](../assets/screenshots/APaQ0STdx8_s8P4VEIOvy0WPyvVak9zwE-Gm4vHx_a7c5d826.png){ width="700" loading=lazy }
### October 2024

??? new-addition "New addition: Flag Task Label<br><small style="opacity: 0.6">25th October 2024</small>"

    <span data-uuid="721fab00-832b-4673-80d9-395f7fb734dd" style="display:none"></span>
    Available on all tasks across the system, you can now apply a 'Flag Task' label to highlight tasks for urgent review or escalated handling.

    **How to Use It:** Apply the 'Flag Task' option on any task you wish to highlight.

    **Current Capabilities:** Locate flagged tasks in [Task Reports](https://sites.google.com/opus-safety.co.uk/opus-help/reports/searching-task-reports) using the search query: `label:additional/flag-task`.

    **Coming Soon:** Subscription options for flagged tasks — senior managers will be able to subscribe to the Flag Task label and receive notifications when tasks are marked with it.

    ![Animation](../assets/screenshots/APaQ0SROMMzKCaKtEGzNWrnu0FE0S_R2h3cdRDAq_596d6b1b.png){ width="700" loading=lazy }
??? new-addition "New addition: Incident Summary Field<br><small style="opacity: 0.6">24th October 2024</small>"

    <span data-uuid="2b934d47-3e64-40fc-b25f-3f3f71f05143" style="display:none"></span>
    We've added a summary field in the incident form and updated the text in the initial report.

    We encourage prompt logging — the person making the initial report shouldn't feel they need all the details before starting. The **"What Happened?"** field (formerly "Details of the Incident") captures what is understood to have happened at the time of reporting. Further details can be added later.

    The Incident Summary field serves as a record of the circumstances surrounding the incident and appears in the Investigation section. It's included in Task Reports and the Task Reports export.

    Note: This applies to incidents reported from 14:00 on 24/10/24.
??? new-addition "New addition: Extended Task Snooze<br><small style="opacity: 0.6">20th October 2024</small>"

    <span data-uuid="9521d459-75ee-42ce-ad20-74cb4d70a983" style="display:none"></span>
    Opus Compliance Cloud Admins can now snooze tasks for extended periods of 3, 6, 9, or 12 months — perfect for situations like maternity leave or other long-term absences.

    If you want to use this feature, please comment on the task(s) explaining why, then send us the task link(s).

    ![Animation](../assets/screenshots/APaQ0SRE5ZqVc8-FTd1AWGzPxYNnN4AnpUzDO-aw_03db67ab.png){ width="700" loading=lazy }
??? improvement "Improvement: Employee Site Access Management<br><small style="opacity: 0.6">20th October 2024</small>"

    <span data-uuid="02a4b7d0-ab9a-4f2a-adb4-338cc084c6f3" style="display:none"></span>
    We have separated the management of employee site access from the employee edit page. It is now handled through a dedicated site access page, simplifying the process of managing site permissions.

    See [here](https://sites.google.com/opus-safety.co.uk/opus-help/employee-users/employee-management/adding-a-new-employee) for more guidance.

    ![Animation](../assets/screenshots/APaQ0SS76Avf-l2S_1FrdvjGIQ5pisCNLCEnLeta_29cefd27.png){ width="700" loading=lazy }
### August 2024

??? improvement "Improvement: Ability to Add Photos or Use Camera for Document Uploads<br><small style="opacity: 0.6">22nd August 2024</small>"

    <span data-uuid="dfcfc35d-94ff-4f73-adb2-553c64149d84" style="display:none"></span>
    Previously PDF only, you can now upload images or take photos on a mobile device. Helpful for users who don't have PDF versions of certificates / reports or can't scan documents.

    ![Animation](../assets/screenshots/APaQ0SSMnHc_E4xce1ttP31-euDdvGxM_GkO8lxO_0a91e2d7.png){ width="700" loading=lazy }
??? improvement "Improvement: Attach Image Multi-Select<br><small style="opacity: 0.6">22nd August 2024</small>"

    <span data-uuid="95619adb-4d84-40a2-9f89-45ce53938599" style="display:none"></span>
    You can now select multiple images at once when using the 'attach image' function on checklists or tasks.
### July 2024

??? improvement "Improvement: Site Snapshot Parity Update<br><small style="opacity: 0.6">21st July 2024</small>"

    <span data-uuid="db3b8272-9cfe-4a9a-81e3-c9290f824095" style="display:none"></span>
    When clicking on a card within the Site Snapshot (e.g. Training Due), the number of items listed now corresponds to the number on the card.

    ![Animation](../assets/animations/APaQ0SSwOF_2Jn3UMrGmEOLayYVWmnAH7J4w07sg_28a51f15.gif){ width="700" loading=lazy }
??? improvement "Improvement: User Inbox Subscription Button<br><small style="opacity: 0.6">21st July 2024</small>"

    <span data-uuid="f550c574-03e5-49e6-96f2-a56022f77021" style="display:none"></span>
    Subscriptions button (located: User inbox > All Tasks) now functions as intended and takes you to subscriptions page.

    ![Animation](../assets/animations/APaQ0STcm6Utv4y26an99RAS9C3mv5sdvdLFIUbB_4bdf0bcb.gif){ width="700" loading=lazy }
??? feature-release "Feature release: Printable Sign-off Sheets and Briefings<br><small style="opacity: 0.6">19th July 2024</small>"

    <span data-uuid="3ffe71b6-1c83-41a3-afe6-07024d4e1a2f" style="display:none"></span>
    You can now create a printable sign-off sheet and later turn it into a briefing. Useful for things such as toolbox talks.

    ![Animation](../assets/screenshots/APaQ0SSOPvqiiFK0QUnQI0skox_UUTzIdMpN1HnU_621e3cad.png){ width="700" loading=lazy }
??? new-addition "New addition: Site Snapshot - Asset Type / Employee Role Filtering<br><small style="opacity: 0.6">1st July 2024</small>"

    <span data-uuid="272e9b6f-8b0f-4dd8-b140-8f9981f43665" style="display:none"></span>
    You now have the ability to filter by asset type or employee role on both the Site Snapshot page and snapshot subpages.

    ![Animation](../assets/screenshots/APaQ0SS4x0qgaJoKZbV1v6VQAqF90XsnoVthws-V_8fe5a89c.png){ width="700" loading=lazy }
### June 2024

??? improvement "Improvement: Profile & Settings UI<br><small style="opacity: 0.6">14th June 2024</small>"

    <span data-uuid="b37558df-3bda-4afc-baa4-c90c719c2659" style="display:none"></span>
    The profile & settings UI has been updated to assist with user account management and ease of use. Newsletters have also been added - located on the new top bar, along with Security, Subscriptions and Notifications.

    ![Animation](../assets/screenshots/APaQ0SQauhPpv9Ggis83OGrg_xRBSMEHzaopFlW7_f39d8c5d.png){ width="700" loading=lazy }
??? improvement "Improvement: Individual User 2FA / MFA Refinement<br><small style="opacity: 0.6">14th June 2024</small>"

    <span data-uuid="7713f377-5fcc-4096-9365-66813f895300" style="display:none"></span>
    Following on from 7th June feature release - Setting up and maintaining 2FA on your account is now easier. Individual users can now opt to use 2FA.

    This menu is now located under "Security" in the Profile & Settings UI. An updated guide has also been posted in the Knowledge Base under tips.

    ![Animation](../assets/screenshots/APaQ0ST4MpnG1aOVoKiVUqfL78qqTCmJWBDVVIfX_282b9ddb.png){ width="700" loading=lazy }
??? improvement "Improvement: Mode Button UI Update<br><small style="opacity: 0.6">7th June 2024</small>"

    <span data-uuid="e9ec1d2e-9008-485e-a901-81175c5a4ee5" style="display:none"></span>
    Manage and View buttons have been recoloured and renamed to 'Switch to Manage Mode' / 'Switch to View Mode' to make it clearer to users which mode is being viewed.

    ![Animation](../assets/screenshots/APaQ0STEFRWNh65cLfdbAfkaHJfOH3TvjIY8KtnT_2c01a401.png){ width="700" loading=lazy }
??? feature-release "Feature release: Individual User 2FA/MFA<br><small style="opacity: 0.6">7th June 2024</small>"

    <span data-uuid="9d43e68b-43af-4ef7-ba5e-27693127e6b7" style="display:none"></span>
    New feature added to allow individual users to setup 2FA/MFA on their accounts.

    ![Animation](../assets/screenshots/APaQ0STl7frI6riXEFSL0Ab__-w2wMidQxlCtivU_3e893ec9.png){ width="700" loading=lazy }
### May 2024

??? improvement "Improvement: Safety Alerts Multi-Site Selection<br><small style="opacity: 0.6">23rd May 2024</small>"

    <span data-uuid="00963139-d7a9-4656-bd2c-d30b995d4c74" style="display:none"></span>
    Added ability to tick multiple sites in one go and toggle on / off for sub sites.

    ![Animation](../assets/screenshots/APaQ0SQ-NbGj_hTcUFCc-0H7RCGmDeT9xxiMx6GL_989171f6.png){ width="700" loading=lazy }
??? new-addition "New addition: 'Signed in as' Name Display<br><small style="opacity: 0.6">23rd May 2024</small>"

    <span data-uuid="6b6ab2ea-31eb-4a81-bcd9-5f96c72994e0" style="display:none"></span>
    Added for cases where user might share devices. If the name here is wrong it indicates to the user that the previous user has not logged out or that they have shared a session and the other user has overwritten their display name.

    ![Animation](../assets/screenshots/APaQ0SSQYSaAqLNadcugcZdUmh4SjEbSitBLkiXd_589e452a.png){ width="700" loading=lazy }
### April 2024

??? new-addition "New addition: Document Access Controls<br><small style="opacity: 0.6">25th April 2024</small>"

    <span data-uuid="5f6c0cb4-9041-4275-8377-4feb1e187863" style="display:none"></span>
    Documents now have 3 access levels:

    - Anyone with a valid link or QR code (default)
    - All logged in users with access
    - Managers with access

    We advise keeping as much documentation with the first option so that employees can read by scanning your site QR code.

    ![Animation](../assets/screenshots/APaQ0SRKuR7qGARcf2na-E_tpmSVVy8C3JajUei__3bf1f949.png){ width="700" loading=lazy }
??? improvement "Improvement: Accident / Near Miss Report Template Tweaks<br><small style="opacity: 0.6">19th April 2024</small>"

    <span data-uuid="9b25490f-88b4-4965-8bd7-26c7b49958e3" style="display:none"></span>
    - 'Occurrence site' changed to 'Against which site should this accident be logged' and moved to the investigation section.
    - New 'missing information' text changes.

    ![Animation](../assets/screenshots/APaQ0SRIW_7_sUq4ofxUjgHf8V4TxaM-i-Oo4df6_14011a15.png){ width="700" loading=lazy }
??? improvement "Improvement: Role / Asset Type Pop-up<br><small style="opacity: 0.6">16th April 2024</small>"

    <span data-uuid="5b75fcff-f478-465a-b51b-46002db5c9e8" style="display:none"></span>
    Hover over role or asset types to see what Role Requirements or Asset Type Requirements are set. Also shown on adding new employees and assets via a more info ... button.

    ![Animation](../assets/screenshots/APaQ0SQBm89QxoKbgoi_YAiowrdXqPwLfgg5PFF6_29a808ad.png){ width="700" loading=lazy }
??? improvement "Improvement: Clear End Date<br><small style="opacity: 0.6">16th April 2024</small>"

    <span data-uuid="7d33ceeb-a1d1-499d-81bf-ee62293b8d30" style="display:none"></span>
    Added to more easily remove left dates on archived staff or assets.

    ![Animation](../assets/screenshots/APaQ0SQVc849noh8AFgIeD3cNO51nXOvfWsWdhLN_7cd6e3e6.png){ width="700" loading=lazy }
??? improvement "Improvement: Reduced / Refined Notification Email<br><small style="opacity: 0.6">15th April 2024</small>"

    <span data-uuid="e8c78ed8-d9c1-432c-a07e-eee5ba1c3343" style="display:none"></span>
    Based on client feedback we have made the notification email simpler to make it easier / quicker to read.
### March 2024

??? new-addition "New addition: Task Comment Highlighting<br><small style="opacity: 0.6">21st March 2024</small>"

    <span data-uuid="8b7fa566-5bdc-427d-968d-365878045f35" style="display:none"></span>
    Comment boxes will now highlight new comments. Blue for new comments inc. system information messages. Orange / green to see task comments that others have made when you click on a notification link.

    ![Animation](../assets/screenshots/APaQ0STrf6FOyg2aK0g5B1a_wL6bXdB_gMJccilV_12b94d11.png){ width="700" loading=lazy }

    ![Animation](../assets/screenshots/APaQ0SQm8oRHzwicndDU0aWeOCmujg6S-6aCIgfk_a4dc4ab7.png){ width="700" loading=lazy }

    ![Animation](../assets/screenshots/APaQ0SScmtyA5wqIm0n3IuAjdqGROZXjR8TOHR23_e5ce7e10.png){ width="700" loading=lazy }
??? new-addition "New addition: File Uploader<br><small style="opacity: 0.6">12th March 2024</small>"

    <span data-uuid="be7a84ca-202e-4f99-80a6-6eda40206c1e" style="display:none"></span>
    A new file uploader to allow larger files to be added to checklist, training and documents. This will prevent issues where larger files were timing out. Note: support for image files coming soon. For mobile devices we recommend using Camscanner or other document scanning app to convert physical files into PDFs.

    ![Animation](../assets/screenshots/APaQ0SRUXjjq9oy0o9L-MB8KjY0VrFnWNpDftBpc_66fc0096.png){ width="700" loading=lazy }
??? feature-release "Feature release: Checklist Cadence Graph<br><small style="opacity: 0.6">12th March 2024</small>"

    <span data-uuid="8fdeb00b-93d2-46d7-8acc-a02d31a73be0" style="display:none"></span>
    Within "Manage Checklist" you will see the Checklist Submission Calendar / Cadence Graph which displays checklist submissions over time — a convenient snapshot to identify any gaps showing non-compliance.

    ![Animation](../assets/screenshots/APaQ0STgv0Iaa12HYOH9Pgp77wKWTZRmbrV-MvIP_a4ae5af7.png){ width="700" loading=lazy }
??? improvement "Improvement: New Terminology - Sub Tasks and Parent Tasks<br><small style="opacity: 0.6">12th March 2024</small>"

    <span data-uuid="9ece4410-9058-4087-b2c9-5c9894538104" style="display:none"></span>
    A small change to make the system easier to understand. Previously referred to as Delegate Tasks and Resolves Tasks.
??? improvement "Improvement: Sub Task Snoozing<br><small style="opacity: 0.6">12th March 2024</small>"

    <span data-uuid="ec9464c4-1105-4a71-a68f-0f38458f5a6a" style="display:none"></span>
    When you add sub tasks you will see a bell symbol to the right. Selecting that will snooze the parent task until the sub task is completed. Ideal for tasks that can't be progressed until sub tasks are done.

    ![Animation](../assets/screenshots/APaQ0SQLNy3CTKfykGlED0Ga323wmPmG_GeFVSjd_49fcd014.png){ width="700" loading=lazy }
??? new-addition "New addition: E-learning Certificates<br><small style="opacity: 0.6">12th March 2024</small>"

    <span data-uuid="7361e35a-5995-4b9d-93f7-37d4f9d9eb74" style="display:none"></span>
    Currently for newly taken courses. Opus can generate a certificate if you need it. Find it by clicking on the E-learning name then View.

    ![Animation](../assets/screenshots/APaQ0STu39mYIaSf2NrMJSz-K5S62AEdnFRkBuC5_f19fbf62.png){ width="700" loading=lazy }

    ![Animation](../assets/screenshots/APaQ0SRJS-LOeLk5gOBz9IGc1C2u32TEJ6BZK9P5_bcfc1ac3.png){ width="700" loading=lazy }
### February 2024

??? feature-release "Feature release: Safety Alerts<br><small style="opacity: 0.6">15th February 2024</small>"

    <span data-uuid="26420708-bf04-400f-b4e6-41674c5ea078" style="display:none"></span>
    Allows you to create tasks on multiple sites to alert to critical issues — see [here](https://sites.google.com/opus-safety.co.uk/opus-help/sites/safety-alerts) for more guidance.

    ![Animation](../assets/screenshots/APaQ0SSz8B8_0v0HtLSRuMQnZy-oWp-JAJUxmEim_9b12c867.png){ width="700" loading=lazy }
??? new-addition "New addition: Audit Subscription<br><small style="opacity: 0.6">15th February 2024</small>"

    <span data-uuid="13473286-81a8-4f2e-bf45-79c784000215" style="display:none"></span>
    A task is now generated on the site inbox when an audit is published against your site(s) with a link to the audit report and with any audit actions listed as sub tasks. You can also now subscribe to recieve in-system/email notifications for audits being published against your site(s).

    ![Animation](../assets/screenshots/APaQ0SQDgJ20LtcxrIOEVrd9fPILpN3HSEDdCWfQ_62d2760f.png){ width="700" loading=lazy }
> To see a list of system updates made prior to 2024 click [here](https://sites.google.com/opus-safety.co.uk/opus-help/system-updates/historical-system-updates).
