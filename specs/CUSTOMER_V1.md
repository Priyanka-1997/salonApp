# Book My Salon — Customer V1

## 1. Product Goal

Allow customers to:

- Explore nearby salons without login
- View salon details
- Check services
- Check current queue/wait time
- Select a service
- Select an available slot
- Login/register only when booking
- Verify mobile with OTP
- Receive booking confirmation
- Track queue status
- Receive reminder before their turn
- Manage their bookings

---

# 2. Customer App Flow

Splash
↓
Home
↓
Location
↓
Nearby Salons
↓
Salon Details
↓
Select Service
↓
Select Date/Time
↓
Confirm Booking
↓
Login/Register
↓
OTP
↓
Booking Confirmation
↓
Queue Status
↓
15-Minute Reminder

---

# 3. App Entry

## Splash Screen

Show:

- Book My Salon logo
- Tagline
- Loading indicator

### Important

Do NOT force login/signup.

Flow:

Splash → Home

---

# 4. Home

## Header

- Current location
- Location selector
- Notification icon

Example:

📍 Greater Noida

## Search

User can search:

- Salon name
- Area
- Sector
- Service

## Categories

- Haircut
- Beard
- Facial
- Hair Color

## Filters

- Nearest
- Lowest Wait
- Top Rated
- Open Now

## Nearby Salon Cards

Each card shows:

- Salon image
- Salon name
- Rating
- Address/area
- Distance
- Open/closed
- Current queue
- Estimated wait time
- View Salon / Book Slot

---

# 5. Location

## First Visit

Ask for location permission.

If allowed:

GPS
↓
Latitude/Longitude
↓
Nearby salons

If denied:

Allow manual location selection.

Example:

- Greater Noida
- Noida
- Delhi

## Distance

Distance must eventually be calculated from:

Customer coordinates
+
Salon coordinates

Do not permanently store calculated distance.

---

# 6. Salon Details

Show:

- Cover image
- Salon name
- Rating
- Address
- Distance
- Open/closed status
- Call button
- Directions
- Current queue
- Estimated waiting time
- Opening hours
- About
- Services
- Gallery

CTA:

`Book Slot`

---

# 7. Services

Show salon-specific services.

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

Customer can select one or multiple services if supported.

Show:

- Selected services
- Total price
- Estimated duration

CTA:

`Continue`

---

# 8. Time Slot

Show:

- Selected salon
- Selected services
- Date
- Available slots

Example:

10:00 AM
10:30 AM
11:00 AM
11:30 AM

Unavailable slots must be disabled.

CTA:

`Confirm Slot`

---

# 9. Authentication

Authentication is required only when customer wants to complete a booking.

## Login

Fields:

- Mobile number

CTA:

`Continue`

Then:

Mobile
↓
OTP
↓
Login

## Register

Fields:

- Full name
- Mobile number
- Email (optional)

Then:

Register
↓
OTP
↓
Create account

No password for V1.

---

# 10. OTP

Show:

- Phone number
- 6-digit OTP
- Resend timer
- Change number
- Verify button

Production requirement:

OTP must be verified by backend.

---

# 11. Booking Confirmation

Show:

- Success status
- Salon
- Date
- Time
- Services
- Total amount
- Queue number
- Estimated waiting time

Example:

Booking Confirmed

Modern Cut Salon

Today
4:30 PM

Haircut + Beard

Queue #3

Estimated wait: 15 min

CTA:

`View Booking`

Secondary:

`Back Home`

---

# 12. My Bookings

Tabs:

- Upcoming
- Past
- Cancelled

Booking card:

- Salon
- Date
- Time
- Services
- Queue number
- Estimated wait
- Booking status

Actions:

- View
- Cancel

---

# 13. Live Queue

Show:

Current position

Example:

Your Queue

#3

Currently serving:
#1

Ahead of you:
2 people

Estimated wait:
15 minutes

Update automatically when queue changes.

---

# 14. Queue Status

Possible states:

- Waiting
- Almost Your Turn
- Your Turn
- Serving
- Completed
- Cancelled
- No Show

---

# 15. Reminder

15 minutes before estimated turn:

"Your salon turn is coming up."

Show:

- Salon
- Estimated turn
- Current queue
- Address

---

# 16. Favorites

Customer can:

- Add salon to favorites
- Remove salon
- View favorite salons

V1 can use local storage initially.

---

# 17. Profile

Show:

- Name
- Mobile
- Email

Menu:

- My Bookings
- Favorites
- Notifications
- Language
- Dark Mode
- Help & Support
- About
- Logout

---

# 18. Customer Bottom Navigation

Home
Bookings
Favorites
Profile

---

# 19. Customer V1 Data

Customer:

- id
- name
- mobile
- email
- favorites

Salon:

- id
- name
- address
- latitude
- longitude
- phone
- images
- rating
- services
- opening hours
- current queue
- estimated wait
- status

Booking:

- id
- customerId
- salonId
- services
- date
- slot
- queueNumber
- estimatedWait
- status

---

# 20. Customer V1 NOT Included

Do not implement yet:

- Online payment
- Membership
- Coupons
- Referral
- Loyalty points
- Chat
- AI recommendations
- Advanced reviews
- Subscription
- Multiple branches
- Advanced staff selection