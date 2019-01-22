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

  constructor(private shared: SharedVariableService, private cookie: CookieService, private router: Router, private service: RestServiceService, private shareVariable: SharedVariableService) {
    if (this.shared.character == null) {
      this.service.chooseCharacter("", 0).subscribe(res => {
        this.shared.character = res; this.character = this.shared.character;
        this.service.getPositions().subscribe((res: grid[]) => {
          this.grid = res; for (let position of this.grid) {
            if (position.charName == this.character.charName) {
              this.charecterPosition.charName = position.charName;
              this.charecterPosition.x = position.x;
              this.charecterPosition.y = position.y;
            }
          }
          this.syncroPositions();
        });
        this.statInitializer();
        this.service.getCharacterList().subscribe(res => {
          console.log("informazioni pg");
          console.log(res);
          this.sessionPlayers = res;
          this.sessionPlayers.forEach(p => {
            this.tooltip.push("Current HP " + (p.current_hp / p.hp * 100).toFixed(2) + "%");
            this.inModify.push(false);
            this.inGrid.push(false);
            this.isFriend.push(false);
          })
          this.service.getTurn().subscribe(res => {
            this.turn = +res;
            while (this.turn >= this.sessionPlayers.length) {
              this.turn = this.turn - this.sessionPlayers.length;
            }
            this.syncroTurn();
            this.syncroCharacter();
            this.syncroDice();
            this.syncroPing();
          })
        });
      }, err => this.router.navigate(['/campaign']));
    } else {
      this.character = this.shared.character; this.service.getPositions().subscribe((res: grid[]) => {
        this.grid = res; for (let position of this.grid) {
          if (position.charName == this.character.charName) {
            this.charecterPosition.charName = position.charName;
            this.charecterPosition.x = position.x;
            this.charecterPosition.y = position.y;
          }
        }
        this.syncroPositions();
      });
      this.statInitializer();
      this.service.getCharacterList().subscribe(res => {
        console.log("informazioni pg");
        console.log(res)
        this.sessionPlayers = res;
        this.sessionPlayers.forEach(p => {
          this.tooltip.push("Current HP " + (p.current_hp / p.hp * 100).toFixed(2) + "%");
          this.inModify.push(false);
          this.inGrid.push(false);
          this.isFriend.push(false);
        })
        this.service.getTurn().subscribe(res => {
          this.turn = +res;
          while (this.turn >= this.sessionPlayers.length) {
            this.turn = this.turn - this.sessionPlayers.length;
          }
          this.syncroTurn();
          this.syncroCharacter();
          this.syncroDice();
          this.syncroPing();
        })
      });
    }
  }

  public diceThrow;
  settingOnGrid = false;
  isMasterSession = false;
  turn: number = 0;
  sessionPlayers: any;
  character: character;
  grid: grid[] = [];
  possibleMoves: grid[] = [];
  charecterPosition: grid = new grid();
  ping: grid = { charName: "", x: 99, y: 99 };
  public isFriend = [];
  public inModify = [];
  public inGrid = [];
  public gridSettingVisible = false;
  public tooltip: any[] = [];
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
  public stats: { name: string, value: number, modifier: number, tempValue: number, totValue: number, savingThrow: number }[] = [];




  ngOnInit() {
    if (this.shareVariable.sessionMaster === this.character.ref_username) {
      this.isMasterSession = true;
    }
  }

  onNextTurn() {
    if (this.inModify[this.turn] === false) {
      this.service.getNextTurn().subscribe((res: number) => {
        this.turn = res; while (this.turn >= this.sessionPlayers.length) {
          this.turn = this.turn - this.sessionPlayers.length;
        }
      });
    }
  }
  syncroPositions() {
    this.service.syncroPositions().subscribe((res: grid[]) => {
      this.grid = [];
      this.grid = res; for (let position of this.grid) {
        if (position.charName == this.character.charName) {
          this.charecterPosition.charName = position.charName;
          this.charecterPosition.x = position.x;
          this.charecterPosition.y = position.y;
        }
      }
      this.syncroPositions();
    });
  }
  searchCharacterOnGrid(x, y): String {
    let a = "";
    this.grid.forEach(char => {
      if (char.x == x && char.y == y) {
        for (let i in this.sessionPlayers) {
          if (this.sessionPlayers[i].charName == char.charName) {
            a = this.sessionPlayers[i].gridNumber;
            if (this.sessionPlayers[i].dexterity > 0) {
              this.isFriend[i] = true;
            }
          }
        }
      }
    });
    this.possibleMoves.forEach(char => {
      if (char.x == x && char.y == y) {
        a = "P";
      }
    });
    return a;
  }

  onCheckFriend(x, y): boolean {
    let a = false;
    this.grid.forEach(char => {
      if (char.x == x && char.y == y) {
        for (let i in this.sessionPlayers) {
          if (this.sessionPlayers[i].charName == char.charName) {
            if (this.sessionPlayers[i].dexterity > 0) {
              a = true;
            }
          }
        }
      }

    });
    return a;
  }
  syncroCharacter() {
    this.service.getSyncroCharacterList().subscribe(res => {
      console.log('syncroturn' + this.turn);
      console.log("informazioni pg");
      this.sessionPlayers = res;
      this.tooltip = [];
      this.sessionPlayers.forEach(p => {
        this.tooltip.push("Current HP " + (p.current_hp / p.hp * 100).toFixed(2) + "%");
        this.inModify.push(false);
      })
      this.syncroCharacter()
    });
  }

  syncroTurn() {
    this.service.getSyncroTurn().subscribe(res => {
      this.turn = +res;
      while (this.turn >= this.sessionPlayers.length) {
        this.turn = this.turn - this.sessionPlayers.length;
      }
      this.syncroTurn()
    });
  }

  statInitializer() {
    this.stats.push({
      name: "Strenght",
      value: this.character.strenght,
      modifier: Math.floor((this.character.strenght - 10) / 2),
      tempValue: this.character.temporary_strenght,
      totValue: Math.floor((this.character.strenght + this.character.temporary_strenght - 10) / 2),
      savingThrow: this.character.savingThrow_strenght
    });
    this.stats.push({
      name: "Constitution",
      value: this.character.constitution,
      modifier: Math.floor((this.character.constitution - 10) / 2),
      tempValue: this.character.temporary_constitution,
      totValue: Math.floor((this.character.constitution + this.character.temporary_constitution - 10) / 2),
      savingThrow: this.character.savingThrow_constitution
    });
    this.stats.push({
      name: "Dexterity",
      value: this.character.dexterity,
      modifier: Math.floor((this.character.dexterity - 10) / 2),
      tempValue: this.character.temporary_dexterity,
      totValue: Math.floor((this.character.dexterity + this.character.temporary_dexterity - 10) / 2),
      savingThrow: this.character.savingThrow_dexterity
    });
    this.stats.push({
      name: "Intelligence",
      value: this.character.intelligence,
      modifier: Math.floor((this.character.intelligence - 10) / 2),
      tempValue: this.character.temporary_intelligence,
      totValue: Math.floor((this.character.intelligence + this.character.temporary_intelligence - 10) / 2),
      savingThrow: this.character.savingThrow_intelligence
    });
    this.stats.push({
      name: "Weasdom",
      value: this.character.weasdom,
      modifier: Math.floor((this.character.weasdom - 10) / 2),
      tempValue: this.character.temporary_weasdom,
      totValue: Math.floor((this.character.weasdom + this.character.temporary_weasdom - 10) / 2),
      savingThrow: this.character.savingThrow_weasdom
    });
    this.stats.push({
      name: "Charisma",
      value: this.character.charisma,
      modifier: Math.floor((this.character.charisma - 10) / 2),
      tempValue: this.character.temporary_charisma,
      totValue: Math.floor((this.character.charisma + this.character.temporary_charisma - 10) / 2),
      savingThrow: this.character.savingThrow_charisma
    });
  }

  onChangeAttribute(name: String, value: String) {
    this.service.updatePg(name, value).subscribe();
  }

  onTempModify(i) {
    this.service.updatePg("temporary_" + this.stats[i].name.toLowerCase(), this.stats[i].tempValue.toString()).subscribe();
    this.stats[i].totValue = Math.floor((this.stats[i].value + this.stats[i].tempValue - 10) / 2);
  }

  onDiceThrow(i) {
    let temp = 0;
    this.diceArray[i].number = 1;
    switch (i) {
      case 0: {
        for (let k = 0; k < this.diceArray[i].number; k++) {
          temp += Math.ceil(Math.random() * 20);
        }
        this.diceArray[i].value = temp;
        this.service.throwDice("d20", this.diceArray[i].value).subscribe();
        break;
      }
      case 1: {
        for (let k = 0; k < this.diceArray[i].number; k++) {
          temp += Math.ceil(Math.random() * 12);
        }
        this.diceArray[i].value = temp;
        this.service.throwDice("d12", this.diceArray[i].value).subscribe();
        break;
      }
      case 2: {
        for (let k = 0; k < this.diceArray[i].number; k++) {
          temp += Math.ceil(Math.random() * 10);
        }
        this.diceArray[i].value = temp;
        this.service.throwDice("d10", this.diceArray[i].value).subscribe();
        break;
      }
      case 3: {
        for (let k = 0; k < this.diceArray[i].number; k++) {
          temp += Math.ceil(Math.random() * 8);
        }
        this.diceArray[i].value = temp;
        this.service.throwDice("d8", this.diceArray[i].value).subscribe();
        break;
      }
      case 4: {
        for (let k = 0; k < this.diceArray[i].number; k++) {
          temp += Math.ceil(Math.random() * 6);
        }
        this.diceArray[i].value = temp;
        this.service.throwDice("d6", this.diceArray[i].value).subscribe();
        break;
      }
      case 5: {
        for (let k = 0; k < this.diceArray[i].number; k++) {
          temp += Math.ceil(Math.random() * 4);
        }
        this.diceArray[i].value = temp;
        this.service.throwDice("d4", this.diceArray[i].value).subscribe();
        break;
      }
      case 6: {
        for (let k = 0; k < this.diceArray[i].number; k++) {
          temp += Math.ceil(Math.random() * 100);
        }
        this.diceArray[i].value = temp;
        this.service.throwDice("d%", this.diceArray[i].value).subscribe();
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
  onGridClick(x, y, cell) {
    if (this.charecterPosition.x == x && this.charecterPosition.y == y) {
      this.service.getPossibleMoves(this.character.speed.toString()).subscribe((res: grid[]) => { this.possibleMoves = res });
    } else if ((this.charecterPosition.x != x || this.charecterPosition.y != y) && cell.style.backgroundColor == 'silver') {
      this.service.movePg(x, y).subscribe();
      this.possibleMoves = [];
    } else if (this.settingOnGrid) {
      this.service.movePg(x, y).subscribe();
      for (let i = 0; i < this.inGrid.length; i++) {
        this.inGrid[i] = false;
      }
      this.settingOnGrid = false;
      this.possibleMoves = [];
    } else {
      this.service.pingGrid(x, y).subscribe();
    }
  }

  onResetNote() {
    let str = "";
    this.onChangeAttribute('note', str);
  }

  onEditInitiative(i, currChar) {
    if (this.character.charName === currChar) {
      this.inModify[i] = true;
    }
  }

  onSaveInitiative(i) {
    this.character.initiative = this.sessionPlayers[i].initiative;
    this.character.gridNumber = this.sessionPlayers[i].gridNumber;
    this.onChangeAttribute('initiative', this.character.initiative.toString());
    this.onChangeAttribute('gridNumber', this.character.gridNumber.toString());
    this.inModify[i] = false;
  }

  onArrange(i, currChar) {
    if (this.character.charName === currChar) {
      this.settingOnGrid = true;
      this.inGrid[i] = true;
    }
  }

  onAddNpc(name, init, gridNum) {
    let npc: character = new character();
    npc.charName = name;
    npc.initiative = init;
    npc.gridNumber = gridNum;
    npc.speed=9;
    npc.privilege='master';
    this.service.registerNpc(npc).subscribe();
  }
  syncroDice() {
    this.service.syncroDice().subscribe((res: any) => {
      this.diceThrow = res.ref_charName + " ha tirato un " + res.dice_type + " facendo un bel " + res.dice_value;
      this.syncroDice()
    });
  }

  onChangeChar(i) {
    if (this.character.privilege == 'master' && this.sessionPlayers[i].dexterity == 0) {
      this.service.chooseCharacter(this.sessionPlayers[i].charName, this.sessionPlayers[i].session_id).subscribe(res => {
        this.character = res;
        this.service.getPositions().subscribe((res: grid[]) => {
          this.grid = res; for (let position of this.grid) {
            if (position.charName == this.character.charName) {
              this.charecterPosition.charName = position.charName;
              this.charecterPosition.x = position.x;
              this.charecterPosition.y = position.y;
            }
          }
        });
      });
    }
  }

  syncroPing() {
    this.service.syncroPing().subscribe((res: grid) => {
      let a: grid = new grid();
      a.x = 99;
      a.y = 99;
      this.ping = res;
      setTimeout(() => {
        this.ping = a;
      }, 300);
      setTimeout(() => {
        this.ping = res;
      }, 600);
      setTimeout(() => {
        this.ping = a;
      }, 900);
      setTimeout(() => {
        this.ping = res;
      }, 1200);
      setTimeout(() => {
        this.ping = a;
      }, 1500);
      this.syncroPing();
    });


  }
}
