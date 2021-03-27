import {ScreenFlow} from '@utils/Enums';
export interface AppContextType {
  dark?: boolean;
  screen?: ScreenFlow;
  toggleTheme?: () => Promise<void>;
  setScreenFlow?: (flow?: ScreenFlow) => void;
}
