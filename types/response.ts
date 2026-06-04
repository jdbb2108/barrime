export type Feeling =
  | "curious"
  | "nice"
  | "weird_but_interesting"
  | "no_fit"
  | "thinking";

export type ContactMethod =
  | "instagram"
  | "coffee"
  | "gym"
  | "other"
  | "thinking";

export type WantsContact = "yes" | "yes_instagram" | "maybe" | "no";

export type AlternateIntent =
  | "friendship"
  | "business"
  | "idea"
  | "conversation"
  | "no";

export interface ResponsePayload {
  refSlug?: string;
  source?: "friend" | "instagram" | "direct" | "unknown";
  feeling: Feeling;
  preferredContactMethod?: ContactMethod;
  wantsContact?: WantsContact;
  alternateIntent?: AlternateIntent;
  contactValue?: string;
  projectName?: string;
  projectStage?: string;
  projectChallenge?: string;
  note?: string;
  consent?: boolean;
}

export interface ResponsePayloadRaw {
  refSlug?: string;
  source?: string;
  feeling?: string;
  preferredContactMethod?: string;
  wantsContact?: string;
  alternateIntent?: string;
  contactValue?: string;
  projectName?: string;
  projectStage?: string;
  projectChallenge?: string;
  note?: string;
  consent?: boolean;
}
