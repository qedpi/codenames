import React from "react";
import {AppBar, Badge, Drawer, IconButton, MenuItem} from "material-ui";
import NavigationClose from "material-ui/svg-icons/navigation/close";

const hintHistory = props => (
  <Drawer open={props.showDrawer}
          docked={false}>
    <AppBar title="Hint History"
            iconElementLeft={<IconButton><NavigationClose /></IconButton>}
            onLeftIconButtonClick={props.toggleHistory}/>
    {props.previousHints.map(hint =>
      <MenuItem>
        {hint.hint}
        <Badge badgeContent={hint.num} secondary={true}/>
      </MenuItem>
    )}
  </Drawer>
);

export default hintHistory
