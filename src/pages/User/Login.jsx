import LoginForm from "@/pages/User/components/LoginForm.jsx";
import { useEffect } from "react";
import { goodsListApi } from "@/apis/index.js";

const Login = () => {
  useEffect(() => {
    goodsListApi();
  }, []);
  return (
    <div className="w-screen h-screen bg-[url(@/assets/images/loginBg@2x.png)] bg-no-repeat bg-[length:100%]">
      <LoginForm />
    </div>
  );
};

export default Login;
