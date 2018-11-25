import React, { Component } from 'react';
import DeviceView from '../partials/device';

export default class DevicesView extends Component {
  render() {
    return (
      <div>
        <h1>Devices</h1>
        <div>
          <DeviceView></DeviceView>
        </div>
      </div>
    )
  }
}
