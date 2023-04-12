import React, { useCallback, useState } from "react";
import Input from "../components/Input";
import axios from "axios";
import { signIn } from "next-auth/react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [variant, setVariant] = useState("Sign In");

  const toggleVariant = useCallback(() => {
    setVariant((currVariant) =>
      currVariant === "Sign In" ? "Register" : "Sign In"
    );
  }, []);

  //To add the login functionality
  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/profiles",
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);

  // To add the register functionality
  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
      });

      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password, login]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-cover bg-fixed ">
      <div className="h-full w-full bg-black lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "Sign In" ? "Sign In" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant !== "Sign In" && (
                <Input
                  label="Name"
                  onChange={(e: any) => setName(e.target.value)}
                  id="name"
                  value={name}
                  type="text"
                />
              )}

              <Input
                label="Email or phone number"
                onChange={(e: any) => setEmail(e.target.value)}
                id="email"
                value={email}
                type="email"
              />
              <Input
                label="Password"
                onChange={(e: any) => setPassword(e.target.value)}
                id="password"
                value={password}
                type="password"
              />
            </div>

            <button
              onClick={variant === "Sign In" ? login : register}
              className="bg-[#e50914] py-3 text-white rounded-md w-full mt-10  hover:bg-[#e80914] transition font-bold"
            >
              {variant === "Sign In" ? "Sign In" : "Create an account"}
            </button>

            <p className="text-neutral-500 mt-12 ">
              {variant === "Sign In"
                ? "New to Netflix?"
                : "Already have an account?"}
              <span
                onClick={toggleVariant}
                className="text-white ml-1  hover:underline hover:cursor-pointer"
              >
                {variant === "Sign In" ? "Sign up now." : "Sign In"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
