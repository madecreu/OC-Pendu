import Keyboard from "./Keyboard";
import ListUsedLetters from "./ListUsedLetters";
import './App.css'
import randomWords from 'random-words'
import {useEffect, useState} from "react";

const computeDisplay = (word, usedLetters) => word.replace(/\w/g, (letter) => (usedLetters.includes(letter) ? letter : '_'));

const App = () => {
    const [word, setWord] = useState(randomWords().toUpperCase());
    const [usedLetters, setUsedLetters] = useState([]);
    const [count, setCount] = useState(0);
    const [end, setEnd] = useState(false);

    useEffect(() => {
        if (!computeDisplay(word, usedLetters).includes('_')) {
            setEnd(true);
        }
    }, [usedLetters, end, word]);


    const handleTry = (event) => {
        const triedLetter = event.currentTarget.value.toUpperCase();
        setUsedLetters((usedLetters) => [...usedLetters, triedLetter]);
        setCount((count) => count + 1);
    }

    const handleRestart = () => {
        setUsedLetters([]);
        setCount(0);
        setWord(randomWords().toUpperCase());
        setEnd(false);
    }

    return (
        <div className="App">
            <h1 className="word" name="word">{computeDisplay(word, usedLetters)}</h1>
            <h3>Nombres d'essais : {count}</h3>
            <div>
                {end
                    ? <button onClick={() => handleRestart()}>Restart</button>
                    : <Keyboard handleTry={handleTry} />
                }
            </div>
            <div>
                <h2>Lettres déjà essayées :</h2>
                <ListUsedLetters usedLetters={usedLetters}/>
            </div>
        </div>
    );
}

export default App;
