import { Form, Image, Input } from "antd";
import { SafetyOutlined, UserOutlined } from "@ant-design/icons";
import userLoginIcon from "@/assets/images/user@2x.png";
import userLoginBtn from "@/assets/images/loginBtn.png";
import { userLoginApi } from "@/apis/index.js";
import md5 from "js-md5";
const onFinish = (values) => {
  const { account, password } = values;
  userLoginApi({
    account,
    password: md5(password),
    type: 2,
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const LoginForm = () => (
  <div className="bg-gradient-to-t from-#77A1F2 to-#4378D7 w-[30%] h-full absolute right-0 center">
    <div>
      <div className="text-28px text-white mb-60px">恒成智慧学苑管理系统</div>
      <div className="text-white text-center center flex-col space-y-10px text-0">
        <Image preview={false} src={userLoginIcon} width={60} />
        <div className="text-14px">欢迎登录!</div>
      </div>
      <Form
        className="w-300px mt-50px"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label=""
          name="account"
          rules={[
            {
              required: true,
              message: "请输入登录用户名",
            },
          ]}
        >
          <Input
            className="w-full"
            placeholder="请输入登录用户名"
            prefix={<UserOutlined className="text-gray-500" />}
          />
        </Form.Item>

        <Form.Item
          label=""
          name="password"
          rules={[
            {
              required: true,
              message: "请输入登录密码",
            },
          ]}
        >
          <Input.Password
            placeholder="请输入登录密码"
            prefix={<SafetyOutlined className="text-gray-500" />}
          />
        </Form.Item>

        <Form.Item className="center mt-30px">
          <Input
            type="image"
            src={userLoginBtn}
            className="w-120px bg-transparent p-0 border-0 hover:op50"
          />
        </Form.Item>
      </Form>
    </div>
  </div>
);
export default LoginForm;
