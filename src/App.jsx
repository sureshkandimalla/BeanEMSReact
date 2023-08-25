import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Commons/Header/Header';
import Footer from './Commons/Footer/Footer';
import HomeComponent from './Components/HomeComponent/HomeComponent';
import EmployeeOnBoardingForm from './Components/EmployeeOnBoarding/EmployeeOnBoarding';

function App() {

  return (

    <div>

      <Router>
        <Header />
        <div className="container">
          <Switch>
            <Route path="/" exact component={HomeComponent}></Route>
            <Route path="/onboarding" component={EmployeeOnBoardingForm}></Route>
          </Switch>
        </div>
        <Footer />
      </Router>
    </div>

  );
}

export default App;