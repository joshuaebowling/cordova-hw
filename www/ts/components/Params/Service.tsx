/// <reference path="../../../ts/index.d.ts" />
/// <reference path="../../../../node_modules/cordova-plugin-bluetoothle/types/index.d.ts" />

import React, { useState } from "react";
import { Link, Route } from "react-router-dom";

import Characteristics from "./Characteristics";
import Characteristic from "./Characteristic";

const ServiceOption = ({ type, name, value }) => {
  return (
    <div>
      <label htmlFor={name}>{name}</label>
      <input type="checkbox" id={name} defaultValue={value} />
    </div>
  );
};

const CharacteristicRoutes = ({ characteristics }) => {
  console.log("cs=", characteristics);
  return characteristics.map((ch, index) => {
    console.log(ch.uuid);
    return (
      <Route
        key={index}
        path="/test/parameters/service/charateristic/:uuid"
        render={e => {
          <Characteristic characteristic={ch} />;
        }}
      />
    );
  });
};

const CharacteristicLinks = ({ characteristics }) => {
  return characteristics.map((ch, index) => (
    <Link key={index} to={`/test/parameters/service/characteristic/${ch.uuid}`}>
      {ch.uuid}
    </Link>
  ));
};
const ServiceOptions = (serviceModel: Params.initService) => {
  const [currentCharacteristic, setCurrentCharacteristic] = useState(null);
  return (
    <div>
      <h1>Service Params</h1>
      <CharacteristicRoutes characteristics={...serviceModel.characteristics} />
      <CharacteristicLinks characteristics={...serviceModel.characteristics} />
    </div>
  );
};

export default ServiceOptions;
