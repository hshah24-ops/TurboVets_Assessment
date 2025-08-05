import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { CommonModule } from '@angular/common';
//import { RouterModule } from '@angular/router';

@Component({
  
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  //imports: [CommonModule, RouterModule]
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  private apiUrl = 'http://localhost:3000/api/tasks';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>(this.apiUrl).subscribe(data => this.tasks = data);
  }
}
