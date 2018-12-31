import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private subscribedSocket : WebSocket;

  constructor() {
    var socket = new WebSocket("wss://api.bitfinex.com/ws");

    socket.onopen = function () {
      socket.send(JSON.stringify({"event": "subscribe", "channel": "ticker", "pair": "BTCUSD"}));
    };

    this.subscribedSocket = socket;
  }

  public getMessages = () => {
    return Observable.create((observer) => {
        this.subscribedSocket.onmessage = function(message) {
          var data = JSON.parse(message.data);
          if (data[1] !== 'hb' && data[1] > 0) {
            observer.next(data);
          }
        };
    });
  }

}
