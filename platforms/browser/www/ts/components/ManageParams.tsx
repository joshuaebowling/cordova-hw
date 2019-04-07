/// <reference path="../../ts/index.d.ts" />
/// <reference path="../../../node_modules/cordova-plugin-bluetoothle/types/index.d.ts" />

import React from "react";
import ServiceOptions from "./Params/ServiceOptions";

const ManageParams: Components.ServiceParams = ({ initParams }) => {
  return (
    <div>
      <ServiceOptions name="test" params={[]} />
    </div>
  );
};

export default ManageParams;
