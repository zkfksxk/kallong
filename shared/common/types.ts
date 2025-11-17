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
  nickname: string; //사용자
  name: string;
  data: Outfit;
};

export type Vote = {
  firstLookbook: Lookbook;
  secondLookbook: Lookbook;
};
