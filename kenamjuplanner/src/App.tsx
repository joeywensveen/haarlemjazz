import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import AddTaskBox from "./AddTaskBox";

interface task {
  id: number;
  taak: string;
  uitvoerder: string;
  uitvoertijd: any;
  aftekentijd: string;
}

let dt = new Date();

function App() {
  const [displayDay, setDisplayDay] = useState({
    weekday: dt.getDay(),
    currentdate: dt.toLocaleDateString(),
  });
  const [taskList, setTaskList] = useState<task[]>([]);
  const [userList, setUserList] = useState<any[]>([]);
  const [showAddTaskBox, setShowAddTaskBox] = useState<boolean>(false);

  console.log(displayDay);
  useEffect(() => {
    axios
      .get("http://localhost:3000/tasks")
      .then((res) => setTaskList(res.data))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((res) => setUserList(res.data))
      .catch((error) => {
        console.log(error);
      });
  }, [taskList]);

  function completeTask(taskId: number, uitvoerder: string) {
    axios
      .put(`http://localhost:3000/updatetask/${taskId}/${uitvoerder}`)
      .then((res) => console.log(res))
      .catch((error) => {
        console.log(error);
      });
  }

  function toggleAddTask() {
    setShowAddTaskBox((prev) => !prev);
    console.log(showAddTaskBox);
  }

  function updateUitvoerder(
    e: React.ChangeEvent<HTMLSelectElement>,
    taskId: number
  ) {
    let uitvoerder: string = e.currentTarget.value;
    setTaskList(
      taskList.map((task: task) =>
        task.id == taskId ? { ...task, uitvoerder: uitvoerder } : { ...task }
      )
    );
  }

  const usersOptionsHtml = userList.map((user) => (
    <option value={user.ID} key={user.ID}>
      {user.Name}
    </option>
  ));

  return (
    <div>
      {showAddTaskBox ? <AddTaskBox /> : <p></p>}
      <div className="p-5 bg-stone-100 rounded w-1/2 m-auto mt-20 min-w-fit">
        <button
          onClick={toggleAddTask}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-5"
        >
          New Task
        </button>
        <table>
          <thead>
            <tr>
              <th>Taak</th>
              <th>Uitvoertijd</th>
              <th>Uitvoerder ID</th>
              <th>Uitvoerder</th>
            </tr>
          </thead>
          <tbody>
            {taskList.map((task) => (
              <tr key={task.id}>
                <td>{task.taak}</td>
                <td>{task.uitvoertijd}</td>
                <td>{task.uitvoerder}</td>
                <td>
                  <select onChange={(e) => updateUitvoerder(e, task.id)}>
                    {usersOptionsHtml}
                  </select>
                </td>
                <td>
                  {task.aftekentijd ? (
                    <p>{task.aftekentijd}</p>
                  ) : (
                    <p>not completed</p>
                  )}
                </td>
                <td>
                  <button
                    id={task.id.toString()}
                    onClick={() => completeTask(task.id, task.uitvoerder)}
                    className="checkButton"
                  >
                    Gedaan
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
