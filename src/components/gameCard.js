import React from 'react';

import RaisedButton from 'material-ui/RaisedButton'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

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

  const cards = props.board.map((group, i) => {


    const style = {
      border: '3px solid black',
    };

    if (props.isSpymaster ) {
      style.border = `3px solid ${borderColorMap[group.color]}`;
      style.color = borderColorMap[group.color]
    }

    if (group.seen) {
      style.backgroundColor = backgroundColorMap[group.color]
    }

    if (props.isDebug) {
      style.backgroundColor = `rgba(${[255, 0, 0, group.sim]})`
    }

    return <RaisedButton label={group.word.toUpperCase()}
                         style={style}
                         className='card'
                         id={group.word}
                         onClick={() => props.reveal(i)} />
  });

  return (
    <div className="boardWrapper">
      <MuiThemeProvider>
        {cards}
      </MuiThemeProvider>
    </div>
  )
};

export default gameCard;
