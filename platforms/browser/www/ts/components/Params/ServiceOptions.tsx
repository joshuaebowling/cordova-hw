/// <reference path="../../../ts/index.d.ts" />
/// <reference path="../../../../node_modules/cordova-plugin-bluetoothle/types/index.d.ts" />

import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";

const ServiceOption = ({ type, name, value }) => {
  return (
    <div>
      <label htmlFor={name}>{name}</label>
      <input type="checkbox" id={name} value={value} />
    </div>
  );
};

const ServiceOptions = ({ name, params }) => {
  return (
    <div>
      <h1>Service Params</h1>
      <Formik
        initialValues={{ email: "" }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email()
            .required("Required")
        })}
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
          const ServiceParams = values.params.map((name, value) => (
            <ServiceOption name={name} value={value} type={"params"} />
          ));
          const ServicePermissions = values.params.map((name, value) => (
            <ServiceOption name={name} value={value} type={"params"} />
          ));
          return (
            <form onSubmit={handleSubmit}>
              <label htmlFor="serviceName">Service Name</label>
              <input type="text" id="serviceName" value={values.name} />
              <h3>Service Params</h3>
              <ServiceParams />
              <h3>Permisions</h3>
              <ServicePermissions />
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ServiceOptions;
