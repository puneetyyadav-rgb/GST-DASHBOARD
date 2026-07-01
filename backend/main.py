"""
GST AI Dashboard — FastAPI Backend
===================================
Serves GST case law data, provides filtering/search, and exposes
a stub endpoint for triggering a Scrapling-based web scraper.

Run locally:
    uvicorn main:app --reload --port 8000

API docs (auto-generated):
    http://localhost:8000/docs   (Swagger UI)
    http://localhost:8000/redoc  (ReDoc)
"""

from __future__ import annotations

import uuid
from datetime import date, datetime, timedelta
from enum import Enum
from typing import List, Literal, Optional

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

# ---------------------------------------------------------------------------
# Pydantic Models (mirrors src/lib/types.ts)
# ---------------------------------------------------------------------------


class CourtCategory(str, Enum):
    HIGH_COURT = "High Court"
    SUPREME_COURT = "Supreme Court"
    ADVANCE_RULINGS = "Advance Rulings"
    CIRCULARS = "Circulars"


class DateRangeFilter(str, Enum):
    ALL = "All"
    TODAY = "Today"
    THIS_WEEK = "This Week"
    THIS_MONTH = "This Month"
    CUSTOM = "Custom"


class RelevanceSort(str, Enum):
    LATEST = "Latest"
    HIGHEST_IMPACT = "Highest Impact"


class AISummary(BaseModel):
    """AI-generated three-part summary of a GST case."""

    facts: str
    issue: str
    verdict: str


class GSTCase(BaseModel):
    """Core case model returned by every case-related endpoint."""

    id: str
    title: str
    court_or_authority: str = Field(..., alias="courtOrAuthority")
    category: CourtCategory
    date: str  # Human-readable, e.g. "29 Jun 2026"
    raw_date: str = Field(..., alias="rawDate")  # YYYY-MM-DD for sort/filter
    impact_score: float = Field(..., ge=0, le=10, alias="impactScore")
    tags: List[str]
    summary: AISummary
    pdf_url: Optional[str] = Field(None, alias="pdfUrl")
    pdf_size: Optional[str] = Field(None, alias="pdfSize")
    bench: Optional[str] = None
    assessment_year: Optional[str] = Field(None, alias="assessmentYear")
    scrapling_source_url: Optional[str] = Field(None, alias="scraplingSourceUrl")
    ai_confidence: Optional[float] = Field(None, alias="aiConfidence")

    model_config = {
        "populate_by_name": True,
        "json_schema_extra": {
            "example": {
                "id": "gst-2026-hc-089",
                "title": "M/s CloudNexus Technologies Pvt. Ltd. vs. Union of India & Ors.",
                "courtOrAuthority": "Delhi High Court",
                "category": "High Court",
                "date": "29 Jun 2026",
                "rawDate": "2026-06-29",
                "impactScore": 9.8,
                "tags": ["Section 16(2)(c)", "Rule 36(4)"],
                "summary": {
                    "facts": "…",
                    "issue": "…",
                    "verdict": "…",
                },
            }
        },
    }


class ScrapeResponse(BaseModel):
    """Response returned when a scrape job is triggered."""

    job_id: str
    status: str
    message: str
    estimated_seconds: int


class HealthResponse(BaseModel):
    """Lightweight health-check payload."""

    status: str
    version: str
    timestamp: str


class CaseListResponse(BaseModel):
    """Paginated wrapper for case listing."""

    total: int
    cases: List[GSTCase]


# ---------------------------------------------------------------------------
# Mock Data (mirrors src/lib/mockData.ts — INITIAL_GST_CASES)
# ---------------------------------------------------------------------------

