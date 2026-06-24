export type PortfolioId =
  | "editorial"
  | "noir"
  | "terminal"
  | "brutalist"
  | "swiss"
  | "bento"
  | "timeline"
  | "oddity"
  | "folio";

export interface PortfolioDefinition {
  id: PortfolioId;
  label: string;
  tagline: string;
}
