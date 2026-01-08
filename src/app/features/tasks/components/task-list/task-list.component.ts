import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from 'src/app/core/models/task.model';
import { addTask, updateTask, deleteTask, toggleTaskCompletion } from '../../state/task.actions';
import { selectAllTasks } from '../../state/task.selectors';
import { selectCurrentUser } from 'src/app/features/auth/state/auth.selectors';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks$: Observable<Task[]>;
  pendingTasks$: Observable<Task[]>;
  completedTasks$: Observable<Task[]>;
  filteredTasks$: Observable<Task[]>;
  currentUser$ = this.store.select(selectCurrentUser);
  
  editingTask: Task | null = null; // Keep as Task | null
  filter: 'all' | 'pending' | 'completed' = 'all';

  constructor(private store: Store) {
    this.tasks$ = this.store.select(selectAllTasks);
    
    this.pendingTasks$ = this.tasks$.pipe(
      map(tasks => tasks.filter(task => !task.completed))
    );
    
    this.completedTasks$ = this.tasks$.pipe(
      map(tasks => tasks.filter(task => task.completed))
    );
    
    this.filteredTasks$ = combineLatest([this.tasks$, this.currentUser$]).pipe(
      map(([tasks, user]) => {
        if (!user) return [];
        
        const userTasks = tasks.filter(task => task.userId === user.email);
        
        switch (this.filter) {
          case 'pending': return userTasks.filter(task => !task.completed);
          case 'completed': return userTasks.filter(task => task.completed);
          default: return userTasks;
        }
      })
    );
  }

  ngOnInit(): void {}

  onAddTask(taskData: Partial<Task>): void {
    this.currentUser$.subscribe(user => {
      if (user) {
        const newTask: Task = {
          ...taskData as Task,
          id: this.generateId(),
          userId: user.email,
          createdAt: new Date(),
          completed: false
        };
        this.store.dispatch(addTask({ task: newTask }));
      }
    });
  }

  onUpdateTask(taskData: Partial<Task>): void {
    if (this.editingTask) {
      const updatedTask: Task = {
        ...this.editingTask,
        ...taskData
      };
      this.store.dispatch(updateTask({ task: updatedTask }));
      this.editingTask = null;
    }
  }

  onDeleteTask(taskId: string): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.store.dispatch(deleteTask({ taskId }));
    }
  }

  onToggleCompletion(taskId: string): void {
    this.store.dispatch(toggleTaskCompletion({ taskId }));
  }

  onEditTask(task: Task): void {
    this.editingTask = { ...task };
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}