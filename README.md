# EventHub — Event Discovery & Workshop Registration Website

A responsive single-page web application built with **React 19**, **JavaScript (ES6+)**, **HTML5**, and modern **CSS3**. The platform enables learners and tech enthusiasts to discover cutting-edge workshops, search and filter events across multiple dimensions, bookmark favorites, register with instant admission pass generation, and manage registrations via LocalStorage.

---

## 🚀 Key Features

### 1. Home Page (`/`)
- **Responsive Navigation Bar**: Includes links to *Home*, *Explore Events*, *My Registrations* (with live registration count badge), and *Saved Favourites*. Features an interactive mobile drawer menu.
- **Hero Spotlight Section**: Showcases the headline upcoming summit (*Global AI & Large Language Models Summit 2026*) with keynote speaker preview, real-time available seat counter, and 1-click registration.
- **Key Impact Statistics**: Highlights 12+ Active Workshops, 10,000+ Enrolled Learners, and 4.9/5 satisfaction rating.
- **Domain Categories**: Interactive category cards for **Technology**, **Business**, **Design**, and **Education** with event counts and 1-click filter navigation.
- **Curated Featured & Upcoming Workshops**: Card grids displaying essential details, category tags, remaining seats, and registration shortcuts.
- **Value Propositions & Attendee Testimonials**: Showcases the high-standard curriculum, direct mentor access, and verified digital admission credentials.

### 2. Explore Events Page (`/events`)
- **Dynamic Catalog**: Displays **12 rich events** dynamically across various disciplines.
- **Live Search**: Instant keyword filtering by event title, description, tags, or speaker name with a clear button.
- **Category Filter Tabs**: Quick pills for *All Categories*, *Technology*, *Business*, *Design*, and *Education*.
- **Location Dropdown Filter**: Filter workshops by cities including San Francisco, New York, Berlin, Austin, London, Seattle, Chicago, Boston, Singapore, Los Angeles, or Online.
- **Date & Capacity Sorting**: Sort by *Date: Upcoming Earliest*, *Date: Latest First*, *Seats: Most Available*, and *Title: Alphabetical (A-Z)*.
- **Saved Favourites Filter**: 1-click toggle to view only bookmarked workshops.
- **Dynamic Seats Tracker**: Color-coded badges indicating sold-out status, low seat alerts (e.g. *"Only 8 seats left!"*), or healthy availability.
- **Empty State**: Friendly illustration and "Reset All Filters" button when no events match the search criteria.

### 3. Event Details Page (`/events/:id`)
- **Hero Banner**: High-resolution workshop banner, title, date, time, venue address, level, and format pill (*In-Person*, *Hybrid*, or *Online*).
- **In-Depth Description**: Comprehensive curriculum breakdown, learning objectives, and topical tags.
- **Workshop Agenda Timeline**: Detailed schedule modules with timestamps and speaker assignments.
- **Instructor / Speaker Profile**: Keynote bio, role, company, and headshot.
- **Prerequisites & Requirements**: Checklist of software, gear, and recommended prior experience.
- **Sticky Sidebar**:
  - Live seat capacity progress bar (percentage reserved).
  - Primary "Register Now" CTA (dynamically switches to "Enrolled" badge if already registered).
  - "Bookmark" toggle button.
  - "Share Link" button with instant clipboard copy and toast notification.
- **Related Events Grid**: Recommends other workshops in the same category.

### 4. Registration System & Modal
- **Form Fields**: Full Name, Email Address, Phone Number, Organization/University (optional), and Terms checkbox.
- **Strict Input Validation**:
  - Name minimum length (3+ chars).
  - RFC compliant Email regex check.
  - Valid Phone number (8-15 digits).
  - Compulsory terms agreement.
- **Duplicate Prevention**: Prevents duplicate registrations for the same event by checking against saved records on the device and contact email.
- **Ticket Generation & Confetti**: Upon submission, triggers a confetti burst and generates a unique Ticket ID (`EVH-XXXXXX`).
- **Live Seat Decrement**: Automatically decreases available seats by 1 upon registration.

### 5. My Registrations Dashboard (`/registrations`)
- **Attendee Ticket Cards**: Lists all confirmed workshops with event image, title, date, location, attendee name, email, phone, and ticket reference.
- **Digital Admission Pass Modal**: Printable pass complete with ticket reference, barcode representation, and print shortcut.
- **Cancellation Flow**: Allows cancellation with a confirmation dialog. Cancelling immediately deletes the registration from LocalStorage and restores the available seat count.
- **Empty State**: Displays an inviting empty state when no registrations exist, with a direct button to explore workshops.

---

## 🛠️ Technical Stack & Architecture

- **React 19**: Modern functional components with Hooks (`useState`, `useEffect`, `useMemo`, `useContext`, `useParams`, `useNavigate`, `useSearchParams`).
- **React Router DOM v7**: Client-side declarative routing and URL parameter synchronization.
- **Context API (`EventContext.jsx`)**: Centralized state management for events, available seats, registrations, favourites, modals, and toasts.
- **LocalStorage Persistence**:
  - `eventhub_registrations_v1`: Saved attendee bookings.
  - `eventhub_event_seats_v1`: Live seat availability tracking.
  - `eventhub_favourites_v1`: Bookmarked workshop IDs.
- **Lucide React**: Clean, modern iconography.
- **Canvas-Confetti**: Registration celebration effect.
- **CSS3 Design System**: Custom responsive grid, modern typography (Plus Jakarta Sans & Inter), glassmorphism, micro-interactions, and mobile navigation drawer.

---

## 📁 Project Structure

```text
├── index.html                   # HTML entry point with Google Fonts
├── package.json                 # Project dependencies & scripts
├── vite.config.js               # Vite configuration
└── src/
    ├── main.jsx                 # Application root entry
    ├── App.jsx                  # Main router and layout hierarchy
    ├── index.css                # Global stylesheet and design tokens
    ├── context/
    │   └── EventContext.jsx     # Central state & LocalStorage logic
    ├── data/
    │   └── eventsData.js        # 12 detailed mock events, categories & locations
    ├── components/
    │   ├── Navbar.jsx           # Responsive header with badges & mobile drawer
    │   ├── Footer.jsx           # Site footer with links and newsletter
    │   ├── HeroSection.jsx      # Spotlight hero banner with key statistics
    │   ├── CategorySection.jsx  # 4 Domain category cards
    │   ├── EventCard.jsx        # Reusable card with seat badges & actions
    │   ├── RegistrationModal.jsx# Form validation, duplicate check & digital pass
    │   ├── ToastNotification.jsx# Toast alert system
    │   └── ScrollToTop.jsx      # Navigation auto-scroll helper
    └── pages/
        ├── HomePage.jsx         # Home page with hero, categories & featured
        ├── ExploreEventsPage.jsx# 12+ events catalog, search, filter, sort
        ├── EventDetailsPage.jsx # Full event specifications, agenda & speaker
        └── MyRegistrationsPage.jsx # User registered events, digital pass & cancellation
```

---

## 💻 Running the Project Locally

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

3. **Build for Production**:
   ```bash
   npm run build
   ```
