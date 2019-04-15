/// <reference path="../../ts/index.d.ts" />
/// <reference path="../../../node_modules/cordova-plugin-bluetoothle/types/index.d.ts" />

import { assign, remove, orderBy, last } from "lodash";

import Basil from "basil.js";

import Model from "../models/Characteristic";

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
    return items.find((advert: Params.advertise) => advert.name === crit);
  },
  createModel: () => Model(),
  update: (adv: Params.advertise) => {
    if (adv.name === "") return;
    const advs = result.fetch();
    const found = result.find(adv.name);
    if (!found) {
      advs.push(adv);
    } else {
      advs[result.getIndex(adv)] = adv;
    }
    store.set(KEY, advs);
  },
  getIndex: (adv: Params.advertise) =>
    result
      .fetch()
      .map((advert: Params.advertise) => advert.name)
      .indexOf(adv.name),
  remove: (adv: Params.advertise) => {
    const advs = result.fetch();
    remove(advs, (advert: Params.advertise) => advert.name === adv.name);
    store.set(KEY, advs);
  },
  fetch: () => {
    const fetched = store.get(KEY) || [];
    return fetched;
  },
  reset: () => store.set(KEY, null)
};

export default result;
