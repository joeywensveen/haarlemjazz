import React, { InputHTMLAttributes } from "react";
import {useState} from "react"
import axios from "axios"

interface taskdays{
  monday: boolean,
  tuesday:boolean,
  wednesday:boolean,
  thursday:boolean,
  friday:boolean,
  saturday:boolean,
  sunday:boolean
}

export default function AddTaskBox() {
  const [taskDays, setTaskDays] = useState<taskdays>({monday: false, tuesday:false, wednesday:false, thursday:false, friday:false, saturday:false, sunday:false})
  const [taskTime, setTasktime] = useState("00:00")
  const [task, setTask] = useState("")

  function selectAll(e:React.FormEvent<HTMLButtonElement>){
    e.preventDefault()
    setTaskDays({monday: !taskDays.monday, tuesday: !taskDays.monday, wednesday:!taskDays.wednesday, thursday:!taskDays.thursday, friday:!taskDays.friday, saturday:!taskDays.saturday, sunday:!taskDays.sunday})
  }
  
  function toggleTaskDay(e:React.FormEvent<HTMLInputElement>){
    let day:string = e.currentTarget.name
      setTaskDays({...taskDays, [day]: !taskDays[day]})
  }

  function addTask(e){
    e.preventDefault()
    console.log(task, taskTime, taskDays)
    // axios.put(`http://localhost:3000/addtask`, {task: task, days:days, uitgevoerd: 0, uitvoertijd:uitvoertijd})
    // .then((res) => console.log(res))
    // .catch((error)=> {console.log(error)})
  }
  


  return (
    <div className="rounded-xl left-0 right-0 w-1/2 h-1/2 top-1/4 m-auto absolute bg-blue-50 p-10">
      <h2>Add a task</h2>
      <form action="/addtask">
        <h3>Select a day</h3>
        <div className="flex w-100 justify-around">
        <input type="checkbox" onChange={toggleTaskDay} checked={taskDays.monday} id="monday" name="monday" value="Monday"/>
        <label htmlFor="monday">Monday</label>
        <input type="checkbox" onChange={toggleTaskDay} checked={taskDays.tuesday} id="tuesday" name="tuesday" value="Tuesday"/>
        <label htmlFor="tuesday">Tuesday</label>
        <input type="checkbox" onChange={toggleTaskDay} checked={taskDays.wednesday} id="wednesday" name="wednesday" value="Wednesday"/>
        <label htmlFor="wednesday">Wednesday</label>
        <input type="checkbox" onChange={toggleTaskDay} checked={taskDays.thursday}  id="thursday" name="thursday" value="Thursday"/>
        <label htmlFor="thursday">Thursday</label>
        <input type="checkbox" onChange={toggleTaskDay} checked={taskDays.friday} id="friday" name="friday" value="Friday"/>
        <label htmlFor="friday">Friday</label>        
        <input type="checkbox" onChange={toggleTaskDay} checked={taskDays.saturday} id="saturday" name="saturday" value="saturday"/>
        <label htmlFor="saturday">Saturday</label>
        <input type="checkbox" onChange={toggleTaskDay} checked={taskDays.sunday} id="sunday" name="sunday" value="Sunday"/>
        <label htmlFor="sunday">Sunday</label>
        <button className="btn" onClick={selectAll}>Select all</button>
        </div>
        <br></br>
        <h3>Select a time</h3>
        <input value={taskTime} type="time" onChange={(e)=> setTasktime(e.currentTarget.value)}></input>

        <br></br>
        <h3>Task</h3>
        <textarea name="task" onChange={(e)=> setTask(e.currentTarget.value)}></textarea>
        <br></br>
        <button onClick={(e)=>addTask(e)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10">Add task</button>
        </form>

    </div>
  );
}
