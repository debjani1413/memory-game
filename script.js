const cards = document.querySelectorAll(".card");

// Initialize variables
let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;

// Function to handle card flip
function flipCard({ target: clickedCard }) {
  // Ensure clicked card is not the same as the first card and the deck isn't disabled
  if (cardOne !== clickedCard && !disableDeck) {
    clickedCard.classList.add("flip");

    // If no card has been selected yet
    if (!cardOne) {
      return cardOne = clickedCard;
    }

    // If a second card is selected
    cardTwo = clickedCard;
    disableDeck = true;

    // Get images of both cards
    let cardOneImg = cardOne.querySelector(".back-view img").src,
      cardTwoImg = cardTwo.querySelector(".back-view img").src;
    matchCards(cardOneImg, cardTwoImg);
  }
}

// Function to handle card matching logic
function matchCards(img1, img2) {
  if (img1 === img2) {
    matched++;  // Increase matched count

    // If all pairs are matched
    if (matched == 8) {
      setTimeout(() => {
        return shuffleCard();
      }, 1000);
    }

    // Remove click event listeners from matched cards
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);

    // Reset selected cards
    cardOne = "";
    cardTwo = "";
    return disableDeck = false;
  }

  // Cards do not match, shake them
  setTimeout(() => {
    cardOne.classList.add("shake");
    cardTwo.classList.add("shake");
  }, 400);

  // Hide non-matching cards after a delay
  setTimeout(() => {
    cardOne.classList.remove("shake", "flip");
    cardTwo.classList.remove("shake", "flip");
    cardOne = cardTwo = "";
    disableDeck = false;
  }, 1200);
}

// Function to shuffle the cards
function shuffleCard() {
  matched = 0;
  disableDeck = false;
  cardOne = cardTwo = "";

  // Array with card pairs
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];

  // Shuffle the array
  arr.sort(() => Math.random() > 0.5 ? 1 : -1);

  // Assign shuffled images to cards
  cards.forEach((card, i) => {
    card.classList.remove("flip");
    let imgTag = card.querySelector(".back-view img");
    imgTag.src = `images/img-${arr[i]}.png`;
    card.addEventListener("click", flipCard);
  });
}

// Initial shuffle and setup
shuffleCard();

// Add click event listeners to all cards
cards.forEach(card => {
  card.addEventListener("click", flipCard);
});