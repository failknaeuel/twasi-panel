import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CardContent from '@material-ui/core/CardContent';
//import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
//import FormControl from '@material-ui/core/FormControl';
//import FormHelperText from '@material-ui/core/FormHelperText';
//import Select from '@material-ui/core/Select';
//import OutlinedInput from '@material-ui/core/OutlinedInput';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
//import InputLabel from '@material-ui/core/InputLabel';
import Slider from '@material-ui/lab/Slider';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import { FormattedMessage } from 'react-intl';

import { commandsSelectors, commandsOperations } from '../../state/commands';

import './_style.css';

class Command extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      commandName: "",
      commandContent: "",
      commandCooldown: 0,
      issue: 10,
      labelWidth: 115,
      cooldown: '',
      openNotification: false,
      notification: ''
    };
  }

  componentDidMount() {
    const { commandObject } = this.props;
    this.setState({
      commandName: commandObject.name,
      commandContent: commandObject.content,
      commandCooldown: commandObject.cooldown
    });
  }

  handleOpenNotification = commandName => {
    this.setState({
      openNotification: true,
      modalOpen: false,
      notification: 'Der Befehl "' + commandName + '" wurde erfolgreich bearbeitet.'
    });
    setTimeout(function() {
        this.props.updateCommands()
    }.bind(this), 100)
  };

  handleCloseNotification = () => {
    this.setState({ openNotification: false });
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  handleCommandCooldown = (event, cooldown) => {
    this.setState({ [event.target.name]: event.target.value });
    this.setState({ cooldown });
  };

  handleCommandNameChange = (event) => {
    this.setState({
      commandName: event.target.value
    });
  };

  handleCommandContentChange = (event) => {
    this.setState({
      commandContent: event.target.value
    });
  };

  getSliderValueByMilliseconds() {
    let ms = this.state.commandCooldown;
    console.log(ms)
    if (ms <= 60) {
      return ms;
    } else if (ms >= 61) {
        // To-Do
    }
  }

  getCooldown(cd) {
    if (cd <= 59) {
      if (cd === 1) {
        return cd + ' Sekunde';
      }
      return cd + ' Sekunden';
    } else if (cd >= 60) {
      if (cd === 60) {
        //return '1 Stunde';
        return '1 Minute';
      }
      if (cd === 3600) {
        return '1 Stunde';
      }
      if (cd > 1) {
        //return `${cd} Minuten`;
        return Math.round(cd / 60) + ' Minuten';
      }
    }
    return 'Fehler';
  }

  getSecondsFromCooldown() {
    let cd = this.state.cooldown;

    if (cd <= 59) {
      return cd;
    } else if (cd >= 60) {
      cd -= 59;
      if (cd === 60) {
        //return '1 Stunde';
        return 3600;
      }
      if (cd > 1) {
        //return `${cd} Minuten`;
        return cd * 60;
      }
      //return `${cd} Minute`;
      return cd * 60;
    }
    return 'Fehler';
  }

  render() {
    const { commandObject, ...other } = this.props;
    return (
      <Dialog
        {...other}
      >
        <DialogContent>
          <Typography>
            <h3 className="pageContainerTitle">
              Befehl {commandObject.name} bearbeiten
            </h3>
            <small>
              <FormattedMessage id="commands.edit_command.subheadline" />
            </small>
          </Typography>
          <br /><br />
          <Card className="pluginCard">
            <CardContent style={{ paddingTop: '0px', paddingBottom: '0px' }}>
              <TextField
                InputLabelProps={{ shrink: true }}
                id="outlined-textarea"
                label={<FormattedMessage id="commands.new_command.command" />}
                fullWidth
                value={this.state.commandName}
                onChange={this.handleCommandNameChange}
                placeholder="Beispiel: !bot"
                helperText="Das ist dein Befehl. Der Befehl wird so ausgelöst, wie du ihn hier hinterlegst."
                margin="normal"
                variant="outlined"
              />
            </CardContent>
          </Card>
          {/*
          <Card className="pluginCard" style={{ marginTop: '15px' }}>
            <CardContent style={{ paddingTop: '0px', paddingBottom: '0px' }}>
              <TextField
                InputLabelProps={{ shrink: true }}
                id="outlined-textarea"
                label={<FormattedMessage id="commands.new_command.aliases" />}
                fullWidth
                placeholder="Beispiel: !chatbot, !twasi"
                helperText="Das sind Alternativen zu deinem Befehl, welche die selbe Ausgabe erzeugen. (Mit Komma trennen.)"
                margin="normal"
                variant="outlined"
              />
            </CardContent>
          </Card>
          */}
          <Card className="pluginCard" style={{ marginTop: '15px' }}>
            <CardContent style={{ paddingTop: '0px', paddingBottom: '0px' }}>
              <TextField
                InputLabelProps={{ shrink: true }}
                id="outlined-textarea"
                label={<FormattedMessage id="commands.new_command.output" />}
                fullWidth
                value={this.state.commandContent}
                onChange={this.handleCommandContentChange}
                placeholder="Beispiel: Mein Bot heißt Twasibot."
                multiline
                rows="3"
                helperText={<FormattedMessage id="commands.new_command.output.helpertext" />}
                margin="normal"
                variant="outlined"
              />
            </CardContent>
          </Card>
          {/*
          <Card className="pluginCard" style={{ marginTop: '15px' }}>
            <CardContent style={{ paddingTop: '0px', paddingBottom: '8px' }}>
              <FormControl style={{ marginTop: '16px' }} variant="outlined" fullWidth>
                <InputLabel
                  htmlFor="access-select"
                >
                  <FormattedMessage id="commands.new_command.access" />
                </InputLabel>
                <Select
                  value={this.state.issue}
                  onChange={this.handleChange}
                  input={
                    <OutlinedInput
                      labelWidth={this.state.labelWidth}
                      name="access"
                      id="access-select"
                    />
                  }
                >
                  <MenuItem value={10}><FormattedMessage id="commands.new_command.everyone" /></MenuItem>
                  <MenuItem value={20}><FormattedMessage id="commands.new_command.subs" /></MenuItem>
                  <MenuItem value={30}><FormattedMessage id="commands.new_command.mods" /></MenuItem>
                  <MenuItem value={40}><FormattedMessage id="commands.new_command.streamer" /></MenuItem>
                </Select>
                <FormHelperText>Wer hat Zugriff auf den Befehl?</FormHelperText>
              </FormControl>
            </CardContent>
          </Card>
          */}
          <Card className="pluginCard" style={{ marginTop: '15px' }}>
            <CardContent style={{ paddingTop: '0px', paddingBottom: '8px' }}>
              <Typography style={{ paddingTop: '8px', paddingLeft: '12px', fontSize: '0.775rem' }}><FormattedMessage id="commands.new_command.cooldown" />: {this.getCooldown(this.state.commandCooldown)}</Typography>
              <Slider
                style={{ padding: '22px 0px' }}
                aria-labelledby="label"
                value={this.getSliderValueByMilliseconds()}
                min={0}
                max={119}
                step={1}
                onChange={this.handleCommandCooldown}
              />
              <Typography style={{ paddingLeft: '12px', fontSize: '0.775rem' }}><FormattedMessage id="commands.new_command.cooldown.helpertext" /></Typography>
            </CardContent>
          </Card>
          <Button
            fullWidth
            style={{ borderRadius: '4px', marginTop: '15px' }}
            variant="contained"
            color="primary"
            onClick={() => {
                this.props.editCommand(commandObject.id, this.state.commandName, this.state.commandContent, this.state.commandCooldown);
                this.handleOpenNotification(this.state.commandName)
            }}>
            <FormattedMessage id="commands.new_command.savecommand" />
          </Button>
        </DialogContent>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.openNotification}
          autoHideDuration={5000}
          onClose={this.handleCloseNotification}
          message={this.state.notification}
        />
      </Dialog>
    );
  }
}

Command.propTypes = {
  editCommand: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isLoaded: commandsSelectors.isLoaded(state),
  disabled: commandsSelectors.isDisabled(state)
});

const mapDispatchToProps = dispatch => ({
  updateCommands: () => dispatch(commandsOperations.loadCommands()),
  editCommand: (id, name, content, cooldown) => dispatch(commandsOperations.editCommand(id, name, content, cooldown)),
  verifyData: () => dispatch(commandsOperations.verifyData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Command);
