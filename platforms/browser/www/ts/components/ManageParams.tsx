/// <reference path="../../ts/index.d.ts" />
/// <reference path="../../../node_modules/cordova-plugin-bluetoothle/types/index.d.ts" />

import React, { useState } from "react";
import { Route } from "react-router-dom";
import Select from "react-select";

import ServiceParamStore from "../services/ServiceParamStore";
import Services from "./Services";
import Service from "./Params/Service";

// const Service = ({ service, redirect, allCharacteristics }) => {
//   const initialServiceParam =
//     service === ""
//       ? ServiceParamStore.createModel()
//       : ServiceParamStore.find(service);
//   const [characteristics, setCharacteristics] = useState(initialServiceParam);
//   return (
//     <div>
//       <h1>here</h1>
//       <h3>{service || "new "}</h3>
//       <Select
//         options={allCharacteristics}
//         value={characteristics}
//         onChange={d => console.log(d)}
//       />
//     </div>
//   );
// };

const ManageParams: Components.ServiceParams = ({ match }) => {
  return (
    <div>
      <Services match={match} />
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
              characteristics={service.characteristics}
            />
          );
        }}
      />
      <Route
        path={`${match.url}/service_new`}
        render={({ match }) => {
          console.log("matched");
          return <Service service={""} characteristics={[]} />;
        }}
      />
    </div>
  );
};

export default ManageParams;
