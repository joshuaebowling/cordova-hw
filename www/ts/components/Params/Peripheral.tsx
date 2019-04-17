/// <reference path="../../../ts/index.d.ts" />
/// <reference path="../../../../node_modules/cordova-plugin-bluetoothle/types/index.d.ts" />

import React from "react";
import { Formik } from "formik";

import PeripheralStore from "../../services/PeripheralStore";

const Peripheral = ({ peripheral }) => {
  return (
    <Formik
      onSubmit={(values, { setSubmitting }) => {
        PeripheralStore.update(values);
      }}
      initialValues={...peripheral}
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
              <label htmlFor="restoreKey">Restore Key</label>
              <input
                type="text"
                id="restoreKey"
                value={values.restoreKey}
                onChange={handleChange}
              />
            </fieldset>
            <fieldset>
              <label htmlFor="request">Request enable bluetooth</label>
              <select
                id="request"
                value={values.request}
                onChange={handleChange}
              >
                <option value={true}>True</option>
                <option value={false}>False</option>
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

export default Peripheral;
