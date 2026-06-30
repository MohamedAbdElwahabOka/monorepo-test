# ريحلة RIHLA

## Software Requirements Specification

### Egypt Travel & Discovery Application

#### Initial Launch: Hurghada (الغردقة), Red Sea Governorate

| Field          | Value                              |
| -------------- | ---------------------------------- |
| Version        | 1.2                                |
| Date           | June 2026                          |
| Status         | Under Dev                          |
| Platform       | Android (minSdk 24 / targetSdk 34) |
| Document Owner | Product Team — Rihla               |

---

## Table of Contents

1. [Introduction](#1-introduction)
   - 1.1 [Purpose](#11-purpose)
   - 1.2 [Product Scope](#12-product-scope)
   - 1.3 [Definitions & Acronyms](#13-definitions--acronyms)
   - 1.4 [Constraints](#14-constraints)
2. [Overall Description](#2-overall-description)
   - 2.1 [Product Perspective](#21-product-perspective)
   - 2.2 [Product Functions](#22-product-functions)
   - 2.3 [Operating Environment](#23-operating-environment)
3. [User Classes & Characteristics](#3-user-classes--characteristics)
4. [Functional Requirements](#4-functional-requirements)
   - 4.1 [Authentication & Onboarding](#41-authentication--onboarding)
   - 4.2 [Home & Discovery](#42-home--discovery)
   - 4.3 [Experience Detail](#43-experience-detail)
   - 4.4 [Booking Flow](#44-booking-flow)
   - 4.5 [Booking Confirmation & Tickets](#45-booking-confirmation--tickets)
   - 4.6 [Explore & Search](#46-explore--search)
   - 4.7 [User Profile & Loyalty](#47-user-profile--loyalty)
   - 4.8 [Subscription Plans](#48-subscription-plans)
   - 4.9 [Payment System](#49-payment-system)
   - 4.10 [Vendor Dashboard](#410-vendor-dashboard)
   - 4.11 [Notifications](#411-notifications)
5. [Non-Functional Requirements](#5-non-functional-requirements)
   - 5.1 [Performance](#51-performance)
   - 5.2 [Scalability](#52-scalability)
   - 5.3 [Security](#53-security)
   - 5.4 [Reliability & Availability](#54-reliability--availability)
   - 5.5 [Usability](#55-usability)
   - 5.6 [Localization](#56-localization)
6. [External Interface Requirements](#6-external-interface-requirements)
7. [Data Models](#7-data-models)
8. [Business Rules](#8-business-rules)
9. [Appendix — Screens Inventory](#9-appendix--screens-inventory)

---

## 1. Introduction

### 1.1 Purpose

This document specifies the complete software requirements for **ريحلة Rihla**, a bilingual (Arabic / English) mobile application that aggregates travel experiences, restaurants, and local activities in Egypt, launching first in Hurghada. It serves as the definitive reference for design, development, QA, and stakeholder alignment.

### 1.2 Product Scope

Rihla is a consumer marketplace comparable to GetYourGuide and Dianping, adapted for the Egyptian context. It enables:

- Tourists and locals to discover, browse, and book experiences, tours, and restaurants.
- Vendors (tour operators, restaurants, activity providers) to list products and verify bookings for free.
- Subscription-based trip discount access for travelers.

### 1.3 Definitions & Acronyms

| Term                       | Definition                                                                                                                        |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Experience                 | Any bookable activity: diving, desert safari, boat tour, restaurant visit, etc.                                                   |
| Vendor                     | Business owner who lists experiences on the platform                                                                              |
| Guest                      | Unauthenticated visitor browsing the app                                                                                          |
| Traveler                   | Registered customer account                                                                                                       |
| OTP                        | One-Time Password — 6-digit code sent for phone verification                                                                      |
| WhatsApp Business API      | Meta's official API for sending transactional messages (OTPs, notifications)                                                      |
| EGP                        | Egyptian Pound — primary local currency                                                                                           |
| USD                        | US Dollar — displayed alongside EGP for international tourists                                                                    |
| POC                        | Proof of Concept — the current single-file HTML prototype                                                                         |
| APK                        | Android Package file — the distributable Android app binary                                                                       |
| FR                         | Functional Requirement                                                                                                            |
| NFR                        | Non-Functional Requirement                                                                                                        |
| BR                         | Business Rule                                                                                                                     |
| DXA                        | Document XML Attribute unit (1440 DXA = 1 inch)                                                                                   |
| Ticket Verification Number | Unique 8-digit number generated on booking, entered into the vendor's dashboard to verify the reservation and apply the discount. |
| Initial Booking            | The temporary state of a booking after creation, before vendor verification.                                                      |
| Confirmed Booking          | The final state of a booking after the vendor verifies the ticket number in their dashboard.                                      |
| Rihla Subscription         | A traveler-paid access plan that unlocks dynamic, vendor-specific discounts.                                                      |

### 1.4 Constraints

- Launch city: Hurghada, Egypt only (v1.0). City expansion in v1.1.
- Platform: Android first (minSdk 24, targetSdk 34); iOS to follow in v1.1.
- Language: Bilingual Arabic (RTL) + English; UI switches per device locale.
- Payment processors must support Egypt (EGP) and international cards for traveler subscriptions.
- All content must comply with Egyptian law and tourism regulations.

---

## 2. Overall Description

### 2.1 Product Perspective

Rihla is a standalone mobile application backed by a cloud API. It is not a plugin or extension of any existing system. The POC (`rihla-hurghada.html`) demonstrates the complete UI flow and serves as the visual specification.

### 2.2 Product Functions — High Level

- Browse & search experiences by category, price, rating, and availability.
- View detailed experience pages with photos, itineraries, reviews, original pricing, and promotional discount prompts.
- Complete a 3-step booking flow (trip details/date/time/guests → contact details with backup phone → booking confirmation with ticket verification number).
- Receive digital tickets showing booking details, location, and a unique ticket verification number. (Payment is made directly to the vendor on arrival).
- Subscribe to traveler subscriptions (fixed durations or custom days) for dynamic, vendor-specific discounts.
- Pay for traveler subscriptions via credit/debit card through PayMob or Stripe payment gateways.
- Vendors manage unlimited listings for free, view analytics, and verify traveler bookings using ticket verification numbers via a dedicated dashboard.

### 2.3 Operating Environment

| Layer                 | Technology / Platform                                               |
| --------------------- | ------------------------------------------------------------------- |
| Client — Mobile       | Android 7.0+ (API 24); future iOS 15+                               |
| Backend               | RESTful API (NestJS — TypeScript)                                   |
| Hosting               | AWS / GCP — Middle East region                                      |
| Database              | PostgreSQL (relational); Redis (sessions / cache)                   |
| Media                 | Images served via Cloudflare CDN; Unsplash API for dev placeholders |
| Primary Payment       | PayMob (Egypt gateway for traveler subscriptions)                   |
| International Payment | Stripe (non-Egyptian-issued cards for traveler subscriptions)       |
| Messaging             | WhatsApp Business API (primary); Twilio/SMS (fallback)              |

---

## 3. User Classes & Characteristics

| User Class     | Description                                                                       | Key Capabilities                                                                                                                                                         |
| -------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Guest          | Unauthenticated visitor browsing the app.                                         | View listings, read reviews, see prices. Cannot book or save favorites; prompted to register on booking intent.                                                          |
| Traveler       | Primary end user. Domestic Egyptian tourists, expats, and international visitors. | Book experiences, view history, save favorites, write reviews. Has loyalty tier. May purchase Rihla Subscriptions for trip discounts.                                    |
| Vendor         | Tour operators, diving centres, restaurants, activity providers.                  | Manage listings, pricing, availability, and media for free. Access analytics dashboard and verify bookings.                                                              |
| Platform Admin | Internal Rihla team.                                                              | Content moderation, vendor onboarding, fraud management, subscription configuration, and vendor discount setup via separate web admin panel (out of scope for this SRS). |

### 3.1 Loyalty Tiers (Traveler)

| Tier      | Arabic | Min. Bookings | Benefit                                                                                      |
| --------- | ------ | ------------- | -------------------------------------------------------------------------------------------- |
| Explorer  | مستكشف | 0             | Standard pricing (or standard subscription discount if subscribed)                           |
| Navigator | ملاح   | 3             | Additional 5% discount (stacks on top of subscription discount)                              |
| Captain   | ربان   | 10            | Additional 10% discount (stacks on top of subscription discount) + priority customer support |

---

## 4. Functional Requirements

> **Requirement Format:** Each functional requirement is identified by a unique ID (FR-NNN) and states what the system shall do. Requirements are grouped by feature area.

### 4.1 Authentication & Onboarding

#### 4.1.1 Splash Screen

- **FR-001:** Display the ريحلة brand logo, tagline, and a hero image of Hurghada on app launch.
- **FR-002:** Show two CTAs: "Get Started / ابدأ" (new user) and "Sign In / تسجيل الدخول" (returning user).
- **FR-003:** Auto-advance to Home after 3 seconds if the user is already authenticated (valid session token).

#### 4.1.2 Registration

- **FR-004:** Collect: phone number (Egypt +20 or international format) and full name (mandatory). Email is not required for registration.
- **FR-005:** Send a 6-digit OTP to the user's phone number via WhatsApp Business API. If the OTP is not received after a configurable timeout (duration TBD), resend the same OTP via SMS as a fallback channel.
- **FR-006:** On first login, ask user type: "I'm a Traveler" or "I'm a Vendor."

#### 4.1.3 Login

- **FR-007:** Support login via phone number + OTP only. OTP is sent first via WhatsApp; if not received after the configurable timeout, the same OTP is resent via SMS.
- **FR-008:** Maintain session with JWT (7-day expiry); refresh token valid 30 days.
- **FR-009:** Biometric login (fingerprint / Face ID) available after first successful login.

### 4.2 Home & Discovery

#### 4.2.1 Header & Personalization

- **FR-010:** Display greeting in Arabic and English (صباح الخير / Good morning) based on time of day.
- **FR-011:** Show user's first name, current city, and live weather snippet (temp, sea visibility, wind).
- **FR-012:** Notification bell icon with badge count for unread alerts.

#### 4.2.2 Search Bar

- **FR-013:** Tapping the search bar navigates to the full Explore / Search screen (§4.6).
- **FR-014:** Show recent searches (last 5) and trending searches on the search screen.

#### 4.2.3 Category Filters

- **FR-015:** Horizontal scroll row of category tiles with real photo thumbnails and bilingual labels.
- **FR-016:** Categories for v1.0: Diving (غطس), Desert Safari (صحراء), Snorkeling (شنوركل), Boat Tours (رحلات), Seafood (مأكولات بحرية), Giftun Islands (جزر), Quad Biking, Spa & Wellness, Nightlife, Cultural.
- **FR-017:** Tapping a category filters the Featured and Popular sections below.
- **FR-018:** Selected category highlighted with gold outline; deselecting returns to "All."

#### 4.2.4 Featured / Top Picks Carousel

- **FR-019:** Horizontal scroll of 270×175 px feature cards with full-bleed image, gradient overlay, category badge, title, chips (duration, rating, price), and a "BESTSELLER" / "NEW" / "DEAL" badge where applicable.
- **FR-020:** Cards link to the Experience Detail screen.

#### 4.2.5 Popular Experiences

- **FR-021:** Horizontal scroll of smaller (180×125 px) experience cards with image, rating badge, favorite heart icon, title, rating, reviews count, duration, and price in EGP.
- **FR-022:** Heart toggle saves/unsaves to the user's Favorites list (requires authentication).

#### 4.2.6 Top Restaurants

- **FR-023:** Same card format as Popular Experiences, with additional badges: HALAL, VEGETARIAN, OPEN NOW.
- **FR-024:** Restaurant cards link to the Experience Detail screen (restaurant variant).

#### 4.2.7 Bottom Navigation

- **FR-025:** Fixed bottom nav bar with 4 tabs: Home, Explore, Bookings, Profile.
- **FR-026:** Active tab highlighted in sea-blue (`#0077B6`).

### 4.3 Experience Detail

#### 4.3.1 Hero Gallery

- **FR-027:** Full-width hero image (320 px tall) with back, favorite, and share buttons.
- **FR-028:** Thumbnail strip below the hero allows switching the main image (interactive photo gallery).
- **FR-029:** Dot indicators show current photo position.

#### 4.3.2 Core Info

- **FR-030:** Display: category tag, title (English), Arabic subtitle, star rating, review count, and status badges (Bestseller, Free Cancellation, etc.).
- **FR-031:** Info pills for: duration, language(s), hotel pickup availability, difficulty, and inclusions summary.

#### 4.3.3 Body Sections

- **FR-032:** "About" with truncated text and "Read more ›" expansion toggle.
- **FR-033:** "What's Included" checklist (✅ included / ❌ excluded items).
- **FR-034:** "Itinerary" — numbered timeline with time and description per stop.
- **FR-035:** "Reviews" section with aggregate score, star breakdown bars, and individual review cards (name, flag emoji, stars, text, date).

#### 4.3.4 Sticky Booking Bar

- **FR-036:** Fixed bottom bar showing price in the preferred currency (EGP or USD) based on user settings. For active subscribers, the original price is shown with a strikethrough, and the discounted price (applying the vendor-specific discount set by admin) is shown next to it. For non-subscribers, the original price is shown with a dynamic promotional prompt below: "Get a [X]% discount if you subscribe to a Rihla Subscription." (The discount percentage [X] is dynamic and varies per vendor).
- **FR-037:** Price updates dynamically if the user changes guest count or subscription state on the detail screen.

### 4.4 Booking Flow

> The booking flow is a 3-step wizard: **(1) Date, Time & Guests → (2) Contact Details & Backup Phone → (3) Booking Confirmation & Ticket.**

#### 4.4.1 Step 1 — Date, Time & Guests

- **FR-038:** Interactive calendar widget. Past dates disabled. Today highlighted. Selected date shown in sea-blue fill.
- **FR-039:** Navigate months with ‹ › buttons; calendar generates correct day-of-week layout per month.
- **FR-040:** Time slot grid (2-column): each slot shows time and remaining availability ("3 spots left" / "Sold out").
- **FR-041:** Sold-out slots shown greyed and non-tappable.
- **FR-042:** Guest count selector for Adults (18+) and Children (4–17) with +/− buttons. Minimum 1 adult. Maximum 12 pax total.
- **FR-043:** "Continue" button validates that a date AND time slot are selected before advancing.

#### 4.4.2 Step 2 — Contact Details

- **FR-044:** Pre-fill fields from the user's saved profile: full name, phone.
- **FR-045:** Collect: Full Name (mandatory), Primary Phone (mandatory), Backup Phone (optional input field), Hotel Name (free text, Hurghada-focused, optional), Special Requests (textarea, optional). Email is optional.
- **FR-046:** Full Name and Primary Phone are required; Email, Backup Phone, Hotel Name, and Special Requests are optional. Inline validation on blur event.

#### 4.4.3 Step 3 — Booking Confirmation & Ticket

- **FR-047:** Order Summary card: line items (Adults × N, Children × N with 50% child discount), subscription discount applied (if applicable), and final estimated price to pay the vendor (in EGP and USD).
- **FR-048:** Display a clear statement: "No payment is processed through Rihla. Total price is due directly to the vendor in cash or via their payment system upon arrival."
- **FR-049:** Display the ticket verification number and detailed booking summary on screen.
- **FR-050:** "Confirm Booking / تأكيد الحجز" triggers booking submission, creating a booking record with "Initial" status, and displays the confirmation ticket.

### 4.5 Booking Confirmation & Tickets

- **FR-051:** Animated confirmation icon (pulsing ✅) with "Booking Submitted! تم تقديم الحجز" heading.
- **FR-052:** Booking reference code (e.g., `RHL-2025-09847`) and unique 8-digit Ticket Verification Number (e.g., `5849-3021`) displayed prominently.
- **FR-053:** Digital ticket card showing: experience name, date, time, guest count, ticket verification number, location, and the statement: "Payment due directly to vendor upon arrival." The initial booking status is displayed as "Initial".
- **FR-054:** Action buttons: "Download Ticket" (PDF), "Share via WhatsApp", "Add to Calendar", "Book Another Experience".
- **FR-055:** Booking confirmation sent automatically via WhatsApp to the user's registered phone number with ticket details, verification number, location, and payment due notice. If the user has a registered email address, a confirmation email with ticket details is also sent.
- **FR-056:** Vendor receives push notification + email alert for every new booking with traveler details, backup phone, and ticket verification number.

### 4.6 Explore & Search

- **FR-057:** Full-screen search page with text input, filter chip row, and results list.
- **FR-058:** Text search queries experience titles, Arabic names, categories, and vendor names. Minimum 2 characters to trigger.
- **FR-059:** Filter chips: All, Diving, Desert, Snorkel, Restaurants, Boat Tours, Wellness, Cultural. Multiple selection supported.
- **FR-060:** Results displayed as list cards (100×100 px image, title, Arabic name, duration, rating, review count, original price in EGP, and crossed-out discounted price if traveler has an active subscription).
- **FR-061:** Sort options: Relevance, Top Rated, Price: Low–High, Price: High–Low, Newest.
- **FR-062:** Price range slider filter (EGP 0 – EGP 10,000).
- **FR-063:** Empty state if no results: "No experiences found / لا توجد نتائج" with suggestions.
- **FR-064:** Search results show count: "34 experiences in Hurghada."

### 4.7 User Profile & Loyalty

#### 4.7.1 Profile Header

- **FR-065:** Avatar (upload from gallery or camera), display name, Arabic name field, loyalty tier badge.
- **FR-066:** Stats row: Total Trips, Reviews Written, Active Subscription status (duration and days remaining).

#### 4.7.2 Account Settings

- **FR-067:** Edit profile (name, phone, profile photo, optional email address).
- **FR-068:** Language preference: Arabic / English.
- **FR-068b:** Currency preference: EGP / USD (determines default display currency across the app).
- **FR-069:** Notification preferences (push, WhatsApp, SMS toggles per category; email toggle available if email is on file).
- **FR-070:** Saved payment methods (tokenized cards only, for traveler subscriptions — no raw data stored).
- **FR-071:** My Favorites list (saved experiences and restaurants).
- **FR-072:** My Bookings history: upcoming and past, with status badges (Initial / Confirmed / Cancelled / Completed).

#### 4.7.3 Loyalty Programme

- **FR-073:** Tier progress bar showing number of bookings required to reach the next tier.
- **FR-074:** Tier badge displayed on profile header and next to username in reviews.

### 4.8 Subscription Plans

#### 4.8.1 Consumer Subscriptions

Rihla Subscriptions are access plans purchased by travelers to unlock vendor-specific discounts. Subscriptions can be purchased for fixed levels (1 week, 2 weeks, 1 month, 3 months) or for a customized number of days. Pricing is generated dynamically via the admin dashboard. The table below displays illustrative example prices:

| Duration         | Example Price (EGP) | Notes                            |
| ---------------- | ------------------- | -------------------------------- |
| 1 Week           | EGP 79              | Illustrative; set by admin       |
| 2 Weeks          | EGP 139             | Illustrative; set by admin       |
| 1 Month          | EGP 249             | Illustrative; set by admin       |
| 3 Months         | EGP 599             | Illustrative; set by admin       |
| Custom (per day) | EGP 15/day          | Illustrative; calculated per day |

- **FR-075:** Rihla Subscriptions allow selection of fixed levels (1 week, 2 weeks, 1 month, 3 months) or customized days (e.g., 5 days, 12 days, etc.). Pricing is configured on the admin dashboard.
- **FR-076:** Subscription benefits: Access to vendor-specific discounts (e.g. 5%, 10%, 15% off) on all bookings made during the subscription period. Discounts stack with the traveler's loyalty tier discounts.
- **FR-077:** Subscription prompt displayed on Home, Experience Detail, and Profile screens with a "Subscribe" CTA for non-subscribed users.
- **FR-078:** Active subscribers see a "Subscriber" status badge on their profile and next to their name in reviews.
- **FR-079:** Subscription management: cancel subscription, view days remaining.

#### 4.8.2 Free Vendor Model

- **FR-080:** Vendors can register and use the platform completely free of charge. No subscription fees or listing fees are charged to vendors.
- **FR-081:** All vendors have access to unlimited experience listings.
- **FR-082:** In exchange for listing on the platform, vendors offer a discount to Rihla subscribers. The discount percentage is determined by the vendor in agreement with the admin and configured via the admin dashboard.

#### 4.8.3 Subscription Billing

- **FR-083:** Subscriptions billed via PayMob card/wallet payment or Stripe subscriptions/charges for international cards.
- **FR-084:** For fixed recurring plans, billing occurs automatically. For temporary trip subscriptions (e.g., 1 week, custom days), billing is a one-time charge with no auto-renewal.
- **FR-085:** Failed recurring payments: plan downgrades to standard free tier after a 3-day grace period.
- **FR-086:** Refund policy: Subscription refunds are not handled automatically; users must contact customer service for refund processing.
- **FR-087:** Subscription status visible in Profile → "My Subscription" showing duration, active status, days remaining, and customer service contact details.

### 4.9 Payment System

#### 4.9.1 Architecture

- **FR-088:** All payment flows for traveler subscriptions go through PayMob (Egypt's leading payment gateway) for local Egyptian cards and PayMob-supported methods.
- **FR-089:** International card payments for subscriptions processed via Stripe for non-Egyptian-issued cards.
- **FR-090:** Rihla is a PCI-DSS Level 4 merchant. Subscription payment card data is tokenized; Rihla stores only a PayMob/Stripe token reference.

#### 4.9.2 Subscription Payment Flow

```
Subscription Payment Flow Sequence (PayMob / Stripe)
1.  User selects subscription duration (fixed or custom days) and taps "Pay"
2.  Rihla API creates a pending Subscription record
3.  Rihla API requests payment_key from PayMob (or creates PaymentIntent via Stripe)
4.  App opens PayMob hosted iFrame or Stripe payment sheet (WebView)
5.  User enters card details
6.  PayMob / Stripe processes payment
7.  Gateway sends webhook to Rihla API (success/failure)
8.  Rihla API updates Subscription status to "active"
9.  App receives status via polling or WebSocket
10. Confirmation or error screen displayed to user
```

#### 4.9.3 Refunds & Cancellations

- **FR-091:** Subscription refunds are not handled automatically; users must contact customer service for refund processing.
- **FR-092:** Trip cancellations: Travelers can cancel bookings through the app (which updates the status to "Cancelled" and notifies the vendor), but any refund requests or payment disputes must be handled directly with the vendor, as no trip payment was processed by Rihla.
- **FR-093:** Vendors can cancel a booking from their dashboard if the traveler does not show up, or if the trip is cancelled by the vendor. This updates the booking status to "Cancelled" and notifies the traveler.


#### 4.9.4 Currency & Pricing

- **FR-094:** All trip prices and subscription prices stored in EGP (Egyptian Pound) as the canonical currency.
- **FR-095:** Prices displayed in the traveler's preferred currency (EGP or USD) based on their settings, converting from EGP using a daily exchange rate (updated once per day from exchange rate API). If no preference is set, default display shows EGP.
- **FR-096:** International tourists can pay for subscriptions in USD via Stripe; converted at checkout rate with 2.5% FX margin displayed transparently.

### 4.10 Vendor Dashboard

#### 4.10.1 Overview Tab

- **FR-097:** Stats grid (2×2): Today's Bookings, This Month's Bookings, Average Rating, Active Listings.
- **FR-098:** Booking trend bar chart (last 7 days), highlighting the peak day.
- **FR-099:** Recent Bookings list: status dot (blue = initial, green = confirmed, red = cancelled), guest name, experience name, date, guest count.

#### 4.10.2 Listings Tab

- **FR-100:** List of vendor's active and inactive experiences with thumbnail, title, price, status toggle (active/paused), and edit button.
- **FR-101:** "Add New Listing" CTA opens a multi-step form: Title, Arabic Title, Category, Description, Price, Duration, Inclusions, Photos (up to 10), Availability Calendar.
- **FR-102:** Listing review status badge: Draft / Under Review / Live / Rejected (with rejection reason).

#### 4.10.3 Calendar Tab

- **FR-103:** Monthly calendar view showing booking counts per day.
- **FR-104:** Tap a date to see all bookings for that day with guest names, counts, and status.
- **FR-105:** Bulk close dates (e.g., mark entire week as unavailable).

#### 4.10.4 Ticket Verification Tab

- **FR-106:** Input field where the vendor enters the traveler's unique 8-digit Ticket Verification Number.
- **FR-107:** Tapping "Verify" retrieves the booking record: traveler name, trip title, date, time slot, guest count, and original/discounted price.
- **FR-108:** Tapping "Confirm Participation" updates the booking status from "Initial" to "Confirmed" in the system, validating the tourist's attendance and applying the subscription discount.

#### 4.10.5 Reviews Tab

- **FR-109:** List of all guest reviews for the vendor's experiences, with ability to write a public reply.

#### 4.10.6 Discount Display (Read-Only)

- **FR-110:** Display showing the vendor's active discount percentage (e.g. 5%, 10%, 15%) as configured by the admin dashboard. This tab is read-only for vendors.

### 4.11 Notifications

- **FR-111:** Push notification types:
  - Booking submitted (sent to traveler and vendor on initial booking creation)
  - Booking confirmed (sent to both traveler and vendor when vendor confirms the ticket verification number)
  - Booking reminder (24 hours before experience start time)
  - Booking cancelled (sent to both traveler and vendor)
  - New review received (vendor only)
  - Subscription renewal reminder (for fixed recurring plans, 3 days before billing date)
  - Promotional deals and flash sales
- **FR-112:** All push notifications link to the relevant in-app screen on tap.
- **FR-113:** In-app notification centre (bell icon) stores last 50 notifications with read/unread state.
- **FR-114:** WhatsApp notifications mirror push notifications for critical events (booking submitted, booking confirmed, cancellation). Email notifications are sent for these events only if the user has provided an email address.

---

## 5. Non-Functional Requirements

> **NFR Format:** Non-functional requirements define quality attributes the system must satisfy — performance, security, usability, reliability, and localization. Each is assigned a unique ID (NFR-NNN).

### 5.1 Performance

| ID       | Requirement                                                | Target        |
| -------- | ---------------------------------------------------------- | ------------- |
| NFR-001  | App cold start on mid-range Android (3 GB RAM, Android 10) | < 3 seconds   |
| NFR-002  | Home feed load time on 4G connection                       | < 1.5 seconds |
| NFR-003  | Search results — cached queries                            | < 500 ms      |
| NFR-004 | Search results — fresh queries                             | < 1.5 seconds |
| NFR-005  | Payment confirmation screen after "Confirm & Pay"          | < 5 seconds   |
| NFR-006  | API p95 response time — read endpoints                     | < 200 ms      |
| NFR-007 | API p95 response time — write endpoints                    | < 500 ms      |

### 5.2 Scalability

- **NFR-008:** Backend must support 10,000 concurrent users at launch; architected to scale to 100,000 by end of year 1.
- **NFR-009:** Image CDN must serve assets globally with < 100 ms Time to First Byte (TTFB).

### 5.3 Security

| ID      | Security Requirement                                                                                                                                                |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| NFR-010 | All API communication over HTTPS (TLS 1.3 minimum).                                                                                                                 |
| NFR-011 | JWT tokens signed with RS256; stored in Android Keystore (not SharedPreferences).                                                                                   |
| NFR-012 | No raw card data ever stored on Rihla servers (PCI-DSS Level 4 compliance).                                                                                         |
| NFR-013 | Rate limiting on OTP requests: 5 OTP requests per 15 minutes per phone number; OTP verification lockout after 3 consecutive incorrect entries (15-minute cooldown). |
| NFR-014 | OWASP Mobile Top 10 compliance audit completed before production launch.                                                                                            |
| NFR-015 | Sensitive user data (phone, email) encrypted at rest in the database.                                                                                               |

### 5.4 Reliability & Availability

- **NFR-016:** API uptime SLA: 99.9% (maximum ~8.7 hours downtime per year).
- **NFR-017:** Offline mode: app must load the last-cached home feed and allow browsing previously viewed listings without internet connectivity.
- **NFR-018:** Payment flow must be idempotent — duplicate payment requests must not result in double charges.

### 5.5 Usability

| ID      | Usability Requirement                                                                     |
| ------- | ----------------------------------------------------------------------------------------- |
| NFR-019 | App must be fully usable one-handed on a 6-inch screen.                                   |
| NFR-020 | Arabic RTL layout must be pixel-perfect, not a mirrored approximation.                    |
| NFR-021 | Minimum tap target size: 44×44 dp (Android Material Design accessibility guideline).      |
| NFR-022 | Booking flow completable in < 3 minutes for a returning user with a saved payment method. |
| NFR-023 | Responsive layout tested on phone (360–430 dp) and tablet (600–900 dp) widths.            |

### 5.6 Localization

| ID      | Localization Requirement                                                                         |
| ------- | ------------------------------------------------------------------------------------------------ |
| NFR-024 | All UI strings in a translation file (i18n); no hardcoded text in views.                         |
| NFR-025 | Date format: DD/MM/YYYY (Egypt standard) in Arabic; MM/DD/YYYY in English.                       |
| NFR-026 | Currency: EGP formatted as "1,900 ج.م" in Arabic; "EGP 1,900" in English.                        |
| NFR-027 | Right-to-left text, layout mirroring, and Arabic numeral support (٠١٢٣...) with optional toggle. |

---

## 6. External Interface Requirements

### 6.1 Mobile App ↔ Backend API

- RESTful JSON API over HTTPS.
- Authentication via Bearer token in `Authorization` header.
- Standard error response format: `{ "error": "code", "message": "human readable" }`.

### 6.2 Payment Gateways

| Gateway | Integration Type                    | Purpose                                                                                 |
| ------- | ----------------------------------- | --------------------------------------------------------------------------------------- |
| PayMob  | REST API + Hosted iFrame + Webhooks | Local Egyptian card payments (traveler subscriptions), PayMob-supported payment methods |
| Stripe  | REST API + Stripe SDK               | International card payments (traveler subscriptions), Stripe-supported payment methods  |

### 6.3 Third-Party Services

| Service                                | Purpose                                                                                 |
| -------------------------------------- | --------------------------------------------------------------------------------------- |
| Firebase Cloud Messaging (FCM)         | Push notifications — Android                                                            |
| Apple Push Notification Service (APNS) | Push notifications — iOS (v1.1)                                                         |
| WhatsApp Business API (Meta)           | Primary OTP delivery and transactional notifications (booking confirmations, reminders) |
| SMS Gateway (Twilio / Vonage)          | Fallback OTP delivery when WhatsApp is unavailable or times out                         |
| Google Maps SDK                        | Venue location pins on detail pages                                                     |
| Unsplash API                           | Placeholder images in development                                                       |
| ExchangeRate-API.com                   | Daily EGP/USD exchange rate                                                             |
| Cloudflare CDN                         | Image and static asset delivery                                                         |

### 6.4 Hardware Interfaces

- **Camera:** profile photo capture.
- **Biometrics:** fingerprint / Face ID for login via Android `BiometricPrompt` API.
- **GPS:** optional location for auto-detecting current city and surfacing nearby experiences.

---

## 7. Data Models

> Key database entities for Rihla v1.2. All primary keys are UUIDs.

### 7.1 User

```sql
users
  user_id            UUID (PK)
  phone              VARCHAR(20) UNIQUE NOT NULL
  full_name          VARCHAR(100) NOT NULL
  email              VARCHAR(255) UNIQUE -- nullable, optional, added via profile
  arabic_name        VARCHAR(100)
  avatar_url         TEXT
  user_type          ENUM(traveler, vendor, admin)
  loyalty_tier       ENUM(explorer, navigator, captain) DEFAULT explorer
  total_bookings     INT DEFAULT 0
  subscription_id    FK → subscriptions.subscription_id (nullable)
  preferred_language VARCHAR(10) DEFAULT 'en'
  preferred_currency VARCHAR(3) DEFAULT 'EGP'
  created_at         TIMESTAMP
```

### 7.2 Experience (Listing)

```sql
experiences
  experience_id   UUID (PK)
  vendor_id       FK → users.user_id
  title_en        VARCHAR(200)
  title_ar        VARCHAR(200)
  category        ENUM(diving, desert, snorkel, boat, restaurant, wellness, cultural, other)
  description_en  TEXT
  description_ar  TEXT
  price_egp       DECIMAL(10,2)
  duration_hours  DECIMAL(4,1)
  max_pax         INT
  languages       VARCHAR(100)   -- e.g. "ar,en,de,ru"
  includes        JSONB
  itinerary       JSONB
  photos          TEXT[]
  avg_rating      DECIMAL(3,2) DEFAULT 0
  review_count    INT DEFAULT 0
  cancellation    ENUM(flexible, moderate, strict)
  status          ENUM(draft, review, live, paused, rejected)
  created_at      TIMESTAMP
```

### 7.3 Booking

```sql
bookings
  booking_id          UUID (PK)
  user_id             FK → users.user_id
  experience_id       FK → experiences.experience_id
  date                DATE
  time_slot           TIME
  adults              INT
  children            INT
  original_price_egp  DECIMAL(10,2) NOT NULL  -- Vendor's listing price at booking time
  discounted_price_egp DECIMAL(10,2)           -- Price to pay on arrival after discount (if subscribed)
  ticket_number       VARCHAR(20) UNIQUE NOT NULL -- Verification number entered by vendor
  backup_phone        VARCHAR(20)             -- Alternate contact number for verification
  status              ENUM(initial, confirmed, cancelled, completed)
  created_at          TIMESTAMP
```

### 7.4 Subscription

```sql
subscriptions
  subscription_id    UUID (PK)
  user_id            FK → users.user_id
  duration_type      ENUM(1_week, 2_weeks, 1_month, 3_months, custom) NOT NULL
  duration_days      INT NOT NULL
  status             ENUM(active, past_due, cancelled)
  started_at         TIMESTAMP
  current_period_end TIMESTAMP
  gateway            ENUM(paymob, stripe)
  gateway_sub_id     VARCHAR(100)
  cancelled_at       TIMESTAMP (nullable)
```

### 7.5 Payment

```sql
payments
  payment_id      UUID (PK)
  subscription_id FK → subscriptions.subscription_id (nullable) -- subscription payments only
  amount_egp      DECIMAL(10,2)
  currency        VARCHAR(3) DEFAULT EGP
  gateway         ENUM(paymob, stripe)
  gateway_txn_id  VARCHAR(100)
  status          ENUM(pending, succeeded, failed, refunded)
  refund_amount   DECIMAL(10,2) DEFAULT 0
  created_at      TIMESTAMP
```

### 7.6 Review

```sql
reviews
  review_id       UUID (PK)
  booking_id      FK → bookings.booking_id
  user_id         FK → users.user_id
  experience_id   FK → experiences.experience_id
  rating          INT CHECK (rating BETWEEN 1 AND 5)
  text_en         TEXT
  text_ar         TEXT
  vendor_reply    TEXT (nullable)
  created_at      TIMESTAMP
```

### 7.7 Vendor Discount

```sql
vendor_discounts
  discount_id     UUID (PK)
  vendor_id       FK → users.user_id
  discount_pct    DECIMAL(4,2) NOT NULL -- Dynamic percentage set by admin (e.g. 5.00, 10.00)
  set_by_admin_id FK → users.user_id
  effective_from  DATE NOT NULL
  effective_to    DATE -- NULL means indefinitely active until updated
  created_at      TIMESTAMP
  updated_at      TIMESTAMP
```

---

## 8. Business Rules

> Business rules define the operational constraints and pricing logic governing the Rihla platform.

| Rule ID | Business Rule                                                                                                                                                                                                                    |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BR-001  | A user cannot book an experience for a past date.                                                                                                                                                                                |
| BR-002  | A booking is created in "Initial" status. It is only changed to "Confirmed" when the vendor verifies the unique 8-digit Ticket Verification Number in their dashboard.                                                           |
| BR-003  | A vendor cannot book their own experience.                                                                                                                                                                                       |
| BR-004  | Child discount is fixed at 50% of the adult price. Children under 4 are free (no charge).                                                                                                                                        |
| BR-005  | All trip booking prices shown in the app are estimated and due directly to the vendor. No platform fees are charged.                                                                                                             |
| BR-006  | Rihla subscribers receive dynamic, vendor-specific discounts on all bookings made during their subscription. Loyalty tier discounts (5% for Navigator, 10% for Captain) are additive and stack on top of subscription discounts. |
| BR-007  | Vendor discount percentages (e.g. 5%, 10%) are set exclusively by the platform administrator via the admin panel and cannot be modified by the vendor.                                                                           |
| BR-008  | Reviews can only be written after a booking reaches "Completed" status. One review per booking.                                                                                                                                  |
| BR-009  | All vendors list products on the platform completely free of charge with no listing limits or commission charges.                                                                                                                |
| BR-010  | A traveler can cancel a booking in "Initial" or "Confirmed" status at any time. A cancellation notification is sent to the vendor via WhatsApp/push notification.                                                                |
| BR-011  | Loyalty tier upgrades are applied immediately when the threshold booking count of "Completed" bookings is reached. Downgrades never occur (tiers are permanent achievements).                                                    |
| BR-012  | Rihla Subscriptions are billed as a one-time payment for temporary durations (e.g. 1 week, custom days) or auto-renew for recurring monthly/quarterly durations. There are no free trials.                                       |
| BR-013  | Subscription refund requests must be initiated by contacting customer service. Trip cancellations or payment disputes must be handled directly with the vendor.                                                                  |

---

## 9. Appendix — Screens Inventory

> Complete inventory of all application screens for v1.2. Screen IDs correspond to navigation routes in the app codebase.

| Screen ID | Name                         | Description                                                                                                             |
| --------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| S0        | Splash / Onboarding          | App launch, brand identity, Get Started / Sign In CTAs                                                                  |
| S1        | Home                         | Personalized feed, categories, featured cards, popular experiences, restaurants                                         |
| S2        | Experience Detail            | Hero gallery, info, itinerary, inclusions, reviews, pricing, discount prompt, and Book CTA                              |
| S3        | Booking — Step 1             | Date picker calendar, time slot selector, guest count (adults/children)                                                 |
| S3b       | Booking — Step 2             | Contact details form (name, primary phone, backup phone, optional hotel, optional special requests)                     |
| S3c       | Booking — Step 3             | Booking confirmation screen showing Ticket Verification Number, location, direct payment notice, and status ("Initial") |
| S4        | Ticket Detail                | Screen displaying active or past ticket details, verification number, payment instructions, and verification status     |
| S5        | Explore / Search             | Text search, category chips, filter/sort, results list showing original and discounted pricing                          |
| S6        | Profile                      | User header, stats, settings, loyalty tier, favorites, booking history                                                  |
| S6b       | My Subscription              | Current subscription duration details, active status, days remaining, customer support link                             |
| S6c       | Subscription Plans           | durational plans comparison (fixed levels and custom days calculator) with illustrative pricing                         |
| S7        | Vendor Dashboard             | Overview stats (bookings count, active listings, reviews), recent bookings list                                         |
| S7b       | Vendor — Listings            | Manage listings, add new listing multi-step form (no listing limits)                                                    |
| S7c       | Vendor — Calendar            | Monthly booking calendar, availability management                                                                       |
| S7d       | Vendor — Ticket Verification | Verification input screen to enter traveler's ticket verification number and confirm participation                      |
| S7e       | Vendor — Discount Display    | Read-only view showing the current vendor discount percentage configured by the admin                                   |
| S8        | Notifications                | In-app notification centre (last 50 notifications)                                                                      |
| S9        | Authentication               | Phone Registration (phone+name), OTP Verification (WhatsApp→SMS fallback), Login (phone+OTP) screens                    |

---

_ريحلة Rihla SRS v1.2 — Product Team — Next Review: Before v1.3 Development Kickoff_

---

## 10. Team Discussion Questions

1. **Language & Currency Settings:** Should we explicitly allow the traveler to change the currency (EGP / USD) and language (Arabic / English) from the account settings (FR-068 and FR-068b), or should we rely on the device language and locale automatically?
2. **Event Booking Confirmation:** How is an event booking confirmed?
3. **Currency Fluctuations & Refunds:** How will daily foreign currency fluctuations affect refunds?
4. **Data Collection:** What user data does Rihla collect for research/statistics?
5. **SIM Cards & Fallbacks:** Will SIM cards always be available? Should a fallback be considered?
6. **Company Account Currency:** What currency will the company account use for receiving Rihla payments?
7. **Dynamic Pricing:** Is dynamic pricing supported for vendors?
8. **Offline Booking Behavior:** NFR-017 supports offline browsing, but what happens when a traveler attempts to book while offline? Should the app queue the booking request and submit it when connectivity is restored, or block the action entirely?
9. **Vendor Ticket Verification SLA:** What happens if a vendor never confirms participation — does the booking remain in "Initial" status indefinitely?
10. **Guest Count Modification:** If a traveler books for 4 people but arrives with 3 or 5, can the vendor adjust the guest count from their dashboard before verifying the ticket to update the final price?
11. **International Bookings:** Are travelers allowed to book experiences while physically located outside of Egypt? If so, how does the system handle timezone differences for date and time selection?
12. **Offline Booking Submission:** If a user completes the booking form and hits "Confirm" while offline, will the app queue the request locally to sync later, or immediately display a network error blocking the action?
13. **Vendor Pricing Errors:** What happens if a vendor mistakenly lists a trip for 200 EGP instead of 2000 EGP, and several travelers book it before the error is noticed?
14. **Force Majeure & Weather Cancellations:** If boat trips are suddenly cancelled due to bad weather, who is responsible for initiating a "Bulk Cancel" to notify travelers before they head to the marina? Is it the vendor or the Rihla operations team?
15. **Late Arrival / Partial No-Show:** A traveler arrives 30 minutes late for a safari trip and the group has already left. Is this recorded as a "No-Show" or "Cancelled"? Does the platform allow them to "Reschedule" the ticket through the app instead of losing it?
16. **Payment Methods:** Should the app explicitly state the "Accepted Payment Methods" (e.g., exact cash needed) for each vendor?
17. **Hidden Fees:** What if the vendor confirms the traveler's ticket but refuses to start the trip unless they pay an "additional equipment fee" that was not mentioned in the "What's Excluded" section of the app?
