// Angular Core
import { NgModule } from '@angular/core';

// Browser
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Layout
import { FlexLayoutModule } from '@angular/flex-layout';

// Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';

// Ngx
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';

// Service
import { ModalAlertsService } from './services/modal-alerts.service';
import { DataBaseService } from './services/database.service';

// Component
import { AppComponent } from './app.component';
import { RegisterEventsComponent } from './register-events/register-events.component';
import { CountdownTimerComponent } from './countdown-timer/countdown-timer.component';
import { ModalAlertsComponent } from './modal-alerts/modal-alerts.component';
import { ListEventsComponent } from './list-events/list-events.component';
import { AllEventsComponent } from './all-events/all-events.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterEventsComponent,
    CountdownTimerComponent,
    ModalAlertsComponent,
    ListEventsComponent,
    AllEventsComponent
  ],
  imports: [
    // Browser
    BrowserModule,
    BrowserAnimationsModule,

    // Fomrs
    FormsModule,
    ReactiveFormsModule,

    // Routing
    AppRoutingModule,

    // Layout
    FlexLayoutModule,

    // Material
    MatCardModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatTabsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDividerModule,
    MatToolbarModule,
    MatTooltipModule,
    MatSidenavModule,

    // Ngx
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule
  ],
  providers: [
    ModalAlertsService,
    DataBaseService
  ],
  entryComponents: [ModalAlertsComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
