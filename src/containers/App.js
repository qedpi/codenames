// Modules
import React, {Component} from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import axios from 'axios'

// Containers
import HintHelper from './hintHelper';
import GameBoard from './gameBoard';

// Components
import AppHeader from '../components/appHeader';

// CSS
import './App.css';

// Constants
import {SERVER_URL} from '../data/constants'


class App extends Component {
  state = {
  };

  componentDidMount() {
    axios.get(SERVER_URL + 'handshake').then(res => console.log(res, 'handshake'))
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <AppHeader/>
          {/* PUBLIC_URL provided by github pages */}
          {/* or: compoent={() => <GameBoard/>}*/}
          <Route exact path={process.env.PUBLIC_URL + "/"} component={GameBoard} />
          <Route exact path={process.env.PUBLIC_URL + "/helper"} component={HintHelper}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
