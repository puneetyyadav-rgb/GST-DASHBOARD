import { GSTCase, GSTSectionInfo } from './types';
import { CHRONOLOGICAL_CASES } from './data/chronologicalCases';
import { OLDER_CHRONOLOGICAL_CASES } from './data/olderChronologicalCases';
import { LANDMARK_SECTION_CASES, ADDITIONAL_POPULAR_SECTIONS } from './data/landmarkSectionCases';
import { generateCasesForSection } from './data/sectionCaseGenerator';

// 10 Major Litigated & Popular GST Statutory Sections
export const GST_SECTIONS_DATA: GSTSectionInfo[] = [
  {
    id: "sec-16",
    sectionNumber: "Section 16(2) & 16(4)",
    title: "Conditions & Time Limit for Availing Input Tax Credit (ITC)",
    chapter: "Chapter V - Input Tax Credit",
    litigationScore: 10.0,
    summaryDescription: "The most litigated provision in GST law governing conditions for claiming ITC, vendor invoice matching (GSTR-2B), and statutory time limits under Section 16(4).",
    popularKeywords: ["GSTR-2B Matching", "Section 16(2)(c)", "Time Limit 16(4)", "Vendor Default"]
  },
  {
    id: "sec-17-5",
    sectionNumber: "Section 17(5)",
    title: "Blocked Input Tax Credit (Apportionment of Credit)",
    chapter: "Chapter V - Input Tax Credit",
    litigationScore: 9.9,
    summaryDescription: "Exclusions where Input Tax Credit is explicitly denied by statute, such as works contract for immovable property, motor vehicles, employee gifts, and personal consumption.",
    popularKeywords: ["Works Contract", "Immovable Property", "Corporate Perks", "Motor Vehicles"]
  },
  {
    id: "sec-129",
    sectionNumber: "Section 129 & 130",
    title: "Detention, Seizure and Release of Goods & Conveyance in Transit",
    chapter: "Chapter XIX - Offences and Penalties",
    litigationScore: 9.6,
    summaryDescription: "Rules governing mobile highway interceptions, E-way bill expiry penalties, valuation disputes during transit, and confiscation of vehicles.",
    popularKeywords: ["E-Way Bill Expiry", "Part-B Not Updated", "Highway Detention", "200% Penalty"]
  },
  {
    id: "sec-73",
    sectionNumber: "Section 73 & 74",
    title: "Determination of Tax & Show Cause Notices (Non-Fraud vs Fraud)",
    chapter: "Chapter XV - Demands and Recovery",
    litigationScore: 9.7,
    summaryDescription: "Adjudication notices issued by tax officers for short-paid tax or wrongful ITC availment, limitation periods, personal hearing mandates, and natural justice violations.",
    popularKeywords: ["Limitation Period", "Natural Justice", "Personal Hearing", "Fraud Suppression"]
  },
  {
    id: "rule-28",
    sectionNumber: "Rule 28 & Schedule I",
    title: "Valuation of Supplies Between Related Parties & Distinct Persons",
    chapter: "Chapter IV - Determination of Value of Supply",
    litigationScore: 9.4,
    summaryDescription: "Valuation rules for inter-branch transfers, corporate financial guarantees given by holding companies to subsidiaries, and cross-charge allocations.",
    popularKeywords: ["Corporate Guarantees", "1% Rule", "Second Proviso Rule 28", "Cross Charge"]
  },
  {
    id: "rule-36-4",
    sectionNumber: "Rule 36(4) & Rule 86A",
    title: "ITC Restriction & Electronic Credit Ledger Blocking",
    chapter: "Chapter V - Input Tax Credit Rules",
    litigationScore: 9.2,
    summaryDescription: "Provisional ITC caps, mandatory 1% cash payment rules under Rule 86B, and debit freeze on electronic credit ledgers under Rule 86A.",
    popularKeywords: ["Rule 86A Blocking", "Credit Ledger", "1 Year Expiry", "Negative Balance"]
  },
  ...ADDITIONAL_POPULAR_SECTIONS
];

