
/*
==========================================
GAME 1 QUESTION DATA
==========================================

Contains:
- All 21 questions
- Question images
- Answer choices
- Correct answers
- Audio filenames

Audio files are stored in public/audio/.

To add new questions, update this file.
Do not put game logic or CSS here.

==========================================
*/

import questionImage1 from "../assets/questionImage1.png";
import questionImage2 from "../assets/questionImage2.png";
import questionImage3 from "../assets/questionImage3.png";
import questionImage4 from "../assets/questionImage4.png";
import questionImage5 from "../assets/questionImage5.png";
import questionImage6 from "../assets/questionImage6.png";
import questionImage7 from "../assets/questionImage7.png";
import questionImage8 from "../assets/questionImage8.png";
import questionImage9 from "../assets/questionImage9.png";
import questionImage10 from "../assets/questionImage10.png";
import questionImage11 from "../assets/questionImage11.png";
import questionImage12 from "../assets/questionImage12.png";
import questionImage13 from "../assets/questionImage13.png";
import questionImage14 from "../assets/questionImage14.png";
import questionImage15 from "../assets/questionImage15.png";
import questionImage16 from "../assets/questionImage16.png";
import questionImage17 from "../assets/questionImage17.png";
import questionImage18 from "../assets/questionImage18.png";
import questionImage19 from "../assets/questionImage19.png";
import questionImage20 from "../assets/questionImage20.png";
import questionImage21 from "../assets/questionImage21.png";

// ========================================
// AUDIO FILE MAPPING
// ========================================
// Capitalization must match the real MP3 files
// because GitHub Pages is case-sensitive.

export const audioFiles = {
  "and": "w1-and.mp3",
  "eat": "w2-eat.mp3",
  "you": "w3-you.mp3",
  "is my name": "w4-is_my_name.mp3",
  "i": "w5-I.mp3",
  "i like the taste of": "w6-I_like_the_taste_of.mp3",
  "i am going": "w7-I_am_going.mp3",
  "i love": "w8-I_love.mp3",
  "make it": "w9-make_it.mp3",
  "i am coming from": "w10-i_am_coming_from.mp3",
  "i see it": "w11-I_see_it.mp3",
  "i like": "w12-I_like.mp3",
  "mother": "w13-mother.mp3",
  "dad": "w14-dad.mp3",
  "him or her": "w15-him_or_her.mp3",
  "i love you": "w16-I_love_you.mp3",
  "i have it": "w17-I_have_it.mp3",
  "look at this": "w18-look_at_this.mp3",
  "i am happy": "w19-I_am_happy.mp3",
  "who": "w20-who.mp3",
  "i live": "w21-I_live.mp3",
};

// ========================================
// ALL 21 QUESTIONS
// ========================================

export const questions = [
  {
    text: "I ____ meat",
    image: questionImage1,
    answers: ["and", "eat", "you"],
    correctAnswer: "eat",
  },
  {
    text: "Mali ____",
    image: questionImage2,
    answers: ["is my name", "eat", "and"],
    correctAnswer: "is my name",
  },
  {
    text: "Pointing at _____",
    image: questionImage3,
    answers: ["and", "eat", "you"],
    correctAnswer: "you",
  },
  {
    text: "____ am a student .",
    image: questionImage4,
    answers: ["eat", "I", "you"],
    correctAnswer: "I",
  },
  {
    text: "____ Ice-cream .",
    image: questionImage5,
    answers: ["I like the taste of", "I", "and"],
    correctAnswer: "I like the taste of",
  },
  {
    text: "Ji'm ___ Sarah are friends.",
    image: questionImage6,
    answers: ["and", "I", "you"],
    correctAnswer: "and",
  },
  {
    text: "___ to School",
    image: questionImage7,
    answers: ["I am going", "I love", "and"],
    correctAnswer: "I am going",
  },
  {
    text: " ___ pizza",
    image: questionImage8,
    answers: ["Make it", "I love", "and"],
    correctAnswer: "I love",
  },
  {
    text: "I ____ paper airplane",
    image: questionImage9,
    answers: ["make it", "eat", "you"],
    correctAnswer: "make it",
  },
  {
    text: "__ home",
    image: questionImage10,
    answers: ["make it", "you", "I am coming from"],
    correctAnswer: "I am coming from",
  },
  {
    text: "I __ moon",
    image: questionImage11,
    answers: ["make it", "I", "I see it"],
    correctAnswer: "I see it",
  },
  {
    text: " __ music",
    image: questionImage12,
    answers: ["I like", "I see it", "I am coming from"],
    correctAnswer: "I like",
  },
  {
    text: "Bye __",
    image: questionImage13,
    answers: ["Mother", "Dad", "him or her"],
    correctAnswer: "Dad",
  },
  {
    text: " Me and __ eating together",
    image: questionImage14,
    answers: ["Mother", "Dad", "him or her"],
    correctAnswer: "Mother",
  },
  {
    text: "Give the book to ___",
    image: questionImage15,
    answers: ["Mother", "Dad", "him or her"],
    correctAnswer: "him or her",
  },
  {
    text: "___ Backpack",
    image: questionImage16,
    answers: ["Mother", "I Love you", "I have it"],
    correctAnswer: "I have it",
  },
  {
    text: "___ board",
    image: questionImage17,
    answers: ["Look at this", "I Love you", "I am coming from"],
    correctAnswer: "Look at this",
  },
  {
    text: "___ daughter",
    image: questionImage18,
    answers: ["Look at this", "I love you", "I am coming from"],
    correctAnswer: "I love you",
  },
  {
    text: "I won! ___",
    image: questionImage19,
    answers: ["I am happy", "who", "I am coming from"],
    correctAnswer: "I am happy",
  },
  {
    text: "___ are you?",
    image: questionImage20,
    answers: ["who", "I am happy", "Look at this"],
    correctAnswer: "who",
  },
  {
    text: "___ in Canada",
    image: questionImage21,
    answers: ["who", "I live", "I am happy"],
    correctAnswer: "I live",
  },
];
