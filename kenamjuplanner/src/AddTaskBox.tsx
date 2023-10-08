import React, { ButtonHTMLAttributes, InputHTMLAttributes } from "react";
import { useState } from "react";
import axios from "axios";

export default function AddTaskBox() {
  const [taskDays, setTaskDays] = useState<Set<number>>(new Set());
  const [taskTime, setTasktime] = useState("00:00");
  const [task, setTask] = useState("");
  const [repeatTimes, setRepeatTimes] = useState(0);

  const weekdayConvert: any = {
    0: "sunday",
    1: "monday",
    2: "tuesday",
    3: "wednesday",
    4: "thursday",
    5: "friday",
    6: "saturday",
  };

  function selectAll(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    setTaskDays(new Set([0, 1, 2, 3, 4, 5, 6, 7]));
  }

  function deselectAll(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    setTaskDays(new Set());
  }

  function toggleTaskDay(e: React.FormEvent<HTMLInputElement>) {
    let day: number = parseInt(e.currentTarget.value);

    if (taskDays.has(day)) {
      setTaskDays(function removeValue() {
        let tset = new Set(taskDays);
        tset.delete(day);
        return tset;
      });
    } else {
      setTaskDays((prev) => new Set(prev).add(day));
    }
  }

  function addTask(e: React.FormEvent) {
    e.preventDefault();

    axios
      .put(`http://localhost:3000/addtask`, {
        task: task,
        days: 2,
        uitgevoerd: 0,
        uitvoertijd: "11:00",
      })
      .then((res) => console.log(res))
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="rounded-xl left-0 right-0 w-1/2 h-1/2 top-1/4 m-auto absolute bg-blue-50 p-10 min-w-fit min-h-max">
      <div className="">
        <h2>Add a task</h2>
        <form action="/addtask">
          <h3>Select a day</h3>
          <div className="flex w-100 justify-start items-center gap-5 flex-wrap ">
            {[0, 1, 2, 3, 4, 5, 6].map((i: number) => (
              <div key={i}>
                <input
                  className="mr-1"
                  type="checkbox"
                  onChange={toggleTaskDay}
                  checked={taskDays.has(i)}
                  id={weekdayConvert[i]}
                  name={weekdayConvert[i]}
                  value={i}
                />
                <label htmlFor={weekdayConvert[i]}>{weekdayConvert[i]}</label>
              </div>
            ))}

            <button className="btn bg-blue-200 rounded p-2" onClick={selectAll}>
              Select all
            </button>

            <button
              className="btn bg-blue-200 rounded p-2"
              onClick={deselectAll}
            >
              Deselect all
            </button>
          </div>
          <br></br>
          <h3>Select a time</h3>
          <input
            value={taskTime}
            type="time"
            onChange={(e) => setTasktime(e.currentTarget.value)}
          ></input>

          <br></br>
          <h3>Repeat x times</h3>
          <input
            type="number"
            max="100"
            onChange={(e) =>
              parseInt(e.currentTarget.value) < 100
                ? setRepeatTimes(parseInt(e.currentTarget.value))
                : ""
            }
            value={repeatTimes}
          />
          <h3>Task</h3>
          <textarea
            name="task"
            onChange={(e) => setTask(e.currentTarget.value)}
          ></textarea>
          <br></br>
          <button
            onClick={(e) => addTask(e)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10"
          >
            Add task
          </button>
        </form>
      </div>
    </div>
  );
}
