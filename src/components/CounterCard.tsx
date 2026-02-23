import { Text } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

interface CounterCardProps {
  count: number;
  onPress?: () => void;
}

export function CounterCard({ count, onPress }: CounterCardProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withSpring(1.2, {}, () => {
      scale.value = withSpring(1);
    });
    onPress?.();
  };

  return (
    <Animated.View
      style={[styles.card, animatedStyle]}
      onTouchEnd={handlePress}
    >
      <Text style={styles.text}>{count}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create((theme) => ({
  card: {
    width: 120,
    height: 120,
    borderRadius: theme.borderRadius.xl,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.lg,
  },
  text: {
    ...theme.typography.h1,
    color: '#FFFFFF',
  },
}));
