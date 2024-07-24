import {Pressable, StyleSheet,} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomScrollView from '@/components/CustomScrollView';
import { NavigationContainer, useNavigation, useIsFocused  } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Forex from '../../components/forex'
import Stock from '../../components/stock'
import Crypto from '../../components/crypto'
import { Stack, Link } from 'expo-router';

function SignalStack() {
    return (
        <Stack screenOptions={{ headerShown:false}}>
            <Stack.Screen name="Forex"/>
            <Stack.Screen name="Stock" />
            <Stack.Screen name="Crypto" />
        </Stack>
    );
}


export default function SignalScreen() {
    const headerBackgroundColor = { dark: '#000', light: '#fff' };
    const navigation = useNavigation();
    const isFocussed = useIsFocused();
    return (
        <SafeAreaView style={styles.safeArea}>
            <CustomScrollView headerBackgroundColor={headerBackgroundColor}>
                <Link href={'/(tabs)/others/forex'} asChild>
                <Pressable>
                    <ThemedText style={isFocussed?{color:'green'}:{color:'gray'}}>Forex</ThemedText>
                </Pressable>
                </Link>
                
                {/* <Pressable onPress={() => navigation.navigate('Stock')}>
                    <ThemedText>Stock</ThemedText>
                </Pressable>
                <Pressable onPress={() => navigation.navigate('Crypto')}>
                    <ThemedText>Crypto</ThemedText>
                </Pressable> */}
                <ThemedView style={{ flex: 1 }}>
                    <SignalStack />
                </ThemedView>
            </CustomScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
});

// import {Pressable, StyleSheet,} from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import CustomScrollView from '@/components/CustomScrollView';
// import { NavigationContainer, useNavigation, useIsFocused  } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';
// import Forex from '../../components/forex'
// import Stock from '../../components/stock'
// import Crypto from '../../components/crypto'

// const Stack = createNativeStackNavigator();

// function SignalStack() {
//     return (
//         <Stack.Navigator screenOptions={{ headerShown:false}}>
//             <Stack.Screen name="Forex" component={Forex} />
//             <Stack.Screen name="Stock" component={Stock} />
//             <Stack.Screen name="Crypto" component={Crypto} />
//         </Stack.Navigator>
//     );
// }


// export default function SignalScreen() {
//     const headerBackgroundColor = { dark: '#000', light: '#fff' };
//     const navigation = useNavigation();
//     const isFocussed = useIsFocused();
//     return (
//         <SafeAreaView style={styles.safeArea}>
//             <CustomScrollView headerBackgroundColor={headerBackgroundColor}>
//                 <Pressable onPress={() => navigation.navigate('Forex')}>
//                     <ThemedText style={isFocussed?{color:'green'}:{color:'gray'}}>Forex</ThemedText>
//                 </Pressable>
//                 <Pressable onPress={() => navigation.navigate('Stock')}>
//                     <ThemedText>Stock</ThemedText>
//                 </Pressable>
//                 <Pressable onPress={() => navigation.navigate('Crypto')}>
//                     <ThemedText>Crypto</ThemedText>
//                 </Pressable>
//                 <ThemedView style={{ flex: 1 }}>
//                     <SignalStack />
//                 </ThemedView>
//             </CustomScrollView>
//         </SafeAreaView>
//     );
// }

// const styles = StyleSheet.create({
//     safeArea: {
//         flex: 1,
//     },
// });