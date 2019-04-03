declare namespace State {
  interface Test {
    
  }
}

declare namespace Services {
  interface BluetoothSerial {
    discover: () => Promise<Array<object> | Error>;
    enable: () => Promise<boolean | Error>;
    isEnabled: () => Promise<object>;
    setDiscoverable:() => Promise<object> | Error;
  }

}