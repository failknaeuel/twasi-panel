import React from 'react';
import PropTypes from 'prop-types';
import { Provider as ReduxProvider, connect } from 'react-redux';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { addLocaleData, IntlProvider } from 'react-intl';

import AuthLoader from './auth/AuthLoader';
import configureStore from './state/store';
import { appInfoSelectors, appInfoOperations } from './state/appInfo';
import { i18nSelectors, i18nOperations } from './state/i18n';

import Header from './views/common/Header';
import Content from './views/common/Content';
import Public from './views/Public/Public';
import Footer from './views/Footer/Footer';
import Welcome from './views/Welcome/Welcome';

import PanelContent from './views/Panel/PanelContent';

import './styles/main.css';

// Themes
import twasiDark from './themes/twasi-dark/twasi-dark';
import twasiLight from './themes/twasi-light/twasi-light';
import twasiDarkBlue from './themes/twasi-darkblue/twasi-darkblue';
import darkGrey from './themes/dark-grey/dark-grey';
import bttvDark from './themes/bttv-dark/bttv-dark';
import tipeeeDark from './themes/tipeee-dark/tipeee-dark';
import windows95 from './themes/windows95/windows95';

import germanData from 'react-intl/locale-data/de';
import german from './translations/de_de';
import englishData from 'react-intl/locale-data/en';
import english from './translations/en_en';

addLocaleData(germanData);
addLocaleData(englishData);

const App = () => {
  const store = configureStore();

  const mapStateToProps = state => ({
    theme: appInfoSelectors.getTheme(state),
    bannerAsHeader: appInfoSelectors.getBannerAsHeader(state),
    language: i18nSelectors.getLocale(state)
  });

  const mapDispatchToProps = dispatch => ({
    loadTheme: () => dispatch(appInfoOperations.loadTheme()),
    loadBannerAsHeader: () => dispatch(appInfoOperations.loadBannerAsHeader()),
    loadLanguage: () => dispatch(i18nOperations.loadLanguage())
  });

  const Themed = withRouter(connect(mapStateToProps, mapDispatchToProps)(props => {
    props.loadTheme();
    props.loadLanguage();
    props.loadBannerAsHeader();

    let selectedTheme = twasiDarkBlue;

    if (props.theme.toLowerCase() === 'twasi-light') {
      selectedTheme = twasiLight;
    } else if (props.theme.toLowerCase() === 'twasi-dark') {
      selectedTheme = twasiDark;
    } else if (props.theme.toLowerCase() === 'dark-grey') {
      selectedTheme = darkGrey;
    } else if (props.theme.toLowerCase() === 'bttv-dark') {
      selectedTheme = bttvDark;
    } else if (props.theme.toLowerCase() === 'tipeee-dark') {
      selectedTheme = tipeeeDark;
    } else if (props.theme.toLowerCase() === 'windows95') {
      selectedTheme = windows95;
    }

    let selectedLanguage = german;

    if (props.language.toLowerCase() === 'de_de') {
      selectedLanguage = german;
    } else if (props.language.toLowerCase() === 'en_en') {
      selectedLanguage = english;
    }

    return (
      <IntlProvider locale="de" messages={selectedLanguage}>
        <MuiThemeProvider theme={selectedTheme}>
          <CssBaseline />
          <AuthLoader>
            <Content className={props.theme.toLowerCase()}>
              <Header />
              <Switch>
                <Route path="/profile/:name" component={Public} />
                <Route path="/setup" component={Welcome} />
                <Route path="/" component={PanelContent} />
              </Switch>
              <Footer />
            </Content>
          </AuthLoader>
        </MuiThemeProvider>
      </IntlProvider>
    );
  }));

  Themed.propTypes = {
    theme: PropTypes.string,
    loadTheme: PropTypes.func,
    language: PropTypes.string,
    loadLanguage: PropTypes.func
  };

  return (
    <ReduxProvider store={store}>
      <BrowserRouter>
        <Themed />
      </BrowserRouter>
    </ReduxProvider>
  );
};

export default App;
