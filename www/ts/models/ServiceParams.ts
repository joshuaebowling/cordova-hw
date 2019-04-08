/// <reference path="../../ts/index.d.ts" />
/// <reference path="../../../node_modules/cordova-plugin-bluetoothle/types/index.d.ts" />
import { clone } from "lodash";
import Characteristic from "./Characteristic";
const addCharacteristic = () => Characteristic();
const serviceParams: Params.initService = {
  service: "1234",
  characteristics: [addCharacteristic()]
};

export { addCharacteristic };
export default () => clone(serviceParams);
