import React from "react";

import { Formik } from "formik";

import { txPowerLevels } from "../../models/Advert";
import ServiceParamStore from "../../services/ServiceParamStore";
import AdvertiseStore from "../../services/AdvertiseStore";

const Advert = ({ advert }) => {
  console.log("advert", advert);
  return (
    <Formik
      onSubmit={(values, { setSubmitting }) => {
        AdvertiseStore.update(values);
      }}
      initialValues={...advert}
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
        console.log("values", values);
        const modeOptions = ["balanced", "lowLatency", "lowPower"].map(o => (
          <option value={o}>{o}</option>
        ));
        const serviceOptions = ServiceParamStore.fetch().map(svc => (
          <option value={svc.service}>{svc.service}</option>
        ));
        return (
          <form onSubmit={handleSubmit}>
            <fieldset>
              <label htmlFor="uuid">UUID</label>
              <input
                type="text"
                id="uuid"
                value={values.uuid}
                onChange={handleChange}
              />
            </fieldset>
            <fieldset>
              <label htmlFor="service">Service</label>
              {/* <Select
                name="service"
                id="service"
                value={{ value: values.service, label: values.service }}
                options={ServiceParamStore.fetch().map(sp => ({
                  label: sp.service,
                  value: sp.service
                }))}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
              /> */}
              <select
                name="service"
                id="service"
                value={values.service}
                onChange={handleChange}
              >
                {serviceOptions}
              </select>
            </fieldset>
            <fieldset>
              <label htmlFor="mode">Mode</label>
              <select
                id="mode"
                name="mode"
                onChange={handleChange}
                value={values.mode}
              >
                {modeOptions}
              </select>
            </fieldset>
            {/* <Field
              name="mode"
              render={({ field }) => (
                <Select
                  {...field}
                  value={{ value: values.mode, label: values.mode }}
                  options={["balanced", "lowLatency", "lowPower"].map(o => ({
                    value: o,
                    label: o
                  }))}
                  onChange={e => {
                    console.log("changed", e);
                    setFieldTouched(e);
                  }}
                  onBlur={setFieldTouched}
                />
              )}
            /> */}
            <fieldset>
              <label htmlFor="connectable">Connectable</label>
              <select
                name="connectable"
                id="connectable"
                value={values.connectable}
                onChange={handleChange}
              >
                <option value={true}>True</option>
                <option value={false}>False</option>
              </select>
            </fieldset>
            <fieldset>
              <label htmlFor="timeout">Timeout</label>
              <input
                type="number"
                name="timeout"
                id="timeout"
                value={values.timeout}
                onChange={handleChange}
              />
            </fieldset>
            <fieldset>
              <label htmlFor="txPowerLevel">TX Power Level</label>
              <select
                name="txPowerLevel"
                id="txPowerLevel"
                value={values.txPowerLevel}
                onChange={handleChange}
              >
                {txPowerLevels.map(pl => (
                  <option value={pl}>{pl}</option>
                ))}
              </select>
            </fieldset>
            <fieldset>
              <label htmlFor="includeDeviceName">Include Device Name</label>
              <select
                name="includeDeviceName"
                id="includeDeviceName"
                value={values.includeDeviceName}
                onChange={handleChange}
              >
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </fieldset>
            <fieldset>
              <label htmlFor="includeTXPowerLevel">
                Include TX Power Level
              </label>
              <select
                name="includeTxPowerLevel"
                id="includeTxPowerLevel"
                value={values.includeTxPowerLevel}
                onChange={handleChange}
              >
                <option value={true}>Yes</option>
                <option value={false}>No</option>
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

export default Advert;
