import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Commons/Header/Header';
import Footer from './Commons/Footer/Footer';
import HomeComponent from './Components/HomeComponent/HomeComponent';
import EmployeeOnBoardingForm from './Components/EmployeeOnBoarding/EmployeeOnBoarding';
import EmployeeProjectForm from './Components/EmployeeProjectForm/EmployeeProjectForm';
import EmployeeAssignmentForm from './Components/EmployeeAssignmentForm/EmployeeAssignmentForm';
import EmployeeInvoicesForm from './Components/EmployeeInvoicesComponent/EmployeeInvoicesForm';
import EmployeeAddInvoicesForm from './Components/EmployeeAddInvoicesComponent/EmployeeAddInvoicesForm';
import EmployeeDetailsComponent from './Components/EmployeeDetailsComponent/EmployeeDetailsComponent';
import EmployeeFullDetailsComponent from './Components/EmployeeDetailsComponent/EmployeeFullDetailsComponent';
import EmployeeProjectDetails from './Components/EmployeeProjectForm/EmployeeProjectDetails';
import ProjectDetails from './Components/EmployeeProjectForm/ProjectDetails';
import BillsForm from './Components/BillsComponent/BillsForm';


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
            <Route path="/invoices" exact component={EmployeeInvoicesForm}></Route>
            <Route path="/addInvoices" exact component={EmployeeAddInvoicesForm}></Route>
            <Route path="/employeeDetails" exact component={EmployeeDetailsComponent}></Route>
            <Route path="/employeeFullDetails" exact component={EmployeeFullDetailsComponent}></Route>
            <Route path="/employeeProjectDetails" exact component={EmployeeProjectDetails}></Route>
            <Route path="/projectDetails" exact component={ProjectDetails}></Route>
            <Route path="/bills" exact component={BillsForm}></Route>
          </Switch>
        </div>
        <Footer />
      </Router>
    </div>

  );
}

export default App;