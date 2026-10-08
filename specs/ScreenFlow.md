# Screen Flow – Salon Queue & Booking App

## Complete Screen Sequence from Installation

---

## 1. Installation & Welcome Screens

### Screen 1: Splash Screen
- **Purpose:** App loading and branding
- **Details:** 
  - Show app logo and name
  - Loading animation
  - Auto-redirect after 2-3 seconds

### Screen 2: Welcome / Onboarding Screen
- **Purpose:** First-time user introduction
- **Details:**
  - Welcome message
  - Brief app description ("No Waiting Experience")
  - "Get Started" button
  - Optional: Skip to role selection

---

## 2. Role Selection

### Screen 3: Choose Your Role
- **Purpose:** User role selection
- **Details:**
  - Two large cards/buttons:
    - **Customer** - "I want to book a salon"
    - **Shopkeeper** - "I own a salon"
  - Icons for each role
  - Brief description under each option
  - Selection redirects to respective signup/login

---

## 3. Customer Flow Screens

### Screen 4: Customer Login/Signup
- **Purpose:** Customer authentication
- **Details:**
  - Phone number input field
  - "Send OTP" button
  - OTP verification screen (4-6 digit code)
  - Auto-resend OTP option
  - After verification: Name input field
  - Location permission request (for nearby salons)
  - "Continue" button

### Screen 5: Customer Home (Nearby Salons)
- **Purpose:** Browse available salons
- **Details:**
  - Search bar (salon name or location)
  - Filter options (distance, rating, services)
  - List of nearby salons with:
    - Salon name
    - Distance
    - Current wait time
    - Rating
    - Services offered
  - Map view toggle
  - Pull to refresh
  - Bottom navigation bar

### Screen 6: Salon Details
- **Purpose:** View salon information
- **Details:**
  - Salon name and image
  - Address with map link
  - Rating and reviews
  - Services list with prices
  - Working hours
  - Current queue status
  - "Book Slot" button
  - "Call Salon" button
  - Back button

### Screen 7: Booking Screen
- **Purpose:** Select service and time slot
- **Details:**
  - Service selection (haircut, shave, etc.)
  - Date picker (today + next 7 days)
  - Available time slots (grid view)
  - Estimated wait time for selected slot
  - Special requests text field (optional)
  - "Confirm Booking" button
  - Price display

### Screen 8: Booking Confirmation
- **Purpose:** Confirm successful booking
- **Details:**
  - Booking confirmation message
  - Booking ID
  - Salon name and address
  - Service booked
  - Date and time
  - Estimated wait time
  - "Add to Calendar" button
  - "View My Bookings" button
  - "Back to Home" button

### Screen 9: My Bookings
- **Purpose:** View customer's booking history
- **Details:**
  - List of all bookings (upcoming and past)
  - Each booking shows:
    - Salon name
    - Service
    - Date and time
    - Status (upcoming/completed/cancelled)
  - Filter tabs (Upcoming / Past / Cancelled)
  - "Cancel Booking" option for upcoming bookings
  - "Re-book" option for past bookings

### Screen 10: Queue Status Screen
- **Purpose:** Real-time queue information
- **Details:**
  - Current queue position
  - Estimated wait time
  - Queue list (online and offline customers)
  - Your position highlighted
  - Live updates (auto-refresh every 30 seconds)
  - "Leave Queue" button
  - Notification indicator

### Screen 11: Customer Profile
- **Purpose:** Manage customer account
- **Details:**
  - Name and phone number
  - Location settings
  - Notification preferences
  - Language preference (English/Hindi)
  - "Edit Profile" button
  - "Logout" button
  - "Delete Account" option

### Screen 12: Notifications
- **Purpose:** View all notifications
- **Details:**
  - List of notifications:
    - Booking confirmations
    - 15-minute reminders
    - Queue updates
    - Promotional messages
  - Mark as read/unread
  - Clear all option
  - Notification settings link

---

## 4. Shopkeeper Flow Screens

### Screen 13: Shopkeeper Login/Signup
- **Purpose:** Shopkeeper authentication and salon registration
- **Details:**
  - Phone number input field
  - "Send OTP" button
  - OTP verification screen
  - **For new signup:**
    - Salon name input
    - Address input with map picker
    - Services selection (checkboxes or multi-select)
    - Working hours (start time, end time)
    - Owner name input
    - "Register Salon" button
  - **For existing login:**
    - Direct to dashboard after OTP

