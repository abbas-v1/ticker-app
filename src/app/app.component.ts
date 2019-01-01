import { Component } from '@angular/core';
import { SocketService } from './socket.service';
import { interval } from 'rxjs';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'BitCoin Ticker';

  data: number[] = [];
  snapshot: number[][] = [];
  reference: number;

  constructor(private socketService: SocketService, private dataService: DataService) {
    // cron job to be executed after 30 seconds
    interval(30000).subscribe(() => {
      var dumpData = this.snapshot.splice(0, this.snapshot.length);
      this.dataService.postTickerData(dumpData);
    });
  }

  ngOnInit() {
    this.socketService
      .getMessages()
      .subscribe((data) => {
        this.data = data;
        this.snapshot.push(data);
      });
  }

}
