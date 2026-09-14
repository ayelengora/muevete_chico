export type SiteSettings = {
  brand_name: string;
  tagline: string;
  hero_title: string;
  hero_subtitle: string;
  about: string;
  email: string;
  instagram_url: string;
  whatsapp: string;
  esim_url: string;
  esim_label: string;
  rental_code: string;
  rental_label: string;
  malaga_guide_title: string;
  malaga_guide_blurb: string;
  [key: string]: string;
};

export type Post = {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  body?: string;
  destination?: string;
  cover_url?: string | null;
  published: boolean;
  featured: boolean;
  published_at?: string | null;
  created_at: string;
  updated_at?: string;
};

export type Combo = {
  id: number;
  title: string;
  slug: string;
  destination?: string;
  duration?: string;
  price_from?: number | null;
  currency?: string;
  excerpt?: string;
  description?: string;
  includes?: string[];
  cover_url?: string | null;
  published: boolean;
  featured: boolean;
  created_at: string;
};

export type Review = {
  id: number;
  author_name: string;
  author_location?: string | null;
  rating: number;
  body: string;
  trip?: string | null;
  approved: boolean;
  created_at: string;
};

export type Inquiry = {
  id: number;
  name: string;
  email: string;
  whatsapp?: string | null;
  inquiry_type: string;
  destination?: string | null;
  travelers?: number | null;
  travel_dates?: string | null;
  message?: string | null;
  status: string;
  created_at: string;
};

export type InquiryPayload = {
  name: string;
  email: string;
  whatsapp?: string;
  inquiry_type: string;
  destination?: string;
  travelers?: number;
  travel_dates?: string;
  message?: string;
};

export type HomePayload = {
  settings: SiteSettings;
  featured_combos: Combo[];
  featured_posts: Post[];
  latest_posts: Post[];
  reviews: Review[];
  stats: {
    combos: number;
    posts: number;
    reviews: number;
    average_rating: number | null;
  };
};
