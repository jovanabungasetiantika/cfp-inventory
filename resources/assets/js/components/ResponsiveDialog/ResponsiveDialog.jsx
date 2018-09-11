import React, { cloneElement } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

import { closeDialog } from '../../services/dialog/actions';

class ResponsiveDialog extends React.Component {
  constructor(props) {
    super(props)
  }

  handleAgree = () => {
    const {
      action,
      closeDialog,
    } = this.props
    if (action) {
      action()
    }
    closeDialog()
  };

  render() {
    const {
      fullScreen,
      messageTitle,
      messageBody,
      open,
      closeDialog,
    } = this.props;

    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={closeDialog}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{messageTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {messageBody}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleAgree} color="primary" autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ResponsiveDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ services }) => ({
  action: services.dialog.action || undefined,
  open: services.dialog.open || false,
  messageTitle: services.dialog.messageTitle || '',
  messageBody: services.dialog.messageBody || '',
})

const mapDispatchToProps = dispatch => ({
  closeDialog: () => {
    return dispatch(closeDialog())
  }
})

export default withMobileDialog()(connect(mapStateToProps, mapDispatchToProps)(ResponsiveDialog));