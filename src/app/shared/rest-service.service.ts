import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { userlogin } from '../class/userlogin';
import { character } from '../class/character';
import { SharedVariableService } from './shared-variable.service';
import { grid } from '../class/grid';
import { buff } from '../class/buff';
import { st } from '@angular/core/src/render3';
import { text } from '@angular/core/src/render3/instructions';

@Injectable({
  providedIn: 'root'
})
export class RestServiceService {

  constructor(private http: HttpClient, private share: SharedVariableService) { }

  login(username: string, password: string): Observable<any> {
    var user: userlogin = new userlogin(username, password, null);
    return this.http.post("http://localhost:8080/DeDManager/login", user, { withCredentials: true });
  }
  isLoggedIn(): Observable<any> {
    return this.http.get("http://localhost:8080/DeDManager/validateAuthToken", { withCredentials: true });
  }
  campaignChosed(): Observable<any> {
    return this.http.get("http://localhost:8080/DeDManager/validateCharToken", { withCredentials: true });
  }
  register(username: string, password: string, email: string): Observable<any> {
    return this.http.post("http://localhost:8080/DeDManager/register", new userlogin(username, password, email));
  }
  registerNpc(npc: character): Observable<any> {
    return this.http.post("http://localhost:8080/DeDManager/register/pg", npc, { withCredentials: true });
  }
  accounts(): Observable<any> {
    return this.http.get("http://localhost:8080/DeDManager/Accounts", { withCredentials: true });
  }
  chooseCharacter(charName: String, session_id: number): Observable<any> {
    return this.http.post("http://localhost:8080/DeDManager/choosePg", { "charName": charName, "session_id": session_id }, { withCredentials: true });
  }
  logout() {
    return this.http.get("http://localhost:8080/DeDManager/logout", { withCredentials: true })
  }
  getPositions() {
    return this.http.get("http://localhost:8080/DeDManager/positions", { withCredentials: true })
  }
  getPossibleMoves(speed: String) {
    return this.http.post("http://localhost:8080/DeDManager/possibleMoves", speed, { withCredentials: true })
  }
  facebookLogin(accessToken: String) {
    return this.http.post("http://localhost:8080/DeDManager/facebookLogin", accessToken, { withCredentials: true })
  }
  getCharacterList() {
    return this.http.get("http://localhost:8080/DeDManager/characterList", { withCredentials: true })
  }
  getSyncroCharacterList() {
    return this.http.get("http://localhost:8080/DeDManager/characterList/syncro", { withCredentials: true })
  }
  getSyncroTurn() {
    return this.http.get("http://localhost:8080/DeDManager/turn/syncro", { withCredentials: true })
  }
  getNextTurn() {
    return this.http.get("http://localhost:8080/DeDManager/turn/next", { withCredentials: true })
  }
  getTurn() {
    return this.http.get("http://localhost:8080/DeDManager/turn", { withCredentials: true })
  }
  updatePg(label: String, value: String) {
    return this.http.put("http://localhost:8080/DeDManager/updatePg", label + ":" + value, { withCredentials: true })
  }
  movePg(x, y) {
    var g: grid = new grid();
    g.x = x;
    g.y = y;
    return this.http.put("http://localhost:8080/DeDManager/movePg", g, { withCredentials: true })
  }
  syncroPositions() {
    return this.http.get("http://localhost:8080/DeDManager/positions/syncro", { responseType: 'text', withCredentials: true })
  }
  syncroDice() {
    return this.http.get("http://localhost:8080/DeDManager/syncroDice", { withCredentials: true })
  }
  throwDice(dice_type: String, dice_value: number) {
    return this.http.post("http://localhost:8080/DeDManager/ThrowDice/" + dice_type, dice_value.toString(), { withCredentials: true })
  }
  pingGrid(x: number, y: number) {
    let g: grid = new grid();
    g.x = x;
    g.y = y;
    return this.http.post("http://localhost:8080/DeDManager/ping/", g, { withCredentials: true })
  }
  syncroPing() {
    return this.http.get("http://localhost:8080/DeDManager/ping/syncro", { withCredentials: true })
  }
  setObjectOnGrid(charname, x, y) {
    let obj: grid = new grid();
    obj.charName = charname;
    obj.x = x;
    obj.y = y;
    return this.http.post("http://localhost:8080/DeDManager/gridObject/", obj, { withCredentials: true })
  }
  deleteObjectOnGrid(charname, x, y) {
    let obj: grid = new grid();
    obj.charName = charname;
    obj.x = x;
    obj.y = y;
    return this.http.post("http://localhost:8080/DeDManager/gridObject/delete", obj, { withCredentials: true })
  }
  emptyGrid() {
    return this.http.delete("http://localhost:8080/DeDManager/positions/empty", { withCredentials: true });
  }
  emptyObjectGrid() {
    return this.http.delete("http://localhost:8080/DeDManager/gridObject/empty", { withCredentials: true });
  }
  getBuff() {
    return this.http.get("http://localhost:8080/DeDManager/Buff", { withCredentials: true })
  }
  getBuffUpdate() {
    return this.http.get("http://localhost:8080/DeDManager/Buff/update", { withCredentials: true })
  }
  postBuff(charName1, charName2, stat, intensity, lastfor, type) {
    let b: buff = new buff();
    b.usernameFrom = charName1;
    b.usernameTo = charName2;
    b.stat = stat;
    b.intensity = intensity;
    b.lastFor = lastfor;
    b.type = type;
    return this.http.post("http://localhost:8080/DeDManager/Buff", b, { withCredentials: true })
  }
  multipleUpdateOnPg(pg: character) {
    return this.http.put("http://localhost:8080/DeDManager/setPg", pg, { withCredentials: true })
  }
  getNotification() {
    return this.http.get("http://localhost:8080/DeDManager/Notificate", { responseType: 'text', withCredentials: true })
  }
  postNotification(notification: String) {
    return this.http.post("http://localhost:8080/DeDManager/Notificate", notification, { withCredentials: true })
  }
}