MOCK_CASES: List[GSTCase] = [
    GSTCase(
        id="gst-2026-hc-089",
        courtOrAuthority="Delhi High Court",
        title="M/s CloudNexus Technologies Pvt. Ltd. vs. Union of India & Ors.",
        category=CourtCategory.HIGH_COURT,
        date="29 Jun 2026",
        rawDate="2026-06-29",
        impactScore=9.8,
        tags=["Section 16(2)(c)", "Rule 36(4)", "GSTR-2B Reconciliation", "Input Tax Credit"],
        summary=AISummary(
            facts=(
                "The petitioner availed Input Tax Credit (ITC) of Rs. 4.82 Crores based on "
                "genuine tax invoices and verified bank payments to the supplier during FY "
                "2023-24. The revenue department issued an auto-adjudicated demand notice "
                "denying the entire ITC solely because the supplier failed to file GSTR-3B "
                "and remit the tax collected to the government treasury."
            ),
            issue=(
                "Can a bona fide recipient of services be denied Input Tax Credit under "
                "Section 16(2)(c) of the CGST Act strictly due to the default of the "
                "selling dealer without initiating recovery proceedings against the "
                "defaulting supplier?"
            ),
            verdict=(
                "The High Court quashed the demand order, ruling that Section 16(2)(c) "
                "cannot be invoked against an honest purchasing dealer unless collusion or "
                "exceptional circumstances like missing dealer fraud are proven. The "
                "department was directed to first pursue recovery from the defaulting "
                "supplier before taking coercive action against the recipient."
            ),
        ),
        pdfUrl="/mock-pdfs/CloudNexus_vs_UOI_2026.pdf",
        pdfSize="1.4 MB",
        bench="Hon'ble Mr. Justice Vibhu Bakhru & Hon'ble Mr. Justice Amit Mahajan",
        assessmentYear="FY 2023-24",
        scraplingSourceUrl="https://taxjudgments.nic.in/delhi-hc/2026/06/cloudnexus",
        aiConfidence=99.6,
    ),
    GSTCase(
        id="gst-2026-sc-014",
        courtOrAuthority="Supreme Court of India",
        title="Commissioner of CGST & Central Excise vs. M/s Apex Heavy Engineering Ltd.",
        category=CourtCategory.SUPREME_COURT,
        date="24 Jun 2026",
        rawDate="2026-06-24",
        impactScore=10.0,
        tags=["Section 17(5)(d)", "Works Contract", "Immovable Property", "Constitutional Validity"],
        summary=AISummary(
            facts=(
                "The respondent manufacturing company constructed a turnkey prefabricated "
                "industrial shed and structural steel support foundation essential for "
                "operating heavy overhead crane machinery. The department blocked the ITC "
                "on structural construction materials and structural steel under Section "
                "17(5)(d), classifying the entire facility as immovable property."
            ),
            issue=(
                "Does Section 17(5)(d) of the CGST Act restrict Input Tax Credit on "
                "structural steel and foundations constructed on own account when such "
                "structures are functionally essential and integral to the operation of "
                "plant and machinery?"
            ),
            verdict=(
                "The Supreme Court dismissed the Revenue's civil appeal and affirmed the "
                "functionality test established by judicial precedents. It ruled that "
                "foundations and structural supports integral to plant and machinery fall "
                "outside the restriction of Section 17(5)(d), entitling the taxpayer to "
                "full 100% Input Tax Credit."
            ),
        ),
        pdfUrl="/mock-pdfs/SC_Apex_Engineering_Section17_5.pdf",
        pdfSize="3.2 MB",
        bench="Hon'ble Dr. Justice D.Y. Chandrachud & Hon'ble Mr. Justice J.B. Pardiwala",
        assessmentYear="FY 2022-23",
        scraplingSourceUrl="https://main.sci.gov.in/judgments/2026/gst-apex-eng",
        aiConfidence=99.8,
    ),
    GSTCase(
        id="gst-2026-aar-042",
        courtOrAuthority="Maharashtra AAAR (Appellate Authority for Advance Ruling)",
        title="In Re: M/s FinTech SaaS Solutions India Pvt. Ltd.",
        category=CourtCategory.ADVANCE_RULINGS,
        date="18 Jun 2026",
        rawDate="2026-06-18",
        impactScore=8.5,
        tags=["Section 2(102)", "OIDAR Services", "Intermediary Services", "Reverse Charge Mechanism"],
        summary=AISummary(
            facts=(
                "The applicant provides automated cloud-based artificial intelligence "
                "subscription tools to overseas enterprise clients with minimal human "
                "intervention, while hosting its secondary disaster recovery servers "
                "located in Mumbai. The lower authority (AAR) reclassified the export of "
                "AI software subscriptions as intermediary services taxable at 18% IGST."
            ),
            issue=(
                "Whether the supply of automated SaaS and AI subscription access to "
                "foreign recipients constitutes an 'Intermediary Service' under Section "
                "2(13) of IGST Act or qualifies as zero-rated export of services under "
                "Section 16 of IGST Act?"
            ),
            verdict=(
                "The Appellate Authority overturned the lower ruling, clarifying that "
                "providing proprietary cloud AI software on a principal-to-principal "
                "subscription basis does not constitute intermediary facilitation. The "
                "transaction qualifies as a zero-rated export of service exempt from "
                "domestic GST imposition."
            ),
        ),
        pdfUrl="/mock-pdfs/MAHA_AAAR_FinTech_SaaS_2026.pdf",
        pdfSize="890 KB",
        bench="Shri Ashok Kumar (Member Central) & Smt. Priya Ghadge (Member State)",
        assessmentYear="FY 2025-26",
        scraplingSourceUrl="https://mahagst.gov.in/advance-rulings/2026/fintech-saas",
        aiConfidence=98.9,
    ),
    GSTCase(
        id="gst-2026-circ-218",
        courtOrAuthority="Central Board of Indirect Taxes and Customs (CBIC)",
        title="CBIC Circular No. 218/12/2026-GST: Clarification on Valuation of Corporate Guarantees",
        category=CourtCategory.CIRCULARS,
        date="12 Jun 2026",
        rawDate="2026-06-12",
        impactScore=9.4,
        tags=["Rule 28(2)", "Corporate Guarantee", "Related Party Transactions", "Valuation Rules"],
        summary=AISummary(
            facts=(
                "Following widespread litigation regarding the 1% deemed open market "
                "valuation rule introduced for corporate guarantees issued by holding "
                "companies to subsidiary entities, industry bodies represented to CBIC "
                "seeking relief where full ITC is admissible to the recipient subsidiary."
            ),
            issue=(
                "Is the mandatory valuation rule of 1% per annum under Rule 28(2) "
                "applicable when corporate guarantees are extended between related parties "
                "where the recipient entity is eligible for full Input Tax Credit?"
            ),
            verdict=(
                "The CBIC officially clarified that where the recipient related party is "
                "eligible for full Input Tax Credit, the value declared in the tax invoice "
                "shall be deemed to be the open market value under the second proviso to "
                "Rule 28(1). If no invoice is issued or nil value is declared, the deemed "
                "value shall be treated as zero."
            ),
        ),
        pdfUrl="/mock-pdfs/CBIC_Circular_218_Corporate_Guarantees.pdf",
        pdfSize="512 KB",
        bench="Tax Research Unit (TRU), Ministry of Finance",
        assessmentYear="All Open Assessments",
        scraplingSourceUrl="https://cbic-gst.gov.in/circulars/2026/circ-218.html",
        aiConfidence=100.0,
    ),
    GSTCase(
        id="gst-2026-hc-055",
        courtOrAuthority="Gujarat High Court",
        title="M/s Logistics Express Multimodal vs. State of Gujarat & Anr.",
        category=CourtCategory.HIGH_COURT,
        date="05 Jun 2026",
        rawDate="2026-06-05",
        impactScore=8.9,
        tags=["Section 129", "E-Way Bill Expiry", "Transit Detention", "Minor Technical Breach"],
        summary=AISummary(
            facts=(
                "A heavy transit goods vehicle transporting pharmaceutical machinery worth "
                "Rs. 1.2 Crores was intercepted by the mobile squad at 2:30 AM, just 3 "
                "hours after the validity period of Part-B of the E-Way Bill had expired "
                "due to sudden vehicle mechanical breakdown on the highway."
            ),
            issue=(
                "Can tax authorities impose maximum penalty equal to 200% of the tax "
                "payable under Section 129(3) for minor technical expiry of an E-Way Bill "
                "during transit without establishing fraudulent intent or tax evasion?"
            ),
            verdict=(
                "The High Court set aside the heavy penalty order and ordered immediate "
                "release of the detained conveyance. It ruled that a mere delay of a few "
                "hours caused by bona fide transit difficulties, unaccompanied by any "
                "intention to evade tax, constitutes a minor technical breach subject only "
                "to nominal administrative penalties."
            ),
        ),
        pdfUrl="/mock-pdfs/Guj_HC_Logistics_EWayBill.pdf",
        pdfSize="1.1 MB",
        bench="Hon'ble Mr. Justice Bhargav D. Karia & Hon'ble Mr. Justice Niral R. Mehta",
        assessmentYear="FY 2025-26",
        scraplingSourceUrl="https://gujarathighcourt.nic.in/judgments/2026/logistics-express",
        aiConfidence=99.2,
    ),
]

