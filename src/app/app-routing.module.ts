import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegistrationComponent } from './features/user-registration/user-registration.component';
import { BoardComponent } from './features/board/board.component';

const routes: Routes = [
  { path: "", component: UserRegistrationComponent, pathMatch: "full" },
  { path: "game", component: BoardComponent, pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
