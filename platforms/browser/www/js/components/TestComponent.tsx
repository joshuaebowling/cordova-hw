import React from "react";
import bluetoothSerial from "cordova-plugin-bluetooth-serial";
console.log(bluetoothSerial);
export default () => {
 return (
   <div>
     <div>
       <p>Discovery</p>
       <button onClick={e => console.log('discover')}>Discover</button>
       <button onClick={e => console.log('discoverable')}>Discoverable</button>
     </div>
   </div>)
};