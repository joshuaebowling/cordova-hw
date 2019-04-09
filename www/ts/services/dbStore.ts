/// <reference path="../../ts/index.d.ts" />
/// <reference path="../../../node_modules/cordova-plugin-bluetoothle/types/index.d.ts" />

import { assign, remove, orderBy, last } from "lodash";

import Basil from "basil";

import CharacteristicModel from "../models/Characteristic";

const store = new Basil({
  namespace: "bluetooth-testing-suite-characteristic",
  storages: ["cookie", "local"],
  storage: "local",
  expireDays: 365
});

const Store = (
  KEY: string = "snippet",
  overrides = {}
): Services.ICharacteristicStore => {
  const result: Services.ICharacteristicStore = {
    find: (crit: string | number) => {
      var items = result.fetch();
      return items.find(
        (snip: BluetoothlePlugin.Characteristic) => snip.uuid === crit
      );
    },
    createModel: () => CharacteristicModel(),
    update: (ch: BluetoothlePlugin.Characteristic) => {
      if (ch.uuid === "") return;
      const chs = result.fetch();
      const found = result.find(ch.uuid);
      if (!found) {
        chs.push(ch);
      } else {
        chs[result.getIndex(ch)] = ch;
      }
      store.set(KEY, chs);
    },
    getIndex: (ch: BluetoothlePlugin.Characteristic) =>
      result
        .fetch()
        .map((snip: BluetoothlePlugin.Characteristic) => snip.uuid)
        .indexOf(ch.uuid) + 1,
    remove: (ch: BluetoothlePlugin.Characteristic) => {
      const chs = result.fetch();
      remove(
        chs,
        (snip: BluetoothlePlugin.Characteristic) => snip.uuid === ch.uuid
      );
      store.set(KEY, chs);
    },
    fetch: () => {
      const fetched = store.get(KEY) || [];
      return fetched;
    },
    reset: () => store.set(KEY, null)
  };
  return result;
};
