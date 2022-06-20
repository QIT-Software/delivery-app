import {Action, handleActions} from 'redux-actions';
import types from './types';
import {Bag} from 'entities/Bag';
import Scanner, {ScannerBag, ScannerMode} from 'state/restaurant/entities/Scanner';
import {
  empty,
  LoadableContainer,
  loading,
  modify,
  success,
} from 'state/entities/LoadableContainer';
import {InitScannerCompleted} from './actions';

type ReducerState = LoadableContainer<Scanner>;

const initScannerCompleted = (
  _: ReducerState,
  {payload: {mode, bags}}: Action<InitScannerCompleted>,
): ReducerState =>
  success({
    bags: bags.map((b) => ({...b, scanned: false})),
    mode,
    processing: false,
  });

const processCodeCompleted = (
  state: ReducerState,
  {payload, error}: Action<Bag>,
): ReducerState =>
  modify(state, (state) => {
    if (error) return state;

    let bags: ScannerBag[];
    if (state.mode === ScannerMode.deletable) {
      const exists = state.bags.some((b: Bag) => b.id === payload.id);
      if (exists) return state;

      bags = [...state.bags, {...payload, scanned: true}];
    } else if (state.mode === ScannerMode.checkable) {
      bags = state.bags.map((b) => (b.id === payload.id ? {...b, scanned: true} : b));
    } else return state;

    return {
      ...state,
      bags,
    };
  });

const deleteBag = (state: ReducerState, {payload}: Action<Bag>): ReducerState =>
  modify(state, (state) => ({
    ...state,
    bags: state.bags.filter((b) => b.id !== payload.id),
  }));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default handleActions<ReducerState, any>(
  {
    [types.INIT_SCANNER]: () => loading(empty()),
    [types.INIT_SCANNER_COMPLETED]: initScannerCompleted,
    [types.PROCESS_CODE]: (state) =>
      modify(state, (state) => ({
        ...state,
        processing: true,
      })),
    [types.PROCESS_CODE_COMPLETED]: processCodeCompleted,
    [types.DELETE_BAG]: deleteBag,
    [types.RESET_PROCESSING]: (state) =>
      modify(state, (state) => ({...state, processing: false})),
  },
  empty(),
);
