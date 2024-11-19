export interface RecoilImagesOrder {
  publicUrl: string;
  start: number;
  end: number;
  name: string;
  bucket_id: string;
  owner: string;
  id: string;
  updated_at: string;
  created_at: string;
  last_accessed_at: string;
  metadata: Record<string, any>;
}

export interface RecoilCutImages extends RecoilImagesOrder {
  name: string;
}
