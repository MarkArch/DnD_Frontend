import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { userlogin } from '../class/userlogin';

@Injectable({
  providedIn: 'root'
})
export class RestServiceService {

  constructor(private http:HttpClient) { }

  public login(username: string,password:string): Observable<any>{
    var user:userlogin=new userlogin(username,password,null);
    return this.http.post("http://localhost:8080/DeDManager/login",user);
  }
  public register(username:string,password:string,email:string):Observable<any>{
    return this.http.post("http://localhost:8080/DeDManager/register", new userlogin(username,password,email));
  }
}
