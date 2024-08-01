import { useForm } from "react-hook-form";
import "./App.css";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type FormData = {
  fname: string;
  lname: string;
  email: string;
  age: number;
  pass: string;
  confirm_pass: string;
};
function App() {
  const schema: ZodType<FormData> = z
    .object({
      fname: z.string().min(2).max(30),
      lname: z.string().min(2).max(30),
      email: z.string().email(),
      age: z.number().min(18).max(70),
      pass: z.string().min(5).max(10),
      confirm_pass: z.string().min(5).max(10),
    })
    .refine((data) => data.pass === data.confirm_pass, {
      message: "Passwords did not match",
      path: ["confirm_pass"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const formSubmit = (data: FormData) => {
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(formSubmit)}>
        <h1 className="form-heading">Form Example</h1>
        <div className="form-controller">
          <label htmlFor="" className="form-label">
            First Name
          </label>
          <input type="text" className="form-input" {...register("fname")} />
        </div>
        {errors.fname && <span> {errors.fname.message}</span>}
        <div className="form-controller">
          <label htmlFor="" className="form-label">
            Last Name
          </label>
          <input type="text" className="form-input" {...register("lname")} />
        </div>
        {errors.lname && <span> {errors.lname.message}</span>}
        <div className="form-controller">
          <label htmlFor="" className="form-label">
            Email
          </label>
          <input type="email" className="form-input" {...register("email")} />
        </div>
        {errors.email && <span> {errors.email.message}</span>}
        <div className="form-controller">
          <label htmlFor="" className="form-label">
            Age
          </label>
          <input type="number" className="form-input" {...register("age")} />
        </div>
        {errors.age && <span> {errors.age.message}</span>}
        <div className="form-controller">
          <label htmlFor="" className="form-label">
            Password
          </label>
          <input type="password" className="form-input" {...register("pass")} />
        </div>
        {errors.pass && <span> {errors?.pass?.message}</span>}
        <div className="form-controller">
          <label htmlFor="" className="form-label">
            Confirm PassWord
          </label>
          <input
            type="password"
            className="form-input"
            {...register("confirm_pass")}
          />
        </div>
        {errors.confirm_pass && <span> {errors.confirm_pass.message}</span>}
        <div>
          <input
            type="submit"
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

export default App;
