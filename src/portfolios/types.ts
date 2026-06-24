export type PortfolioId =
  | "editorial"
  | "noir"
  | "terminal"
  | "brutalist"
  | "swiss"
  | "bento"
  | "timeline"
  | "oddity";

export interface PortfolioDefinition {
  id: PortfolioId;
  label: string;
  tagline: string;
}
