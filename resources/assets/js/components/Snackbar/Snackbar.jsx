import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Snack from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
// core components
import snackbarContentStyle from "../../assets/jss/material-dashboard-react/components/snackbarContentStyle.jsx";

import parseError from '../../libs/parseError'

function Snackbar({ ...props }) {
  const { classes, message, color, close, icon, place, open, autoHideDuration } = props;
  let action = [];
  const { status, message: parseMessage } = message
  let clearMessage = ''
  if (parseMessage) {
    clearMessage = parseMessage
  } else {
    clearMessage = parseError(message)
  }
  const messageClasses = classNames({
    [classes.iconMessage]: icon !== undefined
  });
  if (close !== undefined) {
    action = [
      <IconButton
        className={classes.iconButton}
        key="close"
        aria-label="Close"
        color="inherit"
        onClick={() => props.closeNotification()}
      >
        <Close className={classes.close} />
      </IconButton>
    ];
  }

  let onClose = () => { }
  if (autoHideDuration) {
    onClose = () => props.closeNotification()
  }
  return (
    <Snack
      anchorOrigin={{
        vertical: place.indexOf("t") === -1 ? "bottom" : "top",
        horizontal:
          place.indexOf("l") !== -1
            ? "left"
            : place.indexOf("c") !== -1 ? "center" : "right"
      }}
      open={open}
      autoHideDuration={autoHideDuration || null}
      onClose={onClose}
      message={
        <div>
          {icon !== undefined ? <props.icon className={classes.icon} /> : null}
          <span className={messageClasses}>{clearMessage}</span>
        </div>
      }
      action={action}
      ContentProps={{
        classes: {
          root: classes.root + " " + classes[color],
          message: classes.message
        }
      }}
    />
  );
}

Snackbar.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.any,
  color: PropTypes.oneOf(["info", "success", "warning", "danger", "primary"]),
  close: PropTypes.bool,
  icon: PropTypes.func,
  place: PropTypes.oneOf(["tl", "tr", "tc", "br", "bl", "bc"]),
  open: PropTypes.bool
};

export default withStyles(snackbarContentStyle)(Snackbar);
