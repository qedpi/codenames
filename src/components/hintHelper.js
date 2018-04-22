import React, { Component } from 'react'
import axios from "axios/index";

// Material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton'

// Constants
import { SERVER_URL } from '../data/constants'


// Array(4).fill('')

class HintHelper extends Component {

  state = {
    words: ['hospital', 'doctor', 'drugs', 'cup', ''],
    hints: [],
  }

  handleChange = (event, i) => {
    const wordsList = [...this.state.words]
    wordsList[i] = event.target.value

    if (wordsList[wordsList.length - 1] !== ''){
      wordsList.push('')
    }

    while (wordsList.length >= 2 && wordsList[wordsList.length - 2] === '') {
      wordsList.splice(-1)
    }

    this.setState({
      words: wordsList,
    })
  }

  handleAddWord = () => {
    const wordsList = [...this.state.words]
    wordsList.push('')
    this.setState({
      words: wordsList,
    })
  }

  handleAskHint = async () => {
    const res = await axios.post(SERVER_URL + 'hint', {...this.state})
    console.log(res)
    this.setState({
      hints: res.data.hints,
    })
  }

  render() {

    const words = this.state.words.map((word, i) =>
      <Paper style={{padding: '.5rem', margin: 'auto', width: "80%"}}>
        <TextField hintText='.' value={word} onChange={(event) => this.handleChange(event, i)}/>
      </Paper>
    )

    const hints = this.state.hints.map(hint =>
      <span style={{margin: '10px'}}>{hint}</span>
    )

    return (
      <div>
        <MuiThemeProvider>
          <RaisedButton onClick={this.handleAskHint} label={'Ask Bot!'} />
          {/*<RaisedButton onClick={this.handleAddWord} label={'Add New'} />*/}
          <br/><br/>
          {words}
          <br/><br/>
          {hints}
        </MuiThemeProvider>
      </div>
    )
  }
}

export default HintHelper
