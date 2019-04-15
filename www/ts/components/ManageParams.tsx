/// <reference path="../../ts/index.d.ts" />
/// <reference path="../../../node_modules/cordova-plugin-bluetoothle/types/index.d.ts" />

import React, { useState } from "react";
import { Route, NavLink } from "react-router-dom";
import Select from "react-select";

import CharacteristicStore from "../services/CharacteristicStore";
import ServiceParamStore from "../services/ServiceParamStore";
import Services from "./Services";
import Service from "./Params/Service";
import Characteristics from "./Params/Characteristics";
import Characteristic from "./Params/Characteristic";

const ManageParams: Components.ServiceParams = ({ match }) => {
  return (
    <div>
      <nav>
        <NavLink to={`${match.url}/Services`}>Services</NavLink>
        <NavLink to={`${match.url}/Characteristics`}>Characteristics</NavLink>
        <NavLink to="/Advertisements">Advertisements</NavLink>
      </nav>
      <Route
        path={`${match.url}/services`}
        render={e => <Services match={match} />}
      />
      <Route
        path={`/parameters/service/:name`}
        render={({ match }) => {
          console.log(match.params);
          const service: Params.initService = ServiceParamStore.find(
            match.params.name
          );
          return (
            <Service
              service={match.params.name}
              characteristics={service.characteristics}
            />
          );
        }}
      />
      <Route
        path={`${match.url}/service_new`}
        render={({ match }) => {
          return <Service service={""} characteristics={[]} />;
        }}
      />
      <Route
        path={`${match.url}/characteristics`}
        render={e => <Characteristics match={match} />}
      />
      <Route
        path={`${match.url}/characteristic/:uuid`}
        render={({ match }) => {
          const service: Params.initService = ServiceParamStore.find(
            match.params.uuid
          );
          return (
            <Characteristic
              characteristic={CharacteristicStore.find(match.params.uuid)}
            />
          );
        }}
      />
      <Route
        path={`${match.url}/characteristicnew`}
        render={({ match }) => {
          return (
            <Characteristic
              characteristic={CharacteristicStore.createModel()}
            />
          );
        }}
      />
    </div>
  );
};

export default ManageParams;
