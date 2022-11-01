const textarea = document.querySelector("textarea"),
  voiceList = document.querySelector("select"),
  speechBtn = document.querySelector("button");
let synth = speechSynthesis,
  isSpeaking = true;

function voices() {
  for (let voice of synth.getVoices()) {
    // console.log(voice);
    let selected = voice.name === "Google US English" ? "selected" : "";
    let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
    voiceList.insertAdjacentHTML("beforeend", option);
  }
}

synth.addEventListener("voiceschanged", voices);

function textToSpeech(text) {
  // var msg = new SpeechSynthesisUtterance();
  // msg.lang = "vi-VN";
  // msg.text = "Xin Chào, tôi là Tâm";
  // speechSynthesis.speak(msg);
  let utternace = new SpeechSynthesisUtterance(text);
  for (let voice of synth.getVoices()) {
    if (voice.name === voiceList.value) {
      utternace.voice = voice;
    }
  }
  synth.speak(utternace); // speak the speech
}

speechBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (textarea.value !== "") {
    textToSpeech(textarea.value);
  }
  if (textarea.value.length > 80) {
    if (isSpeaking) {
      synth.resume();
      isSpeaking = false;
      speechBtn.innerText = "Dừng đọc";
    } else {
      synth.pause();
      isSpeaking = true;
      speechBtn.innerText = "Tiếp tục";
    }

    setInterval(() => {
      if (!synth.speaking && !isSpeaking) {
        isSpeaking = true;
        speechBtn.innerText = "Chuyển sang âm thanh";
      }
    });
  } else {
    speechBtn.innerText = "Chuyển sang âm thanh";
  }
});
