/// <reference path="../../../ts/index.d.ts" />
/// <reference path="../../../../node_modules/cordova-plugin-bluetoothle/types/index.d.ts" />

import React, { useState } from "react";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";

import Characteristics from "./Characteristics";

const ServiceOption = ({ type, name, value }) => {
  return (
    <div>
      <label htmlFor={name}>{name}</label>
      <input type="checkbox" id={name} defaultValue={value} />
    </div>
  );
};

const ServiceOptions = (serviceModel: Params.initService) => {
  const [currentCharacteristic, setCurrentCharacteristic] = useState(null);
  return (
    <div>
      <h1>Service Params</h1>
      <Formik
        initialValues={{
          name: serviceModel.service,
          characteristics: serviceModel.characteristics
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required("Required")
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
          console.log("chars", values.characteristics);
          // const ServiceParams = values.properties.map((name, value) => (
          //   <ServiceOption name={name} value={value} type={"properties"} />
          // ));
          // const ServicePermissions = values.permissions.map((name, value) => (
          //   <ServiceOption name={name} value={value} type={"permissions"} />
          // ));
          return (
            <form onSubmit={handleSubmit}>
              <label htmlFor="serviceName">Service Name</label>
              <input type="text" id="serviceName" defaultValue={values.name} />
              <Characteristics
                model={...values.characteristics}
                setCurrentCharacteristic={setCurrentCharacteristic}
              />
              {/* <h3>Service Params</h3>
              {ServiceParams}
              <h3>Permisions</h3>
              {ServicePermissions} */}
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ServiceOptions;
