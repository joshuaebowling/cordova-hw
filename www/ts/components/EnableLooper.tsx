/// <reference path="../index.d.ts" />
import React, { useState, useEffect } from "react";

const EnableLooper = ({enabled, dispatch, isEnabled}) => {
  const [localEnabled, setLocalEnabled] = useState(enabled);
  useEffect(() => {
    var shouldRun: boolean = true;
    shouldRun = enabled !== localEnabled;

  });
  isEnabled()
    .then()
  return (React.Fragment);
};

export default EnableLooper;