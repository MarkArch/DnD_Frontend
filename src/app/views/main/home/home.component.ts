import { Component } from '@angular/core';
import { HeaderChangeService } from '../../../shared/header-change.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {

    constructor(private headserv: HeaderChangeService) { }

    
}
