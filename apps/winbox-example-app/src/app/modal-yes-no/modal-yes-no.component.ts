import { Component, Input, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'pmed-modal-yes-no',
  templateUrl: './modal-yes-no.component.html',
  styleUrls: ['./modal-yes-no.component.scss'],
})
export class ModalYesNoComponent {
  @Input() title!: string;
  @Input() message!: string;
  @Input() yesLabel = 'Yes';
  @Input() noLabel = 'No';
  @Input() ccsCancelClass = 'btn-secondary';
  @Input() ccsConfirmClass = 'btn-primary';

  private readonly modalService = inject(NgbActiveModal);

  cancel() {
    this.modalService.dismiss();
  }

  confirm() {
    this.modalService.close();
  }
}
