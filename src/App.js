import React, { Component } from "react";
import "./App.css";

import Lane from "./Lane";

// The default data
// Note 1: the key can later be replaced by employee_id (instead
// of employee_name)
// Note 2: data should Not be too nested (otherwise, hard to make
// a copy)
const DATA = {
  Winnie: ["buy eggs", "buy milk"],
  Brad: ["buy meat", "buy vegi"],
  Bob: ["buy meat", "buy vegi"],
  Thomas: ["buy meat", "buy vegi"],
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // An array of objects
      data: DATA, // Value as the default data
      newTaskByName: {},
    };
  }

  // About: handle change, on typing a new task
  handleChange = (event, name) => {
    const newTask = event.target.value;
    const copyOfNewTasksByName = { ...this.state.newTaskByName };

    // Update the copy of this state
    copyOfNewTasksByName[name] = newTask;

    // Update this state
    this.setState({
      newTaskByName: copyOfNewTasksByName,
    });
  };

  // About: after click, add a new task to the person
  handleClickToAddTask = (name) => {
    const newTask = this.state.newTaskByName[name];
    console.log(`### [Click] name is ${name}`);

    // Make a deep copy of the state, data
    // const data = { ...this.state.data };
    const copyOfData = {};
    for (const key of Object.keys(this.state.data)) {
      copyOfData[key] = [...this.state.data[key]];
    }

    // Add the new task, to the person
    copyOfData[name].push(newTask);

    // Update the state, data
    this.setState({
      data: copyOfData,
    });
  };

  render() {
    const { data } = this.state;
    //
    return (
      <div>
        <div className="Lane-List">
          {Object.keys(data).map((name) => (
            <Lane
              name={name}
              tasks={data[name]}
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
