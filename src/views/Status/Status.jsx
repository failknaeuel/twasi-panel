import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import { statusSelectors, statusOperations } from '../../state/status';

import StatusInfo from './StatusInfo';
import EventLog from './EventLog';

class Status extends Component {

  handleClickBreadCrumb = (event, value) => {
      const { history } = this.props;
      history.push(value);
      this.setState({});
  };

  render () {
    return (
      <div className="pageContent">
        <Breadcrumbs arial-label="Breadcrumb">
          <Link color="inherit" onClick={event => this.handleClickBreadCrumb(event, '/')}>
            <FormattedMessage id="sidebar.overview" />
          </Link>
          <Typography color="textPrimary"><FormattedMessage id="sidebar.status" /></Typography>
        </Breadcrumbs>
        <Paper className="pageContainer">
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Typography>
                <h3 className="pageContainerTitle">
                  <FormattedMessage id="status.card_headline" />
                </h3>
                <small>
                  <FormattedMessage id="status.explanation" />
                </small>
              </Typography>
            </Grid>
          </Grid>
          <StatusInfo />
          <br />
          <EventLog />
        </Paper>
      </div>
    );
  }
}

Status.propTypes = {
  status: PropTypes.shape({
    isRunning: PropTypes.bool
  })
};

const mapStateToProps = state => ({
  status: statusSelectors.getStatus(state)
});

const mapDispatchToProps = dispatch => ({
  verifyData: () => dispatch(statusOperations.verifyData())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Status));
