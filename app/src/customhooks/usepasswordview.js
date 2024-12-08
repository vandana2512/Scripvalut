import React, { useState } from "react";

export const usepasswordview = () => {
  const [showPassword, SetShowPassword] = useState("password");

  const ViewPassword = () => {
    showPassword === "password"
      ? SetShowPassword("text")
      : SetShowPassword("password");
  };

  return [showPassword, ViewPassword];
};
