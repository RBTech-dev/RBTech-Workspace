import { Component, OnInit } from '@angular/core';
import { WinboxService } from '@rbtech/angular-winbox';
import { SimpleComponentComponent } from './simple-component/simple-component.component';
import { ModalYesNoComponent } from './modal-yes-no/modal-yes-no.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'rbtech-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'winbox-example-app';

  constructor(
    protected winboxService: WinboxService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    const winboxInstance =
      this.winboxService.openWinBox<SimpleComponentComponent>(
        {
          title: 'Test',
          height: '90%',
          width: '40%',
          x: 'center',
          y: 'center',
          index: 1057,
          onclose: (): boolean => {
            const modal = this.modalService.open(ModalYesNoComponent);
            modal.componentInstance.title = 'Titolo';
            modal.componentInstance.message = 'Vuoi chiudere winbox?';
            winboxInstance.winBox.minimize(true);

            modal.result
              .then(() => {
                winboxInstance.winBox.close(true);
              })
              .catch(() => winboxInstance.winBox.maximize(false));
            return false;
          },
        },
        SimpleComponentComponent
      );
    this.winboxService.showLastWinbox();
  }
}
