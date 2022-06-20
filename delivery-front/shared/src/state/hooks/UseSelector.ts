import {useSelector as reduxUseSelector} from 'react-redux';
import {UseSelectorFunction} from 'state/shared/hooks/Common';
import {State} from 'state/shared/entities/State';

export const useSelector: UseSelectorFunction<State> = reduxUseSelector;
