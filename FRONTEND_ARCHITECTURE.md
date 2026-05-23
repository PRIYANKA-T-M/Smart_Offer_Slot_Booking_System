# Frontend Architecture - SmartOffer AI

## 1. Folder Structure
```
frontend/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images, SVGs
│   ├── components/
│   │   ├── common/         # Reusable UI (Buttons, Inputs, Modals, Loaders)
│   │   ├── layout/         # Navbar, Sidebar, Page wrappers
│   │   ├── features/       # Feature-specific components
│   │   └── skeletons/      # Skeleton loaders
│   ├── context/            # React Context (if any, like ThemeProvider)
│   ├── hooks/              # Custom React hooks (useAuth, useOffers)
│   ├── pages/              # Page components (Screens)
│   ├── routes/             # Route configurations
│   ├── services/           # API integration and Axios configuration
│   ├── store/              # Zustand state management slices
│   ├── types/              # TypeScript interfaces and types
│   ├── utils/              # Helper functions (formatting, validation)
│   ├── App.tsx             # Root component
│   └── main.tsx            # Entry point
├── index.html
├── tailwind.config.js      # Tailwind styling configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration
```

## 2. Tech Stack & Libraries
- **Framework:** React 18 + Vite + TypeScript
- **Styling:** TailwindCSS 3 + HeadlessUI + Lucide React (icons)
- **State Management:** Zustand (Global State) + React local state
- **Routing:** React Router v6
- **API Client:** Axios
- **Date Handling:** date-fns
- **Utilities:** clsx, tailwind-merge

## 3. Routes Configuration
- `/` - Public Listing (Redirect or Landing)
- `/login` - Admin Login
- `/dashboard` - Admin Dashboard (Protected)
- `/business` - Business Profile (Protected)
- `/offers` - Manage Offers (Protected)
- `/offers/create` - Create Offer (Protected)
- `/offers/:id` - Public Offer Detail
- `/offers/:id/book` - Booking Flow
- `/bookings` - Manage Bookings (Protected)
- `/confirmation/:ref` - Booking Confirmation
- `/settings` - Settings (Protected)
- `/calendar` - Calendar View (Protected)
- `/analytics` - Analytics Dashboard (Protected)

## 4. State Management (Zustand)
We use modular Zustand stores to handle global application state:
- **`useAuthStore`**: Manages JWT token, user info, authentication status.
- **`useBusinessStore`**: Manages business profile details.
- **`useOffersStore`**: Manages list of offers, active filters, selected offer.
- **`useBookingStore`**: Manages booking form state, selected slots, booking history.
- **`useDashboardStore`**: Manages dashboard metrics and analytics data.
- **`useUIStore`**: Manages dark mode, global modals, toast notifications.

## 5. API Integration Mapping
- **Authentication**: `POST /api/auth/login`
- **Business Profile**:
  - `POST /api/business` (Create)
  - `GET /api/business` (Read)
  - `PUT /api/business/{id}` (Update)
- **Offers**:
  - `POST /api/offers` (Create)
  - `GET /api/offers` (List)
  - `PUT /api/offers/{id}` (Update)
  - `DELETE /api/offers/{id}` (Delete)
- **Slots**:
  - `POST /api/slots` (Create)
  - `GET /api/offers/{offerId}/slots` (List)
- **Bookings**:
  - `POST /api/bookings` (Create)
  - `GET /api/bookings` (List)
  - `PUT /api/bookings/{id}/status` (Update status)
- **Dashboard**:
  - `GET /api/dashboard/summary` (Metrics & stats)

## 6. Detailed Screen Specifications

### Screen 1: Admin Login
- **Purpose:** Authenticate admin/business owners into the platform.
- **Components:** `LoginForm`, `InputField`, `Button`.
- **State Management:** `useAuthStore` (token, user).
- **APIs used:** `POST /api/auth/login`
- **Validation:** Email format, password length/required.
- **Loading states:** Button spinner during login request.
- **Empty states:** N/A.
- **Error states:** Invalid credentials toast, inline field errors.
- **Responsive behavior:** Centered card on desktop, full-width with padding on mobile.

### Screen 2: Dashboard
- **Purpose:** High-level overview of business performance.
- **Components:** `StatsCard`, `RecentBookingsTable`, `Charts` (Recharts/Chart.js), `Heatmap`.
- **State Management:** `useDashboardStore`.
- **APIs used:** `GET /api/dashboard/summary`.
- **Validation:** N/A.
- **Loading states:** Skeleton loaders for stats cards and table.
- **Empty states:** "No recent activity" graphic for bookings.
- **Error states:** "Failed to load dashboard data" retry banner.
- **Responsive behavior:** Grid layout (1 col mobile, 2 col tablet, 4 col desktop). Table scrolls horizontally.

