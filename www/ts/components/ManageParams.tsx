/// <reference path="../../ts/index.d.ts" />
/// <reference path="../../../node_modules/cordova-plugin-bluetoothle/types/index.d.ts" />

import React from "react";
import Service from "./Params/Service";
import { keys } from "lodash";
import Model from "../models/ServiceParams";

const model: Params.initService = Model();

const ManageParams: Components.ServiceParams = ({ initParams }) => {
  return (
    <div>
      <Service {...model} />
    </div>
  );
};

export default ManageParams;
