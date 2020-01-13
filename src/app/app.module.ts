import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TaskTwoOneComponent } from './components/task-two-one/task-two-one.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ErrorCorrectionComponent } from './components/error-correction/error-correction.component';
import { HemmingsAlgorithmComponent } from './components/hemmings-algorithm/hemmings-algorithm.component';
import { AssociativeMemoryComponent } from './components/associative-memory/associative-memory.component';
import { HopfieldNetComponent } from './components/hopfield-net/hopfield-net.component';
import { PatternPipe } from './pipes/pattern.pipe';
import { RouterModule, Routes } from '@angular/router';
const appRoutes: Routes = [
  { path: 'two-one', component: TaskTwoOneComponent },
  { path: 'hopfield', component: HopfieldNetComponent },
  { path: 'hemmings', component: HemmingsAlgorithmComponent },
  { path: '',
    redirectTo: '/hopfield',
    pathMatch: 'full'
  },
];

@NgModule({
  declarations: [
    AppComponent,
    TaskTwoOneComponent,
    ErrorCorrectionComponent,
    HemmingsAlgorithmComponent,
    AssociativeMemoryComponent,
    HopfieldNetComponent,
    PatternPipe
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
