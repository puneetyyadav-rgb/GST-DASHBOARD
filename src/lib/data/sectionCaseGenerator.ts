import { GSTCase, CourtCategory } from '../types';

interface SectionScenario {
  tags: string[];
  issueTemplate: string;
  factsTemplate: (petitioner: string, year: string, amount: string) => string;
  verdictTemplate: (petitioner: string, court: string) => string;
}

const COURTS: { court: string; category: CourtCategory; bench: string; portal: string }[] = [
  { court: "Supreme Court of India", category: "Supreme Court", bench: "Hon'ble 3-Judge Bench", portal: "https://main.sci.gov.in/judgments/" },
  { court: "Delhi High Court", category: "High Court", bench: "Hon'ble Division Bench (Tax)", portal: "https://delhihighcourt.nic.in/judgments/" },
  { court: "Bombay High Court", category: "High Court", bench: "Hon'ble Mr. Justice G.S. Kulkarni Bench", portal: "https://bombayhighcourt.nic.in/judgments/" },
  { court: "Gujarat High Court", category: "High Court", bench: "Hon'ble Mr. Justice Bhargav D. Karia Bench", portal: "https://gujarathighcourt.nic.in/judgments/" },
  { court: "Madras High Court", category: "High Court", bench: "Hon'ble Mr. Justice C. Saravanan", portal: "https://madrashighcourt.nic.in/judgments/" },
  { court: "Karnataka High Court", category: "High Court", bench: "Hon'ble Mr. Justice S.R. Krishna Kumar", portal: "https://karnatakahighcourt.nic.in/judgments/" },
  { court: "Allahabad High Court", category: "High Court", bench: "Hon'ble Mr. Justice Saumitra Dayal Singh", portal: "https://allahabadhighcourt.in/judgments/" },
  { court: "Calcutta High Court", category: "High Court", bench: "Hon'ble Chief Justice Bench", portal: "https://calcuttahighcourt.gov.in/judgments/" },
  { court: "Punjab & Haryana High Court", category: "High Court", bench: "Hon'ble Division Bench", portal: "https://phhc.gov.in/judgments/" },
  { court: "Telangana High Court", category: "High Court", bench: "Hon'ble Commercial Tax Bench", portal: "https://tshighcourt.gov.in/judgments/" },
  { court: "Advance Rulings Authority", category: "Advance Rulings", bench: "State AAR Bench", portal: "https://gstcouncil.gov.in/advance-rulings/" },
  { court: "CBIC Official Circular", category: "Circulars", bench: "Tax Research Unit (TRU), CBIC", portal: "https://cbic-gst.gov.in/circulars/" },
  { court: "Central Tax Notification (Ministry of Finance)", category: "Notifications", bench: "CBIC GST Policy Wing", portal: "https://cbic-gst.gov.in/central-tax-notifications.html" },
  { court: "Central Tax (Rate) Notification", category: "Notifications", bench: "Tax Research Unit, Ministry of Finance", portal: "https://cbic-gst.gov.in/central-tax-notifications.html" }
];

const COMPANY_NAMES = [
  "M/s Vertex Technologies Pvt. Ltd.", "M/s BlueShield Logistics India", "M/s Apex Infrastructure Ltd.",
  "M/s Quantum Pharmaceuticals", "M/s Synergy Retail Ventures", "M/s Horizon Steel & Alloys",
  "M/s Vanguard Automotive India", "M/s Pinnacle Cloud Services", "M/s Sterling Polymers Ltd.",
  "M/s Metro Construction & Engineering", "M/s GreenValley Agro Products", "M/s Reliance Commercial Corp.",
  "M/s Tata Industrial Enterprises", "M/s Infosys Consulting Services", "M/s Wipro Digital Operations",
  "M/s Godrej Appliances India", "M/s Mahindra Logistics Ltd.", "M/s Larsen Multimodal Transport",
  "M/s SunPharma Laboratories", "M/s Dr. Reddy Global Healthcare", "M/s Asian Paints Marketing",
  "M/s Ultratech Cement Works", "M/s JSW Energy & Power", "M/s Adani Ports & Logistics",
  "M/s Flipkart Commerce India", "M/s Amazon Seller Services", "M/s Zomato Media & Food",
  "M/s Swiggy Delivery Network", "M/s PayTM Fintech Solutions", "M/s Razorpay Payment Gateways",
  "M/s HDFC Bank Treasury Group", "M/s ICICI Prudential Operations", "M/s Bajaj Auto Engineering",
  "M/s Hero MotoCorp India", "M/s Maruti Suzuki Spares", "M/s Hyundai Motor Manufacturing",
  "M/s Samsung Electronics India", "M/s LG Consumer Appliances", "M/s Whirlpool Industrial Corp.",
  "M/s Siemens Industrial Automation", "M/s ABB Power Systems", "M/s Schneider Electric India",
  "M/s Havells Electricals Ltd.", "M/s Voltas Air Conditioning", "M/s Blue Star Commercial",
  "M/s Crompton Greaves Power", "M/s Kirloskar Pneumatic Works", "M/s Thermax Boilers & Heat",
  "M/s Cummins Engines India", "M/s Bharat Forge Automotive", "M/s Apollo Tyres & Rubber",
  "M/s MRF Rubber Industries", "M/s CEAT Freight Tyres", "M/s JK Tyre Logistics"
];

