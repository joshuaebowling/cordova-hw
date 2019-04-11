import React from "react";

import { Formik, FieldArray } from "formik";
import * as Yup from "yup";
import { map } from "lodash";

const Permissions = ({ permissions }) => {
  return map(permissions, (permission, key) => (
    <div>
      <label htmlFor={key}>{key}</label>
      <input type="checkbox" id={key} name={key} checked={permission} />
    </div>
  ));
};

const Properties = ({ properties }) => {
  return map(properties, (prop, key) => {
    return (
      <div>
        <label htmlFor={key}>{key}</label>
        <input type="checkbox" id={key} name={key} checked={prop} />
      </div>
    );
  });
};

const Characteristic = ({ characteristic }) => {
  return (
    <Formik
      initialValues={...characteristic}
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
        return (
          <form onSubmit={handleSubmit}>
            <label htmlFor="uuid">UUID</label>
            <input type="text" id="uuid" defaultValue={values.uuid} />
            <h3>Service Properties</h3>
            <Properties properties={values.properties} />
            <h3>Permisions</h3>
            <Permissions permissions={values.permissions} />
          </form>
        );
      }}
    </Formik>
  );
};

export default Characteristic;
