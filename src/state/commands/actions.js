import types from './types';

const updateCommands = commands => ({
  type: types.UPDATE_COMMANDS,
  commands
});

const updateAddCommand = (name, content, cooldown) => ({
  type: types.UPDATE_ADDCOMMAND,
  name,
  content,
  cooldown
});

const updateDelCommand = (id) => ({
  type: types.UPDATE_DELCOMMAND,
  id
});

const updateDisabled = isDisabled => ({
  type: types.UPDATE_DISABLED,
  isDisabled
});

export default {
  updateCommands,
  updateAddCommand,
  updateDelCommand,
  updateDisabled
};
