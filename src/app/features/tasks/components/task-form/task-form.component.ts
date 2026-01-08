import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Task } from 'src/app/core/models/task.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent implements OnInit {
  @Input() task?: Task;
  @Output() submitTask = new EventEmitter<Partial<Task>>();

  taskForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: [''],
    priority: [3 as 1 | 2 | 3 | 4 | 5, [Validators.required, Validators.min(1), Validators.max(5)]],
    dueDate: ['', Validators.required],
  });

  priorityLevels = [1, 2, 3, 4, 5] as const;

  // Add today property
  get today(): string {
    return new Date().toISOString().split('T')[0];
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    if (this.task) {
      this.taskForm.patchValue({
        title: this.task.title,
        description: this.task.description,
        priority: this.task.priority,
        dueDate: this.formatDate(this.task.dueDate),
      });
    }
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      const taskData: Partial<Task> = {
        title: formValue.title || '',
        description: formValue.description || '',
        priority: formValue.priority as 1 | 2 | 3 | 4 | 5,
        dueDate: new Date(formValue.dueDate!),
        completed: false,
      };
      
      this.submitTask.emit(taskData);
      
      if (!this.task) {
        this.taskForm.reset({ priority: 3 });
      }
    }
  }

  private formatDate(date: Date): string {
    return new Date(date).toISOString().split('T')[0];
  }
}