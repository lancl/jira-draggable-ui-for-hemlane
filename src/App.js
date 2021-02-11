import React, { Component } from "react";
import "./App.css";

import Lane from "./Lane";

const DEFAULT_TASK_LIST = {
  Winnie: ["buy eggs", "buy milk"],
  Brad: ["buy meat", "buy vegi"],
  Bob: ["buy meat", "buy vegi"],
  Thomas: ["buy meat", "buy vegi"],
};

// A helper function: return a deep copy of the input state
const deepCopyOfTaskList = (state) => {
  const output = {};
  for (const key of Object.keys(state)) {
    output[key] = [...state[key]];
  }
  return output;
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskListByName: DEFAULT_TASK_LIST, // Start with the default data
      nameList: ["Winnie", "Brad", "Bob", "Thomas"], // Order of the lanes
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
    const { newTaskByName, taskListByName } = this.state;
    const newTask = newTaskByName[name];
    const copyOfTaskList = deepCopyOfTaskList(taskListByName);

    // Add the new task, to the person
    copyOfTaskList[name].push(newTask);

    // Update the state, taskList
    this.setState({
      taskListByName: copyOfTaskList,
    });
  };

  // About: handle click on the left or right arrow of a task card
  handleClickOnArrow = (name, task, tIndex, direction) => {
    const { nameList, taskListByName } = this.state;
    console.log(`[Click] direction is ${direction}`);
    console.log(`### name is ${name}, task is ${task}`);

    // Step: check if input name has a left or right neighbor
    const nIndex = nameList.indexOf(name);
    // If: no left or right neighbor
    if (direction === "left" && nIndex === 0) return;
    if (direction === "right" && nIndex === nameList.length - 1) return;

    // Else: get neighbor's name
    const neighbor =
      direction === "left" ? nameList[nIndex - 1] : nameList[nIndex + 1];

    // Step: move the input task, to the neighbor's task list
    const copyOfTaskList = deepCopyOfTaskList(taskListByName);
    copyOfTaskList[name].splice(tIndex, 1);
    copyOfTaskList[neighbor].push(task);

    // Step: update the state, taskList
    this.setState({
      taskListByName: copyOfTaskList,
    });
  };

  render() {
    const { taskListByName, nameList } = this.state;
    //
    return (
      <div>
        <div className="Lane-List">
          {nameList.map((name) => (
            <Lane
              name={name}
              tasks={taskListByName[name]}
              handleChange={this.handleChange}
              handleClickToAddTask={this.handleClickToAddTask}
              handleClickOnArrow={this.handleClickOnArrow}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
