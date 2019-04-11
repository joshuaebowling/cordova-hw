/// <reference path="../../ts/index.d.ts" />
/// <reference path="../../../node_modules/cordova-plugin-bluetoothle/types/index.d.ts" />

import React, { useState, useEffect } from "react";
import { Link, Route } from "react-router-dom";
import Select from "react-select";

import ServiceParamStore from "../services/ServiceParamStore";
import CharacteristicStore from "../services/CharacteristicStore";

const Service = ({ service, redirect, allCharacteristics }) => {
  const initialServiceParam =
    service === ""
      ? ServiceParamStore.createModel()
      : ServiceParamStore.find(service);
  const [characteristics, setCharacteristics] = useState(initialServiceParam);
  return (
    <div>
      <h3>{service || "new "}</h3>
      <Select
        options={allCharacteristics}
        value={characteristics}
        onChange={d => console.log(d)}
      />
    </div>
  );
};

const Services = ({}) => {
  const services = ServiceParamStore.fetch().map((svc: Params.initService) => (
    <tr>
      <td>
        <Link to={`/service/${svc.service}`}>{svc.service}</Link>
      </td>
    </tr>
  ));
  // const [serviceUpdated, setServiceUpdated] = useState(false);
  // useEffect(() => {
  //   if(serviceUpdated) {
  //     console.log('call to upate the table');
  //     setServiceUpdated(false);
  //   }
  // });
  const saveService = (svc: Params.initService) => {
    ServiceParamStore.update(svc);
  };
  return (
    <div>
      <Route
        path="/service/:name"
        render={({ match }) => {
          console.log(match.params);
          const service: Params.initService = ServiceParamStore.find(
            match.params.name
          );
          return (
            <Service
              service={match.params.name}
              redirect={true}
              allCharacteristics={CharacteristicStore.fetch().map(c => c.uuid)}
            />
          );
        }}
      />
      <Route
        path="/service_new"
        render={({ match }) => {
          return (
            <Service
              service={""}
              redirect={true}
              allCharacteristics={CharacteristicStore.fetch().map(c => c.uuid)}
            />
          );
        }}
      />
      <h2>Services</h2>
      <Link to="/service_new">Add New Service</Link>
      <table>
        <thead>
          <tr>
            <th>Service Name</th>
          </tr>
        </thead>
        <tbody>{services}</tbody>
      </table>
      {services}
    </div>
  );
};

export default Services;
