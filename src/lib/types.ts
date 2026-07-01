export type CourtCategory = 'High Court' | 'Supreme Court' | 'Advance Rulings' | 'Circulars';

export type DateRangeFilter = 'All' | 'Today' | 'This Week' | 'This Month' | 'Custom';

export type RelevanceSort = 'Latest' | 'Highest Impact';

export type ViewMode = 'landmark-sections' | 'chronological';

export interface AISummary {
  facts: string;
  issue: string;
  verdict: string;
}

export interface GSTCase {
  id: string;
  title: string;
  courtOrAuthority: string;
  category: CourtCategory;
  date: string; // e.g. "29 Jun 2026"
  rawDate: string; // YYYY-MM-DD
  impactScore: number;
  tags: string[];
  sectionId: string; // e.g. "sec-16", "sec-17-5", "sec-129", "sec-73", "rule-28", "rule-36-4"
  summary: AISummary;
  pdfUrl?: string;
  pdfSize?: string;
  bench?: string;
  assessmentYear?: string;
  scraplingSourceUrl?: string;
  aiConfidence?: number;
  isNewArrival?: boolean; // For live streaming animation
}

export interface GSTSectionInfo {
  id: string;
  sectionNumber: string;
  title: string;
  chapter: string;
  litigationScore: number; // 1 to 10 popularity/litigation rate
  summaryDescription: string;
  popularKeywords: string[];
}

export interface FilterState {
  searchQuery: string;
  categories: Record<CourtCategory, boolean>;
  dateRange: DateRangeFilter;
  relevanceSort: RelevanceSort;
  liveAlerts: boolean;
  selectedSectionId?: string | null;
}
