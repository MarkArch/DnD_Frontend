import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { userlogin } from '../class/userlogin';
import { character } from '../class/character';
import { SharedVariableService } from './shared-variable.service';
import { grid } from '../class/grid';

@Injectable({
  providedIn: 'root'
})
export class RestServiceService {

  constructor(private http:HttpClient,private share:SharedVariableService) { }

   login(username: string,password:string): Observable<any>{
    var user:userlogin=new userlogin(username,password,null);
    return this.http.post("http://e0fa5ce2.ngrok.io/DeDManager/login",user, {withCredentials:true});
  }
   register(username:string,password:string,email:string):Observable<any>{
    return this.http.post("http://e0fa5ce2.ngrok.io/DeDManager/register", new userlogin(username,password,email));
  }
   registerNpc(npc: character):Observable<any>{
    return this.http.post("http://e0fa5ce2.ngrok.io/DeDManager/register/pg", npc, {withCredentials:true});
  }
  accounts():Observable<any>{
    return this.http.get("http://e0fa5ce2.ngrok.io/DeDManager/Accounts", {withCredentials:true});
  }
  chooseCharacter(charName:String,session_id:number):Observable<any>{
    return this.http.post("http://e0fa5ce2.ngrok.io/DeDManager/choosePg",{"charName":charName,"session_id":session_id},{withCredentials:true});
  }
  logout(){
    return this.http.get("http://e0fa5ce2.ngrok.io/DeDManager/logout", {withCredentials:true})
  }
  getPositions(){
    return this.http.get("http://e0fa5ce2.ngrok.io/DeDManager/positions", {withCredentials:true})
  }
  getPossibleMoves(speed:String){
    return this.http.post("http://e0fa5ce2.ngrok.io/DeDManager/possibleMoves",speed, {withCredentials:true})
  }
  facebookLogin(accessToken:String){
    return this.http.post("http://e0fa5ce2.ngrok.io/DeDManager/facebookLogin",accessToken, {withCredentials:true})
  }
  getCharacterList(){
    return this.http.get("http://e0fa5ce2.ngrok.io/DeDManager/characterList", {withCredentials:true})
  }
  getSyncroCharacterList(){
    return this.http.get("http://e0fa5ce2.ngrok.io/DeDManager/characterList/syncro", {withCredentials:true})
  }
  getSyncroTurn(){
    return this.http.get("http://e0fa5ce2.ngrok.io/DeDManager/turn/syncro", {withCredentials:true})
  }
  getNextTurn(){
    return this.http.get("http://e0fa5ce2.ngrok.io/DeDManager/turn/next", {withCredentials:true})
  }
  getTurn(){
    return this.http.get("http://e0fa5ce2.ngrok.io/DeDManager/turn", {withCredentials:true})
  }
  updatePg(label:String,value:String){
    return this.http.put("http://e0fa5ce2.ngrok.io/DeDManager/updatePg",label+":"+value, {withCredentials:true})
  }
  movePg(x,y){
    var g:grid=new grid();
    g.x=x;
    g.y=y;
    return this.http.put("http://e0fa5ce2.ngrok.io/DeDManager/movePg",g, {withCredentials:true})
  }
  syncroPositions(){
    return this.http.get("http://e0fa5ce2.ngrok.io/DeDManager/positions/syncro", {withCredentials:true})
  }
}
