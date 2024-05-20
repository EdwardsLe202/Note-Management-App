// LabelsContext.js
import React, { createContext, useState } from 'react';
import { LABELS as initialLabels } from '../../data/dummy-data';

export const LabelsContext = createContext();

export const LabelsProvider = ({ children }) => {
  const [labels, setLabels] = useState(initialLabels);

  const addLabel = (newLabel) => {
    setLabels((currentLabels) => [...currentLabels, newLabel]);
  };

  const updateLabel = (id, text) => {
    setLabels(currentLabels => currentLabels.map(label => label.id === id ? { ...label, label: text } : label));
  };

  const deleteLabel = (id) => {
    setLabels(currentLabels => currentLabels.filter(label => label.id !== id));
  };

  return (
    <LabelsContext.Provider value={{ labels, addLabel, updateLabel, deleteLabel }}>
      {children}
    </LabelsContext.Provider>
  );
};

export default LabelsProvider;