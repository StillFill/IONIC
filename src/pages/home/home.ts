import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { LocalNotifications } from "@ionic-native/local-notifications";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  constructor(
    private localNotifications: LocalNotifications
  ) {}

  handleAddTask() {
    const taskName = <HTMLInputElement>document.getElementById("task-name");
    const taskDate = <HTMLInputElement>document.getElementById("task-date");
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    localStorage.setItem(
      "tasks",
      JSON.stringify([
        ...tasks,
        {
          id: Math.random()
            .toString(36)
            .substr(2, 9),
          name: taskName.value,
          date: new Date(taskDate.value),
          isSelected: false
        }
      ])
    );
    taskName.value = "";
    taskDate.value = "";
    // Schedule a single notification
    this.localNotifications.schedule({
      id: 1,
      text: `Tarefa ${taskName.value} adicionada com sucesso!`,
      sound: "file://sound.mp3"
    });
  }
}
