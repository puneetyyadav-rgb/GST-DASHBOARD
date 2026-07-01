import { GSTCase, GSTSectionInfo } from '../types';

export const ADDITIONAL_POPULAR_SECTIONS: GSTSectionInfo[] = [
  {
    id: "sec-50",
    sectionNumber: "Section 50",
    title: "Interest on Delayed Payment of Tax (Gross vs Net Liability)",
    chapter: "Chapter X - Payment of Tax",
    litigationScore: 9.8,
    summaryDescription: "Statutory interest levied on delayed tax remittance, settled by Finance Act retrospective proviso confirming interest applies strictly on net cash liability.",
    popularKeywords: ["Net Cash Liability", "Proviso Section 50(1)", "Retrospective Interest", "Credit Ledger"]
  },
  {
    id: "sec-54",
    sectionNumber: "Section 54 & Rule 89",
    title: "GST Refunds & Inverted Duty Structure Restrictions",
    chapter: "Chapter XI - Refunds",
    litigationScore: 9.7,
    summaryDescription: "Provisions governing refund of unutilized ITC on zero-rated export supplies and inverted duty structures where input tax rate exceeds finished output tax rate.",
    popularKeywords: ["Inverted Duty Structure", "Rule 89(5)", "Input Services Exclusion", "2 Year Limitation"]
  },
  {
    id: "sec-29",
    sectionNumber: "Section 29 & 30",
    title: "Cancellation, Suspension & Revocation of GST Registration",
    chapter: "Chapter VI - Registration",
    litigationScore: 9.3,
    summaryDescription: "Procedures and grounds for suo-moto registration cancellation by revenue authorities, retrospective cancellation limitations, and revocation appeals.",
    popularKeywords: ["Retrospective Cancellation", "Suo-Moto Notice", "Non-filing 6 Months", "Revocation"]
  },
  {
    id: "sched-ii",
    sectionNumber: "Schedule II & Schedule III",
    title: "Classification: Supply of Goods vs Services & Transactions Neither Goods nor Services",
    chapter: "Schedules to CGST Act",
    litigationScore: 9.5,
    summaryDescription: "Determines whether software licenses, restaurant works contracts, and intellectual property transfers constitute goods or services, and lists out-of-scope non-GST transactions.",
    popularKeywords: ["Ocean Freight", "Employee Salaries", "ESOP Perks", "Land Sale Exemption"]
  }
];

