/// <reference path="../../ts/index.d.ts" />
/// <reference path="../../../node_modules/cordova-plugin-bluetoothle/types/index.d.ts" />

import { assign, remove, orderBy, last } from "lodash";

import Basil from "basil.js";

import ServiceParamModel from "../models/ServiceParams";

const KEY = "bluetooth-testing-suite-serviceParams";
const store = new Basil({
  namespace: KEY,
  storages: ["cookie", "local"],
  storage: "local",
  expireDays: 365
});

console.log(store);

const result: Services.IServiceParamStore = {
  find: (crit: string | number) => {
    const items = result.fetch();
    return items.find((svc: Params.initService) => svc.service === crit);
  },
  createModel: () => ServiceParamModel(),
  update: (svc: Params.initService) => {
    if (svc.service === "") return;
    const svcs = result.fetch();
    const found = result.find(svc.service);
    if (!found) {
      svcs.push(svc);
    } else {
      svcs[result.getIndex(svc)] = svc;
    }
    store.set(KEY, svcs);
  },
  getIndex: (svc: Params.initService) => result.getIndex(svc),
  remove: (svc: Params.initService) => {
    const svcs = result.fetch();
    remove(svcs, (svca: Params.initService) => svca.service === svc.service);
    store.set(KEY, svcs);
  },
  fetch: () => {
    const fetched = store.get(KEY) || [];
    return fetched;
  },
  reset: () => store.set(KEY, null)
};

export default result;
