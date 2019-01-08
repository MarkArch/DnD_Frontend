import { Component, OnInit, ViewChild, ElementRef, HostBinding } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations'
import { AnimationBuilder, AnimationPlayer } from '@angular/animations';
import { SharedVariableService } from '../../../shared/shared-variable.service';
import { character } from '../../../class/character';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { RestServiceService } from '../../../shared/rest-service.service';
import { grid } from '../../../class/grid';
// import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  animations: [
    trigger('gridAnimation', [
      state('4', style({
        width: '60px',
        height: '60px',
        minWidth: '60px',
        minHeight: '60px'
      })),
      state('3', style({
        width: '50px',
        height: '50px',
        minWidth: '50px',
        minHeight: '50px'
      })),
      state('2', style({
        width: '40px',
        height: '40px',
        minWidth: '40px',
        minHeight: '40px'
      })),
      state('1', style({
        width: '30px',
        height: '30px',
        minWidth: '30px',
        minHeight: '30px'
      })),
      transition('4 <=> 3', []),
      transition('3 <=> 2', []),
      transition('2 <=> 1', [])
    ])
  ]
})

export class GridComponent implements OnInit {

  constructor(private shared: SharedVariableService, private cookie: CookieService, private router: Router, private service: RestServiceService) {
    if (this.shared.character == null) {
      this.router.navigate(['/login']);
    }
    this.service.getPositions().subscribe((res: grid[]) => {
    this.grid = res; console.log(this.grid); for (let position of this.grid) {
      if (position.charName == this.character.charName) {
        console.log("setto il personaggio attuale")
        this.charecterPosition.charName = position.charName;
        this.charecterPosition.x = position.x;
        this.charecterPosition.y = position.y;
      }
    }
    });
  }
  character: character;
  grid: grid[] = [];
  possibleMoves:grid[]=[];
  charecterPosition: grid=new grid();
  public gridSettingVisible = false;
  public tooltip = 'Current HP 37%';
  public gridDimension = 3;
  public x: number = 15;
  public y: number = 15;
  public yAxis = new Array<string>(this.y);
  public xAxis = new Array<string>(this.x);
  public diceArray = [{ name: 'd20.svg', type: 'd20', number: 1, value: 0 },
  { name: 'd12.svg', type: 'd12', number: 1, value: 0 },
  { name: 'd10.svg', type: 'd10', number: 1, value: 0 },
  { name: 'd8.svg', type: 'd8', number: 1, value: 0 },
  { name: 'd6.svg', type: 'd6', number: 1, value: 0 },
  { name: 'd4.svg', type: 'd4', number: 1, value: 0 },
  { name: 'dp.svg', type: 'd%', number: 1, value: 0 }];
  private charStats = ['For', 'Des', 'Cos', 'Int', 'Sag', 'Car'];
  public stats: { name: string, value: number, modifier: number, tempValue: number, totValue: number }[] = [];

  ngOnInit() {
    this.character = this.shared.character;
    console.log(this.character);
    this.statInitializer();

  }
  searchCharacterOnGrid(x, y): String {
    let i: number = 0;
    let a = "";
    this.grid.forEach(char => {
      if (char.x == x && char.y == y) {
        a = i.toString();
      }
      i = i + 1;
    });
    this.possibleMoves.forEach(char => {
      if (char.x == x && char.y == y) {
        a = "P";
      }
    });
    return a;
  }

