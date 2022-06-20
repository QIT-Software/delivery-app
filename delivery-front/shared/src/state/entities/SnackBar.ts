export type SnackBarType = 'error' | 'success' | 'warning' | 'info';

export interface SnackBar {
  snackbarOpen: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  snackbarMessage?: any;
  snackBarType: SnackBarType;
}
