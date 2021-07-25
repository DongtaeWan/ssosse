import { Route, Switch, useLocation } from "react-router-dom";

import Home from "./pages/home/Home";
import Join from "./pages/join/Join";
import Login from "./pages/login/Login";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadMyInfoRequestAction } from "./reducers/user";

const App = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  // 새로고침 시 유저 인포 다시 가져오기
  useEffect(() => {
    // if (localStorage.getItem("nomadToken")) {
    dispatch(loadMyInfoRequestAction());
    // }
  }, []);
  return (
    <>
      <Switch>
        <Route path="/login" exact={true} component={Login} />
        <Route path="/join" exact={true} component={Join} />
        <Route path="/" exact={true} component={Home} />
      </Switch>
    </>
  );
};

export default App;
