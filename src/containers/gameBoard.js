// Modules
import React, {Component} from 'react';
import axios from 'axios';

// Material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Toggle from 'material-ui/Toggle';
import Badge from 'material-ui/Badge';

// Components
import GameEnd from '../components/gameEnd';
import HintHistory from '../components/hintHistory';
import HintControls from '../components/hintControls';
import GameCard from '../components/gameCard';

// Utils
import playAudio from '../utils/playAudio'
import pickWords from '../utils/pickWords'

// Constants
import { SERVER_URL } from '../data/constants'

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
    previousHints: [],
    showDrawer: false,
  };
};

const otherColor = {
  blue: 'red',
  red: 'blue'
};

class GameBoard extends Component {
  state = {
    ...initialState()
  };

  handleSubmit = () => {
    console.log('request hint from server');
    this.setState({
      awaitingServer: true,
    });

    axios.post(SERVER_URL, {...this.state.words, previousHints: this.state.previousHints.map(_ => _.hint)})
      .then(res => {
        const board = JSON.parse(JSON.stringify(this.state.board));

        res.data.allDists.forEach((dist, i) => {
          board[i].sim = dist
        });

        const previousHints = [...this.state.previousHints];
        previousHints.push({hint: res.data.hint, num: res.data.targets.length});

        this.setState({
          result: res.data,
          board,
          awaitingServer: false,
          previousHints: previousHints,
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

    this.setState({
      words: words,
      gameStatus: status,
    }, () => {
      if (this.state.previousHints.length === 0) {
        this.handleSubmit();
      }
    });
  };

  handleToggleSpymaster = () =>
    this.setState({isSpymaster: !this.state.isSpymaster});

  handleToggleDebug = () =>
    this.setState({isDebug: !this.state.isDebug});

  toggleHistory = () =>
    this.setState({showDrawer: !this.state.showDrawer});

  handleReveal = (i) => {
    if (this.state.gameStatus === 'playing') {
      const board = JSON.parse(JSON.stringify(this.state.board));
      board[i].seen = true;

      playAudio('audio_cards');

      if (board[i].color !== this.state.player) {
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

  // todo: why doesn't it work with componentDidMount?
  componentWillMount() {
    this.handleUpdate();
  }

  render() {
    const debugInfo = this.state.isDebug ? (
      <div>
        <p>{this.state.result.targets.join(', ')}</p>
        <p>{JSON.stringify(this.state.result.dist)}</p>
      </div>
    ) : null;

    const gameControls = (
      <MuiThemeProvider>
        <div style={{display: 'inline-block', float: 'left', marginLeft: '1em'}}>
          <Badge badgeContent={this.state.words.red.length} secondary={true}/>
          <Badge badgeContent={this.state.words.blue.length} primary={true}/>
        </div>

        <HintHistory showDrawer={this.state.showDrawer}
                     previousHints={this.state.previousHints}
                     toggleHistory={this.toggleHistory} />

        <HintControls gameStatus={this.state.gameStatus}
                      toggleHistory={this.toggleHistory}
                      handleSubmit={this.handleSubmit}
                      handleStart={this.handleStart}
                      result={this.state.result}
                      awaitingServer={this.state.awaitingServer} />

        <GameEnd gameStatus={this.state.gameStatus}
                 handleClose={this.handleClose}
                 handleStart={this.handleStart} />

        <div id='debugTools' style={{display: 'inline-block', float: 'right', marginRight: '1em'}}>
          <Toggle label='Spymaster' onToggle={this.handleToggleSpymaster} toggled={this.state.isSpymaster}/>
          <Toggle label='Debug' onToggle={this.handleToggleDebug} toggled={this.state.isDebug}/>
        </div>
      </MuiThemeProvider>
    );

    return (
        <div className="GameBoard">
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

export default GameBoard;
