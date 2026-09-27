export type OutfitDetail = {
  id: string;
  name: string;
  image_url: string | null;
  description: string | null;
  selected_day: string;
  created_at: string;
  updated_at: string;
};

export type OutfitList = {
  data: OutfitDetail[];
  count: number;
};
