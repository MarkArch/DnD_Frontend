import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { GridComponent } from './grid/grid.component';
import { DiaryComponent } from './diary/diary.component';
import { SheetComponent } from './sheet/sheet.component';
import { AuthGuardService } from '../../shared/auth-guard.service';
import { DungeonComponent } from './dungeon/dungeon.component';
import { VideoChatComponent } from './video-chat/video-chat.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'grid',
    component: GridComponent,
  },
  {
    path: 'diary',
    component: DiaryComponent,
  },
  {
    path: 'sheet',
    //  canActivate: [AuthGuardService],
    component: SheetComponent,
  }, {
    path: 'dungeon',
    component: DungeonComponent
  },
  {
    path:'video_chat',
    component: VideoChatComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
