"use client";
import { createContext, useContext, useState } from "react";

interface FormData {
  name?: string;
  careType?: "Stationary" | "Ambulatory" | "Day Care";
  zipCode?: string;
}

// used to manage the complete form details.
const FormContext = createContext<{
  data: FormData;
  setFormValues: (values: FormData) => void;
}>({
  data: {},
  setFormValues: () => {},
});

// export Provider
export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<FormData>({});

  const setFormValues = (values: FormData) => {
    setData((prevData) => ({ ...prevData, ...values }));
  };

  return (
    <FormContext.Provider value={{ data, setFormValues }}>
      {children}
    </FormContext.Provider>
  );
};

// export hook
export const useFormContext = () => useContext(FormContext);
