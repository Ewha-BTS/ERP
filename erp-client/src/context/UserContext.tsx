import { createContext, useReducer, useEffect, Dispatch } from 'react';

export const UserStateContext = createContext({ isAuth: false });
export const UserDispatchContext = createContext<DispatchType>(() => null);

type StateType = {
  isAuth: boolean;
};

type ActionType = { type: 'LOGIN' } | { type: 'LOGOUT' };

type DispatchType = Dispatch<ActionType>;

const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case 'LOGIN': {
      return {
        isAuth: true,
      };
    }
    case 'LOGOUT': {
      return {
        isAuth: false,
      };
    }
    default: {
      throw new Error('Unhandled action type');
    }
  }
};

export interface UserProviderProps {
  children: any;
  isAuthenticated: boolean;
}

const UserProvider = ({ children, isAuthenticated }: UserProviderProps) => {
  const [state, dispatch] = useReducer(reducer, { isAuth: isAuthenticated });

  useEffect(() => {
    if (isAuthenticated) {
      dispatch({ type: 'LOGIN' });
    } else {
      dispatch({ type: 'LOGOUT' });
    }
  }, [isAuthenticated]);

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>{children}</UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};

export default UserProvider;
