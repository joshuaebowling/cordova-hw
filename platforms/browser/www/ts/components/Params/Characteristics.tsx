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
    console.log("chars", characteristics);
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
      </tr>
    ));
    return result;
  };
  return (
    <div>
      <h2>Characteristics</h2>
      <Link to={`${match.url}/characteristic`}>Add New Characteristic</Link>
      <table>
        <thead>
          <tr>
            <th>UUID</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>test</td>
          </tr>
          <CharacteristicBody />
        </tbody>
      </table>
    </div>
  );
};

export default Characteristics;
