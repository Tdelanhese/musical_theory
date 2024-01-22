import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HomeComponent } from './pages/home/home.component';
import { RootRoutingModule } from './root-routing.module';
import { RootComponent } from './root.component';
import { QuizGameComponent } from './pages/quiz-game/quiz-game.component';

@NgModule({
  declarations: [
    RootComponent,
    HomeComponent,
    QuizGameComponent
  ],
  imports: [
    BrowserModule,
    RootRoutingModule
  ],
  providers: [],
  bootstrap: [
    RootComponent
  ]
})
export class RootModule { }
