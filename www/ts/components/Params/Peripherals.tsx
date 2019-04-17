/// <reference path="../../../ts/index.d.ts" />
/// <reference path="../../../../node_modules/cordova-plugin-bluetoothle/types/index.d.ts" />

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { map } from "lodash";
import PeripheralsStore from "../../services/PeripheralStore";
import Peripheral from "./Peripheral";

const Peripherals = ({ match }) => {
  const [peripherals, setPeripherals] = useState(PeripheralsStore.fetch());
  const PeripheralLinks = () => {
    return peripherals.map(pe => <Peripheral peripheral={...pe} />);
  };
  const PeripheralBody = () => {
    const onDelete = (pe: Params.peripheral) => {
      PeripheralsStore.remove(pe);
      setPeripherals(PeripheralsStore.fetch());
    };
    var result = map(peripherals, (pe, i) => (
      <tr key={i}>
        <td>
          <Link to={`${match.url}/peripheral/${pe.name}`} peripheral={...pe}>
            {pe.name}
          </Link>
        </td>
        <td>
          <button onClick={e => onDelete(pe)}>Delete</button>
        </td>
      </tr>
    ));
    return result;
  };
  return (
    <div>
      <h2>Peripherals</h2>
      <Link to={`${match.url}/peripheralnew`}>Add New Peripheral</Link>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          <PeripheralBody />
        </tbody>
      </table>
    </div>
  );
};

export default Peripherals;