export const LANDMARK_SECTION_CASES: GSTCase[] = [
  {
    id: "land-sec50-01",
    title: "M/s Pratibha Syntex Ltd. vs. Union of India",
    courtOrAuthority: "Gujarat High Court",
    category: "High Court",
    date: "14 Oct 2024",
    rawDate: "2024-10-14",
    impactScore: 9.6,
    sectionId: "sec-50",
    tags: ["Section 50(1)", "Automatic Attachment", "GSTR-3B Delay"],
    summary: {
      facts: "Bank accounts of textile exporter were attached for recovery of Rs. 1.8 Crores interest under Section 50 without issuing assessment order or quantification hearing.",
      issue: "Can revenue recover statutory interest by initiating bank attachment without first quantifying liability via formal adjudication?",
      verdict: "High Court ruled that interest liability must be formally determined and communicated before recovery coercive measures under Section 79 can be initiated."
    },
    pdfUrl: "/mock-pdfs/Guj_HC_Pratibha_Section50.pdf",
    pdfSize: "1.3 MB",
    bench: "Hon'ble Mr. Justice J.B. Pardiwala",
    assessmentYear: "FY 2018-21",
    scraplingSourceUrl: "https://gujarathighcourt.nic.in/judgments/2024/pratibha",
    aiConfidence: 99.5
  },
  {
    id: "land-sec54-02",
    title: "M/s Pitti Engineering Ltd. vs. Union of India",
    courtOrAuthority: "Telangana High Court",
    category: "High Court",
    date: "09 Aug 2024",
    rawDate: "2024-08-09",
    impactScore: 9.4,
    sectionId: "sec-54",
    tags: ["Section 54", "Refund Limitation", "Relevant Date Export"],
    summary: {
      facts: "Assessee filed export refund claim 2 years and 14 days after shipping bill date due to delay in receiving foreign inward remittance certificate (FIRC).",
      issue: "Does statutory 2-year limitation period under Section 54 start from shipping bill date or from the date of realization of foreign exchange?",
      verdict: "High Court held that for service exports, relevant date is strictly tied to receipt of foreign exchange realization under Section 54 explanation, directing processing of refund."
    },
    pdfUrl: "/mock-pdfs/TS_HC_Pitti_Refund.pdf",
    pdfSize: "1.5 MB",
    bench: "Hon'ble Mr. Justice Ujjal Bhuyan",
    assessmentYear: "FY 2021-22",
    scraplingSourceUrl: "https://tshighcourt.gov.in/judgments/2024/pitti",
    aiConfidence: 99.3
  },
  {
    id: "land-sec29-03",
    title: "M/s Aggarwal Traders vs. State of Haryana",
    courtOrAuthority: "Punjab & Haryana High Court",
    category: "High Court",
    date: "19 Nov 2024",
    rawDate: "2024-11-19",
    impactScore: 9.1,
    sectionId: "sec-29",
    tags: ["Section 29", "Show Cause Notice Vague", "Violation of Principles of Natural Justice"],
    summary: {
      facts: "Tax officer issued one-line show cause notice stating 'Registration cancelled due to violation of provisions' without mentioning specific default or rule violated.",
      issue: "Can GST registration be cancelled based on a non-speaking, cryptic show cause notice failing to state precise factual allegations?",
      verdict: "High Court set aside cancellation order with cost of Rs. 25,000 against officer, holding that show cause notices must set out clear factual grounds enabling taxpayer defense."
    },
    pdfUrl: "/mock-pdfs/PH_HC_Aggarwal_Traders.pdf",
    pdfSize: "910 KB",
    bench: "Hon'ble Mr. Justice Tejinder Singh Dhindsa",
    assessmentYear: "FY 2023-24",
    scraplingSourceUrl: "https://phhc.gov.in/judgments/2024/aggarwal",
    aiConfidence: 99.6
  },
  {
    id: "land-sched-04",
    title: "Supreme Court Judgment: Chief Commissioner of GST vs. M/s Northern Operating Systems",
    courtOrAuthority: "Supreme Court of India",
    category: "Supreme Court",
    date: "19 May 2022",
    rawDate: "2022-05-19",
    impactScore: 10.0,
    sectionId: "sched-ii",
    tags: ["Secondment of Employees", "Manpower Supply", "Reverse Charge Mechanism"],
    summary: {
      facts: "Indian subsidiary reimbursed exact salary cost to overseas group parent for technical experts seconded to work in India under administrative control of Indian entity.",
      issue: "Does secondment of employees by foreign holding company to Indian subsidiary constitute taxable supply of manpower service under reverse charge?",
      verdict: "Supreme Court held that on holistic reading of inter-company agreements, secondment constitutes taxable manpower supply service rendered by foreign parent to Indian company."
    },
    pdfUrl: "/mock-pdfs/SC_Northern_Operating_Systems.pdf",
    pdfSize: "4.9 MB",
    bench: "Hon'ble Justice U.U. Lalit Bench",
    assessmentYear: "FY 2012-18",
    scraplingSourceUrl: "https://main.sci.gov.in/judgments/2022/nos-secondment",
    aiConfidence: 100.0
  },
  {
    id: "land-sec16-05",
    title: "M/s D.Y. Beathel Enterprises vs. State Tax Officer",
    courtOrAuthority: "Madras High Court",
    category: "High Court",
    date: "24 Feb 2021",
    rawDate: "2021-02-24",
    impactScore: 9.7,
    sectionId: "sec-16",
    tags: ["Section 16(2)(c)", "Landmark Precedent", "Buyer Protection"],
    summary: {
      facts: "In one of the earliest landmark GST rulings, assessing officer initiated recovery against buyer where seller collected tax on raw rubber but omitted to deposit tax in treasury.",
      issue: "Can revenue proceed directly against purchasing dealer without first initiating inquiry and recovery against defaulting selling dealer?",
      verdict: "High Court established landmark precedent holding that whenever seller defaults, department must first initiate investigation and recovery against selling dealer before touching buyer."
    },
    pdfUrl: "/mock-pdfs/Madras_HC_DY_Beathel.pdf",
    pdfSize: "1.8 MB",
    bench: "Hon'ble Mr. Justice C. Saravanan",
    assessmentYear: "FY 2017-19",
    scraplingSourceUrl: "https://madrashighcourt.nic.in/judgments/2021/dy-beathel",
    aiConfidence: 99.8
  },
  {
    id: "land-sec17-06",
    title: "In Re: M/s Nandan Leisure & Entertainment Ltd.",
    courtOrAuthority: "Advance Rulings",
    category: "Advance Rulings",
    date: "17 Sep 2024",
    rawDate: "2024-09-17",
    impactScore: 8.7,
    sectionId: "sec-17-5",
    tags: ["Section 17(5)(g)", "Employee Transport", "Bus Seating Capacity Exemption"],
    summary: {
      facts: "Applicant manufacturing unit operates employee pick-and-drop buses having seating capacity of 32 passengers and claimed ITC on bus leasing charges.",
      issue: "Whether ITC restriction on motor vehicles under Section 17(5)(a) applies to passenger vehicles having approved seating capacity exceeding 13 persons?",
      verdict: "Authority held that Section 17(5)(a) explicitly exempts passenger vehicles having approved seating capacity of more than 13 persons, allowing 100% ITC on employee bus leasing."
    },
    pdfUrl: "/mock-pdfs/AAR_Nandan_Leisure_Bus.pdf",
    pdfSize: "720 KB",
    bench: "Gujarat AAR Bench",
    assessmentYear: "FY 2024-25",
    scraplingSourceUrl: "https://gujaratgst.gov.in/advance-rulings/2024/nandan",
    aiConfidence: 98.9
  },
  {
    id: "land-sec129-07",
    title: "CBIC Circular No. 180/12/2022-GST: Clarification on E-Way Bill Minor Errors",
    courtOrAuthority: "Circulars",
    category: "Circulars",
    date: "27 Dec 2022",
    rawDate: "2022-12-27",
    impactScore: 9.5,
    sectionId: "sec-129",
    tags: ["Section 129", "Clerical Typos", "Rs 500 Nominal Penalty"],
    summary: {
      facts: "To eliminate mobile squad harassment over minor typographical errors on E-way bills during highway transit, CBIC codified list of protected clerical mistakes.",
      issue: "What exact categories of clerical errors on E-way bills are exempt from heavy Section 129 vehicle seizure and penalty?",
      verdict: "CBIC specified 6 categories of minor clerical errors (such as 1-2 digit vehicle number typos, HSN code 2-digit variations) where officers can levy only Rs. 500 token penalty."
    },
    pdfUrl: "/mock-pdfs/CBIC_Circular_180_EWayBill.pdf",
    pdfSize: "590 KB",
    bench: "CBIC Policy Wing",
    assessmentYear: "All Assessment Years",
    scraplingSourceUrl: "https://cbic-gst.gov.in/circulars/2022/circ-180.html",
    aiConfidence: 100.0
  },
  {
    id: "land-sec73-08",
    title: "M/s Mahindra & Mahindra Ltd. vs. Union of India",
    courtOrAuthority: "Bombay High Court",
    category: "High Court",
    date: "11 Jul 2024",
    rawDate: "2024-07-11",
    impactScore: 9.4,
    sectionId: "sec-73",
    tags: ["Section 73(10)", "Statutory Limitation Expiry", "Adjudication Time Limit"],
    summary: {
      facts: "Adjudication order under Section 73 for FY 2018-19 was passed on September 15, 2024, beyond the extended statutory deadline notified by central government.",
      issue: "Does expiry of statutory adjudication period under Section 73(10) render subsequent demand orders time-barred and void?",
      verdict: "High Court declared that limitation periods under Section 73(10) are mandatory and jurisdictional. Orders passed even 1 day beyond statutory cutoff are time-barred and void."
    },
    pdfUrl: "/mock-pdfs/Bombay_HC_Mahindra_Limitation.pdf",
    pdfSize: "2.3 MB",
    bench: "Hon'ble Mr. Justice G.S. Kulkarni",
    assessmentYear: "FY 2018-19",
    scraplingSourceUrl: "https://bombayhighcourt.nic.in/judgments/2024/mahindra",
    aiConfidence: 99.6
  },
  {
    id: "land-rule28-09",
    title: "M/s Kansai Nerolac Paints vs. Commissioner of State Tax",
    courtOrAuthority: "Bombay High Court",
    category: "High Court",
    date: "03 Oct 2024",
    rawDate: "2024-10-03",
    impactScore: 9.3,
    sectionId: "rule-28",
    tags: ["Rule 28 Second Proviso", "Free Samples to Branches", "Nil Invoice Value"],
    summary: {
      facts: "Manufacturer transferred promotional marketing displays free of cost to inter-state depots registered as distinct persons issuing tax invoices with Nil value.",
      issue: "Whether declaring Nil value on inter-branch invoices satisfies the second proviso to Rule 28 when depot is eligible for full ITC?",
      verdict: "High Court affirmed that second proviso to Rule 28 gives absolute liberty to declare any invoice value, including Nil/Zero, which shall be accepted as open market value."
    },
    pdfUrl: "/mock-pdfs/Bombay_HC_Kansai_Nerolac.pdf",
    pdfSize: "1.6 MB",
    bench: "Hon'ble Mr. Justice B.P. Colabawalla",
    assessmentYear: "FY 2022-24",
    scraplingSourceUrl: "https://bombayhighcourt.nic.in/judgments/2024/kansai",
    aiConfidence: 99.5
  },
  {
    id: "land-sched-10",
    title: "CBIC Circular No. 178/10/2022-GST: Taxability of Liquidated Damages & Penalties",
    courtOrAuthority: "Circulars",
    category: "Circulars",
    date: "03 Aug 2022",
    rawDate: "2022-08-03",
    impactScore: 9.7,
    sectionId: "sched-ii",
    tags: ["Schedule II Para 5(e)", "Liquidated Damages", "Cheque Bounce Fee", "Not a Supply"],
    summary: {
      facts: "Tax officers demanded 18% GST on liquidated damages collected for commercial contract delays, cheque bounce fees, and notice period recovery from resigning employees.",
      issue: "Do compensation amounts recovered for breach of contract or employee notice period shortfall constitute consideration for agreeing to tolerate an act under Schedule II?",
      verdict: "CBIC issued landmark clarification that contract breach penalties, forfeiture of security deposits, and employee notice recoveries do not constitute independent taxable supplies."
    },
    pdfUrl: "/mock-pdfs/CBIC_Circular_178_LiquidatedDamages.pdf",
    pdfSize: "680 KB",
    bench: "CBIC Tax Research Unit",
    assessmentYear: "All Assessment Years",
    scraplingSourceUrl: "https://cbic-gst.gov.in/circulars/2022/circ-178.html",
    aiConfidence: 100.0
  }
];
