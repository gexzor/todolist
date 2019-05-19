import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { NavbarComponent } from './navbar/navbar.component';
import { TodoComponent } from './todo/todo.component';
import { AboutComponent } from './about/about.component';
import { UsersComponent } from './users/users.component';


@NgModule({
    declarations: [
        AppComponent,
        TodoComponent,
        NavbarComponent,
        AboutComponent,
        UsersComponent,
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        AppRoutingModule,
        MaterialModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebase, 'todolist'),
        AngularFireDatabaseModule,
        AngularFirestoreModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
