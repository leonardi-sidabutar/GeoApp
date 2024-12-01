// src/context/context.js
import React, { createContext, useContext, useState } from 'react';

// Membuat Context untuk kebun
const KebunContext = createContext();

// Provider untuk membagikan state dan fungsi
export const KebunProvider = ({ children }) => {
  const [selectUnit, setSelectUnit] = useState(null)

  // Function untuk mengubah nilai kebun yang dipilih
  const changeUnit = (unit)=>{
    setSelectUnit(unit);
  }

  // Value untuk dikembalikan
  const val = {
    selectUnit,

    changeUnit
  }

  return (
    <KebunContext.Provider value={val}>
      {children}
    </KebunContext.Provider>
  );
};

// Custom hook untuk mengakses KebunContext
export const provContext = () => {
  return useContext(KebunContext);
};
