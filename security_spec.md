# Security Specification for Hyper Market

## Data Invariants
1. A product must have a unique ID, valid name, and positive price.
2. An order must belong to a valid user account.
3. User profiles can only be modified by the owner, except for the 'role' field which is read-only for users.
4. Admins have full access to all collections.

## The Dirty Dozen (Attack Scenarios)
1. **Identity Spoofing**: User A trying to read Order B belonging to User B.
2. **Privilege Escalation**: User A trying to update their own 'role' to 'admin'.
3. **Ghost Product Injection**: Unauthorized user trying to create a $0.01 product.
4. **Order State Manipulation**: User trying to change an order status from 'delivered' to 'processing' to get a refund.
5. **ID Poisoning**: Injecting a 2KB string as a product ID to cause resource exhaustion.
6. **Shadow Field Injection**: Adding 'isVerified: true' to a user profile to bypass internal checks.
7. **Orphaned Order**: Creating an order with a non-existent userId.
8. **Blanket Read Attack**: Querying all user profiles to scrape emails.
9. **Timestamp Spoofing**: Setting 'createdAt' to a date in the past to appear as a long-time member.
10. **Array Exhaustion**: Adding 10,000 items to a single order.
11. **PII Leakage**: Reading a private user address without being the owner.
12. **Denial of Wallet**: Repeatedly querying a deep subcollection using unoptimized filters.

## Test Runner (Draft)
The tests will ensure that all these payloads return `PERMISSION_DENIED`.
