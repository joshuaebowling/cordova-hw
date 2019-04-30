import React, { useState } from "react";

import ScanStore from "../../services/ScanStore";
import BluetoothService from "../../services/bluetooth";
import ErrorBoundary from "../ErrorBoundary";

const StopScan = ({ stop, name }) => {
  return <button onClick={stop}>Stop {name}</button>;
};
const StartScan = ({ start }) => {
  return <button onClick={start}>Start</button>;
};
const ScanButton = ({ stopScan, startScan, scanning, name }) => {
  return scanning ? (
    <StopScan stop={stopScan} name={name} />
  ) : (
    <StartScan start={startScan} />
  );
};

const scan = (
  params: object,
  currentScans: Array<BluetoothlePlugin.ScanStatus>,
  setCurrentScans: Function
) => {
  console.log("params", params);
  const btService = new BluetoothService(bluetoothle);
  const onData = (data: BluetoothlePlugin.ScanStatus) => {
    if (data.status === "scanStarted") {
      return;
    }
    console.log(data);
    updateScans(currentScans, data, setCurrentScans);
  };
  const onErr = ({ err, rest }) => console.log("error", err, rest);
  const startScan = btService.startScan(onData, onErr)(params);
  setInterval(() => stopScan(), 20000);
};

const stopScan = () => {
  const btService = new BluetoothService(bluetoothle);
  return btService.stopScan();
};

const updateScans = (
  currentScans: Array<BluetoothlePlugin.ScanStatus>,
  newResult: BluetoothlePlugin.ScanStatus,
  setCurrentScans: Function
) => {
  if (!currentScans.find(x => x.address === newResult.address)) {
    setCurrentScans([newResult]);
  }
};

const CurrentScans = ({ scans }) => {
  console.log("scans", scans);
  return (
    <tr>
      <td>No Matches Yet</td>
    </tr>
  );

  // if (scans.length === 0)
  //   return (
  //     <tr>
  //       <td>No Matches Yet</td>
  //     </tr>
  //   );
  // return scans.forEach((x, i) => (
  //   <tr key={i}>
  //     <td>{x.address}</td>
  //   </tr>
  // ));
};

const Scan = () => {
  const [currentScan, setCurrentScan] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [currentResults, setCurrentResults] = useState([]);
  return (
    <div>
      <h3>Choose a Scan</h3>
      <select
        onChange={e => {
          console.log("selected", e.target.value);
          var scan = ScanStore.find(e.target.value);
          console.log("scan", scan);
          setCurrentScan(scan);
        }}
        value={currentScan ? currentScan.name : ""}
      >
        <option key={-1} value="select">
          select
        </option>
        {ScanStore.fetch().map((sc, i) => (
          <option key={i} value={sc.name}>
            {sc.name}
          </option>
        ))}
      </select>
      <ScanButton
        scanning={scanning}
        name={currentScan ? currentScan.name : ""}
        stopScan={e => {
          stopScan()
            .then(result => {
              setScanning(false);
              console.log("them>", result);
            })
            .catch(err => {
              setScanning(false);
              console.log("catch", err);
            });
        }}
        startScan={e => {
          scan(currentScan, currentResults, setCurrentResults);
        }}
      />
      <h3>Results{currentResults.length}</h3>
      <table>
        <thead>
          <tr>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          <ErrorBoundary>
            <CurrentScans scans={currentResults} />
          </ErrorBoundary>
        </tbody>
      </table>
      {JSON.stringify(currentResults)}
    </div>
  );
};

export default Scan;
