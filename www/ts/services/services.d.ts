declare namespace Params {
  interface initService { service: string, characteristics: BluetoothlePlugin.Characteristic[] }
  type advertising =  BluetoothlePlugin.AdvertisingParams
  type peripheral = BluetoothlePlugin.InitPeripheralParams
  interface advertise  { peripheral: peripheral, service: initService, advertisement: advertising}
}

declare namespace Services {
  type Status = BluetoothlePlugin.Status;
  interface BluetoothService  {
    
    initialize(): Promise<object>;
    initializePeripheral(params: BluetoothlePlugin.InitPeripheralParams): Promise<object>;
    addService(params: Params.initService): Promise<object>;
    startAdvertising(params: Params.advertising) : Promise<{ status: Status}>;
    advertise(params: {service: Params.initService, advertisement: Params.advertising, peripheral: Params.peripheral })
  }
}

declare namespace Response {
  interface statusResult { status: Services.Status }
  type resultError : BluetoothlePlugin.Error;
  interface advertiseResponse {
    intialize: statusResult | resultError,
    peripheral: statusResult | resultError,
    service: statusResult | resultError,
    advertise: statusResult | resultError
  }
}