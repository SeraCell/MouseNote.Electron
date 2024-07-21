import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ElectronService {
  private electron: any;

  constructor() {
    if ((window as any).electron) {
      this.electron = (window as any).electron;
    }
  }

  send(channel: string, data: any) {
    if (this.electron) {
      console.log('sending message')
      this.electron.send(channel, data);
    }
  }

  on(channel: string, func: Function) {
    if (this.electron) {
      console.log('message received')
      this.electron.on(channel, func);
    }
  }
}
