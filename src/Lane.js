// About: 1 lane per person/worker
// [TBD] Try another option of adding a new task, by Window.prompt()

import React from "react";
import TaskCard from "./TaskCard";

// Note on Lane's CSS styling: uses both option 1 (standard CSS) and
// option 2 (inline CSS, with the prop style from App.js)
const Lane = ({
  name,
  nIndex,
  tasks,
  style,
  //
  handleChange,
  handleClickToAddTask,
  handleClickOnArrow,
  onMouseDown,
  onMouseOver,
}) => (
  <div className="Lane" style={style}>
    <div
      className="Lane-Name"
      onMouseDown={(e) => onMouseDown(e, nIndex)}
      onMouseOver={(e) => onMouseOver(e, nIndex)}
    >
      {/* {nIndex + 1}. {name} */}
      {name}
    </div>

    {/* List of current task cards */}
    <ul className="Task-List">
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
      onClick={(e) => handleClickToAddTask(e, name)}
    >
      Add a card
    </button>
  </div>
);

export default Lane;
