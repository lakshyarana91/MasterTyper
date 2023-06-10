import React from 'react'
import { useGlobalContext } from '../hooks/Context';


const Res = () => {

    const { 
        resetAll,
        result,
        actTime
    } = useGlobalContext()

    var accu = (result.correctCharacters / (result.correctCharacters + result.wrongCharacters)) * 100;
    accu = accu.toFixed(2);

    
    // console.log(time);
    var speed = ((result.correct / actTime) * 60).toFixed(2);
    console.log(actTime);

    return (
        <>
            <div className="result">
                <p>Speed: {speed}wpm</p>
                <p>Accuracy: {accu}%</p>
                <p>No of key pressed: {result.correctCharacters + result.wrongCharacters} </p>
                <p>Correct words: {result.correct}</p>
                <p>Wrong words: {result.wrong}</p>
                <p>Correct Characters: {result.correctCharacters}</p>
                <p>Wrong Characters: {result.wrongCharacters}</p>
                
            </div>
            <div className="restart" onClick={resetAll}>
                Restart
            </div>
        </>
    )
}

export default Res