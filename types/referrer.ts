export interface Referrer {
  name: string;
  relationship: string;
  customNote: string;
}

export type ReferrersMap = Record<string, Referrer>;
