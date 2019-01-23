import { Component, OnInit } from '@angular/core';
import { RestServiceService } from '../../../shared/rest-service.service';
import { SharedVariableService } from '../../../shared/shared-variable.service';
import { character } from '../../../class/character';

@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.scss']
})
export class SheetComponent implements OnInit {
character:character= new character();
strenghtModifier: number;
dexterityModifier: number;
constitutionModifier: number;
intelligenceModifier: number;
weasdomModifier: number;
charismaModifier: number;
  constructor(public httpServ: RestServiceService,public shared:SharedVariableService) { 
    this.character=this.shared.character;
    this.strenghtModifier=Math.floor((this.character.strenght -10)/2);
    this.dexterityModifier=Math.floor((this.character.dexterity -10)/2);
    this.constitutionModifier=Math.floor((this.character.constitution -10)/2);
    this.intelligenceModifier=Math.floor((this.character.intelligence -10)/2);
    this.weasdomModifier=Math.floor((this.character.weasdom -10)/2);
    this.charismaModifier=Math.floor((this.character.charisma -10)/2);
  }

  ngOnInit() {
    this.httpServ.isLoggedIn().subscribe(res => console.log(res));
    this.httpServ.campaignChosed().subscribe(res => console.log(res));
  }
  onChangeAttribute(name: String, value: String) {
    this.httpServ.updatePg(name, value).subscribe();
  }
onSave(){
  this.onChangeAttribute("strenght",this.character.strenght.toString());
  this.onChangeAttribute("dexterity",this.character.dexterity.toString());
  this.onChangeAttribute("constitution",this.character.constitution.toString());
  this.onChangeAttribute("intelligence",this.character.intelligence.toString());
  this.onChangeAttribute("weasdom",this.character.weasdom.toString());
  this.onChangeAttribute("charisma",this.character.charisma.toString());
  this.onChangeAttribute("armorClass",this.character.armorClass.toString());
  this.onChangeAttribute("speed",this.character.speed.toString());
  this.onChangeAttribute("hp",this.character.hp.toString());
  this.onChangeAttribute("current_hp",this.character.current_hp.toString());
  this.onChangeAttribute("charName",this.character.charName.toString());
}
}
