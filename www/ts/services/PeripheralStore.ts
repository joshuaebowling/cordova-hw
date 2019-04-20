/// <reference path="../../ts/index.d.ts" />
/// <reference path="../../../node_modules/cordova-plugin-bluetoothle/types/index.d.ts" />

import { remove } from "lodash";

import Basil from "basil.js";

import PeripheralModel from "../models/Peripheral";

const KEY = "bluetooth-testing-suite-peripheral";
const store = new Basil({
  namespace: KEY,
  storages: ["cookie", "local"],
  storage: "local",
  expireDays: 365
});

console.log(store);

const result: Services.IPeripheralStore = {
  find: (crit: string | number) => {
    const items = result.fetch();
    return items.find((periph: Params.peripheral) => periph.name === crit);
  },
  createModel: () => PeripheralModel(),
  update: (periph: Params.peripheral) => {
    if (periph.name === "") return;
    const periphs = result.fetch();
    const found = result.find(periph.name);
    if (!found) {
      periphs.push(periph);
    } else {
      const index = result.getIndex(periph);
      periphs[index] = periph;
    }
    store.set(KEY, periphs);
  },
  getIndex: (periph: Params.peripheral) =>
    result
      .fetch()
      .map((periph: Params.peripheral) => periph.name)
      .indexOf(periph.name),
  remove: (periph: Params.peripheral) => {
    const periphs = result.fetch();
    remove(
      periphs,
      (peripha: Params.peripheral) => peripha.name === periph.name
    );
    store.set(KEY, periphs);
  },
  fetch: () => {
    const fetched = store.get(KEY) || [];
    return fetched;
  },
  reset: () => store.set(KEY, null)
};

export default result;
