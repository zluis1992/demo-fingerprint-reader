import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  private key: string = 'Base_64_fingerPrint'

  constructor() { }

  setFingerPrint(fingerPrint: string) {
    localStorage.setItem(this.key, fingerPrint);
  }
}
