import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {
    constructor(private _http: HttpClient){
      // this.createTask();
      // this.updateTask();
      // this.getTask();
      // this.deleteTask();
      this.getTasks();
    }
    
    getTask(){
      let getTask = this._http.get('/tasks/5aa965e92002bf22cc4550f9');
      getTask.subscribe(data => console.log("Got a task!", data));
    }

    getTasks(){
      let getAllTasks = this._http.get('/tasks');
      getAllTasks.subscribe(data => console.log("Got our tasks!", data));
    }

    createTask(){
      let createNewTask = this._http.post('/tasks', { "title": "Angular", "description": "This task is created by Angular!" });
      createNewTask.subscribe(data => console.log("Created new tasks!", data));
    }

    updateTask(){
      let updateTask = this._http.put('/tasks/5aa965e92002bf22cc4550f9', { "title": "Angular Update", "description": "This task is updated by Angular!", "completed": true });
      updateTask.subscribe(data => console.log("Update task!", data));
    }

    deleteTask(){
      let deleteTask = this._http.delete('/tasks/5aa965e92002bf22cc4550f9');
      deleteTask.subscribe(data => console.log("Deleted a task!", data));
    }
}
