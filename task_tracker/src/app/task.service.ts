import { Injectable } from '@angular/core';
import { Task } from './task.model';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(public http:HttpClient) { }
  taskList(showList:any){
    this.http.post("http://localhost:3000/showList",showList).subscribe(result=>console.log(result),error=>console.log(error));
  }
  getList():Observable<Task[]>{
    return this.http.get<Task[]>("http://localhost:3000/showList");
  }

  
}
