import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { userlogin } from '../class/userlogin';
import { character } from '../class/character';
import { SharedVariableService } from './shared-variable.service';

@Injectable({
  providedIn: 'root'
})
export class RestServiceService {

  constructor(private http:HttpClient,private share:SharedVariableService) { }

   login(username: string,password:string): Observable<any>{
    var user:userlogin=new userlogin(username,password,null);
    return this.http.post("http://localhost:8080/DeDManager/login",user, {withCredentials:true});
  }
   register(username:string,password:string,email:string):Observable<any>{
    return this.http.post("http://localhost:8080/DeDManager/register", new userlogin(username,password,email));
  }
  accounts():Observable<any>{
    return this.http.get("http://localhost:8080/DeDManager/Accounts", {withCredentials:true});
  }
  chooseCharacter(charName:String,session_id:number):Observable<any>{
    return this.http.post("http://localhost:8080/DeDManager/choosePg",{"charName":charName,"session_id":session_id},{withCredentials:true});
  }
  logout(){
    return this.http.get("http://localhost:8080/DeDManager/logout", {withCredentials:true})
  }
  getPositions(){
    return this.http.get("http://localhost:8080/DeDManager/positions", {withCredentials:true})
  }
  getPossibleMoves(speed:String){
    return this.http.post("http://localhost:8080/DeDManager/possibleMoves",speed, {withCredentials:true})
  }
}
