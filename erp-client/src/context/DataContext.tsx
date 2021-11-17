import { createContext, useReducer, useEffect, Dispatch } from 'react';

export const DataStateContext = createContext<StateType>({ loadData: undefined, modelData: undefined });
export const DataDispatchContext = createContext<DispatchType>(() => null);

type StateType = {
  loadData?: File | null;
  modelData?: string | null;
};

type ActionType = { type: 'LOAD'; loadData: File } | { type: 'MODEL'; modelData: string };

type DispatchType = Dispatch<ActionType>;

const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case 'LOAD': {
      return {
        loadData: state.loadData,
        modelData: undefined,
      };
    }
    case 'MODEL': {
      return {
        modelData: state.modelData,
      };
    }
    default: {
      throw new Error('Unhandled action type');
    }
  }
};

export interface DataProviderProps {
  children: any;
  loadData?: File | null;
  modelData?: string | null;
}

const DataProvider = ({ children, loadData, modelData }: DataProviderProps) => {
  const [state, dispatch] = useReducer(reducer, { loadData, modelData });

  useEffect(() => {
    if (loadData) {
      dispatch({ type: 'LOAD', loadData });
      if (modelData) {
        dispatch({ type: 'MODEL', modelData });
      }
    }
  }, [loadData, modelData]);

  return (
    <DataStateContext.Provider value={state}>
      <DataDispatchContext.Provider value={dispatch}>{children}</DataDispatchContext.Provider>
    </DataStateContext.Provider>
  );
};

export default DataProvider;
