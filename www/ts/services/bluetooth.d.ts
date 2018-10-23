export interface IBluetoothService {
  initialize(): Promise;
  initializePeripheral(params: object): Promise;
}