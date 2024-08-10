import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { z } from "zod";

// ************************* using the infer here no need for previous type declation only add the schema then infer it
// type WishlistData = {
//   movieTitle: string;
//   movieYear: string;
//   movieDescription: string;
//   movieArtists: string[];
// };
function Wishlist() {
  const wishtListSchema = z.object({
    movieTitle: z.string().max(20, "Title can be at least 20 characters long."),
    movieYear: z.date(),
    movieDescription: z
      .string()
      .min(20, "Description must be at least 20 characters long."),
    movieArtists: z.array(
      z.object({
        artistname: z.string().min(1, "Artist name is required."),
        artistage: z.coerce
          .number()
          .min(18)
          .max(50, "Artist age must be between 18 and 50."),
      })
    ),
  });

  type WishlistData = z.infer<typeof wishtListSchema>;

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WishlistData>({
    defaultValues: {
      movieArtists: [
        {
          artistname: "",
          artistage: undefined,
        },
      ],
    },
    resolver: zodResolver(wishtListSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "movieArtists",
  });

  const handleWishlist = (data: WishlistData) => {
    console.log(data);
  };
  return (
    <div className="mainDiv">
      <form onSubmit={handleSubmit(handleWishlist)}>
        <div className="form-heading">Movie WishList</div>
        <div className="form-controller">
          <label htmlFor="" className="form-label">
            Movie Title
          </label>
          <input
            type="text"
            className="form-input"
            {...register("movieTitle")}
          />
          {errors.movieTitle && <span>{errors.movieTitle.message}</span>}
        </div>
        <div className="form-controller">
          <label htmlFor="" className="form-label">
            Movie Year
          </label>
          <input
            type="date"
            className="form-input"
            {...register("movieYear")}
          />
          {errors.movieYear && <span>{errors.movieYear.message}</span>}
        </div>
        <div className="form-controller">
          <label htmlFor="" className="form-label">
            Movie Description
          </label>
          <input
            type="text"
            className="form-input"
            {...register("movieDescription")}
          />
          {errors.movieDescription && (
            <span>{errors.movieDescription?.message}</span>
          )}
        </div>
        <div className="form-controller">
          <label htmlFor="" className="form-label">
            Movie Artist
          </label>
          {fields.map((field, index) => (
            <div
              key={field.id}
              style={{
                border: "2px solid white",
                padding: "12px",
                borderRadius: "8px",
                width: "100%",
                boxSizing: "border-box",
                marginBottom: "14px",
              }}
            >
              <div style={{ marginBottom: "10px" }}>
                <div>
                  <label htmlFor="" className="form-label">
                    Artist Name
                  </label>
                  <input
                    className="form-input"
                    type="text"
                    style={{ marginTop: "10px" }}
                    {...register(`movieArtists.${index}.artistname`)}
                  />
                  {errors.movieArtists?.[index]?.artistname && (
                    <span>
                      {errors.movieArtists[index]?.artistname?.message}
                    </span>
                  )}
                </div>
                <div style={{ marginTop: "14px" }}>
                  <label htmlFor="" className="form-label">
                    Artist Age
                  </label>
                  <input
                    className="form-input"
                    style={{ marginTop: "10px" }}
                    type="number"
                    {...register(`movieArtists.${index}.artistage`)}
                  />
                </div>

                {errors.movieArtists?.[index]?.artistage && (
                  <span>{errors.movieArtists[index]?.artistage?.message}</span>
                )}
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  remove(index);
                }}
              >
                Remove Artist
              </button>
            </div>
          ))}
          <button
            onClick={(e) => {
              e.preventDefault();
              append({ artistname: "", artistage: 18 });
            }}
          >
            Add Artist
          </button>
        </div>

        <div>
          <input
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "20px",
              textTransform: "uppercase",
            }}
            type="submit"
            value="Add"
          />
        </div>
      </form>
    </div>
  );
}

export default Wishlist;
