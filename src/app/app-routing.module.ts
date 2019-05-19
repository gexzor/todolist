import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { TodoComponent } from './todo/todo.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
    {
        path: 'todos',
        component: TodoComponent,
        data: { animation: 'HomePage' },
    },
    {
        path: 'users',
        component: UsersComponent,
        data: { animation: 'HomePage' },
    },
    {
        path: 'about',
        component: AboutComponent,
        data: { animation: 'HomePage' },
    },
    {
        path: '',
        component: TodoComponent,
        data: { animation: 'HomePage' },
    },
    {
        path: '**',
        component: TodoComponent,
        data: { animation: 'HomePage' },
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
