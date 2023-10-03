import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import AddTaskBox from "./AddTaskBox";

interface task {
  id: number;
  taak: string;
  uitvoerder: number;
  uitvoertijd: any;
}

function App() {
  const [dateSelect, setDateSelect] = useState();
  const [taskList, setTaskList] = useState<task[]>([]);
  const [userList, setUserList] = useState<any[]>([]);
  const [showAddTaskBox, setShowAddTaskBox] = useState<boolean>(false);

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
  }, []);

  function toggleAddTask() {
    setShowAddTaskBox((prev) => !prev);
    console.log(showAddTaskBox);
  }

  const usersOptionsHtml = userList.map((user) => (
    <option key={user.ID}>{user.Name}</option>
  ));

  return (
    <div>
      {showAddTaskBox ? <AddTaskBox></AddTaskBox> : <p></p>}
      <div className="p-5 bg-orange-50 rounded w-1/2 m-auto mt-20">
        <button
          onClick={toggleAddTask}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          New Task
        </button>
        <table>
          <thead>
            <tr>
              <th className="text-orange-500">Taak</th>
              <th>Uitgevoerd</th>
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
                  <select>{usersOptionsHtml}</select>
                </td>
                <td>
                  <button className="checkButton">Gedaan</button>
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
