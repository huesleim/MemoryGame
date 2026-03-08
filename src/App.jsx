import { useState, useEffect } from "react";
const totalCards = 50;
const shownCards = 16;

const genCards = async () => {
    const ids = new Set();

    while (ids.size < totalCards) {
        ids.add(Math.floor(Math.random() * 1025) + 1);
    }

    const promises = [...ids].map(async (id) => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();

        return {
            id: id,
            sprite: data.sprites.front_default,
            wasClicked: false,
        };
    });

    const cards = await Promise.all(promises);
    return cards;
};

function App() {
    const [cards, setCards] = useState([]);
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);

    const newRoster = async () => {
        const generatedCards = await genCards();
        setCards(generatedCards);
        setScore(0);
    };
    
    const shuffleCards = () => {
        setCards((prev) => [...prev].sort(() => Math.random() - 0.5));
    };

    const handleCardClick = (id) => {
        const card = cards.find((c) => c.id === id);

        if (card.wasClicked) {
            setScore(0);

            setCards((prev) =>
                prev.map((c) => ({
                    ...c,
                    wasClicked: false,
                })),
            );
        } else {
            setCards((prev) =>
                prev.map((c) => (c.id === id ? { ...c, wasClicked: true } : c)),
            );
            setScore((prev) => prev + 1);
            setBestScore((prev) => Math.max(prev, score + 1));
        }
        shuffleCards();
    };

    useEffect(() => {
        async function loadCards() {
            const generatedCards = await genCards();
            setCards(generatedCards);
        }

        loadCards();
    }, []);

    return (
        <div className="container">
            <div className="sidebar">
                <h1>Memory Game</h1>
                <p>
                    Click on a pokemon to win a point, but don't click on the
                    same pokemon twice or you lose!
                </p>
                <button onClick={newRoster}>Change pokemon roster</button>
                <p>Your score is </p>
                <h2> {score} </h2>
                <p>Best score is </p>
                <h2> {bestScore} </h2>
            </div>
            <div className="grid">
                {cards.slice(0, shownCards).map((card) => (
                    <div
                        className="card"
                        key={card.id}
                        onClick={() => handleCardClick(card.id)}
                    >
                        <img src={card.sprite} alt="pokemon" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
