/// <reference path="../../../ts/index.d.ts" />
/// <reference path="../../../../node_modules/cordova-plugin-bluetoothle/types/index.d.ts" />

import React from "react";
import { Formik } from "formik";
import { map } from "lodash";
import ScanStore from "../../services/ScanStore";

const ScanModes = () => {
  const scanModes = {
    SCAN_MODE_OPPORTUNISTIC: -1,
    SCAN_MODE_LOW_POWER: 0,
    SCAN_MODE_BALANCED: 1,
    SCAN_MODE_LOW_LATENCY: 2
  };
  return map(scanModes, (sm, key) => <option value={sm}>{key}</option>);
};

const MatchModes = () => {
  const matchModes = {
    MATCH_MODE_AGRESSIVE: 1,
    MATCH_MODE_STICKY: 2
  };
  return map(matchModes, (mode, key) => <option value={mode}>{key}</option>);
};

const MatchNums = () => {
  const matchNums = {
    MATCH_NUM_ONE_ADVERTISEMENT: 1,
    MATCH_NUM_FEW_ADVERTISEMENT: 2,
    MATCH_NUM_MAX_ADVERTISEMENT: 3
  };
  return map(matchNums, (mn, key) => <option value={mn}>{key}</option>);
};

const CallbackTypes = () => {
  const callbackTypes = {
    CALLBACK_TYPE_ALL_MATCHES: 1,
    CALLBACK_TYPE_FIRST_MATCH: 2,
    CALLBACK_TYPE_MATCH_LOST: 4
  };
  return map(callbackTypes, (cb, key) => <option value={cb}>{key}</option>);
};
const Scan = ({ scan }) => {
  return (
    <Formik
      onSubmit={(values, { setSubmitting }) => {
        ScanStore.update(values);
      }}
      initialValues={...scan}
    >
      {props => {
        const {
          values,
          touched,
          setFieldValue,
          setFieldTouched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset
        } = props;
        return (
          <form onSubmit={handleSubmit}>
            <fieldset>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={values.name}
                onChange={handleChange}
              />
            </fieldset>
            <fieldset>
              <label htmlFor="services">Services</label>
              <input
                type="text"
                id="services"
                value={values.services}
                onChange={handleChange}
              />
            </fieldset>
            <fieldset>
              <label htmlFor="allowDuplicates">Allow Duplicates</label>
              <select
                id="allowDuplicates"
                value={values.allowDuplicates}
                onChange={handleChange}
              >
                <option value={true}>True</option>
                <option value={false}>False</option>
              </select>
            </fieldset>
            <fieldset>
              <label htmlFor="scanMode">Scan Mode</label>
              <select
                id="scanMode"
                value={values.scanMode}
                onChange={handleChange}
              >
                {ScanModes()}
              </select>
            </fieldset>
            <fieldset>
              <label htmlFor="matchMode">Match Mode</label>
              <select
                id="matchMode"
                value={values.matchMode}
                onChange={handleChange}
              >
                {MatchModes()}
              </select>
            </fieldset>
            <fieldset>
              <label htmlFor="matchNum">Match Number</label>
              <select
                id="matchNum"
                value={values.matchNum}
                onChange={handleChange}
              >
                {MatchNums()}
              </select>
            </fieldset>
            <fieldset>
              <label htmlFor="callbackType">Callback type</label>
              <select
                id="callbackType"
                value={values.callbackType}
                onChange={handleChange}
              >
                {CallbackTypes()}
              </select>
            </fieldset>
            <button type="submit" enabled={dirty}>
              Submit
            </button>
          </form>
        );
      }}
    </Formik>
  );
};

export default Scan;
