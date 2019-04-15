/// <reference path="../../ts/index.d.ts" />
/// <reference path="../../../node_modules/cordova-plugin-bluetoothle/types/index.d.ts" />

import { clone } from "lodash";

const advert: Params.advertise = {
  services: ["1234"], //iOS
  service: "1234",
  name: "my",
  mode: "balanced",
  connectable: true,
  timeout: 20000,
  powerLevel: "high",
  includeDeviceName: true
};

export default () => clone(advert);
