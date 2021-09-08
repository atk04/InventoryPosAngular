import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../theme/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { CreateOrderRoutingModule } from './create-order-routing.module';
import { CreateOrderHomeComponent } from './create-order-home/create-order-home.component';
import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
const materialModules = [
  MatButtonModule,

];


@NgModule({
  declarations: [CreateOrderHomeComponent],
  imports: [
    CommonModule,
    CreateOrderRoutingModule,
    SharedModule,
    materialModules,
    NgbDatepickerModule,
    SnotifyModule,
    FormsModule,
    NgSelectModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [{ provide: 'SnotifyToastConfig', useValue: ToastDefaults }, SnotifyService]
})
export class CreateOrderModule { }
