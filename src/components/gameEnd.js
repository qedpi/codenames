import React from 'react'
import {Dialog, FlatButton} from "material-ui";

const victory = (props) => {

  const actions = [
    <FlatButton
      label="Yes"
      primary={true}
      keyboardFocused={true}
      onClick={props.handleStart}
    />,
    <FlatButton
      label="No"
      secondary={true}
      onClick={props.handleClose}
    />,
  ];

  return (
    <Dialog
      title={`${props.gameStatus.split(' ')[0]} wins!`}
      actions={actions}
      modal={false}
      open={props.gameStatus.includes('won')}
      onRequestClose={props.handleClose}
    >
      Play again?
    </Dialog>
  )
}

export default victory
