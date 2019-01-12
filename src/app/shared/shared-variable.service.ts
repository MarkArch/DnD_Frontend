import { Injectable } from '@angular/core';
import { postlogin } from '../class/postlogin';
import { character } from '../class/character';

@Injectable({
  providedIn: 'root'
})
export class SharedVariableService {
  private accounts: postlogin[] = [];
  character:character;
  constructor() { }

  public sessionMaster;

  public setAccounts(accounts: postlogin[]) {
    this.accounts = accounts;
  }
  public getAccounts(){
    return this.accounts;
  }
}
