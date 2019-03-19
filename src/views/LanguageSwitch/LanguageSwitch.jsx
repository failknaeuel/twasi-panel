import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import Icon from '@material-ui/core/Icon';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { FormattedMessage } from 'react-intl';
import storage from 'local-storage';


class LanguageSwitch extends React.Component {
  handleClose = () => {
    this.props.onClose();
  }

  render() {

    return (
      <Dialog
        onClose={this.handleClose}
      >
        <DialogContent>
          <h4 className="pageContainerTitle">
            Titel
          </h4>
          <small>
            Subtitel
          </small>
          <br /><br />
          <Card className="pluginCard">
            <CardContent className="pluginCardContent">
              Content
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    );
  }
}

export default LanguageSwitch;