# Book My Salon — Shopkeeper V1

## 1. Product Goal

Allow salon owners to:

- Register their salon
- Add salon information
- Add salon images
- Add services
- Configure opening hours
- See online bookings
- Add walk-in customers
- Manage the queue
- Start/complete services
- See today's customers
- Control salon availability

---

# 2. Shopkeeper Flow

Shopkeeper Entry
↓
Register/Login
↓
Owner Verification
↓
Create Salon
↓
Salon Details
↓
Add Services
↓
Set Opening Hours
↓
Salon Dashboard
↓
Manage Bookings
↓
Manage Queue
↓
Add Walk-ins

---

# 3. Shopkeeper Registration

## Owner Details

Fields:

- Owner name
- Mobile number
- Email

Authentication:

Mobile
↓
OTP
↓
Account created

---

# 4. Create Salon

After registration:

Fields:

- Salon name
- Salon phone
- Salon type
- Address
- Area
- City
- Latitude
- Longitude

CTA:

`Continue`

---

# 5. Salon Images

Shopkeeper can upload:

- Cover image
- Interior image
- Additional images

V1:

- 1 cover image
- Up to 5 gallery images

---

# 6. Services

Shopkeeper can add:

- Service name
- Price
- Duration
- Active/inactive

Example:

Haircut
₹150
30 min

Beard
₹80
15 min

Facial
₹300
30 min

Actions:

- Add
- Edit
- Delete
- Enable/Disable

---

# 7. Opening Hours

Configure each day:

Monday
10:00 AM - 10:00 PM

Tuesday
10:00 AM - 10:00 PM

etc.

Options:

- Open
- Closed

Also support:

- Temporary closed
- Holiday

---

# 8. Shopkeeper Dashboard

Show:

Salon name

Open/Closed status

Today's summary:

- Total bookings
- Online bookings
- Walk-ins
- Completed
- Waiting

Example:

Today's Bookings: 12

Online: 8
Walk-in: 4

Current Customer:
#2

Next:
#3

---

# 9. Online Bookings

Show today's online customers.

Example:

#1 Rahul
10:30 AM
Haircut

#2 Amit
11:00 AM
Haircut + Beard

Each booking shows:

- Customer
- Time
- Services
- Queue number
- Status

---

# 10. Walk-In Customers

Shopkeeper can add customers who arrive physically.

Fields:

- Customer name
- Mobile (optional)
- Service
- Estimated duration

CTA:

`Add to Queue`

The system assigns a queue position.

---

# 11. Queue Management

Main queue:

Current:

#2 Amit
Haircut

Actions:

`Start Service`

After service:

`Complete Service`

Other actions:

- No Show
- Cancel
- Skip

Next customer automatically moves forward.

---

# 12. Online + Walk-In Queue

The queue engine must support:

- Online bookings
- Walk-ins

V1 default policy:

2 online customers
↓
1 walk-in
↓
2 online customers
↓
1 walk-in

This policy must eventually be configurable.

The shopkeeper should NOT manually reorder every customer.

The system generates the queue.

---

# 13. Queue States

Booking/customer states:

- Waiting
- Called
- Serving
- Completed
- No Show
- Cancelled

---

# 14. Estimated Wait Time

Calculate based on:

- Current queue
- Service duration
- Current service
- Salon capacity
- Queue policy

Example:

3 customers ahead
Average service = 20 min

Estimated wait:
~60 min

This should be calculated dynamically.

---

# 15. Customer Notifications

When queue changes:

Customer receives update.

Examples:

"Your queue position is now #2."

"You're almost next."

"Your turn is coming up."

---

# 16. Shopkeeper Notifications

Shopkeeper receives:

- New booking
- Booking cancellation
- Customer arrival
- Queue changes

---

# 17. Salon Open/Closed

Shopkeeper can:

- Open salon
- Close salon
- Temporarily pause bookings

If closed:

Customer sees:

`Currently Closed`

If booking is paused:

`Bookings Temporarily Unavailable`

---

# 18. Salon Profile Management

Shopkeeper can edit:

- Salon name
- Address
- Phone
- Images
- Services
- Opening hours
- Description

---

# 19. Shopkeeper Navigation

Dashboard
Queue
Bookings
Salon
Profile

---

# 20. Shopkeeper Dashboard Sections

Dashboard:

- Current customer
- Next customer
- Queue count
- Today's bookings
- Walk-ins
- Online bookings
- Completed customers

---

# 21. Shopkeeper Queue Screen

Example:

CURRENT

#2 Amit
Haircut

[ Start Service ]

NEXT

#3 Rahul
Haircut + Beard

WAITING

#4 Walk-in
Beard

#5 Online
Haircut

---

# 22. Shopkeeper Data

Owner:

- id
- name
- mobile
- email

Salon:

- id
- ownerId
- name
- phone
- address
- latitude
- longitude
- images
- openingHours
- status

Service:

- id
- salonId
- name
- price
- duration
- active

Booking:

- id
- salonId
- customerId
- services
- date
- slot
- queueNumber
- type
- status

Queue:

- id
- salonId
- bookingId
- customerId
- type
- position
- status
- estimatedWait

---

# 23. Shopkeeper V1 NOT Included

Do not implement yet:

- Staff management
- Multiple branches
- Advanced analytics
- Revenue dashboard
- Subscription
- Online payment
- Payroll
- Inventory
- Customer CRM
- Marketing campaigns
- Coupons
- Loyalty program
- Advanced reports