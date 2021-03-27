// Getting the Quote from Type.fit
let apiQuotes = [];

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const newQuote = () => {
  const randomIndex = getRandomInt(apiQuotes.length);
  const quote = apiQuotes[randomIndex];
  // console.log(quote);
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

// On Load
getQuote();
