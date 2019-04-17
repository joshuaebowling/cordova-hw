/// <reference path="../../ts/index.d.ts" />
/// <reference path="../../../node_modules/cordova-plugin-bluetoothle/types/index.d.ts" />

import { assign, remove, orderBy, last } from "lodash";

import Basil from "basil.js";

import Model from "../models/Advert";

const KEY = "bluetooth-testing-suite-advertisement";

const store = new Basil({
  namespace: KEY,
  storages: ["cookie", "local"],
  storage: "local",
  expireDays: 365
});

const result: Services.IAdvertiseStore = {
  find: (crit: string | number) => {
    var items = result.fetch();
    console.log("items", items);
    return items.find(
      (advert: BluetoothlePlugin.AdvertisingParamsAndroid) =>
        advert.uuid === crit
    );
  },
  createModel: () => Model(),
  update: (adv: BluetoothlePlugin.AdvertisingParamsAndroid) => {
    if (adv.uuid === "") return;
    const advs = result.fetch();
    const found = result.find(adv.uuid);
    if (!found) {
      advs.push(adv);
    } else {
      advs[result.getIndex(adv)] = adv;
    }
    store.set(KEY, advs);
  },
  getIndex: (adv: BluetoothlePlugin.AdvertisingParamsAndroid) =>
    result
      .fetch()
      .map(
        (advert: BluetoothlePlugin.AdvertisingParamsAndroid) => advert.service
      )
      .indexOf(adv.service),
  remove: (adv: BluetoothlePlugin.AdvertisingParamsAndroid) => {
    const advs = result.fetch();
    remove(
      advs,
      (advert: BluetoothlePlugin.AdvertisingParamsAndroid) =>
        advert.service === adv.service
    );
    store.set(KEY);
  },
  fetch: () => {
    const fetched = store.get(KEY) || [];
    return fetched;
  },
  reset: () => store.set(KEY, null)
};

export default result;
