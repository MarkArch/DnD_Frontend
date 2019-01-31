import { Component, OnInit } from '@angular/core';
import { RestServiceService } from '../../../shared/rest-service.service';
import { SharedVariableService } from '../../../shared/shared-variable.service';
import { character } from '../../../class/character';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Input } from '../../../class/input';
import { PDFAnnotationData } from 'pdfjs-dist';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sheet',
  templateUrl: 'sheet.component.html',
  styleUrls: ['sheet.component.scss']
})
export class SheetComponent implements OnInit {
  character: character = new character();
  strenghtModifier: number;
  dexterityModifier: number;
  constitutionModifier: number;
  intelligenceModifier: number;
  weasdomModifier: number;
  charismaModifier: number;
  pdfSrc = '/assets/pdf/TWC-DnD-5E-Character-Sheet-v1.3.pdf';
  readonly dpiRatio = 96 / 72;
  public myForm: FormGroup;
  public inputList: Input[] = [];
  loadEnded = false;
  validInput: String[] = ["ClassLevel",
    "PlayerName",
    "Alignment",
    "STR",
    "DEX",
    "CON",
    "INT",
    "WIS",
    "CHA",
    "Inspiration",
    "ProfBonus", "AC", "Initiative",
    "Speed",
    "HPMax",
    "HPCurrent",
     "HD"];
  validLabel: String[] = [
    "CharacterName",
    "STRmod",
    "DEXmod ",
    "CONmod",
    "INTmod",
    "WISmod",
    "CHamod",];
  inputToBeSet: String[] = ["Background", "Race ", "XP","HPTemp",]
  constructor(public httpServ: RestServiceService, public shared: SharedVariableService, private _fb: FormBuilder, private toastr: ToastrService) {
    this.httpServ.chooseCharacter("", 0).subscribe(res => {
      this.shared.character = res; this.character = this.shared.character;
    });
    this.strenghtModifier = Math.floor((this.character.strenght - 10) / 2);
    this.dexterityModifier = Math.floor((this.character.dexterity - 10) / 2);
    this.constitutionModifier = Math.floor((this.character.constitution - 10) / 2);
    this.intelligenceModifier = Math.floor((this.character.intelligence - 10) / 2);
    this.weasdomModifier = Math.floor((this.character.weasdom - 10) / 2);
    this.charismaModifier = Math.floor((this.character.charisma - 10) / 2);
    this.myForm = this._fb.group({});
  }

  ngOnInit() {
    this.httpServ.isLoggedIn().subscribe(res => console.log(res));
    this.httpServ.campaignChosed().subscribe(res => console.log(res));
  }
  onChangeAttribute(name: String, value: String) {
    this.httpServ.updatePg(name, value).subscribe();
  }
  onSave() {
    this.httpServ.multipleUpdateOnPg(this.character).subscribe(res => { this.shared.character = this.character, this.toastr.success('Your update was successful') }, err => { this.toastr.error('There was an error while trying to process your request, please try again later') });
  }
  loadComplete(pdf: PDFDocumentProxy): void {
    this.loadEnded = true;
    for (let i = 1; i <= pdf.numPages; i++) {

      // track the current page
      let currentPage = null;
      pdf.getPage(i).then(p => {
        currentPage = p;

        // get the annotations of the current page
        return p.getAnnotations();
      }).then(ann => {

        // ugly cast due to missing typescript definitions
        // please contribute to complete @types/pdfjs-dist
        const annotations = (<any>ann) as PDFAnnotationData[];
        let i = 0;
        annotations
          .filter(a => a.subtype === 'Widget') // get the form field annotation only
          .forEach(a => {
            // get the rectangle that represent the single field
            // and resize it according to the current DPI
            const fieldRect = currentPage.getViewport(this.dpiRatio)
              .convertToViewportRectangle(a.rect);

            // add the corresponding input
            this.addInput(a, fieldRect);
          });
      });
    }
  }
  private createInput(annotation: PDFAnnotationData, rect: number[] = null) {
    let formControl = new FormControl(annotation.buttonValue || '');

    const input = new Input();
    input.name = annotation.fieldName;

    if (annotation.fieldType === 'Tx') {
      input.type = 'text';
      input.value = annotation.buttonValue || '';
    }

    // Calculate all the positions and sizes
    if (rect) {
      input.top = rect[1] - (rect[1] - rect[3]);
      input.left = rect[0];
      input.height = (rect[1] - rect[3]);
      input.width = (rect[2] - rect[0]);
    }

    this.inputList.push(input);
    return formControl;
  }

