import React, { FunctionComponent, useContext, useMemo } from "react";

export const LayoutContext = React.createContext<string[]>([]);

export const LayoutContextWrapper: FunctionComponent<{
  id: string;
  children: React.ReactNode;
}> = ({ id, children }) => {
  const parents = useContext(LayoutContext);
  const newParents = useMemo(() => [...parents, id], [parents, id]);

  return (
    <LayoutContext.Provider value={newParents}>
      {children}
    </LayoutContext.Provider>
  );
};
