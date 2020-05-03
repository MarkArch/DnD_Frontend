import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { GridComponent } from './views/main/grid/grid.component';
import { HomeComponent } from './views/main/home/home.component';
import { CampaignSelectComponent } from './views/campaign-select/campaign-select.component';
import { NewCharacterComponent } from './views/new-character/new-character.component';
import { DungeonComponent } from './views/main/dungeon/dungeon.component';
import { ResetPassComponent} from './views/reset-pass/reset-pass.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: 'resetPass',
    component: ResetPassComponent,
    data: {
      title: 'Reset Password'
    }
  },
  {
    path: 'campaign',
    component: CampaignSelectComponent,
    data: {
      title: 'Campaign page'
    }
  }, 
  { path: 'newCharacter', 
    component: NewCharacterComponent, 
    data: { 
      title: 'Character name' 
    } 
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'dashboard'
    },
    children: [
      {
        path: '',
        loadChildren: './views/main/main.module#MainModule'
      },
    ]
  },
  {
    path: '**',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
