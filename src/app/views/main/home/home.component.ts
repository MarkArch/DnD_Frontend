import { Component } from '@angular/core';
import { HeaderChangeService } from '../../../shared/header-change.service';
import { SharedVariableService } from '../../../shared/shared-variable.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RestServiceService } from '../../../shared/rest-service.service';
import { postlogin } from '../../../class/postlogin';
import { FileUploader } from 'ng2-file-upload';

const URL = 'http://localhost:8080/DeDManager/upload';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {

    constructor(private headserv: HeaderChangeService, private shared: SharedVariableService, private sanitizer: DomSanitizer, private rest: RestServiceService) {

        this.rest.chooseCharacter('', 0).subscribe(res => {
            this.shared.character = res; console.log(res);
            
            this.map='/assets/img/map'+this.shared.character.session_id+".jpg";
            if(this.rest.getImage(this.shared.character.ref_username,this.shared.character.charName,this.shared.character.session_id)<400){
                this.image ='/assets/img/'+this.shared.character.ref_username+'_'+this.shared.character.charName+'_'+this.shared.character.session_id+".PNG";
            }else{
                this.image='/assets/img/no_img.PNG'
            }
            this.rest.accounts().subscribe((res: postlogin[]) => {
                res.forEach(r => { if (r.session_id == this.shared.character.session_id) { this.sessionName = r.session_name } });
                this.rest.getCharacterList().subscribe(res => { this.characterList = res });
            });
        })

    }
    url: string = "";
    image: SafeResourceUrl;
    sessionName: String = '';
    map: string = "";
    characterList: any;
    largeImage = false;
    uploader: FileUploader = new FileUploader({ url: URL });
}
