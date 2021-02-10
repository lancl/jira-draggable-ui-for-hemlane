import React from "react";

// Each Lane: name; then task(s) as a list
const Lane = ({ name, tasks, handleChange, handleClickToAddTask }) => (
  <div className="Lane">
    {/* List of current tasks */}
    <div>
      <div>{name}</div>
      <ul>
        {tasks.map((task) => (
          <li>{task}</li>
        ))}
      </ul>
    </div>
    {/* Button: to add a new task */}
    <div>
      <input
        type="text"
        onChange={(event, name) => handleChange(event, name)}
      ></input>
      <button onClick={(name) => handleClickToAddTask(name)}>Add a card</button>
    </div>
  </div>
);

export default Lane;