// Initial Core Cases Hand-Crafted
const CORE_INITIAL_CASES: GSTCase[] = [
  {
    id: "gst-2026-circ-255",
    title: "CBIC Circular No. 255/01/2026-GST: Standard Operating Procedure & Policy Clarifications on Audit and Investigations",
    courtOrAuthority: "CBIC GST Policy Wing",
    category: "Circulars",
    date: "25 Jun 2026",
    rawDate: "2026-07-02",
    impactScore: 10.0,
    sectionId: "sec-16",
    tags: ["Circular No. 255", "25th June 2026", "CBIC Policy Wing", "Audit Instructions", "Section 16 / 73"],
    summary: {
      facts: "Issued vide F. No. CBIC-20010/11/2026-GST on 25th June, 2026 by the Central Board of Indirect Taxes and Customs (GST Policy Wing), addressed to all Principal Chief Commissioners and Director Generals across India.",
      issue: "Establishing standardized operational instructions to prevent roving audits, repetitive summons, and coercive tax recovery during GST investigations under Sections 16, 73, and 74.",
      verdict: "The CBIC Policy Wing strictly directed that audit notices must not be issued without prior approval of the Commissioner and every inquiry must bear a valid Document Identification Number (DIN). Coercive recovery during investigation is prohibited."
    },
    pdfUrl: "/mock-pdfs/CBIC_Circular_255_01_2026.pdf",
    pdfSize: "1.8 MB",
    bench: "GST Policy Wing, Ministry of Finance, CBIC",
    assessmentYear: "All Applicable Periods",
    scraplingSourceUrl: "https://cbic-gst.gov.in/circulars.html",
    aiConfidence: 100.0,
    isNewArrival: true
  },
  {
    id: "gst-2026-hc-089",
    title: "M/s CloudNexus Technologies Pvt. Ltd. vs. Union of India & Ors.",
    courtOrAuthority: "Delhi High Court",
    category: "High Court",
    date: "29 Jun 2026",
    rawDate: "2026-06-29",
    impactScore: 9.8,
    sectionId: "sec-16",
    tags: ["Section 16(2)(c)", "GSTR-2B Reconciliation", "Vendor Default", "Input Tax Credit"],
    summary: {
      facts: "The petitioner availed Input Tax Credit (ITC) of Rs. 4.82 Crores based on genuine tax invoices and verified bank payments during FY 2023-24. The revenue department issued a demand notice denying ITC solely because the supplier failed to remit the tax collected to the government treasury.",
      issue: "Can a bona fide recipient of services be denied Input Tax Credit under Section 16(2)(c) strictly due to the default of the selling dealer without initiating recovery proceedings against the defaulting supplier?",
      verdict: "The High Court quashed the demand order, ruling that Section 16(2)(c) cannot be invoked against an honest purchasing dealer unless collusion or exceptional circumstances like missing dealer fraud are proven."
    },
    pdfUrl: "/mock-pdfs/CloudNexus_vs_UOI_2026.pdf",
    pdfSize: "1.4 MB",
    bench: "Hon'ble Mr. Justice Vibhu Bakhru & Hon'ble Mr. Justice Amit Mahajan",
    assessmentYear: "FY 2023-24",
    scraplingSourceUrl: "https://taxjudgments.nic.in/delhi-hc/2026/06/cloudnexus",
    aiConfidence: 99.6
  },
  {
    id: "gst-2026-sc-021",
    title: "Union of India vs. M/s Shanthal Industries Ltd.",
    courtOrAuthority: "Supreme Court of India",
    category: "Supreme Court",
    date: "22 Jun 2026",
    rawDate: "2026-06-22",
    impactScore: 10.0,
    sectionId: "sec-16",
    tags: ["Section 16(4)", "Retrospective Extension", "GSTR-3B Due Date", "Constitutional Validity"],
    summary: {
      facts: "Tax authorities disallowed ITC claimed by thousands of taxpayers where annual returns or belated GSTR-3B returns for FY 2018-19 and FY 2019-20 were filed beyond the November 30 statutory deadline stipulated under Section 16(4).",
      issue: "Whether the retrospective relief provided under Finance Act inserting Section 16(5) validates past belated ITC claims without payment of statutory interest and penalties?",
      verdict: "The Supreme Court upheld the constitutional validity of retrospective ITC regularisation under Section 16(5), declaring that taxpayers who filed belated returns before the notified cutoff dates are entitled to full restoration of disallowed credit."
    },
    pdfUrl: "/mock-pdfs/SC_Shanthal_Section16_4.pdf",
    pdfSize: "4.1 MB",
    bench: "Hon'ble Chief Justice & Hon'ble Mr. Justice Sanjiv Khanna",
    assessmentYear: "FY 2018-20",
    scraplingSourceUrl: "https://main.sci.gov.in/judgments/2026/gst-shanthal",
    aiConfidence: 99.9
  },
  {
    id: "gst-2026-circ-220",
    title: "CBIC Circular No. 220/14/2026-GST: Standard Operating Procedure for Section 16(2)(c) Audits",
    courtOrAuthority: "Circulars",
    category: "Circulars",
    date: "15 Jun 2026",
    rawDate: "2026-06-15",
    impactScore: 9.3,
    sectionId: "sec-16",
    tags: ["Section 16(2)(c)", "CBIC SOP", "Vendor Investigation", "Audit Instructions"],
    summary: {
      facts: "To reduce needless High Court writ petitions against purchasing dealers where selling suppliers defaulted on tax payment, CBIC formulated a mandatory multi-step verification protocol for field audit officers.",
      issue: "What exact steps must jurisdictional GST officers undertake before issuing show cause notices denying ITC to buyers due to supplier non-payment?",
      verdict: "The Board instructed that field officers must first exhaust coercive recovery measures against the defaulting seller under Section 79. Action against the bona fide buyer can only be initiated if the seller is proven non-existent or collusive."
    },
    pdfUrl: "/mock-pdfs/CBIC_Circular_220_SOP_16_2_c.pdf",
    pdfSize: "640 KB",
    bench: "Tax Research Unit (TRU), CBIC",
    assessmentYear: "All Assessment Years",
    scraplingSourceUrl: "https://cbic-gst.gov.in/circulars/2026/circ-220.html",
    aiConfidence: 100.0
  },
  {
    id: "gst-2026-sc-014",
    title: "Commissioner of CGST vs. M/s Apex Heavy Engineering Ltd.",
    courtOrAuthority: "Supreme Court of India",
    category: "Supreme Court",
    date: "24 Jun 2026",
    rawDate: "2026-06-24",
    impactScore: 10.0,
    sectionId: "sec-17-5",
    tags: ["Section 17(5)(d)", "Works Contract", "Immovable Property", "Plant and Machinery"],
    summary: {
      facts: "The respondent manufacturing company constructed a turnkey industrial shed and steel support foundation essential for operating heavy overhead cranes. The department blocked ITC under Section 17(5)(d), classifying it as immovable property.",
      issue: "Does Section 17(5)(d) restrict Input Tax Credit on structural steel and foundations when such structures are functionally integral to the operation of plant and machinery?",
      verdict: "The Supreme Court affirmed the functionality test. It ruled that foundations and structural supports integral to plant and machinery fall outside the restriction of Section 17(5)(d), entitling the taxpayer to 100% ITC."
    },
    pdfUrl: "/mock-pdfs/SC_Apex_Engineering_Section17_5.pdf",
    pdfSize: "3.2 MB",
    bench: "Hon'ble Dr. Justice D.Y. Chandrachud & Hon'ble Mr. Justice J.B. Pardiwala",
    assessmentYear: "FY 2022-23",
    scraplingSourceUrl: "https://main.sci.gov.in/judgments/2026/gst-apex-eng",
    aiConfidence: 99.8
  },
  {
    id: "gst-2026-hc-055",
    title: "M/s Logistics Express Multimodal vs. State of Gujarat & Anr.",
    courtOrAuthority: "Gujarat High Court",
    category: "High Court",
    date: "05 Jun 2026",
    rawDate: "2026-06-05",
    impactScore: 8.9,
    sectionId: "sec-129",
    tags: ["Section 129", "E-Way Bill Expiry", "Transit Detention", "Minor Breach"],
    summary: {
      facts: "A heavy transit goods vehicle transporting machinery worth Rs. 1.2 Crores was intercepted at 2:30 AM, just 3 hours after Part-B E-Way Bill expired due to sudden vehicle mechanical breakdown on the highway.",
      issue: "Can tax authorities impose maximum penalty equal to 200% of the tax payable under Section 129(3) for minor technical expiry of an E-Way Bill during transit without establishing tax evasion intent?",
      verdict: "The High Court set aside the penalty order and ordered release of the conveyance. A delay of a few hours caused by bona fide transit breakdown unaccompanied by evasion intent constitutes only a minor technical breach."
    },
    pdfUrl: "/mock-pdfs/Guj_HC_Logistics_EWayBill.pdf",
    pdfSize: "1.1 MB",
    bench: "Hon'ble Mr. Justice Bhargav D. Karia & Hon'ble Mr. Justice Niral R. Mehta",
    assessmentYear: "FY 2025-26",
    scraplingSourceUrl: "https://gujarathighcourt.nic.in/judgments/2026/logistics-express",
    aiConfidence: 99.2
  },
  {
    id: "gst-2026-hc-091",
    title: "M/s Global Retail Ventures vs. Assistant Commissioner of State Tax",
    courtOrAuthority: "Bombay High Court",
    category: "High Court",
    date: "27 Jun 2026",
    rawDate: "2026-06-27",
    impactScore: 9.6,
    sectionId: "sec-73",
    tags: ["Section 73(9)", "Personal Hearing Denied", "Natural Justice", "SCN Adjudication"],
    summary: {
      facts: "The adjudicating officer issued a confirmed demand order of Rs. 8.4 Crores under Section 73 without checking the box granting personal hearing in Form GST DRC-01, passing an ex-parte order.",
      issue: "Whether an adjudication order passed under Section 73 without affording a personal hearing violates Section 75(4) and natural justice principles?",
      verdict: "The High Court quashed the order as void ab initio, ruling that Section 75(4) makes it mandatory to grant personal hearing whenever an adverse decision is contemplated against the taxpayer, even if not specifically requested."
    },
    pdfUrl: "/mock-pdfs/Bombay_HC_Global_Retail_Sec73.pdf",
    pdfSize: "1.5 MB",
    bench: "Hon'ble Mr. Justice G.S. Kulkarni & Hon'ble Mr. Justice Jitendra Jain",
    assessmentYear: "FY 2021-22",
    scraplingSourceUrl: "https://bombayhighcourt.nic.in/judgments/2026/global-retail",
    aiConfidence: 99.7
  },
  {
    id: "gst-2026-circ-218",
    title: "CBIC Circular No. 218/12/2026-GST: Valuation of Corporate Guarantees",
    courtOrAuthority: "Circulars",
    category: "Circulars",
    date: "12 Jun 2026",
    rawDate: "2026-06-12",
    impactScore: 9.4,
    sectionId: "rule-28",
    tags: ["Rule 28(2)", "Corporate Guarantee", "Related Party", "Second Proviso"],
    summary: {
      facts: "Following widespread litigation regarding the 1% deemed open market valuation rule introduced for corporate guarantees extended by holding companies to subsidiaries, CBIC issued a major clarification.",
      issue: "Is the 1% annual deemed valuation mandatory under Rule 28(2) when extended to related parties eligible for full Input Tax Credit?",
      verdict: "CBIC officially clarified that where the recipient related party is eligible for full Input Tax Credit, the invoice value declared (even if declared as zero or nil) shall be deemed to be the open market value under Rule 28(1)."
    },
    pdfUrl: "/mock-pdfs/CBIC_Circular_218_Corporate_Guarantees.pdf",
    pdfSize: "512 KB",
    bench: "Tax Research Unit (TRU), CBIC",
    assessmentYear: "All Open Assessments",
    scraplingSourceUrl: "https://cbic-gst.gov.in/circulars/2026/circ-218.html",
    aiConfidence: 100.0
  },
  {
    id: "gst-2026-hc-033",
    title: "M/s Precision Metalcraft India vs. Commissioner of Central Tax",
    courtOrAuthority: "Karnataka High Court",
    category: "High Court",
    date: "19 May 2026",
    rawDate: "2026-05-19",
    impactScore: 9.0,
    sectionId: "rule-36-4",
    tags: ["Rule 86A", "Electronic Credit Ledger", "Negative Balance", "Provisional Blocking"],
    summary: {
      facts: "The proper officer invoked Rule 86A to block the taxpayer's Electronic Credit Ledger to the extent of Rs. 3.5 Crores without giving any written reason, resulting in a negative ITC ledger balance.",
      issue: "Does Rule 86A empower revenue officers to block credit ledgers creating a negative balance where sufficient credit balance is unavailable?",
      verdict: "The High Court ruled that Rule 86A only permits blocking of credit available in the ledger at the time of order. Officers cannot create a negative balance or block future incoming credit without adjudication."
    },
    pdfUrl: "/mock-pdfs/Kar_HC_Precision_Rule86A.pdf",
    pdfSize: "1.2 MB",
    bench: "Hon'ble Mr. Justice S.R. Krishna Kumar",
    assessmentYear: "FY 2024-25",
    scraplingSourceUrl: "https://karnatakahighcourt.nic.in/judgments/2026/precision-metalcraft",
    aiConfidence: 99.4
  }
];