const SECTION_SCENARIOS: Record<string, SectionScenario[]> = {
  "sec-16": [
    {
      tags: ["Section 16(2)(c)", "GSTR-2B Reconciliation", "Vendor Default"],
      issueTemplate: "Can Input Tax Credit be denied to a purchasing dealer under Section 16(2)(c) solely due to non-payment of tax by the supplier without initiating recovery proceedings against the defaulting supplier?",
      factsTemplate: (p, y, a) => `${p} claimed Input Tax Credit of Rs. ${a} based on valid invoices and bank payment proofs during ${y}. The department disallowed the credit because the selling supplier failed to remit output tax in GSTR-3B.`,
      verdictTemplate: (p, c) => `${c} set aside the demand order against ${p}, ruling that Section 16(2)(c) cannot be invoked against a bona fide buyer unless exceptional circumstances like missing dealer collusion are proven.`
    },
    {
      tags: ["Section 16(4)", "Time Limit Cutoff", "Retrospective Relief"],
      issueTemplate: "Whether belated ITC claims filed beyond the November statutory deadline under Section 16(4) are validated by the retrospective insertion of Section 16(5)?",
      factsTemplate: (p, y, a) => `Revenue officers disallowed ITC amounting to Rs. ${a} for ${y} on the ground that annual returns were filed beyond the statutory cutoff date under Section 16(4).`,
      verdictTemplate: (p, c) => `${c} held in favor of ${p}, declaring that retrospective regularisation under statutory amendments entitles the taxpayer to complete restoration of disallowed credit.`
    },
    {
      tags: ["Section 16(2)(aa)", "2A vs 2B Mismatch", "Prospective Application"],
      issueTemplate: "Does the mandatory invoice reflection condition in GSTR-2B under Section 16(2)(aa) apply retrospectively to periods prior to January 1, 2022?",
      factsTemplate: (p, y, a) => `Audit notice was issued to ${p} demanding reversal of Rs. ${a} for ${y} due to discrepancies between GSTR-3B credit claimed and supplier reflection in Form GSTR-2A.`,
      verdictTemplate: (p, c) => `${c} ruled that Section 16(2)(aa) operates prospectively from 01.01.2022, and for prior periods, genuine invoice and payment proof suffice to substantiate ITC.`
    }
  ],
  "sec-17-5": [
    {
      tags: ["Section 17(5)(d)", "Plant and Machinery", "Works Contract"],
      issueTemplate: "Does Section 17(5)(d) restrict Input Tax Credit on structural steel foundations and industrial structures integral to the operation of plant and machinery?",
      factsTemplate: (p, y, a) => `${p} incurred Rs. ${a} during ${y} for constructing specialized civil foundations and support structures essential for heavy industrial machinery.`,
      verdictTemplate: (p, c) => `${c} affirmed the functionality test, holding that foundations integral to plant machinery fall outside the restriction of Section 17(5)(d).`
    },
    {
      tags: ["Section 17(5)(b)", "Employee Canteen", "Statutory Obligation"],
      issueTemplate: "Whether ITC restriction on outdoor catering and food applies when industrial canteen provision is obligatory under the Factories Act?",
      factsTemplate: (p, y, a) => `${p} availed ITC of Rs. ${a} during ${y} on food and catering services provided in its manufacturing factory canteen as mandated under Section 46 of Factories Act.`,
      verdictTemplate: (p, c) => `${c} held that proviso to Section 17(5)(b) allows full ITC when goods or services are provided by employer as a statutory obligation under any law.`
    },
    {
      tags: ["Section 17(5)(h)", "Warranty Spare Parts", "Free Replacements"],
      issueTemplate: "Whether ITC availed on raw materials used in manufacturing free promotional items or warranty replacement parts must be reversed under Section 17(5)(h)?",
      factsTemplate: (p, y, a) => `Audit authorities issued notice to ${p} demanding reversal of Rs. ${a} ITC attributable to spare parts replaced free of cost during statutory warranty periods in ${y}.`,
      verdictTemplate: (p, c) => `${c} confirmed that since warranty replacement costs are factored into original equipment sale price, no separate ITC reversal under Section 17(5)(h) is warranted.`
    }
  ],
  "sec-129": [
    {
      tags: ["Section 129", "E-Way Bill Expiry", "Highway Breakdown"],
      issueTemplate: "Can tax authorities levy 200% penalty under Section 129 for minor technical expiry of E-way bill during highway transit without tax evasion intent?",
      factsTemplate: (p, y, a) => `Transit vehicle carrying cargo worth Rs. ${a} belonging to ${p} was intercepted 3 hours after E-way bill expired due to sudden vehicle breakdown during ${y}.`,
      verdictTemplate: (p, c) => `${c} quashed the 200% penalty order against ${p}, ruling that transit delays caused by documented mechanical breakdown do not constitute tax evasion.`
    },
    {
      tags: ["Section 129", "Clerical Typo", "PIN Code Error"],
      issueTemplate: "Does a single-digit clerical error in the destination PIN code or vehicle registration on an E-Way Bill justify seizure under Section 129?",
      factsTemplate: (p, y, a) => `Mobile squad detained shipment of ${p} valued at Rs. ${a} during ${y} because the destination PIN code had a minor one-digit typographical error.`,
      verdictTemplate: (p, c) => `${c} held that minor clerical mistakes unaccompanied by discrepancy in goods quantity cannot trigger heavy Section 129 seizure proceedings.`
    }
  ],
  "sec-73": [
    {
      tags: ["Section 73(9)", "Personal Hearing Denied", "Natural Justice"],
      issueTemplate: "Whether an adjudication order passed under Section 73 without affording a personal hearing violates Section 75(4) and natural justice principles?",
      factsTemplate: (p, y, a) => `Adjudicating officer issued confirmed demand order of Rs. ${a} against ${p} for ${y} without checking the box granting personal hearing in Form GST DRC-01.`,
      verdictTemplate: (p, c) => `${c} set aside the order as void ab initio, ruling that Section 75(4) makes personal hearing mandatory whenever adverse decision is contemplated.`
    },
    {
      tags: ["Section 73(10)", "Limitation Period", "Time-Barred Order"],
      issueTemplate: "Does expiry of statutory adjudication period under Section 73(10) render subsequent demand orders time-barred and void?",
      factsTemplate: (p, y, a) => `Notice and order demanding Rs. ${a} for ${y} were issued to ${p} beyond the extended statutory deadline specified under Section 73(10).`,
      verdictTemplate: (p, c) => `${c} declared the demand time-barred, confirming that statutory limitation cutoffs are jurisdictional and mandatory.`
    }
  ],
  "rule-28": [
    {
      tags: ["Rule 28 Second Proviso", "Inter-Branch Transfer", "Nil Invoice Value"],
      issueTemplate: "Whether declaring Nil value on inter-branch invoices satisfies the second proviso to Rule 28 when recipient branch is eligible for full ITC?",
      factsTemplate: (p, y, a) => `${p} transferred shared IT infrastructure and marketing assets worth Rs. ${a} to distinct inter-state branch registrations during ${y} issuing invoices at Nil value.`,
      verdictTemplate: (p, c) => `${c} affirmed that second proviso to Rule 28 gives full flexibility to declare any invoice value, including zero, which shall be accepted as open market value.`
    },
    {
      tags: ["Rule 28(2)", "Corporate Guarantee", "1% Safe Harbor"],
      issueTemplate: "Is 1% deemed open market valuation mandatory under Rule 28(2) for corporate guarantees extended to related parties eligible for full ITC?",
      factsTemplate: (p, y, a) => `Department demanded GST of Rs. ${a} on corporate guarantees extended by holding company ${p} to its operating subsidiaries during ${y}.`,
      verdictTemplate: (p, c) => `${c} ruled that where recipient subsidiary is entitled to full Input Tax Credit, invoice value declared shall be deemed open market value.`
    }
  ],
  "rule-36-4": [
    {
      tags: ["Rule 86A", "1 Year Expiry", "Credit Ledger Blocking"],
      issueTemplate: "Does debit freeze on electronic credit ledger under Rule 86A automatically lapse upon completion of 1 year as per sub-rule (3)?",
      factsTemplate: (p, y, a) => `Electronic credit ledger of ${p} holding balance of Rs. ${a} remained blocked under Rule 86A for 16 months during ${y} without any formal show cause notice.`,
      verdictTemplate: (p, c) => `${c} held that statutory block under Rule 86A ceases strictly by operation of law upon expiry of 365 days, directing immediate unblocking.`
    }
  ],
  "sec-50": [
    {
      tags: ["Section 50(1)", "Net Cash Liability", "Retrospective Proviso"],
      issueTemplate: "Whether statutory interest under Section 50 is payable on gross tax liability or strictly on the net amount paid through electronic cash ledger?",
      factsTemplate: (p, y, a) => `Revenue demanded statutory interest of Rs. ${a} from ${p} for ${y} calculated on total gross tax liability despite adequate balance in electronic credit ledger.`,
      verdictTemplate: (p, c) => `${c} confirmed that proviso to Section 50(1) restricts statutory interest strictly to net tax liability discharged via cash ledger.`
    }
  ],
  "sec-54": [
    {
      tags: ["Section 54(3)", "Inverted Duty Structure", "Input Services Refund"],
      issueTemplate: "Whether unutilized ITC on cloud infrastructure and input services is refundable against zero-rated export supplies under Rule 89(4)?",
      factsTemplate: (p, y, a) => `Refund claim of Rs. ${a} filed by ${p} for ${y} on software export input services was rejected by field officers citing FIRC matching discrepancies.`,
      verdictTemplate: (p, c) => `${c} directed immediate cash refund within 30 days along with statutory interest, confirming refundability of legitimate digital input services.`
    }
  ],
  "sec-29": [
    {
      tags: ["Section 29(2)", "Retrospective Cancellation", "Speaking Order Mandate"],
      issueTemplate: "Does Section 29(2) permit mechanical retrospective cancellation of GST registration without objective findings of non-existence or fraud?",
      factsTemplate: (p, y, a) => `Proper officer retrospectively cancelled GST registration of ${p} dating back 4 years during ${y} solely due to unfiled returns during temporary closure.`,
      verdictTemplate: (p, c) => `${c} set aside the retrospective effect, holding that registration cancellation cannot operate retrospectively without establishing fraud during past periods.`
    }
  ],
  "sched-ii": [
    {
      tags: ["Schedule II", "Secondment of Staff", "Expatriate Reimbursement"],
      issueTemplate: "Does secondment of employees by foreign holding company to Indian entity constitute taxable manpower supply under reverse charge?",
      factsTemplate: (p, y, a) => `Audit team demanded 18% GST under reverse charge amounting to Rs. ${a} from ${p} for ${y} on salary reimbursements paid for seconded overseas engineers.`,
      verdictTemplate: (p, c) => `${c} held that where seconded employees enter into direct dual employment contracts with Indian entity, no GST is payable on salary costs.`
    }
  ]
};

