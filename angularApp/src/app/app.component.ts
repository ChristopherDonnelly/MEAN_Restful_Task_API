import { Component, Injectable, OnInit } from '@angular/core';

import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  tasks = [];
  singleTask: any;

  constructor(private _httpService: HttpService){}

  ngOnInit() {
    this.singleTask = { id: "", title: "", description: "" }
  }

  testMe(e){
    const value:string = (<HTMLSelectElement>event.srcElement).value;
    this.getTask(value);
  }

  getAllTasks(){
    let getAllTasks = this._httpService.getTasks();
    getAllTasks.subscribe(data => {
      console.log(data.tasks)
      this.tasks = data.tasks;
    });
  }

  getTask(id){
    this.singleTask.id = id;
    let getTaskById = this._httpService.getTask(this.singleTask.id);

    getTaskById.subscribe(data => {
      console.log("Got a task!", data);
      this.singleTask.title = data.task[0].title;
      this.singleTask.description = data.task[0].description;
    });
  }

  createTask(title, description?){
    let createNewTask = this._httpService.createTask(title, description);
    createNewTask.subscribe(data => console.log("Created new tasks!", data));
  }

  updateTask(id, title, description, completed?: false){
    let updateTaskById = this._httpService.updateTask(id, title, description, completed);
    updateTaskById.subscribe(data => console.log("Update task!", data));
  }

  deleteTask(id){
    // return this._http.delete('/tasks/5aa965e92002bf22cc4550f9');
    let deleteTaskById = this._httpService.deleteTask(id);
    deleteTaskById.subscribe(data => console.log("Deleted a task!", data));
  }
}
