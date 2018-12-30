import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { HomeComponent } from './home/home.component';
import { MainRoutingModule } from './main-routing.module';
import { GridComponent } from './grid/grid.component';
import { SheetComponent } from './sheet/sheet.component';
import { DiaryComponent } from './diary/diary.component';

@NgModule({
  imports: [
    FormsModule,
    MainRoutingModule,
    CommonModule,
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    CKEditorModule
  ],
  declarations: [ 
    HomeComponent, 
    GridComponent, SheetComponent, DiaryComponent ]
})
export class MainModule { }
