# Product roadmap & features – Salon Queue & Booking App

## 1. Product Vision

Build a **simple, local-friendly app** where:

- Users **don’t wait in salons**
- Salons **don’t manage chaos manually**
- Queue is handled **automatically by system**

**Focus:** **“No Waiting Experience”**

---

## 2. Target Users

### Users (Customers)

- Boys/men visiting salon frequently
- Don't want to wait 30–60 mins
- Need simple, quick booking

### Salon Owners (Shopkeepers)

- Small/local shops
- Not tech-savvy
- Want easy system (no complexity)
- Need simple dashboard to manage queue

---

## 3. Core Idea Breakdown

### Problem

- Long waiting time
- No queue system
- Unfair priority (who came first confusion)

### Solution

- Real-time queue
- Slot booking
- Auto queue management (online + offline)

---

## 4. Feature List (Clear & Structured)

### Customer Features

#### Essential (MVP)

- Nearby salon list
- Live waiting time
- Book slot
- 15 min reminder notification
- Cancel booking

#### Advanced (Later)

- Ratings & reviews
- Online payment
- Booking history
- Voice booking (Hindi)

### Salon Owner Features

#### Essential (MVP)

- Simple dashboard
- Add walk-in customer (1 click)
- View queue
- Mark next customer

#### Advanced (Later)

- Analytics (daily earnings)
- Multiple barber support
- Schedule management

---

## 5. Smart Queue Logic (Very Important)

### Rule System (MVP)

**Option A (Recommended):** 2 Online → 1 Offline

### Queue Example

```
1. Online (10:00)
2. Online (10:15)
3. Offline
4. Online (10:30)
```

### Future Improvement

- Dynamic adjustment based on rush
- AI-based prediction

---

## 6. Step-by-Step Implementation Plan

### Phase 1: Planning (2–3 Days)

- Finalize app name
- Define features (this doc)
- Create basic UI wireframes

### Phase 2: Design (3–5 Days)

- Design screens:
  - Welcome screen (role selection)
  - Customer screens:
    - Customer login/signup
    - Home (salon list)
    - Salon details
    - Booking screen
    - My bookings
    - Queue status
  - Shopkeeper screens:
    - Shopkeeper login/signup
    - Dashboard
    - Queue management
    - Add walk-in
    - Manage services
    - Booking requests
    - Analytics

### Phase 3: Backend Setup (5–7 Days)

- Setup Node.js server
- Create APIs:
  - Auth (OTP login)
  - Role-based authentication
  - Customer signup/login
  - Shopkeeper signup/login
  - Salon list
  - Booking
  - Queue

### Phase 4: Frontend Development (7–10 Days)

**Mobile App (React Native)**

- Welcome screen (role selection)
- Customer login/signup screens
- Shopkeeper login/signup screens
- Customer home (salon list)
- Shopkeeper dashboard
- Booking flow
- Notification setup

**Web (Next.js)**

- Shopkeeper dashboard
- Basic user access

### Phase 5: Queue Engine (Core Logic) (5 Days)

- Implement:
  - Queue ordering
  - Online/offline balance
  - Wait time calculation

### Phase 6: Notifications (2–3 Days)

- Firebase integration
- Reminder system (15 min before)

### Phase 7: Testing (5 Days)

- Real scenario testing:
  - 5 users booking same time
  - Walk-in conflicts
  - Delay handling

### Phase 8: Launch MVP (3 Days)

- Onboard 5–10 salons manually
- Launch in 1 area

---

## 7. Real-Life Flow (User Journey)

### Customer Authentication & Onboarding Flow

1. Open app
2. **Select role: Customer**
3. Enter phone number
4. Verify OTP
5. Enter name
6. Grant location permission
7. **Redirect to Customer Home**

### Customer Booking Flow

1. View nearby salons
2. Select salon
3. See wait time
4. Book slot
5. Get reminder
6. Visit → haircut

### Shopkeeper Authentication & Onboarding Flow

1. Open app
2. **Select role: Shopkeeper**
3. Enter phone number
4. Verify OTP
5. Enter salon details:
   - Salon name
   - Address
   - Services offered
   - Working hours
   - Owner name
6. **Redirect to Shopkeeper Dashboard**

### Shopkeeper Daily Flow

1. Open dashboard
2. See queue
3. Add walk-in
4. Serve next customer
5. Manage bookings
6. View analytics

---

## 8. Critical Risks & Fix

### Risk: Salon ignores app

**Fix:**

- Make UI super simple
- Train salon manually

### Risk: Wrong timing

**Fix:**

- Dynamic wait time calculation

### Risk: No users initially

**Fix:**

- Start hyperlocal (one market only)

---

## 9. Success Metrics

- Avg waiting time reduced
- Daily bookings per salon
- Repeat users
- Salon retention

---

## 10. Future Expansion

- Beauty salons
- Clinics
- Temple queue system
- Government offices
