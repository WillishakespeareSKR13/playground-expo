import { Text, Pressable } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

interface RecordButtonProps {
  isRecording: boolean;
  onPress: () => void;
}

export function RecordButton({ isRecording, onPress }: RecordButtonProps) {
  return (
    <Pressable
      style={[styles.button, isRecording && styles.active]}
      onPress={onPress}
    >
      <Text style={styles.text}>
        {isRecording ? 'Stop' : 'Record'}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create((theme) => ({
  button: {
    width: 100,
    height: 100,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.lg,
  },
  active: {
    backgroundColor: theme.colors.error,
  },
  text: {
    ...theme.typography.body,
    color: '#FFFFFF',
    fontWeight: '600',
  },
}));
