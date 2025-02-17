"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/router";

const schema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters" })
      .optional(),
    email: z.string().email({ message: "Invalid email format" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    role: z.enum(["user", "admin"]).optional(),
  })
  .refine((data) => (data.role ? data.name : true), {
    message: "Name is required when signing up",
    path: ["name"],
  });

type FormData = z.infer<typeof schema>;

export default function AuthForm({ type }: { type: "login" | "register" }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setMessage("");

    try {
      console.log(data);
      const respose = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/auth/${type}`,
        data
      );

      console.log(respose);
      setMessage("Success! Redirecting...");
      router.push("/blogs");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage(err.message);
      } else {
        setMessage("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">
        {type === "login" ? "Sign In" : "Sign Up"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {type === "register" && (
          <>
            <div>
              <label className="block text-sm font-medium">Full Name</label>
              <input
                type="text"
                {...register("name")}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">Role</label>
              <select
                {...register("role")}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-sm">{errors.role.message}</p>
              )}
            </div>
          </>
        )}

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            {...register("password")}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Processing..." : type === "login" ? "Sign In" : "Sign Up"}
        </button>
      </form>

      {message && <p className="text-center text-red-500 mt-3">{message}</p>}
    </div>
  );
}
