import { Component, OnInit } from '@angular/core';
import { WinboxService } from '@rbtech/angular-winbox';
import { SimpleComponentComponent } from './simple-component/simple-component.component';

@Component({
  selector: 'rbtech-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'winbox-example-app';

  constructor(private winboxService: WinboxService) {}

  ngOnInit(): void {
    this.winboxService.openWinBox<SimpleComponentComponent>(
      {
        title: 'Test',
        height: '90%',
        width: '40%',
        x: 'center',
        y: 'center',
        index: 1057,
        onclose: (): boolean => {
          return true;
        },
      },
      SimpleComponentComponent
    );
    this.winboxService.showLastWinbox();
  }
}
