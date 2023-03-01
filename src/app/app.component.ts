import { Component, OnInit } from '@angular/core';
import { AppServiceService } from './app-service.service'

import{FingerprintReader
, SampleFormat
, DeviceConnected
, DeviceDisconnected
, SamplesAcquired
, AcquisitionStarted
, AcquisitionStopped} from "@digitalpersona/devices"

import './core/modules/WebSdk'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'demo-fingerprint-reader';

  ListaFingerprintReader:any
  InfoFingerprintReader:any
  ListaSamplesFingerprints:any
  currentImageFinger: any = null

  private reader: FingerprintReader

  constructor(private appService: AppServiceService){
    this.reader = new FingerprintReader()
  }

  ngOnInit(): void {
    this.reader = new FingerprintReader()
    this.reader.on("DeviceConnected", this.onDeviceConnected)
    this.reader.on("DeviceDisconnected", this.onDeviceDisconnected)
    this.reader.on("AcquisitionStarted", this.onAcquisitionStarted)
    this.reader.on("AcquisitionStopped", this.onAcquisitionStopped)
    this.reader.on("SamplesAcquired", this.onSamplesAcquired)

    /* Start */
    this.ListarDispositivos()
  }

  ngOnDestroy(): void {
    this.reader.off("DeviceConnected", this.onDeviceConnected)
    this.reader.off("DeviceDisconnected", this.onDeviceDisconnected)
    this.reader.off("AcquisitionStarted", this.onAcquisitionStarted)
    this.reader.off("AcquisitionStopped", this.onAcquisitionStopped)
    this.reader.off("SamplesAcquired", this.onSamplesAcquired)
  }

  private onDeviceConnected = (event: DeviceConnected) => { }
  private onDeviceDisconnected = (event: DeviceDisconnected) => { }

  private onAcquisitionStarted = (event: AcquisitionStarted) => {
  }

   private onAcquisitionStopped = (event: AcquisitionStopped) => {
   }

  private onSamplesAcquired = (event: SamplesAcquired) => {
    this.ListaSamplesFingerprints = event
    this.MostrarHuella()
  }

  public ListarDispositivos() {
    Promise.all([
      this.reader.enumerateDevices()
    ])
    .then(result => {
      this.ListaFingerprintReader = result[0]
      this.InformacionDispositivos()
    })
    .catch(error => console.log)
  }

  public InformacionDispositivos() {
    Promise.all([
      this.reader.getDeviceInfo(this.ListaFingerprintReader[0])
    ])
    .then(result => {
      this.InfoFingerprintReader = result[0]
      this.StartCapture()
    })
    .catch(error => console.log)
  }

  public StartCapture() {
    this.reader.startAcquisition(SampleFormat.PngImage, this.InfoFingerprintReader['DeviceID'])
    .then((result: any) => {
      this.ListaSamplesFingerprints = result
    })
    .catch((error: any) => console.log)
  }

  public StopCapture() {
    this.reader.stopAcquisition(this.InfoFingerprintReader['DeviceID'])
    .catch((error: any) => console.log)
  }

  public MostrarHuella() {
    var listImages = this.ListaSamplesFingerprints['samples']
    var lsize = Object.keys(listImages).length
    if(lsize != null && lsize != undefined) {
      this.currentImageFinger = listImages[0]
      this.currentImageFinger = this.currentImageFinger.replace(/_/g, "/")
      this.currentImageFinger = this.currentImageFinger.replace(/-/g, "+")
      this.appService.setFingerPrint(this.currentImageFinger)
    }
  }

}
