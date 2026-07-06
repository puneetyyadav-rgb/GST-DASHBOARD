import { GSTCase } from '../types';

export const ALL_NOTIFICATIONS_BANK: GSTCase[] = [
  // June 2026 Notifications
  {
    id: "notif-2026-ct-015",
    title: "Central Tax Notification No. 15/2026-Central Tax: Amendment to Rule 86B 1% Cash Payment Exemption Threshold",
    courtOrAuthority: "Ministry of Finance (CBIC)",
    category: "Notifications",
    date: "28 Jun 2026",
    rawDate: "2026-06-28",
    impactScore: 9.7,
    sectionId: "rule-36-4",
    tags: ["Notification 15/2026", "Rule 86B", "1% Cash Payment", "Electronic Credit Ledger", "Export Exemption"],
    summary: {
      facts: "Issued vide G.S.R. 380(E) under Section 164 of the CGST Act amending Rule 86B conditions.",
      issue: "Relaxing mandatory 1% cash payment requirement for registered entities whose monthly taxable turnover exceeds Rs. 50 Lakhs but maintain zero-rated export status.",
      verdict: "Exemption granted to 100% Export Oriented Units (EOUs) and SEZ developers whose unutilized ITC refund claim has been verified in the preceding financial year."
    },
    pdfUrl: "/mock-pdfs/Notif_15_2026_CT.pdf",
    pdfSize: "1.2 MB",
    bench: "Department of Revenue, Ministry of Finance",
    assessmentYear: "FY 2026-27",
    scraplingSourceUrl: "https://cbic-gst.gov.in/central-tax-notifications.html",
    aiConfidence: 100.0
  },
  {
    id: "notif-2026-ct-013",
    title: "Notification No. 13/2026-Central Tax: Special Procedure for Input Service Distributor (ISD) Transition under Section 20",
    courtOrAuthority: "Ministry of Finance (CBIC)",
    category: "Notifications",
    date: "20 Jun 2026",
    rawDate: "2026-06-20",
    impactScore: 9.8,
    sectionId: "rule-28",
    tags: ["Notification 13/2026", "ISD Mandatory", "Section 20", "Common Credit Distribution", "Cross Charge"],
    summary: {
      facts: "Issued vide G.S.R. 325(E) operationalizing mandatory ISD mechanism enacted via Finance Act.",
      issue: "Mandating all multi-state corporate entities receiving common third-party services at head office to distribute credit exclusively through ISD registration rather than cross-charge invoices.",
      verdict: "Notified transition window up to September 30, 2026 without penalties for converting existing regular head office GSTIN into ISD registration."
    },
    pdfUrl: "/mock-pdfs/Notif_13_2026_CT.pdf",
    pdfSize: "1.4 MB",
    bench: "Department of Revenue, Ministry of Finance",
    assessmentYear: "FY 2026-27",
    scraplingSourceUrl: "https://cbic-gst.gov.in/central-tax-notifications.html",
    aiConfidence: 100.0
  },
  {
    id: "notif-2026-ct-011",
    title: "Central Tax Notification No. 11/2026-Central Tax: Waiver of Interest for Systemic Portal Glitches during GSTR-3B Filing",
    courtOrAuthority: "Ministry of Finance (CBIC)",
    category: "Notifications",
    date: "15 Jun 2026",
    rawDate: "2026-06-15",
    impactScore: 9.4,
    sectionId: "sec-50",
    tags: ["Notification 11/2026", "Section 50", "Interest Waiver", "Technical Glitch", "Portal Downtime"],
    summary: {
      facts: "Issued vide G.S.R. 301(E) addressing widespread GSTN portal latency experienced on statutory due dates.",
      issue: "Whether automatic interest computation under Section 50 applies where taxpayers attempted payment before midnight but ledger debit succeeded the following morning.",
      verdict: "Notified complete waiver of statutory interest under Section 50(1) for transactions delayed strictly due to documented GSTN server timeouts."
    },
    pdfUrl: "/mock-pdfs/Notif_11_2026_CT.pdf",
    pdfSize: "1.0 MB",
    bench: "Department of Revenue, Ministry of Finance",
    assessmentYear: "FY 2026-27",
    scraplingSourceUrl: "https://cbic-gst.gov.in/central-tax-notifications.html",
    aiConfidence: 100.0
  },
  {
    id: "notif-2026-ct-010",
    title: "Notification No. 10/2026-Central Tax (Rate): Rationalization of Reverse Charge Mechanism (RCM) on Metal Scrap Trade",
    courtOrAuthority: "Ministry of Finance (CBIC)",
    category: "Notifications",
    date: "12 Jun 2026",
    rawDate: "2026-06-12",
    impactScore: 9.5,
    sectionId: "sec-9",
    tags: ["Rate Notification 10/2026", "Section 9(3)", "Reverse Charge RCM", "Metal Scrap", "Unregistered Supplier"],
    summary: {
      facts: "Issued vide G.S.R. 295(E) amending Notification No. 4/2017-Central Tax (Rate) regarding B2B supplies of recyclable ferrous and non-ferrous scrap.",
      issue: "Preventing circular trading and fake invoice syndicates in scrap metal industry where unregistered aggregators evade tax.",
      verdict: "Mandating 100% Reverse Charge Mechanism (RCM) liability on registered manufacturers purchasing scrap from unregistered dealers or semi-organized traders."
    },
    pdfUrl: "/mock-pdfs/Notif_10_2026_CT_Rate.pdf",
    pdfSize: "1.3 MB",
    bench: "Tax Research Unit, Ministry of Finance",
    assessmentYear: "FY 2026-27",
    scraplingSourceUrl: "https://cbic-gst.gov.in/central-tax-notifications.html",
    aiConfidence: 100.0
  },
  {
    id: "notif-2026-ct-008",
    title: "Central Tax Notification No. 08/2026-Central Tax: Threshold Exemption for E-Way Bill Generation on Intra-City Job Work Transfers",
    courtOrAuthority: "Ministry of Finance (CBIC)",
    category: "Notifications",
    date: "05 Jun 2026",
    rawDate: "2026-06-05",
    impactScore: 9.3,
    sectionId: "sec-129",
    tags: ["Notification 08/2026", "Rule 138", "E-Way Bill Exemption", "Job Work", "Intra-City Transfer"],
    summary: {
      facts: "Issued vide G.S.R. 280(E) under Section 68 read with Rule 138(14) of CGST Rules.",
      issue: "Harassment of textile and auto-component manufacturers during highway interceptions for movements between job worker premises within a 20 km radius.",
      verdict: "Exempted requirement of generating Part-B of E-Way Bill for intra-city job work movements where consignment value is below Rs. 2 Lakhs accompanied by delivery challan."
    },
    pdfUrl: "/mock-pdfs/Notif_08_2026_CT.pdf",
    pdfSize: "1.1 MB",
    bench: "Department of Revenue, Ministry of Finance",
    assessmentYear: "FY 2026-27",
    scraplingSourceUrl: "https://cbic-gst.gov.in/central-tax-notifications.html",
    aiConfidence: 100.0
  }
];