# Build a quick lookup dict for O(1) single-case retrieval.
_CASES_BY_ID = {c.id: c for c in MOCK_CASES}


# ---------------------------------------------------------------------------
# Application
# ---------------------------------------------------------------------------

app = FastAPI(
    title="GST AI Dashboard API",
    description=(
        "Backend API for the GST AI Dashboard. Provides case law data, "
        "AI-generated summaries, filtering, and a Scrapling scrape trigger."
    ),
    version="0.1.0",
)

# Allow the Next.js frontend (any origin in dev).
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def _startup() -> None:
    """Log a banner when the server is ready."""
    print(
        "\n"
        "╔══════════════════════════════════════════════╗\n"
        "║   GST AI Dashboard API  •  v0.1.0           ║\n"
        "║   Docs  →  http://localhost:8000/docs        ║\n"
        "║   Cases →  http://localhost:8000/api/v1/cases ║\n"
        "╚══════════════════════════════════════════════╝\n"
    )


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------


def _filter_cases(
    cases: List[GSTCase],
    *,
    q: Optional[str] = None,
    category: Optional[CourtCategory] = None,
    date_range: DateRangeFilter = DateRangeFilter.ALL,
    sort_by: RelevanceSort = RelevanceSort.LATEST,
) -> List[GSTCase]:
    """Apply search, category, date-range filters and sorting to the case list."""

    filtered = list(cases)

    # ── Free-text search (case-insensitive, matches title / tags / summary) ──
    if q:
        q_lower = q.lower()
        filtered = [
            c
            for c in filtered
            if q_lower in c.title.lower()
            or q_lower in c.summary.facts.lower()
            or q_lower in c.summary.issue.lower()
            or q_lower in c.summary.verdict.lower()
            or any(q_lower in tag.lower() for tag in c.tags)
        ]

    # ── Category filter ──
    if category:
        filtered = [c for c in filtered if c.category == category]

    # ── Date-range filter ──
    today = date.today()

    if date_range == DateRangeFilter.TODAY:
        filtered = [c for c in filtered if c.raw_date == today.isoformat()]
    elif date_range == DateRangeFilter.THIS_WEEK:
        week_start = today - timedelta(days=today.weekday())
        filtered = [
            c for c in filtered if week_start.isoformat() <= c.raw_date <= today.isoformat()
        ]
    elif date_range == DateRangeFilter.THIS_MONTH:
        month_start = today.replace(day=1).isoformat()
        filtered = [
            c for c in filtered if month_start <= c.raw_date <= today.isoformat()
        ]
    # DateRangeFilter.ALL and DateRangeFilter.CUSTOM are no-ops at mock level.

    # ── Sorting ──
    if sort_by == RelevanceSort.LATEST:
        filtered.sort(key=lambda c: c.raw_date, reverse=True)
    else:
        filtered.sort(key=lambda c: c.impact_score, reverse=True)

    return filtered


# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------


@app.get(
    "/api/v1/cases",
    response_model=CaseListResponse,
    summary="List GST cases",
    tags=["Cases"],
)
async def list_cases(
    q: Optional[str] = Query(None, description="Free-text search across title, tags and summary"),
    category: Optional[CourtCategory] = Query(None, description="Filter by court category"),
    date_range: DateRangeFilter = Query(DateRangeFilter.ALL, description="Pre-set date window"),
    sort_by: RelevanceSort = Query(RelevanceSort.LATEST, description="Sort order"),
) -> CaseListResponse:
    """
    Return all GST cases with optional filtering and sorting.

    Query parameters mirror the frontend `FilterState` interface so the
    Next.js client can forward its state directly.
    """
    results = _filter_cases(MOCK_CASES, q=q, category=category, date_range=date_range, sort_by=sort_by)
    return CaseListResponse(total=len(results), cases=results)


@app.get(
    "/api/v1/cases/{case_id}",
    response_model=GSTCase,
    summary="Get a single GST case",
    tags=["Cases"],
)
async def get_case(case_id: str) -> GSTCase:
    """
    Retrieve a single case by its unique ID (e.g. `gst-2026-hc-089`).
    Returns 404 if the case is not found.
    """
    case = _CASES_BY_ID.get(case_id)
    if case is None:
        raise HTTPException(status_code=404, detail=f"Case '{case_id}' not found.")
    return case


