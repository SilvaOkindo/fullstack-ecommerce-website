import CommonForm from "@/components/common/form";
import { loginFormControls, registerFormControls } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { loginUser } from "@/store/auth_slice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";


const initialState = {
  email: "",
  password: "",
};

const Login = () => {

  const [formData, setFormData] = useState(initialState);

  const dispatch = useDispatch();

  const {toast} = useToast()

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser(formData)).then((data) => {
      console.log(data)
      if(data?.payload?.success) {
        toast({
          title: data?.payload?.message
        })
      } else {
        toast({
          title: data?.payload?.message,
          variant: 'destructive'
        })
      }
    })
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-weight tracking-tight text-foreground">
          Welcome back, sign in.
        </h1>
        <p className="mt-2">
          Do not have an account?
          <Link
            to="/auth/register"
            className="ml-2 font-medium text-primary hover:underline"
          >
            register
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText="Login"
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default Login;
