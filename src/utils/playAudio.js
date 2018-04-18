export default (id) => {
  // ensures audio plays from start even when it's still playing
  const aud = document.getElementById(id);

  aud.volume = id === 'audio_fail' ? .01 : .5;
  aud.pause();
  aud.currentTime = 0;
  aud.play();
}
