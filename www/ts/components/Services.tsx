/// <reference path="../../ts/index.d.ts" />
/// <reference path="../../../node_modules/cordova-plugin-bluetoothle/types/index.d.ts" />

import React, { useState, useEffect } from "react";
import { Link, Route } from "react-router-dom";

import ServiceParamStore from "../services/ServiceParamStore";

const Services = ({ match }) => {
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
      <h2>Services</h2>
      <Link to={`${match.url}/service_new`}>Add New Service</Link>
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
