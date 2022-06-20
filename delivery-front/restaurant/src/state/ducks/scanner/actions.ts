import {createAction} from 'redux-actions';
import types from './types';
import {Bag} from 'entities/Bag';
import {ScannerMode} from 'state/restaurant/entities/Scanner';
import {ID} from 'entities/Common';
import {ScannedBags} from 'state/courier/ducks/orderProgress/actions';

export type InitScanner = {mode: ScannerMode; orderId: ID | undefined};
export type InitScannerCompleted = {mode: ScannerMode; bags: Bag[]};

export default {
  initScanner: createAction<InitScanner>(types.INIT_SCANNER),
  initScannerCompleted: createAction<InitScannerCompleted>(types.INIT_SCANNER_COMPLETED),
  codeReceived: createAction<string>(types.CODE_RECEIVED),
  processCode: createAction<string>(types.PROCESS_CODE),
  processCodeCompleted: createAction<Bag>(types.PROCESS_CODE_COMPLETED),
  deleteBag: createAction<Bag>(types.DELETE_BAG),
  confirm: createAction<Bag>(types.CONFIRM),
  resetProcessing: createAction(types.RESET_PROCESSING),
  confirmBags: createAction<ScannedBags>(types.CONFIRM_BAGS),
  acceptScan: createAction<ScannedBags>(types.ACCEPT_SCAN),
  acceptScanCompleted: createAction<ScannedBags>(types.ACCEPT_SCAN_COMPLETED),
};
