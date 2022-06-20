import {ReactElement} from 'react';

export interface OrderProgressLayoutError {
  message: string;
  refresh?: () => void;
}

export default interface OrderProgressLayoutStateProps {
  title?: string;
  background?: ReactElement;
  progress?: ReactElement;
  progressExpandedDetails?: ReactElement;
  bottomElements?: ReactElement;
  error?: OrderProgressLayoutError;
}
