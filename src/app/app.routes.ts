import { Routes } from '@angular/router';

export const routes: Routes = [
    { 
        path: '',
        redirectTo: 'home' ,
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent: () => import('./components/home/home.component').then((m) => m.HomeComponent),
        title: 'Home',
    },
    {
        path: 'about',
        loadComponent: () => import('./components/about/about.component').then((m) => m.AboutComponent),
        title: 'About',
    },
    {
        path: 'skills',
        loadComponent: () => import('./components/skills/skills.component').then((m) => m.SkillsComponent),
        title: 'Skills',
    },
    {
        path: 'education',
        loadComponent: () => import('./components/education/education.component').then((m) => m.EducationComponent),
        title: 'Education',
    },
    {
        path: 'experience',
        loadComponent: () => import('./components/experience/experience.component').then((m) => m.ExperienceComponent),
        title: 'Experience',
    },
    {
        path: 'projects',
        loadComponent: () => import('./components/projects/projects.component').then((m) => m.ProjectsComponent),
        title: 'Projects',
    },
];
