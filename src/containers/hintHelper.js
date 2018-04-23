import React, {Component} from 'react'
import axios from "axios/index";

// Material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton'
import Checkbox from 'material-ui/Checkbox';

// Constants
import {SERVER_URL} from '../data/constants'


// Array(4).fill('')

class HintHelper extends Component {

  state = {
    words: [{text: '', use: false}], // ['hospital', 'doctor', 'drugs', 'cup', ''],
    hints: [],
  }

  handleEdit = (event, i) => {
    const wordsList = [...this.state.words]
    wordsList[i].text = event.target.value
    wordsList[i].check = /^[a-zA-Z']+$/.test(event.target.value)

    if (wordsList[wordsList.length - 1] !== '') {
      wordsList.push({text: '', check: false})
    }

    while (wordsList.length >= 2 && wordsList[wordsList.length - 2].text === '') {
      wordsList.splice(-1)
    }

    this.setState({
      words: wordsList,
    })
  }

  handleAddWord = () => {
    this.setState({
      words: [...this.state.words, {text: ''}],
    })
  }

  handleAskHint = async () => {
    const words = this.state.words.filter(w => w.check).map(w => w.text)
    const res = await axios.post(SERVER_URL + 'hint', {words,})
    console.log(res)
    this.setState({
      hints: res.data.hints,
    })
  }

  handleDeleteWord = (i) => {
    const wordList = [...this.state.words]
    wordList.splice(i, 1)
    this.setState({
      words: wordList,
    })
  }

  handleToggleCheck = (i) => {
    const wordList = [...this.state.words]
    if (wordList[i].text !== '') {
      wordList[i].check = !wordList[i].check
    }
    this.setState({
      wordList
    })
  }

  render() {
    console.log(this.props)

    const words = this.state.words.map((word, i) =>
      <Paper style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                    padding: '.0rem', margin: 'auto', width: "80%"}}>
        <RaisedButton labelColor={'red'} style={{minWidth: 40, marginRight: 15}}
                      disabled={i === this.state.words.length - 1}
                      onClick={() => this.handleDeleteWord(i)} label={'X'}/>
        <TextField value={word.text} onChange={(event) => this.handleEdit(event, i)} id={i}/>
        <Checkbox style={{width: 20}}
                  checked={this.state.words[i].check} onCheck={() => this.handleToggleCheck(i)}/>
      </Paper>
    )

    const hints = this.state.hints.map((hint, i) =>
      <span style={{margin: '10px', display: 'inline-block'}}>{i + 1}. {hint}</span>
    )

    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <MuiThemeProvider>
          <RaisedButton onClick={this.handleAskHint} label={'Ask Bot!'}
                        disabled={this.state.words.reduce((acc, w) => acc + w.text.length * w.check, 0) === 0}/>
          {/*<RaisedButton onClick={this.handleAddWord} label={'Add New'} />*/}
          <br/>

          {words}
          <br/>
          <div style={{display: 'flex', width: '80%', flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
            {hints}
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default HintHelper
