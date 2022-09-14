export interface newReview {
  title: string;
  description: string;
  rating_avg?: number;
  rating_quality: number;
  rating_style: number;
  rating_size: number;
  products?: object;
  pictures?: object;
  owner?: object;
}
