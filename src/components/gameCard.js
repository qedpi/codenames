import React from 'react';

// Material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'

import './gameCard.css';

const gameCard = props => {

  /*
  const cards = props.board.map((group, i) => (
                  <div className={`card ${props.isSpymaster || group.seen ? group.color : ''} ${group.seen? 'seen' : ''}`}
                       style={{backgroundColor: props.isDebug? `rgba(${[255, 0, 0, group.sim]})`: 'white'}}
                       id={group.word}
                       onClick={() => props.reveal(i)}>
                      {group.word.toUpperCase()}
                  </div>
              ));
  */

  const borderColorMap = {
    red: 'darkred',
    blue: 'darkblue',
    gray: 'darkgray',
    black: 'black'
  };

  const backgroundColorMap = {
    red: 'lightcoral',
    blue: 'lightblue',
    gray: 'lightgrey',
    black: 'gray'
  };

  const formatWord = word => word.toUpperCase().replace('_', ' ');

  const cards = props.board.map((group, i) => {


    const style = {
      border: '4px solid saddlebrown',
      borderRadius: 10,
      backgroundColor: 'beige',
    };

    if (props.isSpymaster || group.seen) {
      style.border = `4px solid ${borderColorMap[group.color]}`;
      style.color = borderColorMap[group.color]
    }

    if (group.seen) {
      style.backgroundColor = backgroundColorMap[group.color]
    }

    if (props.isDebug) {
      style.backgroundColor = `rgba(${[255, 0, 0, group.sim]})`
    }

    const wordButton = <RaisedButton label={formatWord(group.word)}
                                     style={style}
                                     labelStyle={{
                                       fontSize: '1rem',
                                       fontWeight: '600',
                                     }}
                                     labelColor={props.isSpymaster || group.seen ?
                                       borderColorMap[group.color] : 'brown'}
                                     className='card'
                                     key={group.word}
                                     onClick={() => props.reveal(i)}
    />;

    return wordButton;
  });

  return (
    <MuiThemeProvider>
      <div className="boardWrapper">
        {cards}
      </div>
    </MuiThemeProvider>
  )
};

export default gameCard;
