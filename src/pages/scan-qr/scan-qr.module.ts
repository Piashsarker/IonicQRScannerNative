import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScanQrPage } from './scan-qr';

@NgModule({
  declarations: [
    ScanQrPage,
  ],
  imports: [
    IonicPageModule.forChild(ScanQrPage),
  ],
})
export class ScanQrPageModule {}
