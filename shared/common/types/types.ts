export const OUTFIT_CATEGORY = [
  'top',
  'bottom',
  'shoes',
  'accessory',
  'background',
] as const;

export const ACCESSORY_CATEGORY = ['hat', 'bag', 'etc'] as const;

export type OutfitCategory = (typeof OUTFIT_CATEGORY)[number];

export type AccessoryCategory = (typeof ACCESSORY_CATEGORY)[number];

export type AccessoryUrls = {
  [K in AccessoryCategory]?: string;
};

export type Outfit = {
  finalFile?: File;
  finalUrl?: string;
  topUrl?: string;
  bottomUrl?: string;
  shoesUrl?: string;
  accessoryUrls?: AccessoryUrls;
  background: string;
};

export type Lookbook = {
  voteName: string;
  name: string;
  data: Outfit;
};

export type Vote = {
  id: string;
  created_at: string;
  vote_name: string;
  author_id: string;
  is_anon: boolean;
  lookbook_id_a: string;
  lookbook_id_b: string;
};

export type LookbookForm = {
  voteName: string;
  name: string;
  image_url?: string;
  file?: File;
};

export type DailyOutfitForm = {
  name: string;
  description?: string;
  image_url?: string;
  file?: File;
  selected_day: string;
};

export type Profile = {
  id: string;
  email: string;
  nickname: string;
  created_at: string;
  updated_at: string;
};

export type ValidationError =
  | { type: 'empty' }
  | { type: 'maxLength'; maxLength: number }
  | { type: 'invalidCharacters' };
