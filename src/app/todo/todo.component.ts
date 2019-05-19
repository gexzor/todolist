import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { Todo } from '../shared/models/Todo';
import { TodoService } from '../shared/services/todo.service';


@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

    @ViewChild(FormGroupDirective) todoForm;
    public todos: Todo[];

    constructor(public todoService: TodoService) {
        this.todos = new Array<Todo>();
    }

    public ngOnInit(): void {
        this.todoService.getTodos().subscribe(todos => this.todos = todos);
        console.log(this.todos);

    }

    public clearForm(): void {
        this.todoService.form.reset();
        this.todoService.initializeFormGroup();
        this.todoForm.resetForm();
    }

    public submitForm(): void {
        if (this.todoService.form.valid) {
            this.todoService.addTodo(this.todoService.form.value);
            this.clearForm();
        }
    }

    public deleteTodo(todo: Todo): void {
        this.todoService.deleteTodo(todo);
    }

    public updateTodo(todo: Todo, value?: string): void {
        this.todoService.updateTodo(todo, 'lolcat');
    }

    public setStatus(todo: Todo): void {
        todo.status =
            todo.status === 'UNDONE' ? 'DOING'
                : todo.status === 'DOING' ? 'DONE'
                    : 'UNDONE';
        console.log(todo.status);
    }

}
