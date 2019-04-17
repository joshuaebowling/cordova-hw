/// <reference path="../../../ts/index.d.ts" />
/// <reference path="../../../../node_modules/cordova-plugin-bluetoothle/types/index.d.ts" />

import React, { useState } from "react";
import { Link, Route } from "react-router-dom";
import Select from "react-select";

import AdvertiseStore from "../../services/AdvertiseStore";
import Advert from "./Advert";

const AdvertBody = ({ adverts, onDelete }) => {
  return adverts.map((adv, index) => (
    <tr>
      <td>
        {" "}
        <Link key={index} to={`/parameters/advert/${adv.uuid}`}>
          {adv.uuid}
        </Link>
      </td>
      <td>
        <button onClick={e => onDelete(adv)}>Delete</button>
      </td>
    </tr>
  ));
};

const Adverts = ({ match }) => {
  const [adverts, setAdverts] = useState(AdvertiseStore.fetch());

  return (
    <div>
      <h2>Adverts</h2>
      <Link to={"/parameters/advertnew"}>New Advert</Link>
      <table>
        <thead>
          <tr>
            <th>UUID</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          <AdvertBody
            adverts={adverts}
            onDelete={advert => {
              AdvertiseStore.remove(advert);
              setAdverts(AdvertiseStore.fetch());
            }}
          />
        </tbody>
      </table>
    </div>
  );
};

export default Adverts;
