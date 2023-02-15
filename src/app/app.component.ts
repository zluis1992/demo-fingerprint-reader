import { Component, OnInit } from '@angular/core';

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
  currentImageFinger:any

  private reader: FingerprintReader

  constructor(){
    this.reader = new FingerprintReader()
  }

  ngOnInit(): void {
    this.reader = new FingerprintReader()
    this.reader.on("DeviceConnected", this.onDeviceConnected)
    this.reader.on("DeviceDisconnected", this.onDeviceDisconnected)
    this.reader.on("AcquisitionStarted", this.onAcquisitionStarted)
    this.reader.on("AcquisitionStopped", this.onAcquisitionStopped)
    this.reader.on("SamplesAcquired", this.onSamplesAcquired)
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
    console.log("en el evento: onAcquisitionStarted");
    console.log(event);
   }

   private onAcquisitionStopped = (event: AcquisitionStopped) => {
    console.log("en el evento: onAcquisitionStopped");
    console.log(event);
   }

  private onSamplesAcquired = (event: SamplesAcquired) => {
  console.log("en el evento: onSamplesAcquired");
  console.log(event);
  this.ListaSamplesFingerprints= event
  }

  public ListarDispositivos() {
    Promise.all([
      this.reader.enumerateDevices()
    ])
    .then(result => {
      this.ListaFingerprintReader = result[0]
      console.log(this.ListaFingerprintReader)
    })
    .catch(error => console.log)
  }

  public InformacionDispositivos() {
    Promise.all([
      this.reader.getDeviceInfo(this.ListaFingerprintReader[0])
    ])
    .then(result => {
      this.InfoFingerprintReader = result[0]
      console.log(this.InfoFingerprintReader)
    })
    .catch(error => console.log)
  }

}
