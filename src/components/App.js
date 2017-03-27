import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login';

import PostLoginPage from './PostLoginPage'

class App extends Component {

  render() {
    const {store} = this.props;

    const getPages = () => {
        window.FB.api('/me/accounts', (response) => store.dispatch({type: 'GOT_PAGES', listOfPages: response.data}));
    }

    const manageResponseFacebook = (manageResponse) => {
        if (manageResponse.error) {
            store.dispatch({type: 'MANAGE_LOG_IN_FAIL', manageResponse});
        } else {
            store.dispatch({type: 'MANAGE_LOG_IN_SUCCESS', manageResponse});
            getPages();
        }
    }

    const responseFacebook = (profileResponse) => {
        if (!profileResponse.accessToken) {
            store.dispatch({type: 'PROFILE_LOG_IN_FAIL', profileResponse});
        } else {
            store.dispatch({type: 'PROFILE_LOG_IN_SUCCESS', profileResponse});
            window.FB.login(manageResponseFacebook,
                {scope: 'manage_pages,publish_pages,publish_actions,pages_show_list'})
        }
    }
    const response = store.getState().facebookauth.profileResponse;
    return (
      <div>
          {!response ?
          <FacebookLogin
            appId="1737806169883398"
            autoLoad={true}
            fields="name,email"
            callback={responseFacebook} /> :
            response.error ? 'Please allow Facebook access' :
            <PostLoginPage store={store} />
        }

      </div>
    )
  }
}

export default App
