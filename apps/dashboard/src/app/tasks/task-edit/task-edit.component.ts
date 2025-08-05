import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
//import { CommonModule } from '@angular/common';
//import { FormsModule } from '@angular/forms';

@Component({
  
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css'],
  //imports: [CommonModule, FormsModule]
})
export class TaskEditComponent implements OnInit {
  task: any = {};
  private apiUrl = 'http://localhost:3000/api/tasks';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get(`${this.apiUrl}/${id}`).subscribe(data => this.task = data);
    }
  }

  save() {
    if (!this.task.id) return;
    this.http.put(`${this.apiUrl}/${this.task.id}`, this.task).subscribe(() => {
      this.router.navigate(['/tasks']);
    });
  }
}