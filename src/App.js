import React, { Component } from "react";
import "./App.css";

import Lane from "./Lane";

const DEFAULT_TASK_LIST = {
  Winnie: ["buy eggs", "WATER"],
  Brad: ["buy meat", "buy vegi"],
  Bob: ["buy meat", "RICE"],
  Thomas: ["buy meat", "buy vegi"],
  // Linda: ["SUGAR"],
};

const COLORS_BY_NAME = {
  Winnie: "#7e9a9a",
  Brad: "#f6d8ac",
  Bob: "#ffff66",
  Thomas: "#8ec3eb",
  // Linda: "#db9833",
};

/**
 * Helper functions
 * @function generateLaneStyles: generate CSS variable to style the lanes
 * @function deepCopyOfLaneStyles: return a deep copy (an array of objects)
 * @function deepCopyOfTaskList: return a deep copy (an object with array values)
 * @function updateNameList: for dropping dragged lane (index1), per onMouseUp
 */

// Constants (CSS), for the first helper function
const LANE_POSITION = "absolute"; // Note: 'flex' display does Not work with 'absolute'
const LANE_WIDTH = 20; // In %
const GAP_HORIZONTAL = 3; // In %
const LANE_HEIGHT = 250; // In px
const GAP_VERTICAL = 50; // In px
const LANES_PER_ROW = 4; // 4 lanes for each row
//
const generateLaneStyles = (nameList) => {
  console.log(`### Generating styles for the lanes`);
  return nameList.map((name, index) => {
    const left =
      (GAP_HORIZONTAL + LANE_WIDTH) * (index % LANES_PER_ROW) + GAP_HORIZONTAL;
    const top =
      (LANE_HEIGHT + GAP_VERTICAL) * Math.floor(index / LANES_PER_ROW) +
      GAP_VERTICAL;
    return {
      position: LANE_POSITION,
      width: LANE_WIDTH + "%",
      height: LANE_HEIGHT + "px",
      left: left + "%",
      top: top + "px",
      backgroundColor: COLORS_BY_NAME[name],
    };
  });
};

const deepCopyOfLaneStyles = (state) => state.map((style) => ({ ...style }));

const deepCopyOfTaskList = (state) => {
  const output = {};
  for (const key of Object.keys(state)) {
    output[key] = [...state[key]];
  }
  return output;
};

const updateNameList = (state, index1, index2) => {
  console.log(`[updateNameList] index1: ${index1}, index2: ${index2}`);
  const output = [...state];
  // Exception(s) check
  if (index1 === null || !index2 === null) return output;

  // Update the array, per the 2 indices
  if (index1 < index2) {
    output[index2 - 1] = state[index1]; // Insert index1's val before index2's
    for (let i = index1; i < index2 - 1; i++) {
      output[i] = state[i + 1];
    }
  }
  // Else: index1 > index2
  else {
    output[index2] = state[index1]; // Insert index1's val before index2's
    for (let i = index2 + 1; i <= index1; i++) {
      output[i] = state[i - 1];
    }
  }
  console.log(`output: ${JSON.stringify(output)}`);
  return output;
};

