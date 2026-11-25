/*
 * Game 1 question data. Keep English sentences here rather than in UI code.
 *
 * text: Question with blank (shown before the right answer)
 * correctAnswer: Existing quiz option; changing it would affect audio/scoring
 * correctSentence: Full English sentence (shown after the right answer)
 * highlightedText: Part of the correct sentence to turn green
 *
 * Some answers are vocabulary glosses rather than words that fit a sentence
 * literally. In those cases highlightedText uses the natural English phrasing.
 * This is display-only: existing questions, choices, months, and audio are unchanged.
 */

import questionImage1 from "../assets/questionImage1.webp";
import questionImage2 from "../assets/questionImage2.webp";
import questionImage3 from "../assets/questionImage3.webp";
import questionImage4 from "../assets/questionImage4.webp";
import questionImage5 from "../assets/questionImage5.webp";
import questionImage6 from "../assets/questionImage6.webp";
import questionImage7 from "../assets/questionImage7.webp";
import questionImage8 from "../assets/questionImage8.webp";
import questionImage9 from "../assets/questionImage9.webp";
import questionImage10 from "../assets/questionImage10.webp";
import questionImage11 from "../assets/questionImage11.webp";
import questionImage12 from "../assets/questionImage12.webp";
import questionImage13 from "../assets/questionImage13.webp";
import questionImage14 from "../assets/questionImage14.webp";
import questionImage15 from "../assets/questionImage15.webp";
import questionImage16 from "../assets/questionImage16.webp";
import questionImage17 from "../assets/questionImage17.webp";
import questionImage18 from "../assets/questionImage18.webp";
import questionImage19 from "../assets/questionImage19.webp";
import questionImage20 from "../assets/questionImage20.webp";
import questionImage21 from "../assets/questionImage21.webp";

// The audio filenames are kept exactly as in your existing project.
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

