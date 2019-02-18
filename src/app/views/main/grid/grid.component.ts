import { Component, OnInit, OnDestroy, ViewChild, ElementRef, HostBinding } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations'
import { AnimationBuilder, AnimationPlayer } from '@angular/animations';
import { SharedVariableService } from '../../../shared/shared-variable.service';
import { character } from '../../../class/character';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { RestServiceService } from '../../../shared/rest-service.service';
import { grid } from '../../../class/grid';
import { buff } from '../../../class/buff';
import { st } from '@angular/core/src/render3';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FileUploader } from 'ng2-file-upload';
import { timeout } from 'q';
import { postlogin } from '../../../class/postlogin';
import { sessionEnum } from '../../../class/sessionEnum';
// import { ChangeDetectorRef } from '@angular/core';

const URL = 'http://192.168.1.62:8080/DeDManager/upload';

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

export class GridComponent implements OnInit, OnDestroy {


  constructor(private shared: SharedVariableService, private cookie: CookieService, private router: Router, private service: RestServiceService, private shareVariable: SharedVariableService, private toastr: ToastrService) {
    this.service.chooseCharacter("", 0).subscribe(res => {
      this.service.accounts().subscribe((res: postlogin[]) => {
        this.accounts = res; console.log(this.accounts)
      });
      this.shared.character = res; this.character = this.shared.character;
      console.log(this.character);
      this.service.getPossibleViews("50").subscribe((res: grid[]) => {
        console.log("possible views", res),
          this.possibleViews = res;
        this.minX = this.possibleViews[0].x;
        this.minY = this.possibleViews[0].y;
        this.maxX = this.possibleViews[3].x;
        this.maxY = this.possibleViews[3].y;
      });
      this.x = +this.character.grid_dimension.substring(0, this.character.grid_dimension.indexOf(','));
      this.y = +this.character.grid_dimension.substring(this.character.grid_dimension.indexOf(',') + 1);
      this.onGridInit();
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
      this.service.getCharacterList().subscribe(res => {
        console.log("informazioni pg");
        console.log(res);
        this.sessionPlayers = res;
        this.sessionPlayers.forEach(p => {
          let healthStatus = '';
          if ((p.current_hp / p.hp) > 0.80) {
            healthStatus = 'Healthy'
          } else if ((p.current_hp / p.hp) > 0.50) {
            healthStatus = 'Quite healthy'
          } else if ((p.current_hp / p.hp) > 0.25) {
            healthStatus = 'Damaged'
          } else if ((p.current_hp / p.hp) > 0) {
            healthStatus = 'Really Damaged'
          } else {
            healthStatus = 'To the ground'
          };
          this.tooltip.push("Current HP: " + healthStatus);
          this.inGrid.push(false);
          this.isFriend.push(false);
        })
        this.service.getBuff().subscribe((res: buff[]) => {
          this.strenghtBuff = 0;
          this.dexterityBuff = 0;
          this.constitutionBuff = 0;
          this.weasdomBuff = 0;
          this.intelligenceBuff = 0;
          this.charismatBuff = 0;
          this.buffs = res; this.buffs.forEach(buff => {
            if (buff.usernameTo == this.character.charName) {
              if (buff.stat == 'Strenght')
                this.strenghtBuff = this.strenghtBuff + buff.intensity
              else if (buff.stat == 'Dexterity')
                this.dexterityBuff = this.dexterityBuff + buff.intensity
              else if (buff.stat == 'Constitution')
                this.constitutionBuff = this.constitutionBuff + buff.intensity
              else if (buff.stat == 'Intelligence')
                this.intelligenceBuff = this.intelligenceBuff + buff.intensity
              else if (buff.stat == 'Weasdom')
                this.weasdomBuff = this.weasdomBuff + buff.intensity
              else if (buff.stat == 'Charisma')
                this.charismatBuff = this.charismatBuff + buff.intensity
            }
          });
          this.statInitializer();
        });
        this.service.getTurn().subscribe(res => {
          this.turn = +res;
          while (this.turn >= this.sessionPlayers.length) {
            this.turn = this.turn - this.sessionPlayers.length;
          }

          this.syncroTurn();
          this.syncroCharacter();
          this.syncroDice();
          this.syncroPing();
          //  this.syncroBuff();
        });
      });
    }, err => this.router.navigate(['/campaign']));
    this.onDeadPlayer();
  }
  public diceThrow;
  public accounts: postlogin[] = [];
  public currentAccount: postlogin[] = [];
  public sessions: sessionEnum[] = [];
  settingOnGrid = false;
  isMasterSession = false;
  turn: number = 0;
  sessionPlayers: any;
  character: character;
  grid: grid[] = [];
  possibleMoves: grid[] = [];
  possibleViews: grid[] = [];
  charecterPosition: grid = new grid();
  ping: grid = { charName: "", x: 99, y: 99 };
  setObjectOnGrid = false;
  deleteObjectFromGrid = false;
  objectName: String = "";
  buffs: buff[] = [];
  syncroCharacterSubscription: Subscription;
  syncroPingSubcription: Subscription;
  syncroTurnSubscription: Subscription;
  syncroPositionsSubscription: Subscription;
  syncroDiceSubscription: Subscription;
  strenghtBuff: number = 0;
  dexterityBuff: number = 0;
  constitutionBuff: number = 0;
  intelligenceBuff: number = 0;
  weasdomBuff: number = 0;
  charismatBuff: number = 0;
  notify = false;
  hideCharacterRows = false;
  uploader: FileUploader = new FileUploader({ url: URL });
  pingTimes = 0;
  pingTimeOut = false;
  minX = 0;
  maxX = 0;
  minY = 0;
  maxY = 0;
  clickStart: grid = new grid();
  clickEnd: grid = new grid();
  isIntermittent=false;
  public isFriend = [];
  public inModify = false;
  public inGrid = [];
  public gridSettingVisible = false;
  public tooltip: any[] = [];
  public gridDimension = 3;
  public x: number;
  public y: number;
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
  public stats: { name: string, value: number, modifier: number, tempValue: number, buffModifier: number, totValue: number, savingThrow: number }[] = [];




