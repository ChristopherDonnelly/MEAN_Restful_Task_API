import { Component, Injectable, OnInit } from '@angular/core';

import { HttpService } from './http.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  tasks = [];
  singleTask: any;
  getId: any;

  constructor(private _httpService: HttpService){}

  ngOnInit() {
    this.singleTask = { id: "", title: "", description: "", completed: false };
    this.getAllTasks();
  }

  editTask(event, form: NgForm){
    event.preventDefault();
    this.singleTask.id = form._directives[0].options;
    console.log(this.singleTask.id)
    this.getTask(this.singleTask.id);
  }

  getAllTasks(){
    let getAllTasks = this._httpService.getTasks();
    getAllTasks.subscribe(data => {
      console.log(data['tasks'])
      this.tasks = data['tasks'];
    });
  }

  getTask(id){
    this.singleTask.id = id;
    let getTaskById = this._httpService.getTask(this.singleTask.id);

    getTaskById.subscribe(data => {
      console.log("Got a task!", data);
      this.singleTask.title = data['task'][0].title;
      this.singleTask.description = data['task'][0].description;
    });
  }

  createTask(e){
    e.preventDefault();
    let createNewTask = this._httpService.createTask(this.singleTask.title, this.singleTask.description);
    createNewTask.subscribe(data => {
      console.log("Created new tasks!", data);
      this.tasks.push(data['task']);

      this.singleTask = { id: "", title: "", description: "", completed: false };
    });
  }

  updateTask(e){
    e.preventDefault();
    let updateTaskById = this._httpService.updateTask(this.singleTask.id, this.singleTask.title, this.singleTask.description, this.singleTask.completed);
    updateTaskById.subscribe(data => {
      console.log("Update task!", data);

      this.singleTask = { id: "", title: "", description: "", completed: false };
      this.getAllTasks();
    });
  }

  deleteTask($event, form){
    event.preventDefault();
    this.singleTask.deleting = true;
    this.singleTask.id = form._directives[0].options;
    console.log(this.singleTask.id)
    let deleteTaskById = this._httpService.deleteTask(this.singleTask.id);
    deleteTaskById.subscribe(data => {
      console.log("Deleted a task!", data);

      this.singleTask = { id: "", title: "", description: "", completed: false, deleting: false };
      this.getAllTasks();
    });
  }
}
