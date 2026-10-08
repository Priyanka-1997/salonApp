# Architecture – Salon Queue & Booking App

## 1. System Overview

A hybrid **mobile + web application** where:

- Users can **find salons, check wait time, and book slots**
- Salon owners get a **simple dashboard** to manage queue (online + offline)
- System auto-manages queue to avoid conflicts

---

## 2. High-Level Architecture

```
[ Mobile App (React Native) ]
[ Web App (Next.js) ]
           ↓
       API Layer
    (Node.js / Express)
           ↓
   ---------------------
   |   Backend Core    |
   | Queue Engine      |
   | Booking System    |
   | Notification      |
   ---------------------
           ↓
     Database (MongoDB / PostgreSQL)
           ↓
   Cloud Services (Google Cloud / Firebase)
```

---

## 3. Frontend Layer

### Mobile App (Primary)

- **Tech:** React Native
- **Features:**
  - Nearby salon list
  - Slot booking
  - Live queue status
  - Notifications

### Web App (Optional but important)

- **Tech:** Next.js
- **Use cases:**
  - Users who don’t install app
  - Salon admin dashboard

---

## 4. Backend Layer

### API Server

- **Tech:** Node.js + Express
- **Responsibilities:**
  - Authentication (User & Salon)
  - Booking APIs
  - Queue management APIs
  - Salon data

### Core Modules

#### Queue Engine (Main Logic)

- **Handles:**
  - Online bookings
  - Offline walk-ins
  - Priority rules (2 online : 1 offline)
- **Calculates:**
  - Wait time
  - Next available slot

#### Booking System

- Create / Cancel / Reschedule bookings
- Slot allocation logic
- Prevent overbooking

#### Notification System

- **Push notifications:**
  - Booking confirmation
  - 15 min reminder
- **Tech:** Firebase Cloud Messaging (FCM)

---

## 5. Database Design

### Main Tables / Collections

#### Users

- id
- role (customer/shopkeeper)
- name
- phone
- location (for customers)
- created_at
- updated_at

#### Salons

- id
- owner_id (reference to Users table)
- name
- address
- services (array of service objects)
- working_hours
- status (active/inactive)
- created_at
- updated_at

#### Bookings

- id
- user_id
- salon_id
- time_slot
- status (booked/completed/cancelled)

#### Queue

- id
- salon_id
- type (online/offline)
- position
- estimated_time

---

## 6. Cloud & Infrastructure

- **Hosting:** Google Cloud / AWS
- **Database:** MongoDB Atlas / PostgreSQL
- **Notifications:** Firebase
- **CDN:** For fast loading

---

## 7. Authentication

### Role-Based Authentication

The app supports **two distinct roles** with separate authentication flows:

#### 1. Customer Role
- **Signup Flow:**
  - Phone number verification (OTP)
  - Name input
  - Location permission (for nearby salons)
- **Login Flow:**
  - Phone number + OTP
  - Auto-login after first signup

#### 2. Shopkeeper Role
- **Signup Flow:**
  - Phone number verification (OTP)
  - Salon name
  - Address
  - Services offered
  - Working hours
  - Owner name
- **Login Flow:**
  - Phone number + OTP
  - Salon dashboard access

### Authentication Flow

```
[ Welcome Screen ]
       ↓
[ Select Role: Customer | Shopkeeper ]
       ↓
[ Role-Specific Signup/Login ]
       ↓
[ Role-Specific Home Screen ]
```

### Key Points
- **No complex signup needed** for customers (phone + name only)
- **Shopkeeper signup requires salon details** for verification
- **Separate navigation flows** based on role
- **Role stored in user profile** for routing

---

## 7.1 Screen Flows by Role

### Customer Screen Flow

```
[ Welcome Screen ]
       ↓
[ Customer Login/Signup ]
       ↓
[ Customer Home - Nearby Salons ]
       ↓
[ Salon Details Screen ]
       ↓
[ Booking Screen ]
       ↓
[ Booking Confirmation ]
       ↓
[ My Bookings ]
       ↓
[ Queue Status Screen ]
```

### Shopkeeper Screen Flow

```
[ Welcome Screen ]
       ↓
[ Shopkeeper Login/Signup ]
       ↓
[ Shopkeeper Dashboard ]
       ↓
[ Queue Management ]
       ↓
[ Add Walk-in Customer ]
       ↓
[ Manage Services ]
       ↓
[ Booking Requests ]
       ↓
[ Analytics/Reports ]
```

### Navigation Structure

**Customer Navigation:**
- Home (Nearby Salons)
- My Bookings
- Profile
- Notifications

**Shopkeeper Navigation:**
- Dashboard
- Queue
- Bookings
- Services
- Profile

---

## 8. Localization (Important for India)

- Multi-language support:
  - Hindi
  - English
- Voice support (future feature)

---

## 9. MVP Scope (Must Follow)

Start with:

- 1 city
- 5–10 salons
- **Features:**
  - Booking
  - Queue view
  - Notification

---

# Pros & Cons

## Pros (Strengths)

### 1. Solves Real Problem

- Waiting in salon is common issue
- High demand in local areas

### 2. Easy to Understand App

- Simple concept → easy adoption
- Even non-tech users can use

### 3. Scalable Business

- Can expand to:
  - Beauty salons
  - Clinics
  - Car service

### 4. Low Competition (Specific Niche)

- Big apps exist, but not focused on:
  - Local queue management

### 5. Recurring Usage

- People visit salon every month → high retention possible

---

## Cons (Challenges)

### 1. Salon Owner Adoption (Biggest Problem)

- Small shop owners:
  - Don’t like apps
  - Not tech-friendly

**Mitigation:** Make it **very simple (1–2 button system)**

### 2. Online vs Offline Conflict

- Walk-in customers may get angry
- Shopkeeper may ignore app

**Mitigation:** Implement a **smart queue system**

### 3. Accuracy Issue

- If barber is slow/fast → timing mismatch

**Mitigation:** Dynamic time adjustment

### 4. Network Dependency

- Small areas may have poor internet

### 5. Initial Growth Problem

- No salons → no users
- No users → no salons

**Mitigation:** Onboard salons manually first

### 6. Trust Factor

- Users may not trust: “Will my slot really work?”

**Mitigation:** Strong UX + notifications

---

## Final Honest Opinion

The idea is **good but execution is everything**. If you:

- Keep UI simple
- Solve queue problem properly
- Focus on local market

…you have a credible path to adoption; validate with a small pilot before scaling features or geography.
