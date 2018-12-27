import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { HomeComponent } from './home/home.component';
import { MainRoutingModule } from './main-routing.module';
import { GridComponent } from './grid/grid.component';

@NgModule({
  imports: [
    FormsModule,
    MainRoutingModule,
    CommonModule,
    TabsModule.forRoot(),
    TooltipModule.forRoot()
  ],
  declarations: [ 
    HomeComponent, 
    GridComponent ]
})
export class MainModule { }
