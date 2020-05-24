import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalAlert } from '../interfaces/modal-alert';

@Component({
  selector: 'app-modal-alerts',
  templateUrl: './modal-alerts.component.html',
  styleUrls: ['./modal-alerts.component.scss']
})
export class ModalAlertsComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ModalAlertsComponent>,
    @Inject(MAT_DIALOG_DATA) public modal: ModalAlert,
  ) { }

  ngOnInit() {}

  closeModal() {
    this.dialogRef.close();
  }
}
