import { useGlobalContext } from "../hooks/Context";

const TypeArea = () => {

  const { words,
    timer,
    currentWordIndex,
    currentWordRef,
    caretRef,
    currentExtraLetter,
    typedWords,
    resetAll,
    setClock
  } = useGlobalContext()

  return (
    <div className="content">
      <div class=" innerContent">

        <div className="time">
          <span>Time remaining - </span>
          <p className="timer">{timer}</p>
        </div>

        <div className="right" >
          <p class=" info"> Typed Words : {typedWords.length} </p>
          <p class=" info" > Total Words : {words.length} </p>
          <p class=" info"> Remaining  Words : {words.length - typedWords.length} </p>
        </div>
      </div>


      <div className="typespace">
        {words.map((word, idx) => (
          <>
            <span
              ref={idx === currentWordIndex ? currentWordRef : null}
              key={idx}
              className="word"
            >
              {word?.split("")?.map((letter, Idx) => (
                <>
                  {idx === currentWordIndex && Idx === 0 && (
                    <span
                      className="caret"
                      ref={caretRef}
                      style={{ left: "-8px" }}
                    >
                      {"|"}
                    </span>
                  )}
                  <span key={Idx} className="letter">
                    {letter}
                  </span>
                </>
              ))}
              {idx === currentWordIndex && currentExtraLetter
                ? currentExtraLetter.split("")?.map((letter, Idx) => (
                  <span key={Idx + letter} className="letter extra">
                    {letter}
                  </span>
                ))
                : typedWords[idx]
                  ?.substring(word.length)
                  .split("")
                  ?.map((letter, Idx) => (
                    <span key={letter + Idx} className="letter extra">
                      {letter}
                    </span>
                  ))}
            </span>
          </>
        ))}
      </div>

      <div className="countdowns">
        <p>Set Timer</p>
        <span onClick={() => setClock(15)}>15</span>
        <span onClick={() => setClock(30)}>30</span>
        <span onClick={() => setClock(45)}>45</span>
        <span onClick={() => setClock(60)}>60</span>
      </div>


      <div className="restart mpage" onClick={resetAll} >
        Restart
      </div>


    </div>
  );
};

export default TypeArea;
