let audioContext;

function getAudioContext() {
  const audioContextClass = window.AudioContext || window.webkitAudioContext;

  if (!audioContext) {
    audioContext = new audioContextClass();
  }

  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  if (!audioContextClass) {
    throw new Error("Web Audio API not supported")
  }

  return audioContext;
}

export function playTick() {
  const audioContext = getAudioContext();
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.connect(gain);
  gain.connect(audioContext.destination);

  oscillator.frequency.value = 800;

  gain.gain.setValueAtTime(0.9, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(
    0.001,
    audioContext.currentTime + 0.03,
  );

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.03);
}

export function playTone(frequency, startDelay = 0) {
  const audioContext = getAudioContext();

  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const delay = audioContext.createDelay();
  const feedback = audioContext.createGain();

  const startTime = audioContext.currentTime + startDelay;
  const toneDuration = 0.16;

  oscillator.type = "sine";
  oscillator.frequency.value = frequency;

  gain.gain.setValueAtTime(0.9, startTime);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + toneDuration);

  delay.delayTime.value = 0.18;
  feedback.gain.value = 0.35;

  oscillator.connect(gain);
  gain.connect(audioContext.destination);

  gain.connect(delay);
  delay.connect(feedback);
  feedback.connect(delay);
  delay.connect(audioContext.destination);

  oscillator.start(startTime);
  oscillator.stop(startTime + toneDuration);
}

export function playAlarm() {
  playTone(880);
  playTone(1320, 0.22);
}
