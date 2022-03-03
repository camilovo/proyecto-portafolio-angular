// importar los modulos del router de angular
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';

//Importar componentres 
import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CreateComponent } from './components/create/create.component';
import { ContactComponent } from './components/contact/contact.component';
import { DetailsComponent } from './components/details/details.component';
import { ErrorComponent } from './components/error/error.component';
import { EditComponent} from './components/edit/edit.component';


// array de rutas
const appRoutes: Routes = [
    {path: '', component: AboutComponent},
    {path: 'sobre-mi', component: AboutComponent},
    {path: 'proyectos', component: ProjectsComponent},
    {path: 'crear', component: CreateComponent},
    {path: 'contacto', component: ContactComponent},
    {path: 'proyecto/:id', component: DetailsComponent},
    {path: 'editar-proyecto/:id', component: EditComponent},
    {path: '**', component: ErrorComponent}

];

//exportar el modulo del router
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<Route> = RouterModule.forRoot(appRoutes);