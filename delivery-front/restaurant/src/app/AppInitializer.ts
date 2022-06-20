import SharedAppInitializer from 'shared/src/app/AppInitializer';
import StateInitializer from 'state/restaurant/StateInitializer';

const initAsync = async () => {
  await SharedAppInitializer.initAsync({
    //
    stateInitializer: StateInitializer,
  });
};

export default {
  initAsync,
};
