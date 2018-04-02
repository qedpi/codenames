// Modules
import React, {Component} from 'react';
import axios from 'axios';
import _ from 'lodash'

// Material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton'
import Toggle from 'material-ui/Toggle';
import Badge from 'material-ui/Badge';
import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import MenuItem from 'material-ui/MenuItem';

// Components
import WORDS from '../data/words';
import GameCard from '../components/gameCard';

// CSS
import './App.css';


// Constants
const SERVER_URL = 'https://codenamesai.herokuapp.com/api/' || 'http://127.0.0.1:5000/api/';
const BOARD_SIZE = 25;

const pickWords = () => {
  const words = _.sampleSize(WORDS, BOARD_SIZE);

  let colors = (Array(9).fill('red'))
    .concat(Array(8).fill('blue'))
    .concat(Array(1).fill('black'))
    .concat(Array(7).fill('gray'));
  colors = _.shuffle(colors);

  return words.map((w, i) => {
    return {
      word: w,
      color: colors[i],
      seen: false,
      sim: 0,
    }
  })
};

function play_sound_effect(id) {
  // makes sure that sound effect plays from start even when it's still playing
  const aud = document.getElementById(id);

  aud.volume = id === 'audio_fail' ? .01 : .5;
  aud.pause();
  aud.currentTime = 0;
  aud.play();
}

const initialState = () => {
  return {
    words: {
      red: [],
      blue: [],
      gray: [],
      black: [],
      allWords: [],
    },
    board: pickWords(),
    result: {
      hint: '',
      targets: []
    },
    isSpymaster: false,
    isDebug: false,
    awaitingServer: false,
    gameStatus: 'playing',
    player: 'red',
    previous_hints: [],
    show_drawer: false,
  };
};

const otherColor = {
  blue: 'red',
  red: 'blue'
};

class App extends Component {
  state = {
    ...initialState()
  };

  handleSubmit = () => {
    console.log('sent to server');
    this.setState({
      awaitingServer: true,
    });

    axios.post(SERVER_URL, this.state.words)
      .then(res => {
        const board = JSON.parse(JSON.stringify(this.state.board));

        res.data.allDists.forEach((dist, i) => {
          board[i].sim = dist
        });

        const previous_hints = [...this.state.previous_hints];
        previous_hints.push({hint: res.data.hint, num: res.data.targets.length});

        this.setState({
          result: res.data,
          board,
          awaitingServer: false,
          previous_hints,
        }, () => {
          console.log('updated result', this.state.board);
        });
      })
  };

  handleUpdate = () => {
    const words = {
      red: [],
      blue: [],
      gray: [],
      black: [],
      allWords: this.state.board.map(group => group.word)
    };

    this.state.board.forEach(group => {
      if (!group.seen) {
        words[group.color].push(group.word);
      }
    });

    let status = 'playing';
    if (!words.red.length) {
      status = 'red won';
    } else if (!words.blue.length) {
      status = 'blue won';
    } else if (!words.black.length) {
      status = `${otherColor[this.state.player]} won`;
    }

    if (status === this.state.player + ' won') {
      play_sound_effect('audio_applause');
    }

    this.setState({
      words: words,
      gameStatus: status,
    });
  };

  handleToggleSpymaster = () =>
    this.setState({isSpymaster: !this.state.isSpymaster});

  handleToggleDebug = () =>
    this.setState({isDebug: !this.state.isDebug});

  toggleHistory = () =>
    this.setState({show_drawer: !this.state.show_drawer});

  handleReveal = (i) => {
    if (this.state.gameStatus === 'playing') {
      const board = JSON.parse(JSON.stringify(this.state.board));
      board[i].seen = true;

      play_sound_effect(board[i].color === this.state.player ? 'audio_cards' : 'audio_fail');

      if (board[i].color === this.state.player) {
        play_sound_effect('audio_cards');
      } else {
        play_sound_effect('audio_fail');
        // Flip over one of opponent's cards (choose first one)
        for (const card of board) {
          if (card.color === otherColor[this.state.player] && !card.seen) {
            card.seen = true;
            break;
          }
        }
        this.handleSubmit();
      }

      this.setState({
        board: board,
      }, this.handleUpdate);
    }
  };

  handleStart = () => {
    this.setState({
      ...initialState()
    }, this.handleUpdate)
  };

  handleClose = () => {
    this.setState({
      gameStatus: 'done',
    })
  };

  componentWillMount() {
    this.handleUpdate();
  }

  render() {

    const debugInfo = this.state.isDebug ? (
      <div>
        <p>{this.state.result.targets.join(', ')}</p>
        <p>{JSON.stringify(this.state.result.dist)}</p>
        <p>{JSON.stringify(this.state.result.allDists)}</p>
      </div>
    ) : null;

    const progress = this.state.awaitingServer ?
      <CircularProgress size={20}/> : (
        <Badge badgeContent={this.state.result.targets.length} primary={true}>
          {this.state.result.hint}
        </Badge>
      );

    const actions = [
      <FlatButton
        label="Yes"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleStart}
      />,
      <FlatButton
        label="No"
        secondary={true}
        onClick={this.handleClose}
      />,
    ];

    const victory = (
      <Dialog
        title={`${this.state.gameStatus} the game!`}
        actions={actions}
        modal={false}
        open={this.state.gameStatus.includes('won')}
        onRequestClose={this.handleClose}
      >
        Play again?
      </Dialog>
    );

    const hint_history = (
      <Drawer open={this.state.show_drawer}
              docked={false}>
        <AppBar title="Hint History"
                iconElementLeft={<IconButton><NavigationClose /></IconButton>}
                onLeftIconButtonClick={this.toggleHistory}/>
        {this.state.previous_hints.map(hint =>
          <MenuItem>
            {hint.hint}
            <Badge badgeContent={hint.num} secondary={true}/>
          </MenuItem>
        )}
      </Drawer>
    );

    const hintControls = this.state.gameStatus === 'playing' ?
      (
        <div style={{display: 'inline-block'}}>
          <RaisedButton
            label="History"
            onClick={this.toggleHistory}/>
          <RaisedButton label='Next Hint' onClick={this.handleSubmit}
                        backgroundColor={'#CE93D8'}
                        style={{margin: 12, align: 'left'}}/>
          {progress}
        </div>
      ) :
      <div style={{display: 'inline-block'}}>
        <RaisedButton label='Restart Game' onClick={this.handleStart} primary={true}
                      style={{margin: 12, align: 'left'}}/>
      </div>;




    const gameControls = (
      <MuiThemeProvider>
        <div style={{display: 'inline-block', float: 'left', marginLeft: '1em'}}>
          <Badge badgeContent={this.state.words.red.length} secondary={true}/>
          <Badge badgeContent={this.state.words.blue.length} primary={true}/>
        </div>

        {hint_history}
        {hintControls}
        {victory}


        <div id='debugTools' style={{display: 'inline-block', float: 'right', marginRight: '1em'}}>
          <Toggle label='Spymaster' onToggle={this.handleToggleSpymaster} toggled={this.state.isSpymaster}/>
          <Toggle label='Debug' onToggle={this.handleToggleDebug} toggled={this.state.isDebug}/>
        </div>
      </MuiThemeProvider>
    );

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">CODENAME BOT</h1>
        </header>

        {gameControls}

        <GameCard board={this.state.board}
                  isSpymaster={this.state.isSpymaster}
                  reveal={this.handleReveal}
                  isDebug={this.state.isDebug}/>

        {debugInfo}
      </div>
    );
  }
}

export default App;
