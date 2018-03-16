import { Component, Injectable, OnInit } from '@angular/core';

import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  tasks = [];

  constructor(private _httpService: HttpService){}

  ngOnInit(){
    let getAllTasks = this._httpService.getTasks();
    getAllTasks.subscribe(data => {
      console.log(data.tasks)
      this.tasks = data.tasks;
    });
  }

  getTask(id){
    id = '5aa965e92002bf22cc4550f9'
    let getTaskById = this._httpService.getTask(id);
    getTaskById.subscribe(data => console.log("Got a task!", data));
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
