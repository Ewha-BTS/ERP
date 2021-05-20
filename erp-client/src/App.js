import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import MainDashboard from "./pages/MainDashboard";
import UserDefine from "./pages/UserDefine";
import Recommendation from "./pages/Recommendation";
import MyPage from "./pages/MyPage";
import TabBar from "./components/common/TabBar";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <MainDashboard />
        </Route>
        <Route path="/define">
          <UserDefine />
        </Route>
        <Route path="/recommend">
          <Recommendation />
        </Route>
        <Route path="/mypage">
          <MyPage />
        </Route>
      </Switch>
      <TabBar data={false} />
    </Router>
  );
}

export default App;
