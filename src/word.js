const words = [
  "ability",
  "able",
  "about",
  "above",
  "accept",
  "according",
  "account",
  'begin',
  'behavior',
  'behind',
  'believe',
  'center',
  'certainly',
  'chair',
  'challenge',
  'chance',
  'difference',
  'different',
  'difficult',
  'including',
  'increase',
  'indeed',
  'indicate',
  'individual',
  'industry',
  'information',
  'participant',
  'particular',
  'particularly',
  'government',
  'great',
  'green',
  'ground',
  'group',
  'grow',
  'growth',
  'guess',
  'message',
  'method',
  'middle',
  'might',
  'military',
  'million',
  'mind',
  'minute',
  'miss',
  'mission',
  'model',
  'modern',
  'moment',
  'problem',
  'process',
  'produce',
  'product',
  'production',
  'professional',
  'professor',
  'program',
  'require',
  'research',
  'resource',
  'respond',
  'response',
  'responsibility',
];


const shuffleWord = () => {
  const array = [...words];
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array.slice(0, 100);
};


export default shuffleWord;
