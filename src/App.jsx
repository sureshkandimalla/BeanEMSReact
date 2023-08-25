import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Commons/Header/Header';
import Footer from './Commons/Footer/Footer';
import HomeComponent from './Components/HomeComponent/HomeComponent';

function App() {

  return (

    <div>

      <Router>
        <Header />
        <div className="container">
          <Switch>
            <Route path="/" exact component={HomeComponent}></Route>
            {/* <Route path="/employees" component={EmployeeComponent}></Route>
            <Route path="/add-employee/:id" component={CreateEmployeeComponent}></Route>
            <Route path="/view-employee/:id" component={ViewEmployeeComponent}></Route>
            <Route path="/assignments" component={AssignmentComponent}></Route>
            <Route path="/add-assignment/:id" component={CreateAssignmentComponent}></Route>
            <Route path="/projects" component={ProjectComponent}></Route>
            <Route path="/add-project/:id" component={CreateProjectComponent}></Route> */}
          </Switch>
        </div>
        <Footer />
      </Router>
    </div>

  );
}

export default App;