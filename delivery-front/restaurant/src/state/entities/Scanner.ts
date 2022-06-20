import {Bag} from 'entities/Bag';

export enum ScannerMode {
  deletable,
  checkable,
}

export interface ScannerBag extends Bag {
  scanned: boolean;
}

export default interface Scanner {
  mode: ScannerMode;
  bags: ScannerBag[];
  processing: boolean;
}
