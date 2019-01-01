import { Injectable } from '@angular/core';
import { postlogin } from '../class/postlogin';

@Injectable({
  providedIn: 'root'
})
export class SharedVariableService {
  private accounts: postlogin[] = [];
  constructor() { }

  public setAccounts(accounts: postlogin[]) {
    this.accounts = accounts;
  }
  public getAccounts(){
    return this.accounts;
  }
}
