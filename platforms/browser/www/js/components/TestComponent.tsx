import React, { useReducer, memo } from "react";
import { assign } from "lodash";
import bluetoothSerial from "../services/bluetoothSerial";

const ENABLE_STATUS = {
  NO: 0,
  YES: 1,
  TRYING: 2
};

const initialState = {
  enabled: ENABLE_STATUS.NO
};

const reducer: Function = (state:object, action: object) => {
  const stateAddition = {};
  switch(action.type) {
    case actions.ENABLE_RQ:
      stateAddition.enabled = ENABLE_STATUS.TRYING;
    break;
    case actions.ENABLE_RS:
      stateAddition.enabled = action.payload;
    break;
    case actions.ERROR:
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
  return(
    isEnabled === ENABLE_STATUS.YES ?
    <BluetoothIsEnaabled />
    :
  <div>
    <p>Enable</p>
    <button enabled={isEnabled === ENABLE_STATUS.NO} onClick={e => actions.enable()(dispatch)}>Enable</button>
  </div>
  );
}

export default () => {
 const [state, dispatch] = useReducer(reducer, initialState);

 return (
   <div>
     <div>
       <Enable isEnabled={state.isEnabled} dispatch={dispatch} />
       <p>Discovery</p>
       <button onClick={e => console.log('discover')}>Discover</button>
       <button onClick={e => console.log('discoverable')}>Discoverable</button>
     </div>
     <div>
       <p>Connect</p>

     </div>
   </div>)
};