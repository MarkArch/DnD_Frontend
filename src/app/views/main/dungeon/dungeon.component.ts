import { Component, OnInit } from '@angular/core';
import { RestServiceService } from '../../../shared/rest-service.service';
import { character } from '../../../class/character';
import { grid } from '../../../class/grid';
import { trigger, state, style, animate, transition } from '@angular/animations'

@Component({
  selector: 'app-dungeon',
  templateUrl: './dungeon.component.html',
  styleUrls: ['./dungeon.component.scss'],
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
export class DungeonComponent implements OnInit {
  public character: character = null;
  public x: number = 20;
  public y: number = 20;
  public yAxis = new Array<string>(this.y);
  public xAxis = new Array<string>(this.x);
  gridSettingVisible = false;
  public ping:grid=new grid();

  constructor(private service: RestServiceService) {
    this.service.chooseCharacter('', 0).subscribe((res: character) => {
    this.character = res; this.x = +this.character.grid_dimension.substring(0, this.character.grid_dimension.indexOf(','));
      this.y = +this.character.grid_dimension.substring(this.character.grid_dimension.indexOf(',') + 1);
      this.onGridInit();
    })
  }

  ngOnInit() {
  }
  onShowGridSettings() {
    this.gridSettingVisible = !this.gridSettingVisible;
  }
  onGridInit() {
    this.xAxis = new Array<string>(this.x);
    this.yAxis = new Array<string>(this.y);
  }
  searchCharacterOnGrid(x, y): String {
    let a = "";
    // this.grid.forEach(char => {
    //   if (char.x == x && char.y == y) {
    //     if (char.charName == "tree") {
    //       return a = "tree";
    //     } else if (char.charName == "horizontal wall") {
    //       //return a = "grip-lines";
    //       return a = "horizontal";
    //     } else if (char.charName == "vertical wall") {
    //       // return a = "grip-lines-vertical"
    //       return a = "vertical"
    //     } else if (char.charName == "dungeon") {
    //       return a = "dungeon";
    //     } else if (char.charName == "door-closed") {
    //       return a = "door-closed"
    //     } else {
    //       for (let i in this.sessionPlayers) {
    //         if (this.sessionPlayers[i].charName == char.charName) {
    //           a = this.sessionPlayers[i].gridNumber;
    //           if (this.sessionPlayers[i].privilege == 'user') {
    //             this.isFriend[i] = true;
    //           }
    //         }
    //       }
    //     }
    //   }
    // });

    // this.possibleMoves.forEach(char => {
    //   if (char.x == x && char.y == y) {
    //     a = "P";
    //   }
    // });
    // if (this.minX <= x && x <= this.maxX && this.minY <= y && y <= this.maxY) {
    // } else {
    //   if (this.character.privilege == 'user') {
    //     a = "";
    //   }
    // }
    return a;
  }
  onCheckFriend(x, y): boolean {
    let a = false;
    // this.grid.forEach(char => {
    //   if (char.x == x && char.y == y) {
    //     if (char.charName == 'tree' || char.charName == 'horizontal wall' || char.charName == 'vertical wall' || char.charName == 'door-closed' || char.charName == 'dungeon') {
    //       return a = true;
    //     }
    //     for (let i in this.sessionPlayers) {
    //       if (this.sessionPlayers[i].charName == char.charName) {
    //         if (this.sessionPlayers[i].privilege == 'user') {
    //           a = true;
    //         }
    //       }
    //     }
    //   }

    // });
    return a;
  }

}
