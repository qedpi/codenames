import React from "react";
import {Badge, CircularProgress, RaisedButton} from "material-ui";

const hintControls = props => {
  const progress = props.awaitingServer ?
    <CircularProgress size={20}/> : (
      <Badge badgeContent={props.result.targets.length} secondary={true}>
        {props.result.hint}
      </Badge>
    );

  return (
    props.gameStatus === 'playing' ?
      (
        <div style={{display: 'inline-block'}}>
          <RaisedButton
            label="History"
            onClick={props.toggleHistory}/>
          <RaisedButton label='Next Hint' onClick={props.handleSubmit}
                        backgroundColor={'#CE93D8'}
                        style={{margin: 12, align: 'left'}}/>
          {progress}
        </div>
      ) :
      <div style={{display: 'inline-block'}}>
        <RaisedButton label='Restart Game' onClick={props.handleStart} primary={true}
                      style={{margin: 12, align: 'left'}}/>
      </div>
  )
}

export default hintControls
