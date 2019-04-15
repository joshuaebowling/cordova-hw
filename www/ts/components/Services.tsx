/// <reference path="../../ts/index.d.ts" />
/// <reference path="../../../node_modules/cordova-plugin-bluetoothle/types/index.d.ts" />

import React, { useState, useEffect } from "react";
import { Link, Route } from "react-router-dom";

import ServiceParamStore from "../services/ServiceParamStore";

const Services = ({ match }) => {
  const onDelete = (svc: Params.initService) => {
    ServiceParamStore.remove(svc);
    setServices(ServiceParamStore.fetch());
  };
  const [services, setServices] = useState(ServiceParamStore.fetch());
  const serviceBody = services.map((svc: Params.initService, i: number) => (
    <tr key={i}>
      <td>
        <Link to={`service/${svc.service}`}>{svc.service}</Link>
      </td>
      <td>
        <button onClick={e => onDelete(svc)}>Delete</button>
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
        <tbody>{serviceBody}</tbody>
      </table>
    </div>
  );
};

export default Services;
