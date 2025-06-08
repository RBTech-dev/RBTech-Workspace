import { Component, OnInit, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WinboxService } from '@rbtech/angular-winbox';
import { ModalYesNoComponent } from './modal-yes-no/modal-yes-no.component';
import { SimpleComponentComponent } from './simple-component/simple-component.component';

@Component({
  selector: 'rbtech-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'winbox-example-app';
  private readonly winboxService = inject(WinboxService);
  private readonly modalService = inject(NgbModal);

  ngOnInit(): void {
    this.createNewWinBox();
  }

  public createNewWinBox(): void {
    const winboxInstance =
      this.winboxService.openWinBox<SimpleComponentComponent>(
        {
          title: 'A Random Pokémon',
          height: '90%',
          width: '40%',
          x: 'center',
          y: 'center',
          index: 1057,
          onclose: (): boolean => {
            const modal = this.modalService.open(ModalYesNoComponent);
            modal.componentInstance.title = 'Are you sure?';
            modal.componentInstance.message =
              'Wanna close the selected winbox?';
            winboxInstance.winBox.minimize(true);

            modal.result
              .then(() => {
                winboxInstance.winBox.close(true);
              })
              .catch(() => winboxInstance.winBox.maximize(false));
            return false;
          },
        },
        SimpleComponentComponent,
      );
    this.winboxService.showLastWinbox();
  }
}
