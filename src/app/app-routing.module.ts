import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect empty path to '/home'
  {
    path: 'home', component: HomePageComponent, children: [
      { path: '', redirectTo: 'landing-page', pathMatch: 'full' },
      { path: 'landing-page', component: LandingPageComponent }
    ]
  }, // HomePage route
  // Add more routes here as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
