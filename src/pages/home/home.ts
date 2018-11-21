import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  constructor(public navCtrl: NavController) {}

  handleAddTask() {
    const taskName = document.getElementById("task-name");
    const taskDate = document.getElementById("task-date");
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    localStorage.setItem(
      "tasks",
      JSON.stringify([
        ...tasks,
        {
          id: Math.random().toString(36).substr(2, 9),
          name: taskName.value,
          date: new Date(taskDate.value),
          isSelected: false,
        }
      ])
    );
    taskName.value = "";
    taskDate.value = "";
  }
}
