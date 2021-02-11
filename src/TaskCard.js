// About: a task card (for a person)

import React from "react";

const LEFT = "<";
const RIGHT = ">";

const TaskCard = ({ task, handleClickOnArrow }) => (
  <div className="Task-Card">
    <button className="Left-Arrow" onClick={() => handleClickOnArrow("left")}>
      {LEFT}
    </button>
    {task}
    <button className="Right-Arrow" onClick={() => handleClickOnArrow("right")}>
      {RIGHT}
    </button>
  </div>
);

export default TaskCard;
