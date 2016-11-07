//
// JavaScript created by Daniel Dafoe for a11yTO Camp 2016.
// Presentation: A Bright Future for Web Accessibility
// --------------------------------------------------------------------------
'use strict';
document.addEventListener('DOMContentLoaded', init);

function init() {
  speak('Hi there! What would you like to accomplish today?');

  // Use setTimeout() to ensure speech recognition
  // doesn't run too early and try to capture the 
  // speech synthesizer.
  setTimeout(function() {
    listen();
  }, 3000);
}
// Use SpeechSynthesis API to greet users with disabilities
function speak(text) {
  // Need to look for both prefixed and unprefixed versions
  var syn = window.speechSynthesis || window.webkitSpeechSynthesis;
  var speakText = new SpeechSynthesisUtterance(text);
  var voices = syn.getVoices();

  // Set the rate at which the speech synthesizer will speak
  // `1` is normal
  speakText.rate = 1.65;

  syn.speak(speakText);
}
function listen() {
  var grammar = '#JSGF V1.0; grammar tasks; public <task> = send money | transfer funds;',
      recognition = new webkitSpeechRecognition(),
      speechRecognitionList = new webkitSpeechGrammarList();

  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
  // Make sure SpeechRecognition always listens for results
  recognition.continuous = true;
  // Set the language SpeechRecognition will listen for
  recognition.lang = 'en-US';
  // Allow the SpeechRecognition to return not finalized results
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  // Start the SpeechRecognition service
  recognition.start();

  // Handle when the recognition service returns results
  recognition.onresult = function(event) {
    // Since the recongition service will keep adding new results to
    // the event.results array, we need to iterate over them and break on 
    // the first match.
    for (var i = 0; i < event.results.length; i++) {
      // Need to use trim() since it seems results
      // like to randomly add a blank space at the 
      // beginnning of text.
      if (event.results[i][0].transcript.trim() === 'send money') {
        speak('Great! Let\'s send some money.');
        break;
      }
    }
    var task = event.results[0][0].transcript;
  }
  // Handle when the recognition service has an error
  recognition.onerror = function(event) {
    speak('Sorry, there seems to be a problem. Try again.');
  }
}
