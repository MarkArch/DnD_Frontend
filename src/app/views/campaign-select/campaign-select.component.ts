import { Component, OnInit, TemplateRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { postlogin } from '../../class/postlogin';
import { SharedVariableService } from '../../shared/shared-variable.service';
import { sessionEnum } from '../../class/sessionEnum';
import { RestServiceService } from '../../shared/rest-service.service';
import { character } from '../../class/character';

@Component({
  selector: 'app-campaign-select',
  templateUrl: './campaign-select.component.html',
  styleUrls: ['./campaign-select.component.scss']
})
export class CampaignSelectComponent implements OnInit, OnDestroy {

  constructor(public route: ActivatedRoute, public router: Router, public modalService: BsModalService, private shared: SharedVariableService,private service:RestServiceService) { }

  public accounts: postlogin[] = [];
  public currentAccount: postlogin[]=[];
  public sessions: sessionEnum[] = [];
  modalRef: BsModalRef;
  ngOnInit() {
    this.service.accounts().subscribe(res=>{let i = 0;
      while (res[i] != null) {
        let account: postlogin=new postlogin();
        account.alive = res[i].alive;
        account.charName = res[i].charName;
        account.session_id = res[i].session_id;
        account.session_master = res[i].session_master;
        account.session_name = res[i].session_name;
        this.accounts.push(account);
        i = i + 1;
      };
      this.stronzo();},err=>{this.router.navigate(['/login']);alert("You have to login first")});
    

  }
  public stronzo() {
    for (let account of this.accounts) {
      let session: sessionEnum = new sessionEnum(account.session_id, account.session_master, account.session_name);
      this.sessions.push(session);
    }
    console.log(this.sessions);
    for(let i=0;i<this.sessions.length-1;i++){
      if(this.sessions[i].session_id==this.sessions[i+1].session_id){
        this.sessions.splice(i,1);
        i=i-1;
      }
    }
  }
  onSelectCharacter(charName:String,session_id:number) {
    console.log(charName);
    console.log(session_id);
    this.service.chooseCharacter(charName,session_id).subscribe((res)=>{this.shared.character=res;
    this.router.navigate(['/dashboard']);
    });
  }

  openModal(template: TemplateRef<any>,session_id:number) {
    this.currentAccount=[];
    for(let account of this.accounts){
      if(account.session_id==session_id){
        this.currentAccount.push(account);
      }
    }
    this.modalRef = this.modalService.show(template);
  }
  onNewSession(){
    console.log("New session dialog");
  }
  onNewCharacter(){
    console.log("New character sheet")
  }

  ngOnDestroy() {
    //this.modalRef.hide();
  }

}
