# Memory Game – React Hooks Practice
🔗 Live Demo: https://memorygamedeploy.vercel.app/

## Overview

This project is a simple **memory card game built with React** while studying **React Hooks**, particularly `useState` and `useEffect`.

The goal of the game is to click on different Pokémon cards without clicking the same one twice. Each unique click increases the score, but clicking a card that was already selected resets the score.

The project focuses on **state management, side effects, and immutable state updates** rather than complex UI.

Pokémon data is fetched dynamically from the **PokeAPI**.

---

## Learning Goals

This project was created while studying:

* **React Hooks**

  * `useState` for managing application state
  * `useEffect` for handling side effects such as API calls
* **State updates with functional setters**
* **Immutable state patterns**
* **Handling asynchronous data in React**
* **Basic game state logic**

---

## How the Game Works

1. The application fetches **50 random Pokémon** from the PokeAPI.
2. Only **16 cards** are displayed at a time.
3. When the user clicks a Pokémon card:

   * If the card **has not been clicked before**, the score increases.
   * If the card **was already clicked**, the score resets and all cards become unclicked.
4. After every click, the cards are **shuffled randomly**.
5. The game tracks:

   * **Current score**
   * **Best score**

Users can also generate a **new random Pokémon roster**.

---

## Key Concepts Implemented

### useState

State is used to track:

* The Pokémon cards
* Current score
* Best score

Example:

```javascript
const [cards, setCards] = useState([]);
const [score, setScore] = useState(0);
const [bestScore, setBestScore] = useState(0);
```

---

### useEffect

`useEffect` runs once when the component mounts to fetch the initial set of Pokémon.

```javascript
useEffect(() => {
    async function loadCards() {
        const generatedCards = await genCards();
        setCards(generatedCards);
    }

    loadCards();
}, []);
```

---

### Immutable State Updates

Cards are updated using `map()` to avoid mutating state directly.

Example:

```javascript
setCards((prev) =>
    prev.map((c) =>
        c.id === id ? { ...c, wasClicked: true } : c
    )
);
```

---

## Pokémon Data Fetching

The game generates a **set of unique Pokémon IDs** and fetches their sprite images from the **PokeAPI**.

Each card contains:

```javascript
{
  id: number,
  sprite: string,
  wasClicked: boolean
}
```

---

## Features

* Random Pokémon roster generation
* Memory-based scoring system
* Score reset on repeated click
* Best score tracking
* Card shuffling after each move
* API-based sprite loading

---

## Technologies Used

* React
* JavaScript (ES6+)
* PokeAPI
* CSS

---

## Purpose of the Project

This project was built as part of learning **React state management and hooks**. The focus was on understanding how React updates state, how to manage asynchronous data fetching, and how to handle user interactions that change application state.
