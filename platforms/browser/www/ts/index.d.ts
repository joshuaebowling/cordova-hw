declare namespace Params {
  interface initService {
    service: string;
    characteristics: BluetoothlePlugin.Characteristic[];
  }
  type advertising = BluetoothlePlugin.AdvertisingParams;
  type peripheral = BluetoothlePlugin.InitPeripheralParams;
  interface advertise {
    name: string;
    peripheral: peripheral;
    service: initService;
    advertisement: advertising;
  }
}

declare namespace Services {
  type Status = BluetoothlePlugin.Status;
  class BluetoothService {
    constructor(bluetoothle: BluetoothlePlugin.Bluetoothle);
    initialize(): Promise<object>;
    initializePeripheral(
      params: BluetoothlePlugin.InitPeripheralParams
    ): Promise<object>;
    addService(params: Params.initService): Promise<object>;
    startAdvertising(params: Params.advertising): Promise<{ status: Status }>;
    advertise(params: Params.advertise): Promise<any>;
  }
  interface ICharacteristicStore {
    find(crit: string | number): BluetoothlePlugin.Characteristic;
    createModel(): BluetoothlePlugin.Characteristic;
    update(snip: BluetoothlePlugin.Characteristic): void;
    getIndex(snip: BluetoothlePlugin.Characteristic): number;
    remove(snip: BluetoothlePlugin.Characteristic): void;
    fetch(): Array<BluetoothlePlugin.Characteristic>;
    reset(): void;
  }
  interface IServiceParamStore {
    find(crit: string | number): Params.initService;
    createModel(): Params.initService;
    update(snip: Params.initService): void;
    getIndex(snip: Params.initService): number;
    remove(snip: Params.initService): void;
    fetch(): Array<Params.initService>;
    reset(): void;
  }
  interface IAdvertiseStore {
    find(crit: string | number): BluetoothlePlugin.AdvertisingParams;
    createModel(): BluetoothlePlugin.AdvertisingParams;
    update(advert: BluetoothlePlugin.AdvertisingParams): void;
    getIndex(advert: BluetoothlePlugin.AdvertisingParams): number;
    remove(advert: BluetoothlePlugin.AdvertisingParams): void;
    fetch(): Array<BluetoothlePlugin.AdvertisingParams>;
    reset(): void;
  }
}

declare namespace Response {
  interface statusResult {
    status: Services.Status;
  }
  type resultError = BluetoothlePlugin.Error;
  interface advertiseResponse {
    intialize: statusResult | resultError;
    peripheral: statusResult | resultError;
    service: statusResult | resultError;
    advertise: statusResult | resultError;
  }
}

declare namespace Services {
  interface BluetoothSerial {
    discover: () => Promise<Array<object> | Error>;
    enable: () => Promise<boolean | Error>;
    isEnabled: () => Promise<object>;
    setDiscoverable: () => Promise<object> | Error;
  }
}

declare namespace Components {
  interface ServiceParamArguments {
    initParams: Params.initService;
  }
  class ServiceParams {
    constructor(options: ServiceParamArguments);
  }
}
