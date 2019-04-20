/// <reference path="../../../ts/index.d.ts" />
/// <reference path="../../../../node_modules/cordova-plugin-bluetoothle/types/index.d.ts" />

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { map } from "lodash";
import ScanStore from "../../services/ScanStore";
import Scan from "./Scan";

const Scans = ({ match }) => {
  const [peripherals, setScans] = useState(ScanStore.fetch());
  const ScanLinks = () => {
    return peripherals.map(pe => <Scan peripheral={...pe} />);
  };
  const ScanBody = () => {
    const onDelete = (sc: BluetoothlePlugin.ScanParams) => {
      ScanStore.remove(sc);
      setScans(ScanStore.fetch());
    };
    var result = map(peripherals, (sc, i) => (
      <tr key={i}>
        <td>
          <Link to={`${match.url}/scan/${sc.name}`} peripheral={...sc}>
            {sc.name}
          </Link>
        </td>
        <td>
          <button onClick={e => onDelete(sc)}>Delete</button>
        </td>
      </tr>
    ));
    return result;
  };
  return (
    <div>
      <h2>Scans</h2>
      <Link to={`${match.url}/scannew`}>Add New Scan</Link>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          <ScanBody />
        </tbody>
      </table>
    </div>
  );
};

export default Scans;
