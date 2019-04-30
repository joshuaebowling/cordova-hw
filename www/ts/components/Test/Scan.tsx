import React, { useState } from "react";

import ErrorBoundary from "../ErrorBoundary";

import ScanStore from "../../services/ScanStore";
import BluetoothService from "../../services/bluetooth";

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

  if (scans.length === 0) return <li key={"a"}>No Matches</li>;
  return scans.forEach((x, i) => <li key={i}>{x.address}</li>);
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
      <ErrorBoundary>
        <ul>
          {currentResults.forEach(x => (
            <span>{JSON.stringify(x)}</span>
          ))}
        </ul>
      </ErrorBoundary>
      <pre>{JSON.stringify(currentResults, null, 2)}</pre>
    </div>
  );
};

export default Scan;