// Combine all hand-crafted core cases
const ALL_HANDCRAFTED_CASES: GSTCase[] = [
  ...CORE_INITIAL_CASES,
  ...CHRONOLOGICAL_CASES,
  ...OLDER_CHRONOLOGICAL_CASES,
  ...LANDMARK_SECTION_CASES
];

// Ensure EVERY SINGLE SECTION has at least 50 cases (500+ rulings total across the application!)
const ALL_GENERATED_CASES: GSTCase[] = GST_SECTIONS_DATA.flatMap((section) => {
  const existingForSection = ALL_HANDCRAFTED_CASES.filter(c => c.sectionId === section.id).length;
  return generateCasesForSection(section.id, 50, existingForSection);
});

// Master combined pool exceeding 500 rulings
export const INITIAL_GST_CASES: GSTCase[] = [
  ...ALL_HANDCRAFTED_CASES,
  ...ALL_GENERATED_CASES
];

// Bank of incoming streaming rulings that auto-append when user clicks "Simulate Live Scrape"
export const STREAMING_CASE_BANK: GSTCase[] = [
  {
    id: "gst-live-2026-sc-099",
    title: "[LIVE SCRAPED] Supreme Court Judgment: M/s InfraStar Projects vs. Union of India",
    courtOrAuthority: "Supreme Court of India",
    category: "Supreme Court",
    date: "Just Now (Live)",
    rawDate: "2026-07-01",
    impactScore: 10.0,
    sectionId: "sec-16",
    tags: ["Section 16(2)(aa)", "GSTR-2B Mandatory", "Vendor Compliance", "Live Ruling"],
    summary: {
      facts: "Fresh 3-judge bench decision analyzing whether mandatory invoice reflection in GSTR-2B under Section 16(2)(aa) applies retrospectively to transactions conducted prior to January 1, 2022.",
      issue: "Can statutory amendment introducing Section 16(2)(aa) operate retrospectively to deny ITC on invoices not appearing in 2A/2B prior to FY 2022?",
      verdict: "Supreme Court definitively settled that Section 16(2)(aa) is prospective in nature from 01.01.2022. For earlier periods, GSTR-2A is purely facilitative and cannot form the sole basis for disallowing ITC."
    },
    pdfUrl: "/mock-pdfs/SC_Live_InfraStar_2026.pdf",
    pdfSize: "2.8 MB",
    bench: "Hon'ble Dr. Justice D.Y. Chandrachud Bench",
    assessmentYear: "FY 2017-2022",
    scraplingSourceUrl: "https://main.sci.gov.in/judgments/live-2026",
    aiConfidence: 99.9,
    isNewArrival: true
  },
  {
    id: "gst-live-2026-hc-104",
    title: "[LIVE SCRAPED] M/s SkyHigh Logistics vs. State Tax Officer",
    courtOrAuthority: "Calcutta High Court",
    category: "High Court",
    date: "Just Now (Live)",
    rawDate: "2026-07-01",
    impactScore: 9.5,
    sectionId: "sec-129",
    tags: ["Section 129", "GPS Tracking Verified", "Transit Delay", "Live Ruling"],
    summary: {
      facts: "High Court examined detention where vehicle GPS telemetry verified the driver stopped for 6 hours due to heavy highway flooding, causing E-way bill expiry.",
      issue: "Whether verifiable force majeure delays captured via GPS tracking exempt transporters from Section 129 penalties?",
      verdict: "High Court mandated that GST mobile squads must check GPS log evidence when produced. Detention during force majeure weather delays is illegal and warrants disciplinary action."
    },
    pdfUrl: "/mock-pdfs/Cal_HC_Live_SkyHigh_2026.pdf",
    pdfSize: "1.0 MB",
    bench: "Hon'ble Mr. Justice T.S. Sivagnanam",
    assessmentYear: "FY 2025-26",
    scraplingSourceUrl: "https://calcuttahighcourt.gov.in/live-rulings",
    aiConfidence: 99.5,
    isNewArrival: true
  },
  {
    id: "gst-live-2026-circ-222",
    title: "[LIVE SCRAPED] CBIC Circular No. 222/16/2026-GST: Cross-Charge vs Invoice",
    courtOrAuthority: "Circulars",
    category: "Circulars",
    date: "Just Now (Live)",
    rawDate: "2026-07-01",
    impactScore: 9.7,
    sectionId: "rule-28",
    tags: ["Rule 28", "Cross Charge", "Head Office Allocation", "Live Circular"],
    summary: {
      facts: "Immediate clarification issued by CBIC today regarding whether Head Offices must issue tax invoices for internally generated managerial services to branch offices.",
      issue: "Is salary cost of CEO and HR staff required to be included while valuing cross-charge supplies between Head Office and Branch Office?",
      verdict: "CBIC confirmed that employee salary costs at Head Office do not form part of supply valuation under Rule 28 when branch offices are eligible for full ITC."
    },
    pdfUrl: "/mock-pdfs/CBIC_Circular_222_CrossCharge.pdf",
    pdfSize: "420 KB",
    bench: "CBIC Board Meeting Resolution",
    assessmentYear: "All Assessment Years",
    scraplingSourceUrl: "https://cbic-gst.gov.in/circulars/live-222",
    aiConfidence: 100.0,
    isNewArrival: true
  }
];
