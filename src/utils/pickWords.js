import _ from 'lodash'
import WORDS from '../data/words'
const BOARDSIZE = 25

const COLORSCHEME = {
  red: 9,
  blue: 8,
  black: 1,
  gray: 7
}

export default (words=WORDS, boardsize=BOARDSIZE, colorScheme=COLORSCHEME) => {
  const wordSample = _.sampleSize(words, boardsize)
  const colors = _.shuffle(Object.keys(colorScheme).reduce(
    (acc, color) => acc.concat(Array(colorScheme[color]).fill(color)), []))
  const cards = wordSample.map((w, i) => {
    return {
      word: w,
      color: colors[i],
      seen: false,
      sim: 0.0,
    }
  })
  return cards
}
