import { Component } from '@angular/core';
import { HeaderChangeService } from '../../../shared/header-change.service';
import { SharedVariableService } from '../../../shared/shared-variable.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {

    constructor(private headserv: HeaderChangeService,private shared:SharedVariableService, private sanitizer: DomSanitizer) {
        this.url="/assets/img/"+this.shared.character.ref_username+"_"+this.shared.character.charName+"_"+this.shared.character.session_id+".PNG";
        this.image = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
     }
url:string="";
image : SafeResourceUrl;
    
}
