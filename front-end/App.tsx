// -------------------------------------------- Import Dependencies
import { NavigationContainer } from '@react-navigation/native';
import * as Location from 'expo-location';
import { LocationObject } from 'expo-location';
import { NativeWindStyleSheet } from 'nativewind';
import { SafeAreaView } from 'react-native';
import { Provider, useDispatch } from 'react-redux';
import {
  setLocation,
  setLocationDenied,
} from './src/logic/state/slices/locationSlice';

// -------------------------------------------- Import Modules & Components
import store from './src/logic/state/store';
import Emitter from './src/logic/util/emitter';
import MainStack from './src/routes/MainStack';

// -------------------------------------------- Tailwind Setup
NativeWindStyleSheet.setOutput({
  default: 'native',
});

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer
        documentTitle={{
          formatter: (options, route) => `${options?.title ?? route?.name}`,
        }}
      >
        <SafeAreaView className="w-full h-full flex absolute top-0 left-0 flex-col justify-start items-center">
          <MainStack />
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
