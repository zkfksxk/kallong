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

// export type Vote = {
//   voteName: string;
//   firstLookbook: Lookbook;
//   secondLookbook: Lookbook;
// };

export type SignInForm = {
  email: string;
  password: string;
};

export type SignUpForm = {
  email: string;
  password: string;
  nickname: string;
};

export type Profile = {
  id: string;
  email: string;
  nickname: string;
  created_at: string;
  updated_at: string;
};
