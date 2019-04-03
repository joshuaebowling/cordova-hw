import React from "react";

const StatusChecker = ({asyncCall, onAsyncCallComplete}) => {
  asyncCall(() => { 
    onAsyncCallComplete(); 
  });
  return (<span></span>);
};

export default StatusChecker;