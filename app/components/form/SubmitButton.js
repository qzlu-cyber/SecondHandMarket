import React from "react";
import { useFormikContext } from "formik";

import AppButton from "../AppButton";

export default function SubmitButton({ title, style, styleText }) {
  const { handleSubmit } = useFormikContext();
  return (
    <AppButton
      style={style}
      styleText={styleText}
      title={title}
      onPress={handleSubmit}
    />
  );
}
