# A Task-Tracking App

About: a very simplified version of apps such as JIRA and Trello.

Time limit: 50 minutes

## Part 1: The Specs (Input)

These are provided by Bihn (SWE on the team).

1. CSS: same width for the 4 lanes; 25px margin
2. Feature: add a card/task
   Note that for entering a new task, B suggested using `Window.prompt()`, whereas I used `<input>`.
3. Feature: shift task from 1 person to another

In addition, I added some bonus feature(s).

4. Drag and drop: to re-arrange the lanes/persons, in an intuitive way
   Why: this UI feature is quite common: not only for task management, but also for notes (e.g. [Google Keep](https://keep.google.com/)).

### Screenshot of UI

![Screenshot](./screenshot-ui-specs.png)

## Part 2: My Work (Output)

### 2(a) My Components, and Learning(s)

#### App.js (a class)

About: main/class component, where the states live.

My data-structure design for `this.state.taskListByName`:

- Key is a person's name, val is an array of the person's task(s)

- Sample data: `const DEFAULT_TASK_LIST = {Winnie: ["buy eggs", "buy milk"], Brad: ["buy meat", "buy vegi"]}`

- Note here: the key can later be replaced by employee_id, which is surely unique (instead of employee_name)

- General note: a React state should Not be too nested; otherwise, it will be hard for React's state management (Not mutable)

#### Lane.js

About: 1 lane per person; each lane has a list of tasks/cards.

### 2(b) My bonus feature, drag and drop; the learning(s)

How: I coded this feature from scratch (instead of importing an npm module)

My ref links (from research): [answer on stackoverflow.com](https://stackoverflow.com/questions/20926551/recommended-way-of-making-react-component-div-draggable).

Below are the key things added, to enable this feature.

- React states were added: e.g. `dragging` and `nIndexDragged`.

- Lifecycle method: `componentDidUpdate()` was added, to detect the start and end of dragging.

- Several mouse events were added: `onMouseDown()`, `onMouseMove()`, `onMouseOver()` and `onMouseUp()`.
  Note that Web APIs also have methods with closer match, such as [onDrag()](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/ondrag).

- A lot of CSS tweaking.
  -- In particular, I ussed CSS in JS (in `App.js` and `Lane.js`), because Standard CSS is not enough (to dynamically set lanes' positions).
  -- The details: I added a helper function, `generateLaneStyles()`, which (1) sets up the position of the lanes at the start and (2) updates the lanes' styles along with drag-and-drop (of a lane).

### 2(c): My screenshots (per progress)

For spec 1 and spec 2

![For spec 1 and spec 2](./screenshot-1.png)

For all specs
![For all specs](./screenshot-2.png)

With bonus feature: drag and drop (plus colored lanes)
![drag and drop](./screenshot-3a.png)
![drag and drop](./screenshot-3b.png)
