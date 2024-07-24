import { type ComponentType } from 'react';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Octicons from '@expo/vector-icons/Octicons'

function createTabBarIcon(IconComponent: ComponentType<IconProps<any>>) {
  return function TabBarIcon({ style, ...rest }: IconProps<any>) {
    return <IconComponent size={28} style={[{ marginBottom: -3 }, style]} {...rest} />;
  };
}

export const IoniconsTabBarIcon = createTabBarIcon(Ionicons);
export const MaterialTabBarIcon = createTabBarIcon(MaterialIcons);
export const OcticonsTabBarIcon = createTabBarIcon(Octicons);


// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

// import Ionicons from '@expo/vector-icons/Ionicons';
// import { MaterialIcons } from '@expo/vector-icons';
// import { type IconProps } from '@expo/vector-icons/build/createIconSet';
// import { type ComponentProps } from 'react';

// export function TabBarIcon({ style, ...rest }: IconProps<ComponentProps<typeof Ionicons>['name']>) {
//   return <Ionicons size={28} style={[{ marginBottom: -3 }, style]} {...rest} />;
// }

