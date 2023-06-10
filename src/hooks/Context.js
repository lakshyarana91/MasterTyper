import React,{
  useRef,
  useContext,
  useState,
  useLayoutEffect,
  useEffect,
  useCallback
} from "react";

import shuffleWord from "../word";

const AppContext = React.createContext()

const AppProvider = ({ children }) => {

  const [words, setWords] = useState(shuffleWord());
  const [actTime, setActTime] = useState(30)
  const [timer, setTimer] = useState(30);
  const [typedWords, setTypedWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [typedWord, setTypedWord] = useState("");
  const [currentExtraLetter, setCurrentExtraLetter] = useState("");
  const [firstKeyDown, setFirstKeyDown] = useState(false);
  const [result, setResult] = useState(null);
  const currentWordRef = useRef(null);
  const caretRef = useRef(null);


  const setClock = (val) => {
    setTimer(val);
    setActTime(val)
    console.log("Timer set to " + val + 'seconds');
  }

  const resetAll = useCallback(() => {
    setTimer(30);
    setTypedWords([]);
    setCurrentWordIndex(0);
    setTypedWord("");
    setCurrentExtraLetter("");
    setFirstKeyDown(false);
    setWords([]);
    setResult(null);
    setTimeout(() => {
      setWords(shuffleWord());
    }, 0);
  }, [shuffleWord]);

  const prepareResult = useCallback(() => {
    let correct = 0;
    let wrong = 0;
    let correctCharacters = 0;
    let wrongCharacters = 0;
    for (let index = 0; index < typedWords.length; index++) {
      if (words[index] === typedWords[index]) {
        correct++;
        correctCharacters += words[index].length;
      } else {
        for (var i = 0; i < typedWords[index].length; i++) {
          if (typedWords[index][i] === words[index][i]) {
            correctCharacters++;
          } else {
            wrongCharacters++;
          }
        }
        wrong++;
      }
    }
    setResult({ correct, wrong, wrongCharacters, correctCharacters });
  }, [typedWords, words]);

  useEffect(() => {
    let timerCounter;
    if (firstKeyDown) {
      timerCounter = setInterval(() => {
        const newCount = timer - 1;

        setTimer(newCount >= 0 ? newCount : 0);
      }, 1000);

      if (timer <= 0) {
        prepareResult();
      }
    }
    return () => {
      clearInterval(timerCounter);
    };
  }, [timer, firstKeyDown]);

  useLayoutEffect(() => {
    window.onkeydown = (e) => {
      if (e.key.length === 1 || e.key === "Backspace") {
        const totalLength = currentWordRef.current?.innerText
          ?.replace(/[\n\r]+|[\s]{2,}/g, "")
          .replace("|", "")?.length;
        const currentWord = words[currentWordIndex];

        const currentWordLength = currentWord?.length;

        const width = 100 / (totalLength || 1);

        if (currentWord)
          if (e.key === currentWord[typedWord.length]) {
            if (!firstKeyDown) {
              setFirstKeyDown(true);
            }
            setTypedWord(typedWord + e.key);
            currentWordRef.current.children[typedWord.length + 1].classList.add(
              "correct"
            );
          } else if (e.key === " " && typedWord.length >= 1) {
            setTypedWords([...typedWords, typedWord]);
            setCurrentWordIndex(currentWordIndex + 1);
            setTypedWord("");
            setCurrentExtraLetter("");
          } else if (e.key === "Backspace") {
            currentWordRef.current.children[typedWord.length].classList.remove(
              "correct",
              "incorrect"
            );
            caretRef.current.style.left = `calc(${Math.max(
              (currentExtraLetter.length > 0
                ? typedWord.length
                : typedWord.length - 1) * width,
              0
            )}% - 8px)`;
            setTypedWord(typedWord.slice(0, typedWord.length - 1));
            if (currentExtraLetter.length > 0) {
              setCurrentExtraLetter(
                currentExtraLetter.slice(0, currentExtraLetter.length - 1)
              );
            }
          } else if (e.key) {
            if (!firstKeyDown) {
              setFirstKeyDown(true);
            }
            if (currentWordLength > typedWord.length) {
              currentWordRef.current.children[
                typedWord.length + 1
              ].classList.add("incorrect");
              setTypedWord(typedWord + e.key);
            } else {
              if (currentExtraLetter.length <= 20) {
                setTypedWord(typedWord + e.key);
                setCurrentExtraLetter(currentExtraLetter + e.key);
              }
            }
          }
      }
      e.preventDefault();
    };

    return () => {
      window.onkeydown = null;
    };
  }, [
    currentExtraLetter,
    currentWordIndex,
    firstKeyDown,
    typedWord,
    typedWords,
    words,
  ]);
  

  return (
    <AppContext.Provider value={{
      currentWordIndex,
      currentWordRef,
      caretRef,
      currentExtraLetter,
      typedWords,
      timer,
      words,
      resetAll,
      result,
      setClock,
      actTime
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
