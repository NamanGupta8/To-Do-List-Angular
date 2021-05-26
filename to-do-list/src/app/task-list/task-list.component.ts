import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  input: string = ''
  taskList: any[] = [{id: 0, value:'Bring Bread'}]
  completedTaskList: any[] = [{id: 1, value:'Bring Milk'}]
  taskId: number = 1;

  constructor() { }

  ngOnInit(): void {
  }
  addToList() {
    if(this.input) {
      this.taskId += 1;
      this.taskList.push({id: this.taskId, value: this.input});
    }
    this.input = ''
    console.log(this.taskList)
  }
  checkBoxChanged(event, item) {
    if(event) {
      this.completedTaskList.push(item)
      this.taskList = [...this.taskList.filter(data => data.id != item.id)]
    }
    else {
      this.taskList.push(item);
      this.completedTaskList = [...this.completedTaskList.filter(data => data.id != item.id)]
    }
  }
  onDelete(item, type) {
    switch (type) {
      case 'task':
        this.taskList = [...this.taskList.filter(data => data.id != item.id)]
        this.taskId -= 1;
        break;
      case 'complete':
        this.completedTaskList = [...this.completedTaskList.filter(data => data.id != item.id)]
         break;
    }



  }
  onEdit(item) {
    (<HTMLInputElement> document.getElementById(item.id)).disabled = false;
  }
  afterEdit(event, item) {
    (<HTMLInputElement> document.getElementById(item.id)).disabled = true;
    let index = this.taskList.indexOf(item);
    let newItem = {id: item.id, value: event.target.value};
    this.taskList[index] = newItem;
  }

}
