---
search:
  exclude: true
---

# Permits to Work
<span data-uuid="00e4887d-0452-4417-bac5-b3fa0aba5577" style="display:none"></span>

## Permits to Work statuses
<span data-uuid="21c6165d-2c78-45c2-b9a3-b3361b74e35c" style="display:none"></span>


<span data-uuid="78c73d9f-1f0e-4d01-af58-0343df58fd45" style="display:none"></span>
=== "Table"

    <span data-uuid="1e61c573-3a86-4636-adee-a184c3df77a5" style="display:none"></span>

    <span data-uuid="0070de4b-ba0d-4c77-b2c1-fb89d74600c7" style="display:none"></span>

    | Status | Description |
    | :--- | :--- |
    | <span class="mb-label mb-label-amber">In-progress</span> | The permit is being created or amended. |
    | <span class="mb-label mb-label-red">Invalid</span> | One or more responses to the permit's fields or questions have been deemed unsatisfactory. The permit must be reopened and amended, or a new permit submitted. |
    | <span class="mb-label mb-label-emerald">Valid</span> | All responses to the permit's fields and questions have been deemed satisfactory, and the permit is active. |
    | <span class="mb-label mb-label-orange">Future</span> | The permit is not yet valid, as the current date and time before its validity period. The permit will automatically update to valid when it reaches the defined `valid from` date/time. |
    | <span class="mb-label mb-label-slate">Expired</span> | The permit was previously valid but has since expired, as the current date and time are now beyond its validity period. |

=== "Logic diagram"

    <span data-uuid="ed295a0e-519f-4f4c-b7a9-c92c0d696797" style="display:none"></span>

    <span data-uuid="488b855f-cc9b-4f01-baa8-26b8eef09609" style="display:none"></span>
    ```mermaid
    ---
    config:
      layout: dagre
    ---
    stateDiagram
      direction TB
      classDef inProgress stroke:#d97706,fill:#f59e0b26,stroke-width:2px;
      classDef invalid stroke:#dc2626,fill:#ef444426,stroke-width:2px;
      classDef future stroke:#ea580c,fill:#f9731626,stroke-width:2px;
      classDef valid stroke:#16a34a,fill:#22c55e26,stroke-width:2px;
      classDef expired stroke:#7d8590,fill:#9ca3af26,stroke-width:2px;
      [*] --> InProgress:Permit created
      InProgress --> Invalid:Unsatisfactory responses
      InProgress --> Future:Satisfactory, before validity period
      InProgress --> Valid:Satisfactory, within validity period
      Future --> Valid:Valid from date/time reached
      Valid --> Expired:Valid to date/time passed
      InProgress:In progress
      class InProgress inProgress
      class Invalid invalid
      class Future future
      class Valid valid
      class Expired expired
    ```
