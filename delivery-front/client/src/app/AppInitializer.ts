import SharedAppInitializer from 'shared/src/app/AppInitializer';
import StateInitializer from 'state/client/StateInitializer';

const initAsync = async () => {
  await SharedAppInitializer.initAsync({
    //
    stateInitializer: StateInitializer,
  });
};

export default {
  initAsync,
};