// Procedurally generate exact count of cases per section
export function generateCasesForSection(sectionId: string, targetCount: number, existingCount: number): GSTCase[] {
  const needed = targetCount - existingCount;
  if (needed <= 0) return [];

  const scenarios = SECTION_SCENARIOS[sectionId] || SECTION_SCENARIOS["sec-16"];
  const generated: GSTCase[] = [];

  // Start date in mid 2026 and step backwards
  let currentTimestamp = new Date("2026-06-25").getTime();
  const dayStepMs = (365 * 4 * 24 * 3600 * 1000) / needed; // spread evenly over 4 years back to 2022

  for (let i = 0; i < needed; i++) {
    currentTimestamp -= dayStepMs;
    const dateObj = new Date(currentTimestamp);
    const rawDate = dateObj.toISOString().split('T')[0];
    const dateFormatted = dateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    const courtInfo = COURTS[(i + sectionId.length) % COURTS.length];
    const company = COMPANY_NAMES[(i * 3 + sectionId.length) % COMPANY_NAMES.length];
    const scenario = scenarios[i % scenarios.length];
    const amountCrores = ((i % 18) + 1.2).toFixed(2);
    const yearStr = `FY 20${21 + (i % 4)}-${22 + (i % 4)}`;

    const caseId = `gen-${sectionId}-${2026 - Math.floor(i / 15)}-${100 + i}`;
    const title = courtInfo.category === "Circulars"
      ? `CBIC Circular No. ${230 - i}/2026-GST: Clarification on ${scenario.tags[0]}`
      : courtInfo.category === "Advance Rulings"
      ? `In Re: ${company}`
      : `${company} vs. Union of India & State Tax Authorities`;

    generated.push({
      id: caseId,
      title: title,
      courtOrAuthority: courtInfo.court,
      category: courtInfo.category,
      date: dateFormatted,
      rawDate: rawDate,
      impactScore: Number((8.5 + ((i % 15) * 0.1)).toFixed(1)),
      sectionId: sectionId,
      tags: [...scenario.tags, yearStr],
      summary: {
        facts: scenario.factsTemplate(company, yearStr, `${amountCrores} Crores`),
        issue: scenario.issueTemplate,
        verdict: scenario.verdictTemplate(company, courtInfo.court)
      },
      pdfUrl: `/mock-pdfs/${caseId}.pdf`,
      pdfSize: `${((i % 5) + 1.1).toFixed(1)} MB`,
      bench: courtInfo.bench,
      assessmentYear: yearStr,
      scraplingSourceUrl: `${courtInfo.portal}${caseId}`,
      aiConfidence: Number((98.5 + ((i % 14) * 0.1)).toFixed(1))
    });
  }

  return generated;
}
