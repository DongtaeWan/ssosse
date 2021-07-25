import React, { useEffect } from "react";
import { LoginContainer, LoginForm } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { loginRequestAction } from "../../reducers/user";
import AppLayout from "../../components/AppLayout";
import { Form, Input, Button } from "antd";

const Login = ({ history }) => {
  const { logInError, logInDone } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // 로그인 성공 시
  useEffect(() => {
    if (logInDone) {
      console.log("상태 : Login Done");
      history.push("/");
    }
  }, [logInDone, history]);

  // 로그인 실패 시
  useEffect(() => {
    if (logInError) {
      alert(logInError);
    }
  }, [logInError]);

  const onFinish = (values) => {
    dispatch(loginRequestAction(values));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <AppLayout>
        <LoginContainer bordered={false}>
          <h2>Log in to <b>ioChord</b></h2>
          <LoginForm>
            <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </LoginForm>
        </LoginContainer>
      </AppLayout>
    </>
  );
};

export default Login;
