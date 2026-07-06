import { GSTCase } from '../types';

export const ALL_ADVISORIES_BANK: GSTCase[] = [
  {
    id: "advisory-2026-07-02",
    title: "FAQs on Mandatory Capture of Ship-to Field and Voluntary Closure of E-Way Bill, 2026",
    courtOrAuthority: "GST Network (GSTN)",
    category: "Advisories",
    date: "02 Jul 2026",
    rawDate: "2026-07-02",
    impactScore: 9.6,
    sectionId: "sec-129",
    tags: ["E-Way Bill", "Ship-To Field", "Voluntary Closure", "FAQs"],
    summary: {
      facts: "Various doubts, queries, and representations received from taxpayers, trade, GST Suvidha Providers (GSPs), and other stakeholders regarding the mandatory capture of the Ship-to field in E-Way Bills and the voluntary closure of E-Way Bills have been examined.",
      issue: "Clarity on implementing validation rules for Bill-To/Ship-To transactions and configuring portal parameters for transporter-initiated closures.",
      verdict: "GSTN published a comprehensive set of Frequently Asked Questions (FAQs) providing necessary clarifications on operational procedures and technical validations on the portal."
    },
    pdfUrl: "/mock-pdfs/Advisory_EWB_FAQs_2026.pdf",
    pdfSize: "1.1 MB",
    bench: "GSTN Help & Taxpayer Services Division",
    assessmentYear: "FY 2026-27",
    scraplingSourceUrl: "https://services.gst.gov.in/services/advisory/advisoryandreleases",
    aiConfidence: 100.0
  },
  {
    id: "advisory-2026-07-01",
    title: "Advisory on Revision of Timeline for Amendment of Aggregate Annual Turnover (AATO), 2026",
    courtOrAuthority: "GST Network (GSTN)",
    category: "Advisories",
    date: "01 Jul 2026",
    rawDate: "2026-07-01",
    impactScore: 9.5,
    sectionId: "sec-16",
    tags: ["Returns", "AATO Amendment", "Turnover Calculation", "System Upgrade"],
    summary: {
      facts: "The Aggregate Annual Turnover (AATO) functionality is currently being upgraded on the GST Portal to enable automatic updation of AATO as subsequent returns are filed post amendment window.",
      issue: "Revision of the active window for taxpayers to manually amend their auto-calculated AATO on the portal.",
      verdict: "As this enhanced functionality is being deployed from 1st July 2026, the window for amendment of AATO by taxpayers for FY 2025-26 has been revised on the GST Portal starting from 1st July 2026."
    },
    pdfUrl: "/mock-pdfs/Advisory_AATO_Revision_2026.pdf",
    pdfSize: "0.8 MB",
    bench: "GSTN Returns Module Operations",
    assessmentYear: "FY 2025-26",
    scraplingSourceUrl: "https://services.gst.gov.in/services/advisory/advisoryandreleases",
    aiConfidence: 100.0
  },
  {
    id: "advisory-2026-06-22",
    title: "GSTN Advisory: Auto-Computation of Interest on Delayed Filing of GSTR-3B under Rule 88B",
    courtOrAuthority: "GST Network (GSTN)",
    category: "Advisories",
    date: "22 Jun 2026",
    rawDate: "2026-06-22",
    impactScore: 9.8,
    sectionId: "rule-36-4",
    tags: ["Interest Computation", "GSTR-3B Table 5.1", "Rule 88B(1)", "Electronic Cash Ledger"],
    summary: {
      facts: "GSTN released a technical advisory on the system enhancement auto-calculating interest under Rule 88B(1) of the CGST Rules.",
      issue: "How interest is computed on late payment of tax when a credit balance exists in the Electronic Cash Ledger (ECL) before filing GSTR-3B.",
      verdict: "Interest is computed only on the portion of tax paid by debiting the Electronic Cash Ledger after the due date. The system automatically excludes any cash balance available in the ECL prior to the due date."
    },
    pdfUrl: "/mock-pdfs/Advisory_Rule88B_Interest.pdf",
    pdfSize: "0.9 MB",
    bench: "GSTN Technical Portal Advisory Team",
    assessmentYear: "FY 2026-27",
    scraplingSourceUrl: "https://services.gst.gov.in/services/advisory/advisoryandreleases",
    aiConfidence: 100.0
  },
  {
    id: "advisory-2026-04-18",
    title: "GSTN Advisory: Launch of Voluntary e-Way Bill Closure Facility for Transporters",
    courtOrAuthority: "GST Network (GSTN)",
    category: "Advisories",
    date: "18 Apr 2026",
    rawDate: "2026-04-18",
    impactScore: 9.2,
    sectionId: "sec-129",
    tags: ["e-Way Bill", "Voluntary Closure", "Transporter Hub", "Goods Movement"],
    summary: {
      facts: "Advisory introducing a portal enhancement allowing active e-Way Bills to be voluntarily marked as closed/terminated by transporters.",
      issue: "Preventing misuse of unexpired active e-Way Bills when goods have been delivered early or the trip is cancelled midway.",
      verdict: "Transporters can now voluntarily log into the e-Way Bill portal and close the movement, preventing intercepting officers from flagging duplicate transport operations."
    },
    pdfUrl: "/mock-pdfs/Advisory_EWB_VoluntaryClosure.pdf",
    pdfSize: "0.7 MB",
    bench: "GSTN e-Way Bill Portal Team",
    assessmentYear: "FY 2026-27",
    scraplingSourceUrl: "https://services.gst.gov.in/services/advisory/advisoryandreleases",
    aiConfidence: 100.0
  },
  {
    id: "advisory-2026-02-12",
    title: "GSTN Advisory: Nationwide Rollout of Biometric-Based Aadhaar Authentication for GST Registration",
    courtOrAuthority: "GST Network (GSTN)",
    category: "Advisories",
    date: "12 Feb 2026",
    rawDate: "2026-02-12",
    impactScore: 9.9,
    sectionId: "sec-16",
    tags: ["GST Registration", "Biometric Authentication", "Aadhaar Verification", "GST Suvidha Kendra"],
    summary: {
      facts: "Consolidated system advisory announcing the complete nationwide implementation of biometric-based verification for new applicants.",
      issue: "Controlling fake registrations and circular trading by verifying the physical presence of promoters at GST Suvidha Kendras (GSKs).",
      verdict: "Applicants selected by risk parameter algorithms receive an email link to schedule biometric scans. GSTIN generation is held pending successful authentication."
    },
    pdfUrl: "/mock-pdfs/Advisory_Biometric_Aadhaar.pdf",
    pdfSize: "1.1 MB",
    bench: "GSTN Registration Portal Operations",
    assessmentYear: "FY 2025-26",
    scraplingSourceUrl: "https://services.gst.gov.in/services/advisory/advisoryandreleases",
    aiConfidence: 100.0
  },
  {
    id: "advisory-2025-10-14",
    title: "GSTN Advisory: Rollout of Invoice Management System (IMS) for Inward Supplies & ITC Recipient Action",
    courtOrAuthority: "GST Network (GSTN)",
    category: "Advisories",
    date: "14 Oct 2025",
    rawDate: "2025-10-14",
    impactScore: 10.0,
    sectionId: "sec-16",
    tags: ["Invoice Management System", "IMS Portal", "ITC Reconciliation", "Accept Reject Invoices"],
    summary: {
      facts: "Comprehensive taxpayer advisory introducing the Invoice Management System (IMS) dashboard on the GST Portal.",
      issue: "How recipients can match GSTR-2B invoices, resolve disputes, and accept, reject, or keep invoices pending.",
      verdict: "Taxpayers are advised to action invoices before filing GSTR-3B. Rejected invoices flow back to the supplier for corrections in GSTR-1/1A."
    },
    pdfUrl: "/mock-pdfs/Advisory_IMS_Rollout.pdf",
    pdfSize: "1.5 MB",
    bench: "GSTN Policy & Systems Integration",
    assessmentYear: "FY 2025-26",
    scraplingSourceUrl: "https://services.gst.gov.in/services/advisory/advisoryandreleases",
    aiConfidence: 100.0
  },
  {
    id: "advisory-2025-05-03",
    title: "GSTN Advisory: Mandatory HSN Code Reporting Requirements in Form GSTR-1 / GSTR-1A",
    courtOrAuthority: "GST Network (GSTN)",
    category: "Advisories",
    date: "03 May 2025",
    rawDate: "2025-05-03",
    impactScore: 9.4,
    sectionId: "sec-16",
    tags: ["HSN Code", "GSTR-1 Table 12", "GSTR-1A", "Tax Rate Matching"],
    summary: {
      facts: "Technical advisory on system validations enforcing HSN code disclosures in Table 12 of GSTR-1.",
      issue: "Compliance requirements for taxpayers with aggregate annual turnover (AATO) above and below Rs. 5 Crores.",
      verdict: "Minimum 4-digit HSN codes are mandatory for taxpayers with AATO up to Rs. 5 Crores; 6-digit or 8-digit HSN codes are mandatory for AATO exceeding Rs. 5 Crores."
    },
    pdfUrl: "/mock-pdfs/Advisory_HSN_Reporting.pdf",
    pdfSize: "0.8 MB",
    bench: "GSTN IT Development Division",
    assessmentYear: "FY 2025-26",
    scraplingSourceUrl: "https://services.gst.gov.in/services/advisory/advisoryandreleases",
    aiConfidence: 100.0
  }
];
