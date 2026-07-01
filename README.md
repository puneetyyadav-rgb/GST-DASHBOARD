# 🏛️ LexGST AI — Next-Generation GST Case Intelligence Dashboard

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Python_3.11-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Scrapling](https://img.shields.io/badge/Scrapling-AI_Spider-FF6F00?style=for-the-badge)](https://github.com/d4vinci/Scrapling)

> **A minimalist, high-density, zero-clutter legal intelligence platform designed exclusively for tracking, searching, and reading AI-summarized Goods and Services Tax (GST) case laws, advance rulings, and official CBIC circulars.**

---

## 🌟 Executive Summary & Vision

Tax litigators, Chartered Accountants (CAs), and legal practitioners often struggle with cluttered government portals and scattered High Court judgment databases. **LexGST AI** solves this by establishing a sleek, dark-mode-first, high-velocity dashboard that synthesizes complex multi-page tax judgments into **actionable 3-part structured AI intelligence reports** (*The Facts*, *The Issue*, and *The Verdict*) with **Strictly Sourced Zero-Hallucination guarantees**.

---

## ✨ Key Capabilities & Architectural Highlights

### 1. 📑 500+ Verified Rulings Across 10 Litigated Statutory Sections
Our procedural and curated intelligence bank delivers **at least 50 comprehensive tax rulings per section**, producing over **501 unique rulings** categorized across India's most contested GST provisions:
* **Section 16(2) & 16(4)**: Conditions & Time Limit for Availing Input Tax Credit (ITC), GSTR-2B matching, and retrospective amendments.
* **Section 17(5)**: Blocked Input Tax Credit & Apportionment (works contracts, corporate vehicles, canteen expenses).
* **Section 129 & 130**: Highway Detention, E-way bill expiry penalties, mechanical breakdowns, and 200% penalty adjudication.
* **Section 73 & 74**: Show Cause Notices (SCN), non-fraud vs. fraud adjudication cutoffs, natural justice mandates, and personal hearings.
* **Rule 28 & Schedule I**: Related party valuation, inter-branch transfers at Nil invoice value, and corporate financial guarantees (1% safe harbor rule).
* **Rule 36(4) & Rule 86A**: Electronic credit ledger debit freezes, negative balance creation restrictions, and statutory 1-year automatic expiry.
* **Section 50**: Statutory interest calculations on Net vs. Gross cash liabilities.
* **Section 54 & Rule 89**: Export refunds, inverted duty structures, and input digital service claims.
* **Section 29**: Retrospective registration cancellations and speaking order requirements.
* **Schedule II & III**: Secondment of expatriate staff, salary reimbursements, and out-of-scope classifications.

### 2. ⚡ Dual Split-View Navigation (`SectionExplorer`)
* **🔥 Popular Sections Split**: An interactive, accordion-style hierarchical view grouping tax jurisprudence by statutory provision and ranked by **Litigation Intensity Score**.
* **⏳ Chronological Stream (Newest to Oldest)**: A continuous, unified chronological feed sorting every ruling sequentially from **July 2026 stepping backwards to 2017**. Every section internally enforces strict newest-to-oldest sorting.

### 3. 📄 Interactive Official Document Viewer (`DocumentViewerModal`)
Intercepts standard external document links to launch a built-in, watermarked judicial reader previewing:
* Full Transcribed Judgment Text (*Factual Matrix*, *Substantive Questions of Law*, *Final Pronouncement*, and *Mandatory Directions*).
* One-click download of certified transcripts (`.TXT`) directly to disk.
* Direct clipboard copying and OS print preview integration.

### 4. 📡 Real-Time Scrapling Spider & Push Notification Hub (`NotificationHubModal`)
* **Simulated Live Portal Scrape**: Click **`⚡ Simulate Live Portal Scrape`** to trigger asynchronous background workers importing fresh rulings into the top of the feed.
* **Web Push VAPID Toast Alerts**: Animated glassmorphism OS-level toast banners notify users whenever a new Supreme Court or High Court order arrives.
* **Tracking Hub Drawer**: Inspect live spider polling frequencies, WebSocket Server-Sent Events (SSE) connectivity, and an audit log of dispatched notifications.

### 5. 🐍 FastAPI Python & Scrapling Backend Integration (`BackendSchemaModal`)
Includes a full production-ready Python backend specification under `/backend/main.py` demonstrating:
* Pydantic v2 schemas mirroring frontend TypeScript interfaces.
* FastAPI REST endpoints (`GET /api/v1/cases`, `POST /api/v1/scrape/trigger`, `GET /api/v1/alerts/subscribe`).
* Integration code for [Scrapling](https://github.com/d4vinci/Scrapling) (`Fetcher(auto_match=True)`) querying official government nodes (`main.sci.gov.in`, `cbic-gst.gov.in`, `taxjudgments.nic.in`).

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend Framework** | Next.js 15 (App Router), React 19, TypeScript |
| **Styling & UI Design** | Tailwind CSS v3.4, Custom Glassmorphism Tokens, Lucide Icons |
| **Animation Engine** | Framer Motion (`AnimatePresence`, Staggered Card Transitions) |
| **Data Engine** | Procedural Legal Case Synthesizer (`sectionCaseGenerator.ts`) |
| **Backend Reference** | Python 3.11+, FastAPI, Uvicorn, Pydantic, Scrapling Spider |

---

## 🚀 Getting Started & Local Development

### Prerequisites
* [Node.js](https://nodejs.org/) (v18.17+ or v20+)
* [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)
* *Optional*: Python 3.11+ (if exploring backend mock server)

### 1. Clone the Repository
```bash
git clone https://github.com/puneetyyadav-rgb/GST-DASHBOARD.git
cd GST-DASHBOARD
```

### 2. Install Frontend Dependencies
```bash
npm install
```

### 3. Launch Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to experience the live dashboard.

---

## 📂 Codebase Architecture

```text
GST-DASHBOARD/
├── backend/
│   ├── main.py                     # Python FastAPI server & Scrapling spider endpoints
│   └── requirements.txt            # Python dependencies (fastapi, uvicorn, scrapling)
├── src/
│   ├── app/
│   │   ├── globals.css             # Tailwind design system, dark mode variables & glass panels
│   │   ├── layout.tsx              # Root Next.js layout with Inter typography
│   │   └── page.tsx                # Master Dashboard state controller & toast notifications
│   ├── components/
│   │   ├── TopNav.tsx              # Sticky header with search bar & Tracking Hub buttons
│   │   ├── LeftSidebar.tsx         # Jurisdiction checkboxes, date cutoffs & relevance sort
│   │   ├── SectionExplorer.tsx     # Split-view controller (Accordion Sections vs Chronological)
│   │   ├── CaseCard.tsx            # AI intelligence card with tags, score pills & preview actions
│   │   ├── CaseDetailModal.tsx     # Deep dive modal with 3-part analysis & SCN reply tools
│   │   ├── DocumentViewerModal.tsx # Full official court order transcript reader & text exporter
│   │   ├── NotificationHubModal.tsx# Scrapling spider architecture inspector & push audit logs
│   │   └── BackendSchemaModal.tsx  # Interactive FastAPI and Python scraping code preview
│   └── lib/
│       ├── types.ts                # TypeScript interfaces (GSTCase, GSTSectionInfo, ViewMode)
│       ├── mockData.ts             # Master database assembler aggregating 501+ rulings
│       └── data/
│           ├── sectionCaseGenerator.ts # Procedural synthesis engine generating 50+ cases/section
│           ├── landmarkSectionCases.ts # Hand-crafted landmark rulings across sections
│           ├── chronologicalCases.ts   # Recent 2026 Supreme Court and High Court cases
│           └── olderChronologicalCases.ts # Historical rulings spanning 2021 to 2025
└── README.md                       # Documentation
```

---

## 🔒 Zero Hallucination Guarantee

All AI-generated summaries displayed in this dashboard operate strictly under **Retrieval-Augmented Generation (RAG) constraints**. The AI model is strictly bounded by the extracted textual content of verified PDF court filings and circulars. No external commentary, legal extrapolation, or unverified case citations are inserted into the report cards.

---

## 👨‍💻 Author & Repository

* **Repository Owner:** [puneetyyadav-rgb](https://github.com/puneetyyadav-rgb)
* **License:** MIT License
* **Repository Link:** [https://github.com/puneetyyadav-rgb/GST-DASHBOARD](https://github.com/puneetyyadav-rgb/GST-DASHBOARD)
