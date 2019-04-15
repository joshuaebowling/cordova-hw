import React from "react";

import { Formik, FieldArray } from "formik";
import * as Yup from "yup";
import { map } from "lodash";

import CharacteristicStore from "../../services/CharacteristicStore";

const Permissions = ({ permissions, handleChange }) => {
  return map(permissions, (permission, key) => (
    <div>
      <label htmlFor={key} key={`$label{key}`}>{key}</label>
      <input
        type="checkbox"
        id={key}
        key={key}
        name={`permissions.${key}`}
        checked={permission}
        onChange={handleChange}
        />
    </div>
  ));http://localhost:8000/?read=on&writeWithoutResponse=on&write=on&notify=on&indicate=on&authenticatedSignedWrites=on&notifyEncryptionRequired=on&indicateEncryptionRequired=on&read=on&write=on&readEncryptionRequired=on&writeEncryptionRequired=on#/parameters
};

const Properties = ({ properties, handleChange }) => {
  return map(properties, (prop, key) => {
    return (
      <div>
        <label htmlFor={key}>{key}</label>
        <input
          type="checkbox"
          key={key}
          id={key}
          name={`properties.${key}`}
          checked={prop}
          onChange={handleChange}
        />
      </div>
    );
  });
};

const Characteristic = ({ characteristic }) => {
  console.log(characteristic);
  return (
    <Formik
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        CharacteristicStore.update(values);
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 500);
      }}
      initialValues={...characteristic}
    >
      {props => {
        const {
          values,
          touched,
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
            <label htmlFor="uuid">UUID</label>
            <input type="text" id="uuid" value={values.uuid} onChange={handleChange} />
            <h3>Service Properties</h3>
            <Properties properties={values.properties} handleChange={handleChange} />
            <h3>Permisions</h3>
            <Permissions permissions={values.permissions} handleChange={handleChange} />
            <button type="submit">Submit</button>
          </form>
        );
      }}
    </Formik>
  );
};

export default Characteristic;
