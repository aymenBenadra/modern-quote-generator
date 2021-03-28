import { backgroundPatterns } from "./background-patterns.js";

// Getting elements from the DOM
const body = document.body;
const quoteText = document.querySelector("#quote");
const quoteAuthor = document.querySelector("#author");
const twitterBtn = document.querySelector("#twitter");
const facebookBtn = document.querySelector("#facebook");
const linkedinBtn = document.querySelector("#linkedin");
const newQuoteBtn = document.querySelector("#new-quote");

// Helper function to get a random int value to be used as index later.
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// Getting the Quote from Type.fit
let apiQuotes = [];

const newQuote = () => {
  let randomIndex = getRandomInt(apiQuotes.length);
  const quote = apiQuotes[randomIndex];
  // console.log(quote);

  // Updating the Quote Text and Author
  if (quote.text.length > 100) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quote.text;
  quoteAuthor.textContent = quote.author ? quote.author : "Anonymous";

  // Randomly changing the background color.
  randomIndex = getRandomInt(backgroundPatterns.length);
  console.log(body.style.backgroundImage);
  body.style.backgroundImage =
    backgroundPatterns[randomIndex]["background image"];
  console.log(body.style.backgroundImage);
};

const getQuote = async () => {
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    if (response.ok) {
      apiQuotes = await response.json();
      console.log("Yay! Got quotes successfully.\n data:>>", apiQuotes);
      newQuote();
    } else {
      throw new Error("The request failed with the status:", response.status);
    }
  } catch (error) {
    console.log(
      "Sorry, no quote for you!\nI'll be using a local quotes because of an error.\nError:",
      error
    );
    // use the local Quotes in quotes.js in case of an error.
    const localQuotes = await import("./quotes.js");
    apiQuotes = localQuotes.localQuotes;
    console.log("data :>> ", apiQuotes);
  }
};

// Tweet the quote!
const tweetQuote = () => {
  const quote = quoteText.textContent;
  const author = quoteAuthor.textContent;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} ~${author}`;

  window.open(twitterUrl, "_blank");
};

// Share the quote on Facebook!
const facebookShare = () => {
  const quote = quoteText.textContent;
  const author = quoteAuthor.textContent;
  const title = "Modern Quote Generator";
  const personalLink = "benadra.me/modern-quote-generator";
  const facebookUrl = `http://www.facebook.com/sharer.php?s=100&p[title]=${title}&p[url]=${encodeURIComponent(
    personalLink
  )}&p[quote]=${quote} ~${author}`;

  window.open(facebookUrl, "_blank");
};

// Share the quote on Linkedin!
const linkedinShare = () => {
  const personalLink = "benadra.me/modern-quote-generator";
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    personalLink
  )}`;

  window.open(linkedinUrl, "_blank");
};

// Event listeners for the buttons.
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);
facebookBtn.addEventListener("click", facebookShare);
linkedinBtn.addEventListener("click", linkedinShare);

// On Load
getQuote();
