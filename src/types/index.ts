import { NavigateFunction } from "react-router-dom";

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

export interface LoginParams {
  email: string;
  password: string;
  setUserId: (id: string | undefined) => void;
  setUserName: (name: string) => void;
  navigate: NavigateFunction;
}

export interface UploadImageParams {
  file: File;
  userId: string;
  getImages: () => void;
  getAllImages: () => void;
  enqueueSnackbar: (message: string, options?: any) => void;
}

export interface DeleteImageParams {
  image: {
    name: string;
    publicUrl: string;
  };
  userId: string;
  getImages: () => void;
  getAllImages: () => void;
  enqueueSnackbar: (message: string, options?: any) => void;
  action: (key: number) => JSX.Element;
}

export interface SignUpParams {
  e: React.FormEvent;
  email: string;
  password: string;
  passwordConf: string;
  firstName: string;
  lastName: string;
  setUserName: (name: string) => void;
  navigate: NavigateFunction;
}
