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

export interface LoginProps {
  setUserName: (name: string) => void;
}

export interface UploadImageParams {
  file: File;
  userId: string;
  getImages: () => void;
  getAllImages: () => void;
  enqueueSnackbar: (message: string, options?: OptionsObject) => void;
}

export interface DeleteImageParams {
  image: {
    name: string;
    publicUrl: string;
  };
  userId: string;
  getImages: () => void;
  getAllImages: () => void;
  enqueueSnackbar: (message: string, options?: OptionsObject) => void;
  action: (key: number) => JSX.Element;
}

interface OptionsObject {
  variant?: "default" | "error" | "success" | "warning" | "info";
  autoHideDuration?: number;
  anchorOrigin?: {
    horizontal: "left" | "center" | "right";
    vertical: "top" | "bottom";
  };
  preventDuplicate?: boolean;
  persist?: boolean;
  action?: (key: number) => JSX.Element;
}

export interface SignUpParams {
  email: string;
  password: string;
  passwordConf: string;
  firstName: string;
  lastName: string;
  setUserName: (name: string) => void;
  navigate: NavigateFunction;
}

export interface LogoutParams {
  setUserName: (name: string) => void;
  setUserId: (id: string | undefined) => void;
  setRecoilImages: (images: RecoilImagesOrder[]) => void;
  setRecoilImagesOrder: (images: RecoilImagesOrder[]) => void;
  setOpen: (open: boolean) => void;
  navigate: NavigateFunction;
}

export interface DrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  userName: string;
  setUserName: (name: string) => void;
  toggleDrawer: (open: boolean) => () => void;
}

export interface UpdateUserProps {
  setUserName: (name: string) => void;
  setUserId: (id: string) => void;
}

export interface handleItemClickParams {
  text: string;
  navigate: NavigateFunction;
  setOpen: (open: boolean) => void;
  toggleDrawer: (open: boolean) => () => void;
  setUserId: (id: string | undefined) => void;
  setUserName: (name: string) => void;
  setRecoilImages: (images: RecoilImagesOrder[]) => void;
  setRecoilImagesOrder: (images: RecoilImagesOrder[]) => void;
  logout: (params: LogoutParams) => Promise<void>;
}

export interface AppLayoutProps {
  userName: string;
  setUserName: (name: string) => void;
}

export interface handlePlayClickParams {
  track: string | null;
  audioRef: React.RefObject<HTMLAudioElement>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFullScreen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface signUpProps {
  setUserName: (name: string) => void;
}

export interface signupInputs {
  email: string;
  password: string;
  passwordConf: string;
  firstName: string;
  lastName: string;
}

export interface loginInputs {
  email: string;
  password: string;
  passwordConf: string;
}

export interface SortableItemProps {
  id: string;
  name: string;
}

export interface FileButtonProps {
  uploadImage: (file: File) => Promise<void>;
}

export interface HeaderProps {
  toggleDrawer: (open: boolean) => () => void;
}
