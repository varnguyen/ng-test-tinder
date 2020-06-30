import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent, NotFoundComponent, FavoriteListComponent } from './pages/components';


const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'favorite-list', component: FavoriteListComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'not-found', component: NotFoundComponent },
    { path: '**', redirectTo: 'not-found' }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
