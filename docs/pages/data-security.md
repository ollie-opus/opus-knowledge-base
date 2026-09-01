---
icon: lucide/shield-check
---

# Data security
<span data-uuid="b092063c-bb44-4ce0-999c-06538701c028" style="display:none"></span>

At Opus Safety, we prioritise the security and integrity of your data. Here's how we ensure your information is protected:

## Server security
<span data-uuid="abf0a13f-c882-4d49-9ff7-07d8705aec8d" style="display:none"></span>

Our platform is hosted in the EU within a Tier 3 data centre, ensuring robust physical and digital protections.

## Data backup
<span data-uuid="bae0c7af-dac4-4480-b670-d718c697b3fe" style="display:none"></span>

Data is backed up bi-weekly to safeguard against data loss.

## System patching and DDoS protection
<span data-uuid="553216a3-e495-4322-9c4c-2ee99766e4ea" style="display:none"></span>

- OS patching is managed by Delft Solutions B.V.
- DDoS prevention is provided by Worldstream, ensuring service continuity and protection against attacks.

## Data transmission security
<span data-uuid="563c70c7-2097-4485-a628-8315faca86e8" style="display:none"></span>

We use the industry-standard **Transport Layer Security (TLS)** 1.2 or later with 2,048-bit encryption keys to secure all data transmissions.

## User authentication and account security
<span data-uuid="822dd7c9-dd30-4a0b-9e71-046ca6ee1908" style="display:none"></span>

- Email change notifications are sent to the original email address to prevent unauthorised changes.
- Password change notifications are issued to alert users of any updates to their credentials.
- Users must re-enter their credentials every two weeks if the **Remember Me** option is selected. Without this option, credentials must be re-entered at the start of each browser session.

### Password requirements
<span data-uuid="e2d022ec-26aa-4d0c-a4a5-6103232351ed" style="display:none"></span>

<span data-uuid="82d6903a-cadb-4738-b864-267e82bd16a6" style="display:none"></span>

<div class="nowrap-first" markdown>

| Requirement | Value |
| :--- | :--- |
| Minimum length | 12 characters |
| Maximum length | 128 characters |
| Encryption | `bcrypt` with at least 13 stretches for enhanced security |

</div>

- Account lockout after 8 failed login attempts, with a lockout period of 1 hour. Accounts can also be unlocked via an email link.
- Reset password links are valid for 6 hours.

### Protection against timing attacks
<span data-uuid="b3817070-1b0e-4928-9196-d5288ba2a493" style="display:none"></span>

- Passwords are safeguarded from timing-based attacks.
- Reset tokens are securely implemented, making it infeasible to guess tokens associated with specific users.

## Compliance
<span data-uuid="faa64743-3ace-4022-971d-dfb27ebd4488" style="display:none"></span>

These measures ensure that your data is kept secure while maintaining compliance with industry standards and best practices.
