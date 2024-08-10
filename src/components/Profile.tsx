import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import "../App.css";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
type Gender = "male" | "female" | "other";
type Name = {
  firstName: string;
  lastName: string;
};
type Status = "active" | "inactive" | "invisible";
type ProfileFormData = {
  name: Name;
  description: string;
  email: string;
  photo: FileList;
  pronoun: string;
  gender: Gender;
  age: number;
  status: Status;
};

const fileTypes = ["image/png", "image/jpeg"]; // defining accepting file types

function Profile() {
  const profileSchema: ZodType<ProfileFormData> = z.object({
    name: z.object({
      firstName: z.string().min(3),
      lastName: z.string().min(2),
    }),
    description: z.string(),
    email: z.string().email(),
    photo: z
      .instanceof(FileList)
      .refine((files) => files.length === 1, {
        message: "Please upload exactly one file",
      })
      .refine((files) => files[0].size < 5 * 1024 * 1024, {
        message: "Please add files under size limit of 5 MB",
      })
      .refine((files) => fileTypes.includes(files[0].type), {
        message: "Please add png or jpg files.",
      }),
    pronoun: z.string(),
    gender: z.enum(["male", "female", "other"]),
    age: z.coerce.number().min(18).max(35),
    status: z.enum(["active", "inactive", "invisible"]),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  //   using the watch to view the current selected image ++++++++ start
  const photoW = watch("photo");
  console.log(photoW);
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const generateImageUrl = (data: FileList) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result as string);
    };
    reader.readAsDataURL(data[0]);
  };
  console.log(photoW);
  useEffect(() => {
    if (photoW && photoW.length > 0) {
      generateImageUrl(photoW);
    }
  }, [photoW]);
  // +++++++++++++++++++++++++++++ end
  const onProfileSubmit = (data: ProfileFormData) => {
    console.log(data);
  };
  return (
    <div className="mainDiv">
      {photoW && <img src={imageUrl} alt="" />}
      <form onSubmit={handleSubmit(onProfileSubmit)}>
        <h1 className="form-heading">Update Profile</h1>
        <div className="form-controller">
          <label htmlFor="" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-input"
            {...register("name.firstName")}
          />
          {errors.name?.firstName && (
            <span>{errors.name?.firstName?.message}</span>
          )}
        </div>
        <div className="form-controller">
          <label htmlFor="" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-input"
            {...register("name.lastName")}
          />
          {errors.name?.lastName && (
            <span>{errors.name?.lastName?.message}</span>
          )}
        </div>
        <div className="form-controller">
          <label htmlFor="" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-input"
            {...register("description")}
          />
          {errors.description && <span>{errors.description?.message}</span>}
        </div>
        <div className="form-controller">
          <label htmlFor="" className="form-label">
            Email
          </label>
          <input type="email" className="form-input" {...register("email")} />
          {errors.email && <span>{errors.email?.message}</span>}
        </div>
        <div className="form-controller">
          <label htmlFor="" className="form-label">
            Profile Pic
          </label>
          <input type="file" className="" {...register("photo")} />
          {errors.photo && <span>{errors.photo?.message}</span>}
        </div>
        <div className="form-controller">
          <label htmlFor="" className="form-label">
            Pronoun
          </label>
          <input type="text" className="form-input" {...register("pronoun")} />
          {errors.pronoun && <span>{errors.pronoun?.message}</span>}
        </div>
        <div className="form-controller">
          <label htmlFor="" className="form-label">
            Gender
          </label>

          <select {...register("gender")} className="form-select">
            <option value="" selected>
              Select Status
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <span>{errors.gender?.message}</span>}
        </div>
        <div className="form-controller">
          <label htmlFor="" className="form-label">
            Age
          </label>
          <input type="text" className="form-input" {...register("age")} />
          {errors.age && <span>{errors.age?.message}</span>}
        </div>
        <div className="form-controller">
          <label htmlFor="" className="form-label">
            Status
          </label>

          <select className="form-select" {...register("status")}>
            <option value="" selected>
              Select Status
            </option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="invisible">Invisible</option>
          </select>
          {errors.status && <span>{errors.status?.message}</span>}
        </div>
        <div>
          <input
            type="submit"
            value="Update Profile"
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

export default Profile;
