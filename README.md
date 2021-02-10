# A Task-Tracking App

About: a very simplified version of apps such as JIRA and Trello.

Time limit: 50 minutes

## Part 1: The Specs (Input)

1. CSS: same width for the 4 lanes; 25px margin
2. Feature: add a card/task
3. Feature: shift task from 1 person to another

### Screenshot of UI

It is provided by Bihn (SWE on the team).

![Screenshot](./screenshot-ui-specs.png)

## Part 2: My Work (Output)

### 2(a) My Components, and Learning(s)

#### App.js (a class)

About: main/class component, where the states live.

My data-structure design for `this.state.data`:

- Key is a person's name, val is an array of the person's task(s)

- Sample data: `const DATA = {Winnie: ["buy eggs", "buy milk"]}, Brad: ["buy meat", "buy vegi"]`

- Note: the key can later be replaced by employee_id, which is surely unique (instead of employee_name)

- Note: data should Not be too nested; otherwise, it will be hard for React's state management (Not mutable)

#### Lane.js

About: 1 lane per person; each lane has a list of tasks/cards.
Note that for entering a new task, B suggested using `Window.promp`, whereas I used `<input>`.

### 2(b): My screenshots (per progress)

For spec 1 and spec 2

![](./screenshot-1.png)
