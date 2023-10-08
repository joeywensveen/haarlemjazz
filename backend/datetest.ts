import ItaskDays, { Itaskdays } from "../kenamjuplanner/src/AddTaskBox"

export default function createDateList(selectedDays:Itaskdays ={monday:false, tuesday:false, wednesday:false, thursday:false, friday:false, saturday:false, sunday:true}, repeatTimes:number = 1) {

    let dt:Date = new Date()
    let dateList:string[] = []

    for (let i = 0; i < repeatTimes; i++) {
        dateList.push(dt.toLocaleDateString())
        dt.setDate(dt.getDate() + 7)
    }
    console.log(dateList)
}

