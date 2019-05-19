import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators';
import { Todo } from '../models/Todo';


@Injectable({
    providedIn: 'root'
})
export class TodoService {
    private todoCollection: AngularFirestoreCollection<Todo>;
    private todos: Observable<Todo[]>;

    constructor(private firestore: AngularFirestore) {
        this.todoCollection = this.firestore.collection('todos');
    }

    public form: FormGroup = new FormGroup({
        title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
        description: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    });

    public initializeFormGroup() {
        this.form.setValue({
            title: '',
            description: '',
        });
    }

	/**
	* Adds an todo with a specific or automatically generated ID
	* @param todo - The todo to create
	* @param id - An optional id to give to the todo
	*/
    addTodo(todo: Todo): any {
        todo.status = 'UNDONE';
        this.firestore.collection('todos').add(todo);
    }

    public updateTodo(todo: Todo, value: string): void {
        this.firestore.collection('todos').doc(todo.id).set({
            title: value
        });
    }


	/**
	 * Deletes a the provided todo from the database.
	 * @param todo Todo which is being deleted.
	 */
    deleteTodo(todo: Todo): any {
        this.firestore.collection('todos').doc(todo.id).delete();
    }

	/**
     * Either return the observable list or initialize it, if it isn't initialized yet
     * @returns The observable list of companies
     */
    public getTodos(): Observable<Todo[]> {
        return this.todos || this.initTodos();
    }

	/**
     * Initialize the Todo observable list and return it
     * @returns The todo observable list
     */
    private initTodos(): Observable<Todo[]> {
        // Set the observable list to a custom mapping to the firebase snapshot changes
        this.todos = this.todoCollection.snapshotChanges().pipe(map((changes: DocumentChangeAction<Todo>[]) => {
            return changes.map((changeAction: DocumentChangeAction<Todo>) => {
                // Map each changed item to a company object and set the id as well
                const todo = changeAction.payload.doc.data() as Todo;
                todo.id = changeAction.payload.doc.id;
                return todo;
            });
        }));
        // Return the observable list
        return this.todos;
    }

}
