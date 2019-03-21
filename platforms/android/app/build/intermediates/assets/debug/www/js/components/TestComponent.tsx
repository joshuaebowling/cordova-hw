import React, { useReducer, memo } from "react";
import { assign } from "lodash";
import bluetoothSerial from "../services/bluetoothSerial";
console.log(bluetoothSerial);
const ENABLE_STATUS = {
  NO: 0,
  YES: 1,
  TRYING: 2
};

const initialState = {
  enabled: ENABLE_STATUS.NO,
  error: null
};

const reducer: Function = (state:object, action: object) => {
  const stateAddition = {};
  switch(action.type) {
    case actions.ENABLE_RQ:
      stateAddition.enabled = ENABLE_STATUS.TRYING;
      stateAddition.error = null;
    break;
    case actions.ENABLE_RS:
    console.log('payload', action.payload);
      stateAddition.enabled = action.payload;
    break;
    case actions.ERROR:
      stateAddition.error = action.payload;
    break;
  }
  return assign({}, state, stateAddition);
};

const actions = {
  ENABLE_RQ: "ENABLE_RQ",
  ENABLE_RS: "ENABLE_RS",
  ERROR: "ERROR",
  enable: () => (dispatch: Function) => {
    dispatch({type: actions.ENABLE_RQ, payload: null});
    const catcher = (err) => {
      console.log('args from enable catch=',arguments);
      dispatch({type: actions.ENABLE_RS, payload: ENABLE_STATUS.NO});
      dispatch({type: actions.ERROR, payload: 'hopefully some error info'});
    };
    bluetoothSerial.enable()
      .then(() => {
        bluetoothSerial.isEnabled()
        .then((isEnabled) => {
          dispatch({ type: actions.ENABLE_RS, payload: isEnabled ?  ENABLE_STATUS.YES : ENABLE_STATUS.NO });
        })
        .catch(catcher)
      })
      .catch(catcher)
    ;
  }
};

const BluetoothIsEnaabled = memo(() => {
  return(<p>Bluetooth is Enabled</p>);
}, 5);

const Enable = ({isEnabled, dispatch}) => {
  console.log('isenabled', isEnabled);
  return(
    isEnabled === ENABLE_STATUS.YES ?
    <BluetoothIsEnaabled />
    :
  <div>
    <p>Enable</p>
    <button enabled={(isEnabled === ENABLE_STATUS.NO).toString()} onClick={e => actions.enable()(dispatch)}>Enable</button>
  </div>
  );
}


const EnableError = memo(({errorInfo}) => {
  return (errorInfo === null ? <span></span> : <p>{errorInfo}</p>);
});
export default () => {
 const [state, dispatch] = useReducer(reducer, initialState);
 console.log(state);
 return (
   <div>
     <div>
       <Enable isEnabled={state.enabled} dispatch={dispatch} />
       <EnableError errorInfo={state.error} />
       <p>Discovery</p>
       <button onClick={e => console.log('discover')}>Discover</button>
       <button onClick={e => console.log('discoverable')}>Discoverable</button>
     </div>
     <div>
       <p>Connect</p>

     </div>
   </div>)
};