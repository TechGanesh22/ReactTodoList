import { useState, useEffect } from "react";
import AddTaskForm from "./Components/AddTaskForm.jsx";
import UpdateForm from "./Components/UpdateForm.jsx";
import ToDo from "./Components/ToDo.jsx";

import "./App.css";
import React from "react";

//get localStorage data back
const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist");
  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

function App() {
  //Task (ToDo list) State(main state)
  const [toDo, setToDo] = useState(
    // { id: 1, title: "Task 1", status: false },
    // { id: 2, title: "Task 2", status: false },
    // this is the main state storing todo list or task
    getLocalData()
  );
  //Temp State(temporary state)
  const [newTask, setNewTask] = useState(""); //when we enter a task in the form it comes to newTask then addTask function starts working
  console.log(newTask);
  const [updateData, setUpdateData] = useState("");

  //Add task
  const addTask = () => {
    //
    if (newTask) {
      let num = toDo.length + 1; //length of todo increases
      let newEntry = { id: num, title: newTask, status: false }; //new entry created
      setToDo([...toDo, newEntry]); //first ...toDo helps to display the previous entry and then the new entry display (new entry first  saved in the main state)
      setNewTask(""); //it clears the input item written in the add form this is also called we cleared the temp state
    }
  };
  //Adding to LocalStorage
  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(toDo));
  }, [toDo]);

  //Delete Task
  const deleteTask = (id) => {
    let newTasks = toDo.filter((task) => task.id !== id); //here using filter method we exclude the task which id matches and set the filtered task using setToDo
    setToDo(newTasks);
  };
  //Mark task as done or completed
  const markDone = (id) => {
    let newTask = toDo.map((task) => {
      if (task.id === id) {
        return { ...task, status: !task.status }; //if task.id is equal to the id passed in this function the change the task status from false to true and vice versa(toggle the status)
      }
      return task;
    });
    setToDo(newTask);
  };
  //Cancel Update
  const cancelUpdate = (e) => {
    setUpdateData("");
  };
  // Change task for update
  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false,
    };
    setUpdateData(newEntry);
  };
  // Update Task
  const updateTask = () => {
    //
    let filterRecords = [...toDo].filter((task) => task.id !== updateData.id);
    let updateObject = [...filterRecords, updateData];
    setToDo(updateObject);
    setUpdateData("");
  };
  return (
    <div className="container App">
      <br />
      <br />
      <h2>To Do List</h2>
      <br />
      <br />
      {/* Update Task start */}
      {updateTask && updateData ? (
        <UpdateForm
          updateData={updateData}
          changeTask={changeTask}
          updateTask={updateTask}
          cancelUpdate={cancelUpdate}
        />
      ) : (
        // AddTaskForm Component
        <AddTaskForm
          newTask={newTask}
          setNewTask={setNewTask}
          addTask={addTask}
        />
      )}

      {/* Display ToDos */}
      {/* 1.if toDo is empty then display No Tasks */}
      {toDo && toDo.length ? "" : "No Tasks..."}

      <ToDo
        toDo={toDo}
        markDone={markDone}
        setUpdateData={setUpdateData}
        deleteTask={deleteTask}
      />
    </div>
  );
}

export default App;
