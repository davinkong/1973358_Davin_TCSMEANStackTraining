import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task.model';

interface showList{
  id: number;
  name: String;
  task: String;
  datetime: any;
}
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  task:Array<Task>=[];
  constructor(public theTask:TaskService) { }

  ngOnInit(): void {
    this.theTask.getList().subscribe(result=>this.task=result,error=>console.log(error))
  }
  
  storeList(ref:any){
    console.log(ref)
    this.theTask.taskList(ref)
  }


}