### Screen 14: Shopkeeper Dashboard
- **Purpose:** Main control center for shopkeeper
- **Details:**
  - Salon name and status (open/closed toggle)
  - Today's summary cards:
    - Total bookings
    - Customers served
    - Current queue length
    - Estimated revenue
  - Quick actions:
    - "Add Walk-in" button
    - "View Queue" button
    - "Manage Services" button
  - Today's schedule timeline
  - Bottom navigation bar

### Screen 15: Queue Management
- **Purpose:** View and manage real-time queue
- **Details:**
  - Current queue list with:
    - Customer name
    - Type (online/offline)
    - Service requested
    - Wait time
    - Position number
  - "Next Customer" button (moves to serving)
  - "Add Walk-in" button
  - "Remove Customer" option
  - Queue statistics (online vs offline ratio)
  - Auto-refresh every 10 seconds

### Screen 16: Add Walk-in Customer
- **Purpose:** Add offline customer to queue
- **Details:**
  - Customer name input (optional)
  - Service selection dropdown
  - "Add to Queue" button
  - Shows current position after adding
  - Priority options (regular/priority)
  - "Cancel" button

### Screen 17: Manage Services
- **Purpose:** Add/edit/remove salon services
- **Details:**
  - List of current services with:
    - Service name
    - Price
    - Duration (minutes)
    - Edit/Delete buttons
  - "Add New Service" button
  - Service form:
    - Service name
    - Price input
    - Duration input
    - "Save" button

### Screen 18: Booking Requests
- **Purpose:** View and manage online bookings
- **Details:**
  - List of upcoming bookings:
    - Customer name
    - Service
    - Time slot
    - Status (confirmed/pending)
  - "Accept" button
  - "Reject" button
  - "Reschedule" option
  - Filter by date
  - Calendar view

### Screen 19: Analytics/Reports
- **Purpose:** View business performance
- **Details:**
  - Date range selector
  - Statistics cards:
    - Total customers served
    - Total revenue
    - Average wait time
    - Peak hours
  - Graphs:
    - Daily bookings trend
    - Revenue trend
    - Service popularity
  - Export reports button
  - Filter by service type

### Screen 20: Shopkeeper Profile
- **Purpose:** Manage shopkeeper account and salon settings
- **Details:**
  - Salon name and address
  - Owner name and phone
  - Working hours settings
  - Salon status (open/closed)
  - "Edit Salon Details" button
  - Notification preferences
  - Language preference
  - "Logout" button
  - "Delete Account" option

---

## 5. Common Screens

### Screen 21: Settings
- **Purpose:** App-wide settings
- **Details:**
  - Language selection (English/Hindi)
  - Theme selection (light/dark)
  - Notification settings
  - Location settings
  - About app
  - Terms of service
  - Privacy policy
  - App version

### Screen 22: Error/Network Error
- **Purpose:** Handle connection issues
- **Details:**
  - Error message
  - "Retry" button
  - "Go Offline" option (if applicable)
  - Friendly illustration

### Screen 23: Loading/Processing
- **Purpose:** Show loading state
- **Details:**
  - Spinner animation
  - Loading message
  - Cancel button (for long operations)

---

## 6. Navigation Structure

### Customer Bottom Navigation
- **Home** - Nearby salons
- **My Bookings** - Booking history
- **Queue** - Current queue status
- **Profile** - Account settings

### Shopkeeper Bottom Navigation
- **Dashboard** - Overview and quick actions
- **Queue** - Queue management
- **Bookings** - Online booking requests
- **Analytics** - Reports and statistics
- **Profile** - Salon settings

---

## 7. Screen Flow Summary

### Customer Complete Flow:
```
Splash → Welcome → Role Selection → Customer Login/Signup → 
Customer Home → Salon Details → Booking → Confirmation → 
My Bookings / Queue Status / Profile
```

### Shopkeeper Complete Flow:
```
Splash → Welcome → Role Selection → Shopkeeper Login/Signup → 
Dashboard → Queue Management / Add Walk-in / Bookings / 
Analytics / Profile
```

---

## 8. Key UX Considerations

- **Minimal steps** for customer signup (phone + name only)
- **Detailed onboarding** for shopkeeper (salon details required)
- **Clear role separation** - no confusion between customer and shopkeeper flows
- **Quick access** to frequently used features via bottom navigation
- **Real-time updates** for queue and booking status
- **Offline support** for basic features (future enhancement)
- **Simple, large buttons** for non-tech-savvy shopkeepers
