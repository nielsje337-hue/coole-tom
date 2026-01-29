// Eenvoudige voorleesfunctie met Web Speech API
const playBtn = document.getElementById('playBtn');
const stopBtn = document.getElementById('stopBtn');
const storyEl = document.getElementById('story');

let synth = window.speechSynthesis;
let utterance = null;

function getStoryText() {
  // Gebruik de zichtbare tekst in #story
  // We strippen eventuele knoppen of onnodige strings
  return storyEl.innerText.trim();
}

playBtn.addEventListener('click', () => {
  if (!('speechSynthesis' in window)) {
    alert('Uw browser ondersteunt geen voorlezen (Web Speech API). Probeer Chrome of Edge.');
    return;
  }
  if (synth.speaking) {
    // als al bezig, negeer
    return;
  }
  const text = getStoryText();
  utterance = new SpeechSynthesisUtterance(text);
  // Nederlandse stem waar mogelijk
  utterance.lang = 'nl-NL';
  utterance.rate = 0.95;
  utterance.pitch = 1;
  synth.speak(utterance);
  playBtn.setAttribute('aria-pressed', 'true');
});

stopBtn.addEventListener('click', () => {
  if (synth.speaking) {
    synth.cancel();
  }
  playBtn.setAttribute('aria-pressed', 'false');
});

// Schakel knopstatus terug als klaar
if ('speechSynthesis' in window) {
  window.speechSynthesis.onend = () => {
    playBtn.setAttribute('aria-pressed', 'false');
  };
}