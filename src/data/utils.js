

const DEFAULT_WORDS = {
  red: ['lion', 'trip'],
  blue: ['Serengeti'],
  gray: [],
  black: ['nope'],
};

const areWordsUniq = (WORDS) => {
  if (WORDS.length + ' ' + (new Set(WORDS)).size) {
    WORDS.forEach(w => {
      if (WORDS.reduce((total, y) => total +  (y === w), 0) > 1){
        alert(w);
      }
    });
  }
};
