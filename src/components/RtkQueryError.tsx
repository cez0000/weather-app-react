import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import React from "react";

const RtkQueryError: React.FC<{
  error: FetchBaseQueryError | SerializedError;
  message: string;
}> = ({ error, message }) => {
  return (
    <div>
      {message} {JSON.stringify(error)}
    </div>
  );
};

export default RtkQueryError;
