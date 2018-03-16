import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {
    constructor(private _http: HttpClient){ }
    
    getTask(id){
      return this._http.get(`/tasks/${id}`);
    }

    getTasks(){
      return this._http.get('/tasks');
    }

    createTask(title, description?){
      return this._http.post('/tasks', { "title": title, "description": description });
    }

    updateTask(id, title, description, completed){
      return this._http.put(`/tasks/${id}`, { "title": title, "description": description, "completed": completed });
    }

    deleteTask(id){
      return this._http.delete(`/tasks/${id}`);
    }
}
