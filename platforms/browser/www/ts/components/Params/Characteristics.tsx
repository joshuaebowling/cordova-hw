/// <reference path="../../../ts/index.d.ts" />
/// <reference path="../../../../node_modules/cordova-plugin-bluetoothle/types/index.d.ts" />

import React from "react";

const Characteristic = (model: BluetoothlePlugin.Characteristic) => {
  return <button>uuid: {model.uuid}</button>;
};

const Characteristics = (model: BluetoothlePlugin.Characteristic[]) => {
  const characteristics = model.map(ch => <Characteristic model={ch} />);
  return (
    <div>
      <h1>Characteristics</h1>
      {characteristics}
    </div>
  );
};

export default Characteristics;
