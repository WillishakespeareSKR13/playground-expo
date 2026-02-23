import { View, Text, Pressable } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { useThemeToggle } from '@/hooks/useThemeToggle';
import { useAppStore } from '@/store/zustand';

export default function HomeScreen() {
  const { theme, toggle } = useThemeToggle();
  const { count, increment, decrement } = useAppStore();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withSpring(1.2, {}, () => {
      scale.value = withSpring(1);
    });
    increment();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tech Test</Text>
      <Text style={styles.subtitle}>Everything is ready</Text>

      <Animated.View style={[styles.counterCard, animatedStyle]}>
        <Text style={styles.counterText}>{count}</Text>
      </Animated.View>

      <View style={styles.row}>
        <Pressable style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>+</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={decrement}>
          <Text style={styles.buttonText}>-</Text>
        </Pressable>
      </View>

      <Pressable style={styles.themeToggle} onPress={toggle}>
        <Text style={styles.themeToggleText}>
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xl,
  },
  counterCard: {
    width: 120,
    height: 120,
    borderRadius: theme.borderRadius.xl,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.lg,
  },
  counterText: {
    ...theme.typography.h1,
    color: '#FFFFFF',
  },
  row: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.xl,
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  buttonText: {
    ...theme.typography.h2,
    color: theme.colors.text,
  },
  themeToggle: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  themeToggleText: {
    ...theme.typography.body,
    color: theme.colors.primary,
  },
}));
