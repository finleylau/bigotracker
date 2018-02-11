import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import GoogleApiWrapper from '../components/Container';
import ReportPage from '../components/ReportPage';


export default () => {
  return(
    <BrowserRouter>
      <Switch>
        <Route path='/' exact render={props => <GoogleApiWrapper {...props} />} />
        <Route path="/report" exact render={props => <ReportPage {...props} />} />

      </Switch>
    </BrowserRouter>
  )


}
