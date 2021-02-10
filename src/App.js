import React, { Component } from "react";
import "./App.css";

import Lane from "./Lane";

// The default data
const DATA = [
  {
    name: "Winnie",
    tasks: ["buy eggs", "buy milk"],
  },
  {
    name: "Brad",
    tasks: ["buy meat", "buy vegi"],
  },
  {
    name: "Bob",
    tasks: ["buy meat", "buy vegi"],
  },
  {
    name: "Thomas",
    tasks: ["buy meat", "buy vegi"],
  },
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // An array of objects
      data: DATA, // Value as the default data
      newTasks: {}, // Key as person's name, val as new task
    };
  }

  // About: handle change, on typing a new task
  handleChange = (event, name) => {
    const newTask = event.target.value;
    const copyOfState = { ...this.state.newTasks };
    //
    copyOfState[name] = newTask;
    //
    this.setState({
      newTasks: copyOfState,
    });
  };

  // About: after click, add a task to the person (in state, data)
  handleClickToAddTask = (name) => {
    // Get the new task
    const newTask = this.state.newTasks[name];

    //
    const copyOfState = [...this.state.data];

    // Step: update the copy of the state
    for (const obj of copyOfState) {
      if (obj.name === name) {
        obj.tasks.push(newTask);
        break;
      }
    }

    // Step: update the state
    this.setState({
      data: copyOfState,
    });
  };

  render() {
    const { data } = this.state;
    //
    return (
      <div>
        <div className="Lane-List">
          {data.map((item) => (
            <Lane
              name={item.name}
              tasks={item.tasks}
              handleChange={this.handleChange}
              handleClickToAddTask={this.handleClickToAddTask}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
