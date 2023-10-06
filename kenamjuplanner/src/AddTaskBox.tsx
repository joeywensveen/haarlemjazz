import React from "react";

export default function AddTaskBox() {
  return (
    <div className="rounded-xl left-0 right-0 w-1/2 h-1/2 top-1/4 m-auto absolute bg-blue-50">
      <form action="/addtask">
        <input type="checkbox" id="monday" name="monday" value="Monday"/>
        <label htmlFor="monday">Monday</label>
        <input type="checkbox" id="tuesday" name="tuesday" value="Tuesday"/>
        <label htmlFor="tuesday">Tuesday</label>
        <input type="checkbox" id="wednesday" name="wednesday" value="Wednesday"/>
        <label htmlFor="wednesday">Wednesday</label>
        <input type="checkbox" id="thursday" name="thursday" value="Thursday"/>
        <label htmlFor="thursday">Thursday</label>
        <input type="checkbox" id="friday" name="friday" value="Friday"/>
        <label htmlFor="friday">Friday</label>        
        <input type="checkbox" id="saturday" name="saturday" value="saturday"/>
        <label htmlFor="saturday">Saturday</label>
        <input type="checkbox" id="sunday" name="sunday" value="Sunday"/>
        <label htmlFor="sunday">Sunday</label>
        
      </form>

    </div>
  );
}
