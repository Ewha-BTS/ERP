import React, { useEffect, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";

import { recommendState } from "./lib/state";
import MainDashboard from "./pages/MainDashboard";
import UserDefine from "./pages/UserDefine";
import Recommendation from "./pages/Recommendation";
import MyPage from "./pages/MyPage";
import TabBar from "./components/common/TabBar";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Switch>
          <Route path="/" exact>
            <MainDashboard />
          </Route>
          <Route path="/make">
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
    </Suspense>
  );
}

export default App;
