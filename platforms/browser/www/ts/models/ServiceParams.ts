/// <reference path="../../ts/index.d.ts" />
/// <reference path="../../../node_modules/cordova-plugin-bluetoothle/types/index.d.ts" />
import { clone } from "lodash";

const serviceParams: Params.initService = {
  service: "1234",
  characteristics: []
};

export default () => clone(serviceParams);
