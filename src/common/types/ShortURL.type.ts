export interface ShortURLInput {
  url: string;
  alias: string;
}

export interface ShortURL extends ShortURLInput {
  id: number;
  lastUpdated: string;
}