@app.post(
    "/api/v1/scrape/trigger",
    response_model=ScrapeResponse,
    summary="Trigger a Scrapling scrape job",
    tags=["Scraper"],
)
async def trigger_scrape() -> ScrapeResponse:
    """
    Mock endpoint that simulates kicking off a Scrapling-based scrape.

    In production this would enqueue a background task (e.g. via Celery or
    `BackgroundTasks`) that runs the Scrapling fetchers defined below.
    """
    return ScrapeResponse(
        job_id=str(uuid.uuid4()),
        status="queued",
        message="Scrape job queued successfully. Cases will refresh automatically.",
        estimated_seconds=30,
    )


@app.get(
    "/api/v1/health",
    response_model=HealthResponse,
    summary="Health check",
    tags=["Ops"],
)
async def health_check() -> HealthResponse:
    """Simple liveness probe for container orchestrators and uptime monitors."""
    return HealthResponse(
        status="healthy",
        version="0.1.0",
        timestamp=datetime.utcnow().isoformat() + "Z",
    )


# ---------------------------------------------------------------------------
# === SCRAPLING INTEGRATION (https://github.com/d4vinci/Scrapling) ===
# ---------------------------------------------------------------------------
#
# Scrapling is a high-performance, anti-bot web-scraping library with smart
# element matching.  Below are ready-to-use stubs for scraping CBIC circulars
# and High Court GST judgments.
#
# Install:  pip install scrapling
#
# ─── Scrape CBIC Circulars ─────────────────────────────────────────────────
#
# from scrapling import Fetcher
# fetcher = Fetcher(auto_match=True)
#
# async def scrape_cbic_circulars():
#     """
#     Scrape the latest CBIC GST circulars from the official government
#     portal and yield GSTCase instances ready for database insertion.
#     """
#     page = fetcher.get('https://cbic-gst.gov.in/circulars.html')
#     circulars = page.css('.circular-row')
#     for c in circulars:
#         title = c.css_first('.title').text()
#         pdf_link = c.css_first('a.pdf-download').attrib['href']
#         date = c.css_first('.date').text()
#         yield GSTCase(title=title, pdf_url=pdf_link, date=date, ...)
#
# ─── Scrape High Court Judgments ───────────────────────────────────────────
#
# async def scrape_high_court_judgments(court: str):
#     """
#     Scrape GST-specific judgments from a given High Court NIC portal.
#
#     Args:
#         court: Sub-domain slug, e.g. "delhihighcourt", "gujarathighcourt".
#     """
#     page = fetcher.get(f'https://{court}.nic.in/gst-judgments')
#     judgments = page.css('.judgment-entry')
#     for j in judgments:
#         title = j.css_first('.case-title').text()
#         ...
#
# ---------------------------------------------------------------------------
