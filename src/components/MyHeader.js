import { Col, Menu, Row } from "antd";
import { Header } from "antd/lib/layout/layout";
import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutRequestAction } from "../reducers/user";

const MyHeader = memo(() => {
  const { principal } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(logoutRequestAction());
  };
  return (
    <>
      <Header>
        <Row>
          <Col xs={1} sm={1} md={2} lg={2} xl={3}></Col>
          <Col xs={22} sm={22} md={20} lg={20} xl={18}>
            <Menu mode="horizontal" defaultSelectedKeys={["1"]}>
              <Menu.Item key="menu-1">
                <Link to="/">
                  <img
                    className="logo"
                    src="http://localhost:3000/images/logo.png"
                    alt="logo"
                  />
                </Link>
              </Menu.Item>
              {principal ? (
                <>
                  <Menu.Item className="header_right" key="menu-6">
                    <Link to={`/dashboard/${principal.id}`}>
                      {principal.name}
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="menu-7" onClick={logout}>
                    Logout
                  </Menu.Item>
                </>
              ) : (
                <>
                  <Menu.Item className="header_right" key="menu-6">
                    <Link to="/login">Login</Link>
                  </Menu.Item>
                </>
              )}
            </Menu>
          </Col>
          <Col xs={1} sm={1} md={2} lg={2} xl={3}></Col>
        </Row>
      </Header>
    </>
  );
});

export default MyHeader;
