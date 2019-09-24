import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar";
import Todo from "./components/todo";
import TodoList from "./components/todolist";

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <Route path="/" exact component={TodoList} />
      <Route path="/Todo/:id" component={Todo} />
    </Router>
  );
}

export default App;
