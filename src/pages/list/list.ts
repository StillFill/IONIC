import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import moment from "moment";

@Component({
  selector: "page-list",
  templateUrl: "list.html"
})
export class ListPage {
  tasks: Array<{ name; isSelected; id }>;
  constructor() {
    const storagedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    console.log(storagedTasks);
    this.tasks = (storagedTasks || []).map(task => ({
      ...task,
      date: moment(task.date).format("DD/MM/YYYY")
    }));
  }

  selectTask(selectedTask) {
    const selectTaskObject = this.tasks.filter(a => a.id === selectedTask)[0];
    const index = this.tasks.indexOf(selectTaskObject);
    this.tasks[index] = {
      ...selectTaskObject,
      isSelected: !selectTaskObject.isSelected
    };
  }

  removeSelectedTasks() {
    this.tasks = this.tasks.filter(a => !a.isSelected);
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  removeAllTasks() {
    this.tasks = [];
    localStorage.clear();
  }

  hasTasks() {
    console.log("hel");
    return true;
  }
}
