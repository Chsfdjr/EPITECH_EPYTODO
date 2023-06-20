import React, { Component } from "react";
import "./acceuil.css";
import {
  Link
} from "react-router-dom";

export class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      newTask: "",
    };
  }

  handleInputChange = (event) => {
    this.setState({ newTask: event.target.value });
  };

  handleAddTask = (event) => {
    event.preventDefault();
    const { newTask, tasks } = this.state;
    if (newTask.trim() !== "") {
      this.setState({
        tasks: [...tasks, newTask],
        newTask: "",
      });
    }
  };

  handleDeleteTask = (index) => {
    const { tasks } = this.state;
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    this.setState({ tasks: updatedTasks });
  };

  render() {
    const { tasks, newTask } = this.state;

    return (
      <section>
      <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          <img src="https://static-00.iconduck.com/assets.00/todoist-icon-2048x2048-6xd8pwo3.png" width="128" height="128" alt="" />
        </a>
        <a className="navbar-brand" href="#">Todoist</a>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link" href="#">Accueil <span className="sr-only">(current)</span></Link>
            <Link to="login" className="nav-link" href="#">Connexion</Link>
            <Link to="register" className="nav-link" href="#">Inscription</Link>
          </div>
        </div>
      </nav>
      </div>
      <div className="container">
        <h1>Ma Liste de Tâches</h1>
        <form onSubmit={this.handleAddTask}>
          <div className="input-container">
            <input
              type="text"
              value={newTask}
              onChange={this.handleInputChange}
              placeholder="Ajouter une tâche"
            />
            <button type="submit">Ajouter</button>
          </div>
        </form>
        <ul id="task-list">
          {tasks.map((task, index) => (
            <li key={index}>
              <span className="task-text">{task}</span>
              <button
                className="delete-btn"
                onClick={() => this.handleDeleteTask(index)}
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      </div>
      </section>
    );
  }
}

export default HomePage;