  private addInput(annotation: PDFAnnotationData, rect: number[] = null): void {
    // add input to page
    this.myForm.addControl(annotation.fieldName, this.createInput(annotation, rect));
  }
  public getInputPosition(input: Input): any {
    return {
      top: `${input.top}px`,
      left: `${input.left}px`,
      height: `${input.height}px`,
      width: `${input.width}px`,
    };
  }
  validateInput(name: String) {
    return this.validInput.includes(name);
  }
  validateLabel(name: String) {
    return this.validLabel.includes(name);
  }
  inputValue(name: String, i: Input) {
    if (name == "CharacterName")
      return this.character.charName
    else if (name == "ClassLevel") {
      if (this.character.level > 0 && this.character.class1 != '') {
        return i.value = this.character.class1 + " " + this.character.level;
      } else {
        return i.value = this.character.class1
      }
    }
    else if (name == "PlayerName") return i.value = this.character.ref_username;
    // else if (name == "Race ") return i.value = this.character.class1;
    else if (name == "Alignment") return i.value = this.character.alignament;
    //else if( name=="XP") return i.value=this.character.
    else if (name == "STR") return i.value = this.character.strenght;
    else if (name == "DEX") return i.value = this.character.dexterity;
    else if (name == "CON") return i.value = this.character.constitution;
    else if (name == "INT") return i.value = this.character.intelligence;
    else if (name == "WIS") return i.value = this.character.weasdom;
    else if (name == "CHA") return i.value = this.character.charisma;
    else if (name == "Inspiration") return i.value = this.character.inspiration;
    else if (name == "ProfBonus") return i.value = this.character.proficiencyBonus;
    else if (name == "AC") return i.value = this.character.armorClass;
    else if (name == "Initiative") return i.value = this.character.initiative;
    else if (name == "Speed") return i.value = this.character.speed;
    else if (name == "HPMax") return i.value = this.character.hp;
    else if (name == "HPCurrent") return i.value = this.character.current_hp;
    //else if( name=="HPTemp") return i.value=this.character.
    else if (name == "HD") return i.value = this.character.hit_dice;
    else if (name == "STRmod") return Math.floor((this.character.strenght - 10) / 2);
    else if (name == "DEXmod ") return Math.floor((this.character.dexterity - 10) / 2);
    else if (name == "CONmod") return Math.floor((this.character.constitution - 10) / 2);
    else if (name == "INTmod") return Math.floor((this.character.intelligence - 10) / 2);
    else if (name == "WISmod") return Math.floor((this.character.weasdom - 10) / 2);
    else if (name == "CHamod") return Math.floor((this.character.charisma - 10) / 2);
  }
  onChangeAttributeValue(name, value) {
    if (name == "CharacterName")
      this.character.charName = this.myForm.get("CharacterName").value;
    else if (name == "ClassLevel") {
      if (value.includes(" ")) {
        this.character.class1 = (this.myForm.get("ClassLevel").value as string).substring(0, (this.myForm.get("ClassLevel").value as string).indexOf(" "));
        this.character.level = +((this.myForm.get("ClassLevel").value as string).substring((this.myForm.get("ClassLevel").value as String).indexOf(" ") + 1));
      } else {
        this.character.class1 = this.myForm.get("ClassLevel").value;
      }
    }
    else if (name == "PlayerName") this.character.ref_username = this.myForm.get("PlayerName").value;
    //else if (name == "Race ") this.character.class1 = this.myForm.get("Race").value;
    else if (name == "Alignment") this.character.alignament = this.myForm.get("Alignment").value;
    //else if( name=="XP") this.character.
    else if (name == "STR") this.character.strenght = this.myForm.get("STR").value;
    else if (name == "DEX") this.character.dexterity = this.myForm.get("DEX").value;
    else if (name == "CON") this.character.constitution = this.myForm.get("CON").value;
    else if (name == "INT") this.character.intelligence = this.myForm.get("INT").value;
    else if (name == "WIS") this.character.weasdom = this.myForm.get("WIS").value;
    else if (name == "CHA") this.character.charisma = this.myForm.get("CHA").value;
    else if (name == "Inspiration") this.character.inspiration = this.myForm.get("Inspiration").value;
    else if (name == "ProfBonus") this.character.proficiencyBonus = this.myForm.get("ProfBonus").value;
    else if (name == "AC") this.character.armorClass = this.myForm.get("AC").value;
    else if (name == "Initiative") this.character.initiative = this.myForm.get("Initiative").value;
    else if (name == "Speed") this.character.speed = this.myForm.get("Speed").value;
    else if (name == "HPMax") this.character.hp = this.myForm.get("HPMax").value;
    else if (name == "HPCurrent") this.character.current_hp = this.myForm.get("HPCurrent").value;
    //else if( name=="HPTemp") this.character.
    else if (name == "HD") this.character.hit_dice = this.myForm.get("HD").value;
  }
  onDiscard(){
    this.httpServ.chooseCharacter('',0).subscribe(res=>{this.character=res;this.toastr.success('Your character has been restored')})
  }
}
