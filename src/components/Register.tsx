import React from "react";
import "../App.css";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
type FormData = {
  fname: string;
  lname: string;
  email: string;
  age: number;
  pass: string;
  confirm_pass: string;
  checked: boolean;
};
function Register() {
  const schema: ZodType<FormData> = z
    .object({
      fname: z.string().min(2).max(30),
      lname: z.string().min(2).max(30),
      email: z.string().email(),
      age: z.coerce.number().min(18).max(70),
      pass: z.string().min(5).max(10),
      confirm_pass: z.string().min(5).max(10),
      checked: z.boolean(),
    })
    .refine((data) => data.pass === data.confirm_pass, {
      message: "Passwords did not match",
      path: ["confirm_pass"],
    })
    .refine((data) => data.checked === true, {
      message: "Please accept all the terms",
      path: ["checked"],
    });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      fname: "",
      lname: "",
      age: 18,
      checked: false,
      email: "",
      pass: "",
      confirm_pass: "",
    },
    resolver: zodResolver(schema),
  });

  const fnameW = watch("fname");
  const lnameW = watch("lname");
  const emailW = watch("email");
  const ageW = watch("age");
  const passW = watch("pass");
  const confirmPassW = watch("confirm_pass");

  // console.log(fnameW);
  // console.log(checkedW);
  const isAllDataSubmitted =
    fnameW && lnameW && emailW && ageW && passW && confirmPassW;
  const formSubmit = (data: FormData) => {
    console.log(data);
  };
  return (
    <div className="mainDiv">
      <form onSubmit={handleSubmit(formSubmit)}>
        <h1 className="form-heading">Form Example (Basic)</h1>
        <div className="form-controller">
          <label htmlFor="" className="form-label">
            First Name
          </label>
          <input type="text" className="form-input" {...register("fname")} />
          {errors.fname && <span> {errors.fname.message}</span>}
        </div>
        <div className="form-controller">
          <label htmlFor="" className="form-label">
            Last Name
          </label>
          <input type="text" className="form-input" {...register("lname")} />
          {errors.lname && <span> {errors.lname.message}</span>}
        </div>
        <div className="form-controller">
          <label htmlFor="" className="form-label">
            Email
          </label>
          <input type="email" className="form-input" {...register("email")} />
          {errors.email && <span> {errors.email.message}</span>}
        </div>
        <div className="form-controller">
          <label htmlFor="" className="form-label">
            Age
          </label>
          <input type="number" className="form-input" {...register("age")} />
          {errors.age && <span> {errors.age.message}</span>}
        </div>
        <div className="form-controller">
          <label htmlFor="" className="form-label">
            Password
          </label>
          <input type="password" className="form-input" {...register("pass")} />
          {errors.pass && <span> {errors?.pass?.message}</span>}
        </div>
        <div className="form-controller">
          <label htmlFor="" className="form-label">
            Confirm PassWord
          </label>
          <input
            type="password"
            className="form-input"
            {...register("confirm_pass")}
          />
          {errors.confirm_pass && <span> {errors.confirm_pass.message}</span>}
        </div>
        <div className="subscribe">
          <input
            type="checkbox"
            disabled={isAllDataSubmitted ? false : true}
            {...register("checked")}
          />
          <label htmlFor="" className="form-label">
            Please accept all conditions
          </label>
        </div>
        {errors.checked && <span>{errors.checked.message}</span>}

        <div>
          <input
            type="submit"
            value={!isSubmitting ? "Submit" : "Submitting"}
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

export default Register;
