# Lifecycles and Flow Diagrams

## 1. Offer Lifecycle
`Active` -> `Paused`
`Active` -> `Cancelled` (Cascades cancel to active slots)
`Active` -> `Expired` (Time-based condition)

## 2. Slot Lifecycle
`Active` -> `Cancelled`
When an Offer is cancelled, its `Active` slots are also set to `Cancelled`.

## 3. Booking Lifecycle
`Pending` -> `Confirmed`
`Pending` -> `Cancelled` (Releases booked count)
`Confirmed` -> `Completed`
`Confirmed` -> `NoShow`
`Confirmed` -> `Cancelled` (Releases booked count)

## 4. Validation Flow Diagram (Booking)
1. **Receive Request**: `{ SlotId, CustomerPhone, CustomerName }`
2. **Check Slot/Offer Existence**: If not found -> 404
3. **Check Expiration**:
   - Is Offer `ValidUntil` in the past? -> Block
   - Is Offer status `Active`? -> Block if not
   - Is Slot `StartTime` in the past? -> Block
   - Is Slot status `Active`? -> Block if not
4. **Check Max Bookings**:
   - Has customer reached max bookings for this offer? -> Block
5. **Check Duplicate**:
   - Has customer already booked this exact slot? -> Block
6. **Concurrency / Capacity Check**:
   - Acquire Lock
   - Is `Capacity <= 0`? -> Block
   - Is `BookedCount >= Capacity`? -> Block
   - Increment `BookedCount`
7. **Commit**: Save new `Booking` as `Pending`.
