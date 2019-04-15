/// <reference path="../../../ts/index.d.ts" />
/// <reference path="../../../../node_modules/cordova-plugin-bluetoothle/types/index.d.ts" />

import React, { useState } from "react";
import { Link, Route } from "react-router-dom";
import Select from "react-select";

import CharacteristicStore from "../../services/CharacteristicStore";
import ServiceParamStore from "../../services/ServiceParamStore";

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
  return characteristics.map((ch, index) => {
    return (
      <Route
        key={index}
        path="/test/parameters/service/characteristic/:uuid"
        render={e => {
          return <Characteristic characteristic={...ch} />;
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

const ServiceNameEditor = ({ name }) => {
  const [serviceName, setServiceName] = useState(name);
};

const ServiceName = ({ saved, name, setName }) => {
  if (!saved) {
    return (
      <React.Fragment>
        <label htmlFor="serviceName">Service Name</label>
        <input
          type="text"
          id="serviceName"
          defaultValue={name}
          readOnly={saved}
          onChange={e => setName(e.target.value)}
        />
      </React.Fragment>
    );
  } else {
    return <h3>Service {name}</h3>;
  }
};

const ServiceOptions = (serviceModel: Params.initService) => {
  const allCharacteristics = CharacteristicStore.fetch();
  const [serviceName, setServiceName] = useState(serviceModel.service);
  const [characteristics, setCharacteristics] = useState(
    serviceModel.characteristics
  );
  console.log(characteristics);
  const save = () => {
    console.log("save");
    ServiceParamStore.update({
      service: serviceName,
      characteristics
    });
  };
  return (
    <div>
      <h2>Characteristics</h2>
      <CharacteristicLinks characteristics={...characteristics} />
      <CharacteristicRoutes characteristics={...characteristics} />
      <form onSubmit={save}>
        <ServiceName
          name={serviceName}
          setName={setServiceName}
          saved={serviceModel.service !== ""}
        />
        <Select
          isMulti={true}
          options={allCharacteristics.map(ch => ({
            value: ch.uuid,
            label: ch.uuid
          }))}
          values={characteristics.map(ch => ch.uuid)}
          onChange={selectedOption => {
            setCharacteristics(selectedOption.map(s => s.value));
          }}
        />
        <button
          onClick={e =>
            ServiceParamStore.update({
              service: serviceName,
              characteristics
            })
          }
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ServiceOptions;
