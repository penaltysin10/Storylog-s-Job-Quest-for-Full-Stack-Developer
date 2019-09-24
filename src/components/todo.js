import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      title: "",
      stateComplete: "",
      todolist: []
    };
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeStateComplete = this.onChangeStateComplete.bind(this);
    this.onSubmitUpdate = this.onSubmitUpdate.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/TodoList/" + this.props.match.params.id)
      .then(res => {
        this.setState({
          id: res.data.id,
          title: res.data.title,
          stateComplete: res.data.stateComplete
        });
      })
      .catch(err => {
        console.log(err);
      });

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

  onChangeStateComplete(e) {
    this.setState({
      stateComplete: e.target.value
    });
    console.log(this.state.stateComplete);
  }

  onSubmitUpdate(event) {
    event.preventDefault();
    const todo = {
      title: this.state.title,
      stateComplete: this.state.stateComplete
    };

    axios
      .put(
        "http://localhost:5000/api/TodoList/update/" +
          this.props.match.params.id,
        todo
      )
      .then(res => console.log(res.data));

    window.location = "/";
  }

  render() {
    return (
      <div className="main-todo-list-block">
        <div className="container">
          <form onSubmit={this.onSubmitUpdate}>
            <div className="form-group col-md-6 mx-auto">
              <h5>ID</h5>
              <input
                className="form-control"
                type="text"
                value={this.state.id}
                disabled
              ></input>
            </div>
            <div className="form-group col-md-6 mx-auto">
              <h5>Title</h5>
              <input
                className="form-control"
                type="text"
                value={this.state.title}
                onChange={this.onChangeTitle}
              ></input>
            </div>
            <div className="form-group col-md-6 mx-auto">
              <h5>Status</h5>
              <select
                className="form-control"
                onChange={this.onChangeStateComplete}
                required
              >
                <option value={this.state.stateComplete}>
                  {this.state.stateComplete}
                </option>
                {this.state.stateComplete === "Incomplete" ? (
                  <option value="Complete">Complete</option>
                ) : (
                  <option value="Incomplete">Incomplete</option>
                )}
              </select>
            </div>
            <div className="form-group text-center">
              <Link className="btn btn-outline-danger col-md-2" to="/">
                Cancel
              </Link>
              <button
                className="btn btn-success col-md-2 mx-auto"
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
