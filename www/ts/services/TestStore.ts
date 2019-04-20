/// <reference path="../../ts/index.d.ts" />
/// <reference path="../../../node_modules/cordova-plugin-bluetoothle/types/index.d.ts" />

import AdvertiseStore from "./AdvertiseStore";
import ServiceParamStore from "./ServiceParamStore";
import CharacteristicStore from "./CharacteristicStore";
import PeripheralStore from "./PeripheralStore";

const result = {
  advertisements: () => {
    return AdvertiseStore.fetch();
  },
  getService: (serviceName: string) => {
    const service = ServiceParamStore.find(serviceName);
    service.characteristics = service.characteristics.map(name =>
      CharacteristicStore.find(name)
    );
    service.characteristics = service.characteristics.filter(
      x => x !== undefined
    );
    return service;
  },
  getCharacteristics: (uuids: Array<string>) => {
    return uuids.map(uuid => CharacteristicStore.find(uuid));
  },
  getTestData: (advertiseUUID: string, periphName: string) => {
    const advert: BluetoothlePlugin.AdvertisingParamsAndroid = AdvertiseStore.find(
      advertiseUUID
    );
    const service: Params.initService = result.getService(advert.service);
    const periph: Params.peripheral = PeripheralStore.find(periphName);
    const paramPackage: Params.advertise = {
      advertisement: AdvertiseStore.find(advertiseUUID),
      service: service,
      peripheral: periph
    };
    return paramPackage;
  },
  getPeripherals: () => {
    return PeripheralStore.fetch();
  }
};

export default result;
