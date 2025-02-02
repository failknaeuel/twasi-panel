import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Documentation from './Documentation';
import './_style.css';

import { pluginsSelectors, pluginsOperations } from '../../state/plugins';

class Plugins extends Component {
  componentDidMount() {
    const { verifyData } = this.props;
    verifyData();
  }

  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  handleClickBreadCrumb = (event, value) => {
    const { history } = this.props;
    history.push(value);
    this.setState({});
  }

  handleClose = () => {
    this.setState({ modalOpen: false });
  }

  render() {
    const { plugins, installPlugin, uninstallPlugin } = this.props;

    const renderedPlugins = plugins.map(plugin => (
      <Grid container spacing={0} style={{ marginTop: '23px' }}>
        <Grid item xs={12}>
          <Card className="pluginCard">
            <CardContent className="pluginCardContent" style={{ padding: '16px' }}>
              <Grid container spacing={16} style={{ marginTop: '0px' }}>
                <Grid item xs={4} style={{ paddingTop: '0px', paddingBottom: '0px' }}>
                  <Typography>
                    <h2 style={{ marginBottom: '5px' }} className="pageContainerTitle">{plugin.name}</h2>
                    <small>
                      <FormattedMessage id="plugins.by" /> <i>{plugin.author}</i><br />
                      <FormattedMessage id="plugins.version" /> {plugin.version}
                    </small>
                  </Typography>
                </Grid>
                <Grid item xs={4} style={{ paddingTop: '0px', paddingBottom: '0px' }}>
                  <Typography>
                    <h3 className="pageContainerTitle"><FormattedMessage id="plugins.short_description" /></h3>
                    <small>
                      {plugin.description}
                    </small>
                  </Typography>
                </Grid>
                <Grid item xs={4} style={{ paddingTop: '0px', paddingBottom: '0px' }}>
                  <Typography>
                    <h3 className="pageContainerTitle"><FormattedMessage id="plugins.documentation" /></h3>
                    <Button disabled onClick={() => this.setState({ modalOpen: true })} style={{ marginTop: '5px' }} variant="contained" color="primary" size="small">
                      <FormattedMessage id="plugins.show" />
                    </Button>
                  </Typography>
                </Grid>
              </Grid>
              <Grid style={{ marginTop: '16px' }} container spacing={16}>
                <Grid item xs={4} style={{ paddingBottom: '0px' }}>
                  {plugin.isInstalled && (
                    <div>
                      <Button
                        variant="contained"
                        color="secondary"
                        disabled={plugin.actionInProgress}
                        onClick={() => uninstallPlugin(plugin.id)}
                      >
                        <FormattedMessage id="plugins.uninstall" />
                        {plugin.actionInProgress && (
                          <CircularProgress
                            color="primary"
                            style={{
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              marginTop: -12,
                              marginLeft: -12
                            }}
                            size={24}
                          />
                        )}
                      </Button>
                    </div>
                  )}
                  {!plugin.isInstalled && (
                    <div>
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={plugin.actionInProgress}
                        onClick={() => installPlugin(plugin.id)}
                      >
                        <FormattedMessage id="plugins.install" />
                        {plugin.actionInProgress && (
                          <CircularProgress
                            color="primary"
                            style={{
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              marginTop: -12,
                              marginLeft: -12
                            }}
                            size={24}
                          />
                        )}
                      </Button>
                    </div>
                  )}
                </Grid>
                <Grid item xs={4} style={{ paddingBottom: '0px' }}>
                  <Typography>
                    <h3 className="pageContainerTitle"><FormattedMessage id="plugins.commands" /></h3>
                    <small>
                      {plugin.commands.join(', ')}
                    </small>
                  </Typography>
                </Grid>
                <Grid item xs={4} style={{ paddingBottom: '0px' }}>
                  <Typography>
                    <h3 className="pageContainerTitle"><FormattedMessage id="plugins.dependencies" /></h3>
                    <small>
                      -
                    </small>
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    ));

    return (
      <div className="pageContent">
        <Breadcrumbs arial-label="Breadcrumb">
          <Link color="inherit" onClick={event => this.handleClickBreadCrumb(event, '/')}>
            <FormattedMessage id="sidebar.overview" />
          </Link>
          <Typography color="textPrimary"><FormattedMessage id="sidebar.plugins" /></Typography>
        </Breadcrumbs>
        <Paper className="pageContainer">
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <Typography>
                <h3 className="pageContainerTitle">
                  <FormattedMessage id="plugins.card_headline" />
                </h3>
                <small>
                  <FormattedMessage id="plugins.explanation" />
                </small>
              </Typography>
            </Grid>
          </Grid>
          {renderedPlugins}
        </Paper>
        <Documentation
          scroll="body"
          maxWidth="md"
          open={this.state.modalOpen}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

Plugins.propTypes = {
  plugins: PropTypes.arrayOf(PropTypes.shape({})),
  verifyData: PropTypes.func.isRequired,
  installPlugin: PropTypes.func.isRequired,
  uninstallPlugin: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  plugins: pluginsSelectors.getPlugins(state),
  isLoading: pluginsSelectors.isLoading(state)
});

const mapDispatchToProps = dispatch => ({
  verifyData: () => dispatch(pluginsOperations.verifyData()),
  installPlugin: name => dispatch(pluginsOperations.installPlugin(name)),
  uninstallPlugin: name => dispatch(pluginsOperations.uninstallPlugin(name)),
  updateQuery: query => dispatch(pluginsOperations.updateQuery(query))
});

export default connect(mapStateToProps, mapDispatchToProps)(Plugins);
