import React, { useReducer, useState, memo } from "react";
import { NavLink, Route } from "react-router-dom";
import { assign } from "lodash";
import bluetoothSerial from "../services/bluetoothSerial";
import StatusChecker from "./StatusChecker";
import ManageParams from "./ManageParams";

const ENABLE_STATUS = {
  NO: 0,
  YES: 1,
  TRYING: 2
};

const initialState = {
  enabled: ENABLE_STATUS.NO,
  error: null,
  discoverable: false
};

const reducer: Function = (state: object, action: object) => {
  const stateAddition = {};
  switch (action.type) {
    case actions.ENABLE_RQ:
      stateAddition.enabled = ENABLE_STATUS.TRYING;
      stateAddition.error = null;
      break;
    case actions.ENABLE_RS:
      stateAddition.enabled = action.payload;
      break;
    case actions.ENABLED_STATUS_RQ:
      stateAddition.enabled = action.payload;
      break;
    case actions.ERROR:
      stateAddition.error = action.payload;
      break;
    case actions.DISCOVERABLE_RQ:
      stateAddition.discoverable = true;
      break;
    case actions.UNDISCOVERABLE_RQ:
      stateAddition.discoverable = false;
      break;
  }
  return assign({}, state, stateAddition);
};

const actions = {
  ENABLE_RQ: "ENABLE_RQ",
  ENABLE_RS: "ENABLE_RS",
  ERROR: "ERROR",
  ENABLED_STATUS_RQ: "ENABLED_STATUS_RQ",
  DISCOVERABLE_RQ: "DISCOVERABLE_RQ",
  UNDISCOVERABLE_RQ: "UNDISCOVERABLE_RQ",
  enable: () => (dispatch: Function) => {
    dispatch({ type: actions.ENABLE_RQ, payload: null });
    const catcher = err => {
      dispatch({ type: actions.ENABLE_RS, payload: ENABLE_STATUS.NO });
      dispatch({ type: actions.ERROR, payload: "hopefully some error info" });
    };
    bluetoothSerial
      .enable()
      .then(() => {
        bluetoothSerial
          .isEnabled()
          .then(isEnabled => {
            dispatch({
              type: actions.ENABLE_RS,
              payload: isEnabled ? ENABLE_STATUS.YES : ENABLE_STATUS.NO
            });
          })
          .catch(catcher);
      })
      .catch(catcher);
  },
  setDiscoverable: () => (dispatch: Function) => {
    bluetoothSerial.setDiscoverable();
    dispatch({ type: actions.DISCOVERABLE_RQ, payload: null });
    setTimeout(() => {
      dispatch({ type: actions.UNDISCOVERABLE_RQ, payload: null });
    }, 120 * 1000);
  },
  isEnabled: () => (dispatch: Function) => {
    setTimeout(() => {
      console.log("timeout");
      bluetoothSerial
        .isEnabled()
        .then(isEnabled => {
          dispatch({
            type: actions.ENABLE_RS,
            payload: isEnabled ? ENABLE_STATUS.YES : ENABLE_STATUS.NO
          });
        })
        .catch(() => {
          dispatch({ type: actions.ENABLE_RS, payload: ENABLE_STATUS.NO });
        });
    }, 3000);
  },
  updateEnabledStatus: (enabled: boolean) => (dispatch: Function) => {
    dispatch({ type: actions.ENABLED_STATUS_RQ, payload: enabled });
  }
};

const BluetoothIsEnabled = () => {
  return <p>Bluetooth is Enabled</p>;
};

const IsDiscoverable = () => {
  return <p>Bluetooth is Discoverable</p>;
};

const Enable = ({ isEnabled, dispatch }) => {
  return isEnabled === ENABLE_STATUS.YES ? (
    <BluetoothIsEnabled />
  ) : (
    <div>
      <p>Enable</p>
      <button
        enabled={(isEnabled === ENABLE_STATUS.NO).toString()}
        onClick={e => actions.enable()(dispatch)}
      >
        Enable
      </button>
    </div>
  );
};

const Discoverable = ({ isDiscoverable, dispatch }) => {
  if (isDiscoverable) {
    return <IsDiscoverable />;
  } else {
    return (
      <div>
        <p>Make Discoverable</p>
        <button
          enabled={!isDiscoverable}
          onClick={e => actions.setDiscoverable()(dispatch)}
        >
          Discoverable
        </button>
      </div>
    );
  }
};

const EnabledDiscoverable = ({ isEnabled, isDiscoverable, dispatch }) => {
  if (isEnabled) {
    return <Discoverable isDiscoverable={isDiscoverable} dispatch={dispatch} />;
  } else {
    return <span />;
  }
};

const EnableError = memo(({ errorInfo }) => {
  return errorInfo === null ? <span /> : <p>{errorInfo}</p>;
});
export default () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <div>
        <NavLink to="/test/parameters">Parameters</NavLink>
        <Enable isEnabled={state.enabled} dispatch={dispatch} />
        <EnableError errorInfo={state.error} />
        <p>Discovery</p>
        <button onClick={e => console.log("discover")}>Discover</button>
        <EnabledDiscoverable
          isEnabled={state.enabled}
          isDiscoverable={state.discoverable}
          dispatch={dispatch}
        />
        <StatusChecker
          onAsyncCallComplete={enabled => {
            actions.updateEnabledStatus(enabled)(dispatch);
          }}
          asyncCall={() => actions.isEnabled()(dispatch)}
        />
        <Route path="/test/parameters" render={() => <ManageParams />} />
      </div>
    </div>
  );
};
