import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {QRScanner, QRScannerStatus} from "@ionic-native/qr-scanner";

/**
 * Generated class for the ScanQrPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scan-qr',
  templateUrl: 'scan-qr.html',
})
export class ScanQrPage {
  private isBackMode: boolean = true;
  private isFlashLightOn: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewController: ViewController,
              public qrScanner: QRScanner) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScanQrPage');
  }

  ionViewWillEnter(){
    // Optionally request the permission early
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted
          console.log('Camera Permission Given');

          // start scanning
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            console.log('Scanned something', text);
            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
          });

          // show camera preview
          this.qrScanner.show();

          // wait for user to scan something, then the observable callback will be called

        } else if (status.denied) {
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
          console.log('Camera permission denied');
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
          console.log('Permission denied for this runtime.');
        }
      })
      .catch((e: any) => console.log('Error is', e));
  }

  closeModal() {
    this.viewController.dismiss();
  }


  toggleFlashLight(){

    /** Default isFlashLightOn is false ,
     * enable it if false **/

    this.isFlashLightOn = !this.isFlashLightOn;
    if(this.isFlashLightOn){
      this.qrScanner.enableLight();
    }
    else{
      this.qrScanner.disableLight();
    }

  }
  toggleCamera(){
    /** Toggle Camera , Default is isBackMode is true , toggle
     * to false to enable front camera and vice versa.
     *
     * @type {boolean}
     */
    this.isBackMode =  !this.isBackMode;
    if(this.isBackMode){
      this.qrScanner.useFrontCamera();
    }
    else{
      this.qrScanner.useBackCamera();
    }
  }
}
