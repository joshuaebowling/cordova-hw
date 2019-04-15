/// <reference path="../../../ts/index.d.ts" />
/// <reference path="../../../../node_modules/cordova-plugin-bluetoothle/types/index.d.ts" />

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { map } from "lodash";
import CharacteristicsStore from "../../services/CharacteristicStore";
import Characteristic from "./Characteristic";

const Characteristics = ({ match }) => {
  const [characteristics, setCharacteristics] = useState(
    CharacteristicsStore.fetch()
  );
  const CharacteristicLinks = () => {
    return characteristics.map(ch => <Characteristic characteristic={...ch} />);
  };
  const CharacteristicBody = () => {
    const onDelete = (ch: BluetoothlePlugin.Characteristic) => {
      CharacteristicsStore.remove(ch);
      setCharacteristics(CharacteristicsStore.fetch());
    };
    var result = map(characteristics, (ch, i) => (
      <tr key={i}>
        <td>
          <Link
            to={`${match.url}/characteristic/${ch.uuid}`}
            characteristic={...ch}
          >
            {ch.uuid}
          </Link>
        </td>
        <td>
          <button onClick={e => onDelete(ch)}>Delete</button>
        </td>
      </tr>
    ));
    return result;
  };
  return (
    <div>
      <h2>Characteristics</h2>
      <Link to={`${match.url}/characteristicnew`}>Add New Characteristic</Link>
      <table>
        <thead>
          <tr>
            <th>UUID</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          <CharacteristicBody />
        </tbody>
      </table>
    </div>
  );
};

export default Characteristics;
