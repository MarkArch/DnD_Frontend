import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { HomeComponent } from './home/home.component';
import { MainRoutingModule } from './main-routing.module';
import { GridComponent } from './grid/grid.component';
import { SheetComponent } from './sheet/sheet.component';
import { DiaryComponent } from './diary/diary.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FileSelectDirective } from 'ng2-file-upload';
import { DungeonComponent } from './dungeon/dungeon.component';
import { VideoChatComponent } from './video-chat/video-chat.component';

@NgModule({
  imports: [
    FormsModule,
    MainRoutingModule,
    CommonModule,
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    CKEditorModule,
    PdfViewerModule,
    ReactiveFormsModule
  ],
  declarations: [
    HomeComponent,
    GridComponent, SheetComponent, DiaryComponent, FileSelectDirective,DungeonComponent, VideoChatComponent]
})
export class MainModule { }
