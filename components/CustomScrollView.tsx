import type { PropsWithChildren } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedView } from '@/components/ThemedView';

type Props = PropsWithChildren<{
    headerBackgroundColor: { dark: string; light: string };
}>;

export default function CustomScrollView({
  children,
  headerBackgroundColor,
}: Props) {
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingTop: HEADER_HEIGHT }} scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      >
        <ThemedView>{children}</ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const HEADER_HEIGHT = 0;  // Set to 0 if no header is required

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth:1,
    borderColor:'transparent'
  },
});
