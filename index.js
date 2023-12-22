const gridContainer = document.querySelector(".grid-container");
let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let score = 0;
let highScore = sessionStorage.getItem("highScore") || 0;

document.querySelector(".score").textContent = score;

cards = [
    { name: 1 },
    { name: 1 },
    { name: 2 },
    { name: 2 },
    { name: 3 },
    { name: 3 },
    { name: 4 },
    { name: 4 },
    { name: 5 },
    { name: 5 },
    { name: 6 },
    { name: 6 },
    { name: 7 },
    { name: 7 },
    { name: 8 },
    { name: 8 },
    { name: 9 },
    { name: 9 },
    { name: 10 },
    { name: 10 },
  ];

function shuffleCards() {
    let currentIndex = cards.length,
        randomIndex,
        temporaryValue;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
    }
}

function generateCards() {
    for (let card of cards) {
      const cardElement = document.createElement("div");
      cardElement.classList.add("card");
      cardElement.setAttribute("data-name", card.name);
      cardElement.innerHTML = `
        <div class="front">
          <!-- Display the card's name on the front -->
          <span class="front-text">${card.name}</span>
        </div>
        <div class="back"></div>
      `;
      gridContainer.appendChild(cardElement);
      cardElement.addEventListener("click", flipCard);
    }
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add("flipped");

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    
    lockBoard = true;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;

    if (isMatch) {
        score += 10;
        document.querySelector(".score").textContent = score;
    }
    else{
        if (score > 0) score--;
        document.querySelector(".score").textContent = score;
    }

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        resetBoard();
    }, 1000);
}

function resetBoard() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

function restart() {
    if (score > highScore) {
        highScore = score;
        sessionStorage.setItem("highScore", highScore);
        document.querySelector(".high-score").textContent = highScore;
    }
    resetBoard();
    shuffleCards();
    score = 0;
    document.querySelector(".score").textContent = score;
    gridContainer.innerHTML = "";
    generateCards();
}

    shuffleCards();
    generateCards();