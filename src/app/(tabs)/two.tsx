import { View, Text, Pressable } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useState } from 'react';
import { startRecording, stopRecording, playSound } from '@/services/audio';
import type { Audio } from 'expo-av';

export default function ExploreScreen() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [recordingUri, setRecordingUri] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const handleRecord = async () => {
    if (isRecording && recording) {
      const uri = await stopRecording(recording);
      setRecordingUri(uri ?? null);
      setRecording(null);
      setIsRecording(false);
    } else {
      const rec = await startRecording();
      if (rec) {
        setRecording(rec);
        setIsRecording(true);
      }
    }
  };

  const handlePlay = async () => {
    if (recordingUri) {
      await playSound({ uri: recordingUri });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Audio</Text>
      <Text style={styles.subtitle}>Record and play audio</Text>

      <Pressable
        style={[styles.recordButton, isRecording && styles.recordingActive]}
        onPress={handleRecord}
      >
        <Text style={styles.recordButtonText}>
          {isRecording ? 'Stop' : 'Record'}
        </Text>
      </Pressable>

      {recordingUri && (
        <Pressable style={styles.playButton} onPress={handlePlay}>
          <Text style={styles.playButtonText}>Play Recording</Text>
        </Pressable>
      )}
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
  recordButton: {
    width: 100,
    height: 100,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.lg,
  },
  recordingActive: {
    backgroundColor: theme.colors.error,
  },
  recordButtonText: {
    ...theme.typography.body,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  playButton: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.primary,
  },
  playButtonText: {
    ...theme.typography.body,
    color: '#FFFFFF',
    fontWeight: '600',
  },
}));
