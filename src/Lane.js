// About: 1 lane per person/worker
// [TBD] Try another option of adding a new task, by Window.prompt()
// [TBD] Try adding the UI feature, drag and drop, for the lanes' order

import React from "react";
import TaskCard from "./TaskCard";

// Each Lane: name; then task(s) as a list
const Lane = ({
  name,
  nIndex,
  tasks,
  handleChange,
  handleClickToAddTask,
  handleClickOnArrow,
}) => (
  <div className="Lane">
    <div className="Lane-Name">
      {nIndex + 1}. {name}
    </div>

    {/* List of current task cards */}
    <ul>
      {tasks.map((task, index) => (
        <TaskCard
          task={task}
          handleClickOnArrow={(direction) =>
            handleClickOnArrow(name, task, index, direction)
          }
        />
      ))}
    </ul>

    {/* Section: to add a new task, for the person */}
    <input
      className="New-Task-Input"
      type="text"
      placeholder="Enter a new task"
      onChange={(e) => handleChange(e, name)}
    ></input>
    <button
      className="New-Task-Button"
      onClick={() => handleClickToAddTask(name)}
    >
      Add a card
    </button>
  </div>
);

export default Lane;
