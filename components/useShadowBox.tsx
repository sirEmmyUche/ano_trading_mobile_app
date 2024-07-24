import { Platform, useColorScheme } from 'react-native';

export const useShadowColor = () => {
  const theme = useColorScheme();
  const shadowColor = theme === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)';

  if (Platform.OS === 'android') {
    return {
      elevation: 1,
      borderWidth: 1,
      borderColor: shadowColor,
    };
  } else if (Platform.OS === 'ios'){
    return {
      shadowColor: shadowColor,
      shadowOffset: { width: -2, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      borderWidth: 1,
      borderColor: shadowColor,
    };
  }
  return {};
};

