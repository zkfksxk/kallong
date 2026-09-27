export type LookbookDetail = {
  id: string;
  name: string;
  image_url: string | null;
  votes: number;
  is_anon: boolean;
  created_at: string;
};

export type VoteDetail = {
  id: string;
  vote_name: string;
  lookbook_id_a: string;
  lookbook_id_b: string;
  is_anon: boolean;
  created_at: string;
};

export type VoteWithLookbook = VoteDetail & {
  lookbook_a: {
    id: string;
    image_url: string | null;
    name: string;
  } | null;
  lookbook_b: {
    id: string;
    image_url: string | null;
    name: string;
  } | null;
};

export type VoteList = {
  data: VoteWithLookbook[];
  count: number;
};
