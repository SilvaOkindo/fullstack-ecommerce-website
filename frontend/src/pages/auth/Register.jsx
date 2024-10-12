import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { registerUser } from "@/store/auth_slice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  username: "",
  email: "",
  password: "",
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { toast } = useToast();

  const onSubmit = (event) => {
    event.preventDefault();

    dispatch(registerUser(formData)).then((data) => {
      //console.log(data)
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
          description: "",
        });
        navigate("/auth/login");
      } else {
        toast({
          title: data?.payload?.message,
          description: "",
          variant: "destructive"
        });
      }
    });
  };

  //console.log(formData);

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-weight tracking-tight text-foreground">
          Create new account
        </h1>
        <p className="mt-2">
          Already have an account
          <Link
            to="/auth/login"
            className="ml-2 font-medium text-primary hover:underline"
          >
            login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText="Sign up"
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default Register;