  statInitializer() {
    this.stats.push({
      name: "Str",
      value: this.character.strenght,
      modifier: Math.floor((this.character.strenght - 10) / 2),
      tempValue: this.character.temporary_strenght,
      totValue: Math.floor((this.character.strenght + this.character.temporary_strenght - 10) / 2)
    });
    this.stats.push({
      name: "Con",
      value: this.character.constitution,
      modifier: Math.floor((this.character.constitution - 10) / 2),
      tempValue: this.character.temporary_constitution,
      totValue: Math.floor((this.character.constitution + this.character.temporary_constitution - 10) / 2)
    });
    this.stats.push({
      name: "Dex",
      value: this.character.dexterity,
      modifier: Math.floor((this.character.dexterity - 10) / 2),
      tempValue: this.character.temporary_dexterity,
      totValue: Math.floor((this.character.dexterity + this.character.temporary_dexterity - 10) / 2)
    });
    this.stats.push({
      name: "Int",
      value: this.character.intelligence,
      modifier: Math.floor((this.character.intelligence - 10) / 2),
      tempValue: this.character.temporary_intelligence,
      totValue: Math.floor((this.character.intelligence + this.character.temporary_intelligence - 10) / 2)
    });
    this.stats.push({
      name: "Wea",
      value: this.character.weasdom,
      modifier: Math.floor((this.character.weasdom - 10) / 2),
      tempValue: this.character.temporary_weasdom,
      totValue: Math.floor((this.character.weasdom + this.character.temporary_weasdom - 10) / 2)
    });
    this.stats.push({
      name: "Cha",
      value: this.character.charisma,
      modifier: Math.floor((this.character.charisma - 10) / 2),
      tempValue: this.character.temporary_charisma,
      totValue: Math.floor((this.character.charisma + this.character.temporary_charisma - 10) / 2)
    });
  }



  onTempModify(i) {
    this.stats[i].totValue = Math.floor((this.stats[i].value + this.stats[i].tempValue - 10) / 2);
  }

  onDiceThrow(i) {
    let temp = 0;
    switch (i) {
      case 0: {
        for (let k = 0; k < this.diceArray[i].number; k++) {
          temp += Math.ceil(Math.random() * 20);
        }
        this.diceArray[i].value = temp;
        break;
      }
      case 1: {
        for (let k = 0; k < this.diceArray[i].number; k++) {
          temp += Math.ceil(Math.random() * 12);
        }
        this.diceArray[i].value = temp;
        break;
      }
      case 2: {
        for (let k = 0; k < this.diceArray[i].number; k++) {
          temp += Math.ceil(Math.random() * 10);
        }
        this.diceArray[i].value = temp;
        break;
      }
      case 3: {
        for (let k = 0; k < this.diceArray[i].number; k++) {
          temp += Math.ceil(Math.random() * 8);
        }
        this.diceArray[i].value = temp;
        break;
      }
      case 4: {
        for (let k = 0; k < this.diceArray[i].number; k++) {
          temp += Math.ceil(Math.random() * 6);
        }
        this.diceArray[i].value = temp;
        break;
      }
      case 5: {
        for (let k = 0; k < this.diceArray[i].number; k++) {
          temp += Math.ceil(Math.random() * 4);
        }
        this.diceArray[i].value = temp;
        break;
      }
      case 6: {
        for (let k = 0; k < this.diceArray[i].number; k++) {
          temp += Math.ceil(Math.random() * 100);
        }
        this.diceArray[i].value = temp;
        break;
      }
    }
  }

  onDiceReset(i) {
    switch (i) {
      case 0: {
        this.diceArray[i].value = 0;
        this.diceArray[i].number = 1;
        break;
      }
      case 1: {
        this.diceArray[i].value = 0;
        this.diceArray[i].number = 1;
        break;
      }
      case 2: {
        this.diceArray[i].value = 0;
        this.diceArray[i].number = 1;
        break;
      }
      case 3: {
        this.diceArray[i].value = 0;
        this.diceArray[i].number = 1;
        break;
      }
      case 4: {
        this.diceArray[i].value = 0;
        this.diceArray[i].number = 1;
        break;
      }
      case 5: {
        this.diceArray[i].value = 0;
        this.diceArray[i].number = 1;
        break;
      }
      case 6: {
        this.diceArray[i].value = 0;
        this.diceArray[i].number = 1;
        break;
      }
    }
  }
  onGridInit() {
    this.xAxis = new Array<string>(this.x);
    this.yAxis = new Array<string>(this.y);
  }

  onShowGridSettings() {
    this.gridSettingVisible = !this.gridSettingVisible;
  }
  onGridClick(x, y) {
    if (this.charecterPosition.x == x && this.charecterPosition.y == y) {
      console.log("ho premuto sul mio personaggio");
      this.service.getPossibleMoves(this.character.speed.toString()).subscribe((res:grid[])=>{this.possibleMoves=res});
    }
  }

}
