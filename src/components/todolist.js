import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TODO = props => (
  <tr>
    <th scope="row">{props.todo.id}</th>
    <td>{props.todo.title}</td>
    <td>{props.todo.stateComplete}</td>
    <td>
      <Link className="btn btn-secondary" to={"/Todo/" + props.todo._id}>
        EDIT
      </Link>
      &nbsp;
      <button
        className="btn btn-danger"
        onClick={() => {
          props.deleteTodo(props.todo._id);
        }}
      >
        DELETE
      </button>
    </td>
  </tr>
);

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todolist: [],
      title: ""
    };
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onSubmitCreate = this.onSubmitCreate.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/TodoList")
      .then(res => {
        this.setState({
          todolist: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onSubmitCreate(e) {
    e.preventDefault();
    const todo = { title: this.state.title };

    axios
      .post("http://localhost:5000/api/TodoList/CreateTodo", todo)
      .then(res => console.log(res.data));

    this.setState({
      title: ""
    });

    window.location = "/";
  }

  deleteTodo(id) {
    axios
      .delete("http://localhost:5000/api/TodoList/delete/" + id)
      .then(res => console.log(res.data));
    this.setState({
      todolist: this.state.todolist.filter(el => el._id !== id)
    });
  }

  todoList() {
    return this.state.todolist.map(todo => {
      return <TODO todo={todo} deleteTodo={this.deleteTodo} key={todo._id} />;
    });
  }

  render() {
    return (
      <div className="main-todo-list-block">
        <div className="container">
          <form onSubmit={this.onSubmitCreate}>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                value={this.state.title}
                onChange={this.onChangeTitle}
                placeholder="Enter you todo"
                required
              ></input>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                CREATE TODO
              </button>
            </div>
          </form>
          <div className="table-todolist">
            <h3>Todo List</h3>
            <table className="table table-striped">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Title</th>
                  <th scope="col">Status</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>{this.todoList()}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
