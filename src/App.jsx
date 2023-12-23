import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Commons/Header/Header';
import Footer from './Commons/Footer/Footer';
import HomeComponent from './Components/HomeComponent/HomeComponent';
import EmployeeOnBoardingForm from './Components/EmployeeOnBoarding/EmployeeOnBoarding';
import EmployeeProjectForm from './Components/EmployeeProjectForm/EmployeeProjectForm';
import EmployeeAssignmentForm from './Components/EmployeeAssignmentForm/EmployeeAssignmentForm';
import EmployeeDetailsComponent from './Components/EmployeeDetailsComponent/EmployeeDetailsComponent';


function App() {

  return (

    <div>

      <Router>
        <Header />
        <div className="container">
          <Switch>
            <Route path="/employee" exact component={HomeComponent}></Route>
            <Route path="/onboarding" component={EmployeeOnBoardingForm}></Route>
            <Route path="/project" exact component={EmployeeProjectForm}></Route>
            <Route path="/assignment" exact component={EmployeeAssignmentForm}></Route>
             <Route path="/employeeDetails" exact component={EmployeeDetailsComponent}></Route>
          </Switch>
        </div>
        <Footer />
      </Router>
    </div>

  );
}

export default App;