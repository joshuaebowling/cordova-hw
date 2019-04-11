/// <reference path="../../ts/index.d.ts" />
/// <reference path="../../../node_modules/cordova-plugin-bluetoothle/types/index.d.ts" />

import React from "react";
import Services from "./Services";

const ManageParams: Components.ServiceParams = ({ initParams }) => {
  return (
    <div>
      <Services />
    </div>
  );
};

export default ManageParams;
