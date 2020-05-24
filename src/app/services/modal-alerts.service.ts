import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalAlertsComponent } from '../modal-alerts/modal-alerts.component';
import { ModalTypes } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ModalAlertsService {
  constructor(private dialog: MatDialog) {}

  modalTsuccess(title: string, description: string): void {
    this.dialog.open(ModalAlertsComponent, {
      width: 'auto',
      height: 'auto',
      disableClose: true,
      data: {
        controlType: ModalTypes.tSuccess,
        title,
        description,
      },
    });
  }

  modalTerror(title: string, description: string): void {
    this.dialog.open(ModalAlertsComponent, {
      width: 'auto',
      height: 'auto',
      disableClose: true,
      data: {
        controlType: ModalTypes.tError,
        title,
        description,
      },
    });
  }

  modalTalert(title: string, description: string): void {
    this.dialog.open(ModalAlertsComponent, {
      width: 'auto',
      height: 'auto',
      disableClose: true,
      data: {
        controlType: ModalTypes.tAlert,
        title,
        description,
      },
    });
  }
}