  ngOnInit() {
  }

  onNextTurn() {
    if (this.inModify=== false) {
      this.service.getNextTurn().subscribe((res: number) => {
        console.log(res);
        this.turn = res; 
        if (this.sessionPlayers[this.turn].charName == this.character.charName) {
          this.service.getBuffUpdate().subscribe();
        }
      });
    }
  }
  syncroPositions() {
    this.syncroPositionsSubscription = this.service.syncroPositions().subscribe((res: String) => {
      console.log(res);
      this.possibleMoves = [];
      if (res == 'positions') {
        this.service.getPositions().subscribe((res: grid[]) => {
          this.grid = res; for (let position of this.grid) {
            if (position.charName == this.character.charName) {
              this.charecterPosition.charName = position.charName;
              this.charecterPosition.x = position.x;
              this.charecterPosition.y = position.y;
            }
          }
          this.service.getPossibleViews("50").subscribe((res: grid[]) => {
            console.log("possible views", res),
              this.possibleViews = res;
            this.minX = this.possibleViews[0].x;
            this.minY = this.possibleViews[0].y;
            this.maxX = this.possibleViews[3].x;
            this.maxY = this.possibleViews[3].y;
          });
          this.syncroPositions();
        });
      } else if (res == 'notification') {
        this.service.getNotification().subscribe(res => {
          console.log(res);
          this.toastr.info('The Master say: ' + res);
          this.syncroPositions();
        })
      }
    });
  }
  searchCharacterOnGrid(x, y): String {
    let a = "";
    this.grid.forEach(char => {
      if (char.x == x && char.y == y) {
        if (char.charName == "tree") {
          return a = "tree";
        } else if (char.charName == "horizontal wall") {
          //return a = "grip-lines";
          return a = "horizontal";
        } else if (char.charName == "vertical wall") {
          // return a = "grip-lines-vertical"
          return a = "vertical"
        } else if (char.charName == "dungeon") {
          return a = "dungeon";
        } else if (char.charName == "door-closed") {
          return a = "door-closed"
        } else {
          for (let i in this.sessionPlayers) {
            if (this.sessionPlayers[i].charName == char.charName) {
              a = this.sessionPlayers[i].gridNumber;
              if (this.sessionPlayers[i].privilege == 'user') {
                this.isFriend[i] = true;
              }
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
    if (this.minX <= x && x <= this.maxX && this.minY <= y && y <= this.maxY) {
    } else {
      if (this.character.privilege == 'user') {
        a = "";
      }
    }
    return a;
  }

  onCheckFriend(x, y): boolean {
    let a = false;
    this.grid.forEach(char => {
      if (char.x == x && char.y == y) {
        if (char.charName == 'tree' || char.charName == 'horizontal wall' || char.charName == 'vertical wall' || char.charName == 'door-closed' || char.charName == 'dungeon') {
          return a = true;
        }
        for (let i in this.sessionPlayers) {
          if (this.sessionPlayers[i].charName == char.charName) {
            if (this.sessionPlayers[i].privilege == 'user') {
              a = true;
            }
          }
        }
      }

    });
    return a;
  }
  syncroCharacter() {
    this.syncroCharacterSubscription = this.service.getSyncroCharacterList().subscribe(res => {
      this.service.accounts().subscribe((res: postlogin[]) => {
        this.accounts = res;
      });
      this.sessionPlayers = res;
      this.tooltip = [];
      this.sessionPlayers.forEach(p => {
        let healthStatus = '';
        if ((p.current_hp / p.hp) > 0.80) {
          healthStatus = 'Healthy'
        } else if ((p.current_hp / p.hp) > 0.50) {
          healthStatus = 'Quite healthy'
        } else if ((p.current_hp / p.hp) > 0.25) {
          healthStatus = 'Damaged'
        } else if ((p.current_hp / p.hp) > 0) {
          healthStatus = 'Really Damaged'
        } else {
          healthStatus = 'To the ground'
        };
        this.tooltip.push("Current HP: " + healthStatus);
      })
      this.service.getBuff().subscribe((res: buff[]) => {
        this.buffs = res;
        this.strenghtBuff = 0;
        this.dexterityBuff = 0;
        this.constitutionBuff = 0;
        this.weasdomBuff = 0;
        this.intelligenceBuff = 0;
        this.charismatBuff = 0;
        this.buffs.forEach(buff => {
          if (buff.usernameTo == this.character.charName) {
            if (buff.stat == 'Strenght')
              this.strenghtBuff = this.strenghtBuff + buff.intensity
            else if (buff.stat == 'Dexterity')
              this.dexterityBuff = this.dexterityBuff + buff.intensity
            else if (buff.stat == 'Constitution')
              this.constitutionBuff = this.constitutionBuff + buff.intensity
            else if (buff.stat == 'Intelligence')
              this.intelligenceBuff = this.intelligenceBuff + buff.intensity
            else if (buff.stat == 'Weasdom')
              this.weasdomBuff = this.weasdomBuff + buff.intensity
            else if (buff.stat == 'Charisma')
              this.charismatBuff = this.charismatBuff + buff.intensity
          }
        }); this.syncroCharacter()
      })
    });
  }

  syncroTurn() {
    this.syncroTurnSubscription = this.service.getSyncroTurn().subscribe(res => {
      this.turn = +res;
      while (this.turn >= this.sessionPlayers.length) {
        this.turn = this.turn - this.sessionPlayers.length;
      }
      this.syncroTurn()
    });
  }

  statInitializer() {
    this.stats = [];
    this.stats.push({
      name: "Strenght",
      value: this.character.strenght,
      modifier: Math.floor((this.character.strenght - 10) / 2),
      tempValue: this.character.temporary_strenght,
      buffModifier: this.strenghtBuff,
      totValue: Math.floor((this.character.strenght + this.character.temporary_strenght + this.strenghtBuff - 10) / 2),
      savingThrow: this.character.savingThrow_strenght
    });
    this.stats.push({
      name: "Constitution",
      value: this.character.constitution,
      modifier: Math.floor((this.character.constitution - 10) / 2),
      tempValue: this.character.temporary_constitution,
      buffModifier: this.constitutionBuff,
      totValue: Math.floor((this.character.constitution + this.character.temporary_constitution + this.constitutionBuff - 10) / 2),
      savingThrow: this.character.savingThrow_constitution
    });
    this.stats.push({
      name: "Dexterity",
      value: this.character.dexterity,
      modifier: Math.floor((this.character.dexterity - 10) / 2),
      tempValue: this.character.temporary_dexterity,
      buffModifier: this.dexterityBuff,
      totValue: Math.floor((this.character.dexterity + this.character.temporary_dexterity + this.dexterityBuff - 10) / 2),
      savingThrow: this.character.savingThrow_dexterity
    });
    this.stats.push({
      name: "Intelligence",
      value: this.character.intelligence,
      modifier: Math.floor((this.character.intelligence - 10) / 2),
      tempValue: this.character.temporary_intelligence,
      buffModifier: this.intelligenceBuff,
      totValue: Math.floor((this.character.intelligence + this.character.temporary_intelligence + this.intelligenceBuff - 10) / 2),
      savingThrow: this.character.savingThrow_intelligence
    });
    this.stats.push({
      name: "Weasdom",
      value: this.character.weasdom,
      modifier: Math.floor((this.character.weasdom - 10) / 2),
      tempValue: this.character.temporary_weasdom,
      buffModifier: this.weasdomBuff,
      totValue: Math.floor((this.character.weasdom + this.character.temporary_weasdom + this.weasdomBuff - 10) / 2),
      savingThrow: this.character.savingThrow_weasdom
    });
    this.stats.push({
      name: "Charisma",
      value: this.character.charisma,
      modifier: Math.floor((this.character.charisma - 10) / 2),
      tempValue: this.character.temporary_charisma,
      buffModifier: this.charismatBuff,
      totValue: Math.floor((this.character.charisma + this.character.temporary_charisma + this.charismatBuff - 10) / 2),
      savingThrow: this.character.savingThrow_charisma
    });
  }

  onChangeAttribute(name: String, value: String) {
    this.service.updatePg(name, value).subscribe((res: character) => {
      this.toastr.success('Your update was successful'); this.character = res; this.statInitializer(); this.x = +this.character.grid_dimension.substring(0, this.character.grid_dimension.indexOf(','));
      this.y = +this.character.grid_dimension.substring(this.character.grid_dimension.indexOf(',') + 1); this.onGridInit();
    }, err => { this.toastr.error('Something went wrong, please try again later') });
  }

  onTempModify(i) {
    this.onChangeAttribute("temporary_" + this.stats[i].name.toLowerCase(), this.stats[i].tempValue.toString())
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
      this.onChangeAttribute('alive', '1');
    } else if (this.setObjectOnGrid == true) {
      this.service.setObjectOnGrid(this.objectName, x, y).subscribe();
    } else if (this.deleteObjectFromGrid == true) {
      this.service.deleteObjectOnGrid("", x, y).subscribe();
    } else if (this.pingTimes < 3) {
      this.service.pingGrid(x, y).subscribe(res => { if (this.character.privilege == 'user') this.pingTimes += 1 });
      if (this.pingTimes == 3)
        setTimeout(() => { this.pingTimes = 0 }, 60000);
    }
  }

  onResetNote() {
    let str = "";
    this.onChangeAttribute('note', str);
  }

  onEditInitiative(i, currChar) {
    if (this.character.charName === currChar) {
      this.inModify = true;
    }
  }

  onSaveInitiative(initiative,gridNumber) {
    this.character.initiative = initiative;
    this.character.gridNumber = gridNumber;
    this.onChangeAttribute('initiative', this.character.initiative.toString());
    this.onChangeAttribute('gridNumber', this.character.gridNumber.toString());
    this.inModify = false;
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
    npc.speed = 9;
    npc.privilege = 'master';
    this.service.registerNpc(npc).subscribe();
  }
  syncroDice() {
    this.syncroDiceSubscription = this.service.syncroDice().subscribe((res: any) => {
      this.diceThrow = res.ref_charName + " ha tirato un " + res.dice_type + " facendo un bel " + res.dice_value;
      this.toastr.info(this.diceThrow);
      this.syncroDice()
    });
  }

  onChangeChar(charName) {
    if (this.character.privilege == 'master') {
      this.service.chooseCharacter(charName, this.character.session_id).subscribe(res => {
        this.character = res;
        this.statInitializer();
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
    this.syncroPingSubcription = this.service.syncroPing().subscribe((res: grid) => {
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
  onSetObjectOnGrid() {
    if (this.setObjectOnGrid == true) {
      this.setObjectOnGrid = false;
    } else {
      this.setObjectOnGrid = true;
      this.deleteObjectFromGrid = false;
    }
  }
  onDeleteObjectFromGrid() {
    if (this.deleteObjectFromGrid == true) {
      this.deleteObjectFromGrid = false;
    } else {
      this.deleteObjectFromGrid = true;
      this.setObjectOnGrid = false;
    }
  }
  onGridEmpty() {
    this.service.emptyGrid().subscribe(res => { this.charecterPosition.x = null; this.charecterPosition.y = null });
  }
  onObjectGridEmpty() {
    this.service.emptyObjectGrid().subscribe();
  }
  onSetBuff(charNameTo, stat, intensity, lastFor, type) {
    this.service.postBuff(this.character.charName, charNameTo, stat, intensity, lastFor, type).subscribe(res => { this.toastr.success('You buff was successful') }, err => { this.toastr.error('Something went wrong, please try again later') });
  }
  ngOnDestroy(): void {
    this.syncroCharacterSubscription.unsubscribe();
    this.syncroDiceSubscription.unsubscribe();
    this.syncroPositionsSubscription.unsubscribe();
    this.syncroTurnSubscription.unsubscribe();
    this.syncroPingSubcription.unsubscribe();
  }
  tryToastrNotification() {
    this.toastr.success('Hello World');
  }
  onKeydown(event, value) {
    if (event.key === "Enter") {
      this.service.postNotification(value).subscribe();
    }
  }
  onChange(event) {
    console.log(event);
  }
  saveFile(file) {
    console.log(file.value);
  }
  onDeleteChar(charName) {
    if (this.character.charName == charName)
      this.service.updatePg('alive', '0').subscribe(res => {
        this.toastr.success('Character has been removed with success'); this.service.getPositions().subscribe((res: grid[]) => {
          this.grid = res; for (let position of this.grid) {
            this.charecterPosition.x = null;
            this.charecterPosition.y = null;
            if (position.charName == this.character.charName) {
              this.charecterPosition.charName = position.charName;
              this.charecterPosition.x = position.x;
              this.charecterPosition.y = position.y;
            }
          }
        });
      });
  }
  onMouseDown(x, y) {
    this.clickStart.x = x;
    this.clickStart.y = y;
    console.log(this.clickStart)
  };
  onMouseUp(x, y) {
    this.clickEnd.x = x;
    this.clickEnd.y = y;
    console.log(this.clickEnd);
    let xMin = Math.min(this.clickStart.x, this.clickEnd.x);
    let xMax = Math.max(this.clickStart.x, this.clickEnd.x);
    let yMin = Math.min(this.clickStart.y, this.clickEnd.y);
    let yMax = Math.max(this.clickStart.y, this.clickEnd.y);
    for (let a = xMin; a <= xMax; a++) {
      for (let b = yMin; b <= yMax; b++) {
        if (this.setObjectOnGrid == true) {
          this.service.setObjectOnGrid(this.objectName, a, b).subscribe();
        }
      }
    }
  }
  onSearchCharacterHp(x,y){
    let a=99;
    this.grid.forEach(g=>{
      if(g.x==x && g.y==y){
        this.sessionPlayers.forEach(p=>{
          if(p.charName==g.charName){
            a=p.current_hp;
          }
        })
      }
    })
    return a;
  }
  onDeadPlayer(){
    setInterval(()=>{
      this.isIntermittent=!this.isIntermittent;
    },700)
  }
  onSearchMasterCharacter(x,y){
    let a='';
    this.grid.forEach(g=>{
      if(g.x==x && g.y==y){
        this.sessionPlayers.forEach(p=>{
          if(p.privilege=='master' && g.charName.includes('nemy')){
            a=g.charName.substring(5);
          }
        })
      }
    })
    return a;
  }
}