### Screen 3: Business Profile
- **Purpose:** Manage business details and branding.
- **Components:** `ProfileForm`, `ImageUpload`, `TimePicker`.
- **State Management:** `useBusinessStore`.
- **APIs used:** `GET /api/business`, `PUT /api/business/{id}`.
- **Validation:** Required fields (Name, Email, Phone), valid URLs, time logic.
- **Loading states:** Form skeletons, save button spinner.
- **Empty states:** Prompt to "Complete Profile".
- **Error states:** API error toasts, inline validation.
- **Responsive behavior:** Stacked form on mobile, two-column layout on desktop.

### Screen 4: Create Offer (includes Slot Management)
- **Purpose:** Allow businesses to create discounted offers with specific slots.
- **Components:** `OfferForm`, `SlotCreator`, `DatePicker`, `RichTextEditor`.
- **State Management:** Local form state (React Hook Form) + `useOffersStore` on success.
- **APIs used:** `POST /api/offers`, `POST /api/slots`.
- **Validation:** Start/End date logic, Discount math (Offer < Original), capacity > 0.
- **Loading states:** Submitting overlay/spinner.
- **Empty states:** N/A.
- **Error states:** Form validation errors, API failure message.
- **Responsive behavior:** Accordion or multi-step form for mobile, single scrollable page desktop.

### Screen 5: Manage Offers
- **Purpose:** View, edit, pause, or delete existing offers.
- **Components:** `OffersDataTable`, `FilterBar`, `SearchBar`, `ActionDropdown`.
- **State Management:** `useOffersStore`.
- **APIs used:** `GET /api/offers`, `PUT /api/offers/{id}`, `DELETE /api/offers/{id}`.
- **Validation:** Search query sanitization.
- **Loading states:** Table row skeletons.
- **Empty states:** "No offers created yet. Create one!"
- **Error states:** Toast on delete failure.
- **Responsive behavior:** List view on mobile (cards), Table view on desktop.

### Screen 6: Manage Bookings
- **Purpose:** Track and update lifecycle of customer bookings.
- **Components:** `BookingList`, `StatusBadge`, `SearchInput`.
- **State Management:** `useBookingStore`.
- **APIs used:** `GET /api/bookings`, `PUT /api/bookings/{id}/status`.
- **Validation:** Valid status transitions.
- **Loading states:** List skeletons.
- **Empty states:** "No bookings for this period."
- **Error states:** Action failure toast.
- **Responsive behavior:** Stacked cards for mobile readability.

### Screen 7: Public Offer Listing
- **Purpose:** Consumer-facing page to browse available offers.
- **Components:** `OfferCard`, `FilterSidebar`, `CategoryTabs`.
- **State Management:** `useOffersStore` (public view).
- **APIs used:** `GET /api/offers` (public endpoint).
- **Validation:** Filter constraints.
- **Loading states:** Grid of `OfferCard` skeletons.
- **Empty states:** "No offers match your filters."
- **Error states:** "Could not load offers."
- **Responsive behavior:** Bottom sheet for filters on mobile, left sidebar on desktop. Grid 1->2->3 columns.

### Screen 8: Public Offer Detail
- **Purpose:** Show complete offer details, terms, location, and slots.
- **Components:** `HeroImage`, `OfferInfo`, `SlotSelector`, `LocationMap`.
- **State Management:** Selected slot local state.
- **APIs used:** `GET /api/offers/{id}`, `GET /api/offers/{id}/slots`.
- **Validation:** Ensure active slots exist.
- **Loading states:** Page skeleton.
- **Empty states:** "Offer expired or not found."
- **Error states:** 404 page / Toast.
- **Responsive behavior:** Sticky "Book Now" bottom bar on mobile.

### Screen 9: Booking Flow
- **Purpose:** Collect customer info to finalize booking.
- **Components:** `BookingForm`, `OrderSummary`.
- **State Management:** `useBookingStore` (draft booking).
- **APIs used:** `POST /api/bookings`.
- **Validation:** Email format, Phone format, Capacity limit check.
- **Loading states:** Payment/Processing spinner.
- **Empty states:** N/A.
- **Error states:** "Slot fully booked" error.
- **Responsive behavior:** Optimized mobile inputs (number pad for phone).

### Screen 10: Booking Confirmation
- **Purpose:** Show success state and booking reference.
- **Components:** `SuccessCheckmark`, `TicketView`, `QRGenerator`.
- **State Management:** `useBookingStore` (completed booking).
- **APIs used:** Inherited from redirect or GET if direct link.
- **Validation:** N/A.
- **Loading states:** Minimal.
- **Empty states:** Invalid reference.
- **Error states:** Booking not found.
- **Responsive behavior:** Mobile-friendly ticket layout, downloadable PDF view.