/**
 * App class
 */

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskListByName: DEFAULT_TASK_LIST, // Start with the default data
      nameList: Object.keys(DEFAULT_TASK_LIST), // Order of the lanes
      newTaskByName: {},
      // CSS styling, for each person/lane
      laneStyles: generateLaneStyles(Object.keys(DEFAULT_TASK_LIST)),
      // For drag and drop of a lane
      dragging: false,
      nIndexDragged: null, // The index of the name/lane that is being dragged
      nIndexHovered: null, // The name/lane that is under the mouse (while dragging)
    };
  }

  /**
   * Lifecycle method(s)
   * @function componentDidUpdate: only triggered when the state, dragging, changes
   */
  // Note: need to incl 'prevProps' first, because 'prevState' is the second arg
  componentDidUpdate(prevProps, prevState) {
    if (this.state.dragging === prevState.dragging) return;
    //
    // If: state changes from Not dragging to dragging (triggered by mouse down)
    if (this.state.dragging) {
      console.log(`[componentDidUpdate] START drag and drop`);
      document.addEventListener("mousemove", this.onMouseMove);
      document.addEventListener("mouseup", this.onMouseUp);
    }
    // Else: state changes from dragging to Not dragging (triggered by mouse up)
    else {
      console.log(`[componentDidUpdate] END drag and drop`);
      document.removeEventListener("mousemove", this.onMouseMove);
      document.removeEventListener("mouseup", this.onMouseUp);
    }
  }

  /**
   * Other methods: first 4 methods are for drag and drop
   * @function onMouseDown: added to <Lane>
   * @function onMouseMove: added to the entire document
   * @function onMouseOver: added to <Lane>
   * @function onMouseUp: added to the entire document
   *
   * @function handleChange: handle change, on typing a new task
   * @function handleClickToAddTask: after click, add a new task to the person
   * @function handleClickOnArrow: handle click on the left or right arrow of a task card
   */

  onMouseDown = (e, nIndex) => {
    this.setState({
      dragging: true,
      nIndexDragged: nIndex,
    });
    //
    e.preventDefault();
  };

  onMouseMove = (e) => {
    const { dragging, laneStyles, nIndexDragged } = this.state;
    if (!dragging) return; // Condition is dragging
    // Update CSS variable (for the lanes)
    const copyOfLaneStyles = deepCopyOfLaneStyles(laneStyles);
    copyOfLaneStyles[nIndexDragged] = {
      ...copyOfLaneStyles[nIndexDragged],
      left: e.pageX, // Override left
      top: e.pageY, // Override top
    };
    //
    this.setState({
      laneStyles: copyOfLaneStyles,
    });
    //
    e.preventDefault();
  };

  // About: when the mouse hovers over a lane/name
  onMouseOver = (e, nIndex) => {
    if (!this.state.dragging) return; // Condition is dragging
    //
    this.setState({
      nIndexHovered: nIndex,
    });
    //
    e.preventDefault();
  };

  // About: when mouse is released (i.e. a lane is dropped)
  onMouseUp = (e) => {
    // Update the state, nameList, to drop the lane at the proper position (i.e.
    // insert index nIndexDragged before index nIndexHovered)
    const { nameList, nIndexDragged, nIndexHovered } = this.state;
    const copyOfNameList = updateNameList(
      nameList,
      nIndexDragged,
      nIndexHovered
    );
    //
    this.setState({
      dragging: false,
      nIndexDragged: null,
      nIndexHovered: null,
      //
      nameList: copyOfNameList,
      laneStyles: generateLaneStyles(copyOfNameList),
    });
    //
    e.preventDefault();
  };

  handleChange = (event, name) => {
    const newTask = event.target.value;
    const copyOfNewTasksByName = { ...this.state.newTaskByName };

    // Update the copy of this state
    copyOfNewTasksByName[name] = newTask;

    // Update this state
    this.setState({
      newTaskByName: copyOfNewTasksByName,
    });

    //
    event.preventDefault();
  };

  handleClickToAddTask = (e, name) => {
    const { newTaskByName, taskListByName } = this.state;
    const newTask = newTaskByName[name];
    const copyOfTaskList = deepCopyOfTaskList(taskListByName);

    // Add the new task, to the person
    copyOfTaskList[name].push(newTask);

    // Update the state, taskList
    this.setState({
      taskListByName: copyOfTaskList,
    });
    //
    e.preventDefault();
  };

  handleClickOnArrow = (name, task, tIndex, direction) => {
    const { nameList, taskListByName } = this.state;
    console.log(`[Click] direction is ${direction}`);
    // console.log(`### name is ${name}, task is ${task}`);

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
    const { taskListByName, nameList, laneStyles } = this.state;
    //
    return (
      <div>
        <div className="Lane-List">
          {nameList.map((name, index) => (
            <Lane
              name={name}
              nIndex={index}
              tasks={taskListByName[name]}
              style={laneStyles[index]}
              //
              onMouseDown={this.onMouseDown}
              onMouseOver={this.onMouseOver}
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
