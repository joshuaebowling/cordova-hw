import React, { useState, useEffect } from "react";
import TestStore from "../../services/TestStore";
import { first, isArray } from "lodash";
import BluetoothService from "../../services/bluetooth";

const CurrentAdvertisement = ({ advert }) => {
  return advert ? <div>Advert: {advert.uuid}</div> : <span />;
};
const CurrentPeriph = ({ periph }) => {
  return periph ? <div>Peripheral: {periph.name}</div> : <span />;
};

const StartTest = ({ testData }) => {
  const bluetoothService = new BluetoothService(bluetoothle);

  if (testData) {
    return (
      <button
        onClick={e => {
          console.log(testData);
          console.log("using advertise");
          bluetoothService.advertise({
            serviceParams: testData.service,
            peripheralParams: testData.peripheral,
            advertisementParams: testData.advertisement
          });
        }}
      >
        Advertise
      </button>
    );
  } else {
    return <span />;
  }
};

const Advertise = ({ bluetoothle }) => {
  const [advert, setAdvert] = useState(null);
  const [periph, setPeriph] = useState(null);
  const [testData, setTestData] = useState(null);
  const [testDataIsNew, setTestDataIsNew] = useState(false);
  useEffect(() => {
    if (advert && periph) {
      var tData = TestStore.getTestData(advert.uuid, periph.name);
      setTestData(tData);
      setTestDataIsNew(false);
    }
  });
  return (
    <div>
      <h3>Test Advertisement</h3>
      <CurrentAdvertisement advert={advert} />
      <CurrentPeriph periph={periph} />
      <h4>Adverts</h4>
      <div>
        {TestStore.advertisements().map(a => (
          <button
            onClick={e => {
              setAdvert(a);
            }}
          >
            {a.uuid}
          </button>
        ))}
      </div>
      <h4>Peripherals</h4>
      <div>
        {[TestStore.getPeripherals()].map(p => {
          p = isArray(p) ? first(p) : p;
          return (
            <button
              onClick={e => {
                setPeriph(p);
              }}
            >
              {p.name}
            </button>
          );
        })}
      </div>
      <StartTest testData={testData} />
    </div>
  );
};

export default Advertise;
