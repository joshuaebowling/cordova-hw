/// <reference path="../../ts/index.d.ts" />
/// <reference path="../../../node_modules/cordova-plugin-bluetoothle/types/index.d.ts" />

import { remove } from "lodash";

import Basil from "basil.js";

import Model from "../models/Scan";

const KEY = "bluetooth-testing-suite-scan";
const store = new Basil({
  namespace: KEY,
  storages: ["cookie", "local"],
  storage: "local",
  expireDays: 365
});

const result: Services.IScanStore = {
  find: (crit: string | number) => {
    const items = result.fetch();
    return items.find(
      (scan: BluetoothlePlugin.ScanParams) => scan.name === crit
    );
  },
  createModel: () => Model(),
  update: (scan: BluetoothlePlugin.ScanParams) => {
    if (scan.name === "") return;
    const scans = result.fetch();
    const found = result.find(scan.name);
    if (!found) {
      scans.push(scan);
    } else {
      const index = result.getIndex(scan);
      scans[index] = scan;
    }
    store.set(KEY, scans);
  },
  getIndex: (scan: BluetoothlePlugin.ScanParams) =>
    result
      .fetch()
      .map((scan: BluetoothlePlugin.ScanParams) => scan.name)
      .indexOf(scan.name),
  remove: (scan: BluetoothlePlugin.ScanParams) => {
    const scans = result.fetch();
    remove(
      scans,
      (scana: BluetoothlePlugin.ScanParams) => scana.name === scan.name
    );
    store.set(KEY, scans);
  },
  fetch: () => {
    const fetched = store.get(KEY) || [];
    return fetched;
  },
  reset: () => store.set(KEY, null)
};

export default result;
