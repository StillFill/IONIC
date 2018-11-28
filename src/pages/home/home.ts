import { Component } from "@angular/core";
import moment from "moment";
import { LocalNotifications } from "@ionic-native/local-notifications";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  tasks: Array<{ name; isSelected; id; date }>;
  constructor(private localNotifications: LocalNotifications) {
    const storagedTasks = [];
    console.log(storagedTasks);
    this.tasks = (storagedTasks || []).map(task => ({
      ...task,
      date: moment(task.date).format("DD/MM/YYYY")
    }));
  }

  handleAddTask() {
    const taskName = <HTMLInputElement>document.getElementById("task-name");
    const taskDate = <HTMLInputElement>document.getElementById("task-date");
    const tasks = [];
    this.tasks = [
      ...this.tasks,
      {
        id: Math.random()
          .toString(36)
          .substr(2, 9),
        name: taskName.value,
        date: new Date(taskDate.value),
        isSelected: false
      }
    ];
    taskName.value = "";
    taskDate.value = "";
    // Schedule a single notification
    this.localNotifications.schedule({
      id: 1,
      text: `Tarefa ${taskName.value} adicionada com sucesso!`,
      sound: "file://sound.mp3"
    });
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
