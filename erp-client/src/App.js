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
          <TabBar data={false} />
        </Route>
        <Route path="/define">
          <UserDefine />
          <TabBar data={false} />
        </Route>
        <Route path="/recommend">
          <Recommendation />
          <TabBar data={false} />
        </Route>
        <Route path="mypage">
          <MyPage />
          <TabBar data={false} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
