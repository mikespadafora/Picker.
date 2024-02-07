// useInitializeLocation.js or useInitializeLocation.ts
import { useDispatch } from 'react-redux';
import * as Location from 'expo-location';
import { setLocation, setLocationDenied } from '../state/slices/locationSlice';

export const useInitializeLocation = () => {
  const dispatch = useDispatch();

  const initializeLocation = async () => {
    console.log('Getting location...');
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      dispatch(setLocationDenied(true));
    } else {
      const location = await Location.getCurrentPositionAsync({});
      dispatch(
        setLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          locationDenied: false,
        })
      );
    }
    return status !== 'granted';
  };

  return initializeLocation;
};
