import SharedAppInitializer from 'shared/src/app/AppInitializer';
import StateInitializer from 'state/courier/StateInitializer';

const initAsync = async () => {
  await SharedAppInitializer.initAsync({
    //
    stateInitializer: StateInitializer,
  });
};

export default {
  initAsync,
};
