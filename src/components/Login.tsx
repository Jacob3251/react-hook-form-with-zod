import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "../App.css";
import { z, ZodType } from "zod";
import react from "@vitejs/plugin-react";
type LoginFormData = {
  email: string;
  password: string;
};
function Login() {
  const [loading, setLoading] = useState(false);

  const loginSchema: ZodType<LoginFormData> = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(12),
  });

  const {
    register,
    reset,
    formState: { errors, isSubmitted, isSubmitSuccessful },
    handleSubmit,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const loginSubmit = (data: LoginFormData) => {
    console.log("submit clicked");

    // alert(`Email: ${data.email} Password: ${data.password}`);
  };
  console.log("is successfull", isSubmitSuccessful);

  useEffect(() => {
    if (isSubmitSuccessful === true) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        reset();
      }, 1500);
    } else {
      setLoading(false);
    }
  }, [isSubmitSuccessful, reset]);
  return (
    <div className="mainDiv">
      <form onSubmit={handleSubmit(loginSubmit)}>
        <h1 className="form-heading">Login Form</h1>
        <div className="form-controller">
          <label htmlFor="" className="form-label">
            Email
          </label>
          <input type="email" className="form-input" {...register("email")} />
        </div>
        <div className="form-controller">
          <label htmlFor="" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-input"
            {...register("password")}
          />
        </div>
        {(errors.email || errors.password) && (
          <div
            style={{
              textAlign: "center",
              marginBottom: "8px",
            }}
          >
            {errors.email && (
              <span style={{ marginRight: "8px" }}>
                {errors.email?.message}
              </span>
            )}
            {errors.password && (
              <span style={{ marginRight: "8px" }}>
                {errors.password?.message}
              </span>
            )}
          </div>
        )}
        <div>
          <input
            type="submit"
            value={!loading ? "Submit" : "Submitting"}
            disabled={loading}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "20px",
              textTransform: "uppercase",
            }}
          />
        </div>
      </form>
    </div>
  );
}

export default Login;
