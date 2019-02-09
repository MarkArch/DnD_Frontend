import { Component } from '@angular/core';
import { HeaderChangeService } from '../../../shared/header-change.service';
import { SharedVariableService } from '../../../shared/shared-variable.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RestServiceService } from '../../../shared/rest-service.service';
import { postlogin } from '../../../class/postlogin';
import { FileUploader } from 'ng2-file-upload';
import { userlogin } from '../../../class/userlogin';

const URL = 'http://93.55.227.222:9001/DeDManager/upload';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {

    constructor(private headserv: HeaderChangeService, private shared: SharedVariableService, private sanitizer: DomSanitizer, private rest: RestServiceService) {

        this.rest.chooseCharacter('', 0).subscribe(res => {
            this.shared.character = res; console.log(res);

            this.map = '/assets/img/map' + this.shared.character.session_id + ".jpg";
            this.rest.getImage(this.shared.character.ref_username, this.shared.character.charName, this.shared.character.session_id).subscribe((res: any) =>
                this.image = '/assets/img/' + this.shared.character.ref_username + '_' + this.shared.character.charName + '_' + this.shared.character.session_id + ".PNG",
                (err: any) => this.image = '/assets/img/no_img.PNG');
            this.rest.accounts().subscribe((res: postlogin[]) => {
                res.forEach(r => { if (r.session_id == this.shared.character.session_id) { this.sessionName = r.session_name } });
                this.rest.getCharacterList().subscribe(res => { this.characterList = res });
            });
            this.rest.getUsersList().subscribe((res: String[]) => this.usersList = res);
        })

    }
    url: string = "";
    image: SafeResourceUrl;
    sessionName: String = '';
    map: string = "";
    characterList: any;
    largeImage = false;
    uploader: FileUploader = new FileUploader({ url: URL });
    usersList: String[] = [];
    searchedUsers: String[] = [''];
    onSearch(value) {
        this.searchedUsers = [''];
        if (value != '') {  
            this.searchedUsers = [];          
            this.usersList.forEach(user => {
                if (user.toLowerCase().includes(value.toLowerCase())) {
                    this.searchedUsers.push(user)
                }
            });
            console.log(this.searchedUsers)
        }
    }
    onCharacterInvite(username){
        let a :userlogin[]=[new userlogin(username,'','')];
        this.rest.invitePLayer(a).subscribe(res=>console.log(res));
    }
}