export const questions = [
  // SEPTEMBER
  {
    text: "____ am a Indian .",
    image: questionImage4,
    answers: ["eat", "I", "you"],
    correctAnswer: "I",
    correctSentence: "I am an Indian.",
    highlightedText: "I",
    month: "Wikumkewiku’s (September)",
  },
  {
    text: "____ and me",
    image: questionImage3,
    answers: ["and", "eat", "you"],
    correctAnswer: "you",
    correctSentence: "You and me.",
    highlightedText: "You",
    month: "Wikumkewiku’s (September)",
  },
  {
    text: "____ Mali",
    image: questionImage2,
    answers: ["is my name", "eat", "and"],
    correctAnswer: "is my name",
    correctSentence: "My name is Mali.",
    highlightedText: "My name is",
    month: "Wikumkewiku’s (September)",
  },

  // OCTOBER
  {
    text: "You ___ my friend.",
    image: questionImage6,
    answers: ["and", "I", "you"],
    correctAnswer: "and",
    correctSentence: "You and my friend.",
    highlightedText: "and",
    month: "Wikewiku’s (October)",
  },
  {
    text: "I ____ at Mcdonalds",
    image: questionImage1,
    answers: ["and", "eat", "you"],
    correctAnswer: "eat",
    correctSentence: "I eat at McDonald's.",
    highlightedText: "eat",
    month: "Wikewiku’s (October)",
  },
  {
    text: "____ Pizza.",
    image: questionImage5,
    answers: ["I like the taste of", "I", "and"],
    correctAnswer: "I like the taste of",
    correctSentence: "I like the taste of pizza.",
    highlightedText: "I like the taste of",
    month: "Wikewiku’s (October)",
  },

  // NOVEMBER
  {
    text: " ___ my Granddad",
    image: questionImage8,
    answers: ["Make it", "I love", "and"],
    correctAnswer: "I love",
    correctSentence: "I love my Granddad.",
    highlightedText: "I love",
    month: "Keptekewiku’s (November)",
  },
  {
    text: "I am ____ a house",
    image: questionImage9,
    answers: ["make it", "eat", "you"],
    correctAnswer: "make it",
    correctSentence: "I am making a house.",
    highlightedText: "making",
    month: "Keptekewiku’s (November)",
  },
  {
    text: "___ to town",
    image: questionImage7,
    answers: ["I am going", "I love", "and"],
    correctAnswer: "I am going",
    correctSentence: "I am going to town.",
    highlightedText: "I am going",
    month: "Keptekewiku’s (November)",
  },

  // DECEMBER
  {
    text: "I __ fire",
    image: questionImage11,
    answers: ["make it", "I", "I see it"],
    correctAnswer: "I see it",
    correctSentence: "I see a fire.",
    highlightedText: "I see",
    month: "Kesikewiku’s (December)",
  },
  {
    text: " __ to play",
    image: questionImage12,
    answers: ["I like", "I see it", "I am coming from"],
    correctAnswer: "I like",
    correctSentence: "I like to play.",
    highlightedText: "I like",
    month: "Kesikewiku’s (December)",
  },
  {
    text: "__ town",
    image: questionImage10,
    answers: ["make it", "you", "I am coming from"],
    correctAnswer: "I am coming from",
    correctSentence: "I have been to town.",
    highlightedText: "I have been",
    month: "Kesikewiku’s (December)",
  },

  // JANUARY
  {
    text: " __ is dancing",
    image: questionImage13,
    answers: ["Mother", "Dad", "him or her"],
    correctAnswer: "Dad",
    correctSentence: "Dad is dancing.",
    highlightedText: "Dad",
    month: "Punamujuiku’s (January)",
  },
  {
    text: " I love ___",
    image: questionImage14,
    answers: ["Grandma", "Dad", "him or her"],
    correctAnswer: "Grandma",
    correctSentence: "I love Grandma.",
    highlightedText: "Grandma",
    month: "Punamujuiku’s (January)",
  },
  {
    text: "___ is my friend",
    image: questionImage15,
    answers: ["Mother", "Dad", "him or her"],
    correctAnswer: "him or her",
    correctSentence: "This is my friend.",
    highlightedText: "This",
    month: "Punamujuiku’s (January)",
  },

  // FEBRUARY
  {
    text: "___ Money",
    image: questionImage16,
    answers: ["Mother", "I Love you", "I have it"],
    correctAnswer: "I have it",
    correctSentence: "I have money.",
    highlightedText: "I have",
    month: "Apuknajit (February)",
  },
  {
    text: "___ dog",
    image: questionImage17,
    answers: ["Look at this", "I Love you", "I am coming from"],
    correctAnswer: "Look at this",
    correctSentence: "This is a dog.",
    highlightedText: "This is",
    month: "Apuknajit (February)",
  },
  {
    text: "___ grandma",
    image: questionImage18,
    answers: ["Look at this", "I love you", "I am coming from"],
    correctAnswer: "I love you",
    correctSentence: "I love you, Grandma.",
    highlightedText: "I love you",
    month: "Apuknajit (February)",
  },

  // MARCH
  {
    text: "I'm glad that u came ___",
    image: questionImage19,
    answers: ["I am happy", "who", "I am coming from"],
    correctAnswer: "I am happy",
    correctSentence: "I am glad that you came.",
    highlightedText: "I am glad",
    month: "Si’ko”ku’s (March)",
  },
  {
    text: "___ are you?",
    image: questionImage20,
    answers: ["who", "I am happy", "Look at this"],
    correctAnswer: "who",
    correctSentence: "Who are you?",
    highlightedText: "Who",
    month: "Si’ko”ku’s (March)",
  },
  {
    text: "___ in Eskasoni",
    image: questionImage21,
    answers: ["who", "I live", "I am happy"],
    correctAnswer: "I live",
    correctSentence: "I live in Eskasoni.",
    highlightedText: "I live",
    month: "Si’ko”ku’s (March)",
  },
];

// Keep the dictionary data untouched (Mi'kmaw isn't part of this change).
export const mikmawWords = {
  "i": "ni'n",
  "and": "aqq",
  "eat": "mijisi",
  "you": "ki'l",
  "is my name": "teluisi",
  "i like the taste of": "wiktm",
  "i am going": "eliey",
  "i love": "kesalk",
  "make it": "l'tu",
  "i am coming from": "wejiey",
  "i see it": "nemitu",
  "i like": "kesam",
  "mother": "kiju'",
  "dad": "ta'ta",
  "him or her": "nekm",
  "i love you": "kesalul",
  "i have it": "ala'tu",
  "look at this": "ula",
  "i am happy": "welta'si",
  "who": "wen",
  "i live": "e'wist",
};
