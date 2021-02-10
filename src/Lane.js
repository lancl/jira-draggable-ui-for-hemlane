import React from "react";

// Each Lane: name; then task(s) as a list
const Lane = ({ name, tasks, handleChange, handleClickToAddTask }) => (
  <div className="Lane">
    <div className="Lane-Name">{name}</div>

    {/* List of current tasks */}
    <ul>
      {tasks.map((task) => (
        <li>{task}</li>
      ))}
    </ul>

    {/* Section: to add a new task, for the person */}
    <input
      className="Task-Input"
      type="text"
      placeholder="Enter a new task"
      onChange={(e) => handleChange(e, name)}
    ></input>
    <button className="Task-Button" onClick={() => handleClickToAddTask(name)}>
      Add a card
    </button>
  </div>
);

export default Lane;
