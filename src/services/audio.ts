import { Audio } from 'expo-av';
import type { AVPlaybackSource } from 'expo-av';

let currentSound: Audio.Sound | null = null;

export async function requestPermissions() {
  const { granted } = await Audio.requestPermissionsAsync();
  return granted;
}

export async function setupAudio() {
  await Audio.setAudioModeAsync({
    allowsRecordingIOS: true,
    playsInSilentModeIOS: true,
    staysActiveInBackground: false,
  });
}

export async function playSound(source: AVPlaybackSource) {
  try {
    await stopSound();
    const { sound } = await Audio.Sound.createAsync(source);
    currentSound = sound;
    await sound.playAsync();
    return sound;
  } catch (error) {
    console.error('playSound:', error);
    return null;
  }
}

export async function stopSound() {
  try {
    if (currentSound) {
      await currentSound.stopAsync();
      await currentSound.unloadAsync();
      currentSound = null;
    }
  } catch (error) {
    console.error('stopSound:', error);
    currentSound = null;
  }
}

export async function startRecording() {
  try {
    const granted = await requestPermissions();
    if (!granted) return null;

    await setupAudio();
    const { recording } = await Audio.Recording.createAsync(
      Audio.RecordingOptionsPresets.HIGH_QUALITY,
    );
    return recording;
  } catch (error) {
    console.error('startRecording:', error);
    return null;
  }
}

export async function stopRecording(recording: Audio.Recording) {
  try {
    await recording.stopAndUnloadAsync();
    return recording.getURI();
  } catch (error) {
    console.error('stopRecording:', error);
    return null;
  }
}
