export interface EmailForSpam {
  email: string;
  isDiscount: boolean;
}

export interface EmailForSpamContainer {
  email: EmailForSpam | undefined;
}
