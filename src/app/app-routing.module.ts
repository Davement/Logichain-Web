import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  //TEMP
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'locations'
  },

  // Location
  {
    path: 'locations',
    loadChildren: () => import('./pages/location/overview/location-overview.module').then(m => m.LocationOverviewModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
