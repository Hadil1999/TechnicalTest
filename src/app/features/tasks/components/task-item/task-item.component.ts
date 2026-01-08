import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/core/models/task.model';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() edit = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<string>();
  @Output() toggle = new EventEmitter<string>();

  get priorityClass(): string {
    return `priority-${this.task.priority}`;
  }

  get isOverdue(): boolean {
    return new Date(this.task.dueDate) < new Date() && !this.task.completed;
  }
}