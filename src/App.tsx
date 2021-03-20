import "./App.css";
import MainBox from "./components/MainBox";
import "./stylesheet.scss";
import React from "react";
import { reducer } from "reducer/reducer";
import { some } from "configs/utils";

export const ContextStore = React.createContext<some>({});

const App = () => {
  const [globalState, dispatch] = React.useReducer(reducer, {
    userData: {
      name: "Đại",
      birthday: "01/12/1996", //
      user_id: 1996,
    },
  });
  return (
    <ContextStore.Provider value={{ globalState, dispatch }}>
      <MainBox />
    </ContextStore.Provider>
  );
};

export default App;
