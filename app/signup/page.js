"use client"; // Marking the component to run client-side

import { useEffect, useState,Suspense  } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { checkUsernameAvailailty } from "@/actions/userActions";


export default function Page() {
  const searchParams = useSearchParams();
  const usernameParam = searchParams.get("username");
  const [passwordType, setPasswordType] = useState("password");
  const { data: session } = useSession();
  const [suggestionsArr, setSuggestionsArr] = useState(["", "", ""]);
  const router = useRouter();
  const [userUpdatingPassword, setUserUpdatingPassword] = useState(false);
  const [userUpdatingUsername, setUserUpdatingUsername] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      email: "",
      password: "12345678",
      username: usernameParam ? `Linktr.ee/${usernameParam}` : "Linktr.ee/",
    },
  });

  const suggestionsArrUpdater = async (val) => {
    const newArr = [];
    let i = 0;
    while (newArr.length < 3) {
      const newPossibleValue = val + i;
      const newValueExists = await checkUsernameAvailailty(newPossibleValue);

      if (!newValueExists) {
        newArr.push(newPossibleValue);
      }
      //breaking out of infinite loop
      if (i > 100) {
        break;
      }
      i++;
    }
    setSuggestionsArr(newArr);
  };
  const onSubmit = async (data) => {
    //on continue and login both try to run this if not intercepted by error check userUpdatingPassword acts as a flag
    if (!userUpdatingPassword) {
      setUserUpdatingPassword(true);
      setValue("password", "", { shouldValidate: false });
    } else if (!userUpdatingUsername) {
      setUserUpdatingUsername(true);
      if (!usernameParam) {
        setValue("username", "Linktr.ee/" + data.email.split("@")[0]);
      }
    } else {
      await signIn("credentials", {
        redirect: false,
        ...data,
        username: data.username.split("Linktr.ee/")[1],
        type: "signup",
      });
    }
  };

  useEffect(() => {
    if (session) {
      router.push(`/admin/`);
    }
  }, [session]);

  const handlePasswordView = (e) => {
    if (e.target.src.includes("eye.svg")) {
      e.target.src = "eyecross.svg";
      setPasswordType("password");
    } else {
      e.target.src = "eye.svg";
      setPasswordType("text");
    }
  };
  return (
    
    <div className="flex font-[family-name:var(--font-intervariable)]">
      <div className="w-full">
        <div className="p-5 md:p-11 ">
          <Link href="/">
            <svg
              height="100%"
              viewBox="0 0 80 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-6"
            >
              <title>Linktree Logo</title>
              <desc>Linktree Logo Symbol and Word Mark</desc>
              <path
                d="M0 1.72687H2.25964V13.6313H8.50582V15.7244H0V1.72687ZM10.7287 1.72687C10.9121 1.72444 11.0941 1.75816 11.2644 1.82609C11.4348 1.89402 11.59 1.99484 11.7214 2.12278C11.8528 2.25073 11.9576 2.4033 12.03 2.57178C12.1024 2.74026 12.1409 2.92135 12.1433 3.1047C12.1433 3.47987 11.9943 3.83967 11.729 4.10496C11.4637 4.37024 11.1039 4.51928 10.7287 4.51928C10.3536 4.51928 9.99375 4.37024 9.72847 4.10496C9.46318 3.83967 9.31415 3.47987 9.31415 3.1047C9.31491 2.92087 9.3523 2.73903 9.42412 2.56981C9.49594 2.40058 9.60076 2.24736 9.73245 2.11909C9.86414 1.99082 10.0201 1.89008 10.1911 1.82273C10.3622 1.75539 10.5449 1.7228 10.7287 1.72687ZM9.62645 5.63991H11.7942V15.7244H9.62645V5.63991ZM13.0618 5.63991H15.2296V7.03612C15.8714 5.97059 16.9737 5.36435 18.425 5.36435C20.7765 5.36435 22.2462 7.20146 22.2462 10.1225V15.7244H20.0784V10.3062C20.0784 8.41395 19.2517 7.34843 17.7587 7.34843C16.1249 7.34843 15.2247 8.46906 15.2247 10.4899V15.7244H13.057L13.0618 5.63991ZM23.3852 1.72687H25.553V10.5817L29.5946 5.63991H32.3135L27.9963 10.692L32.3135 15.7244H29.5946L25.553 10.8022V15.7244H23.3852V1.72687ZM33.1586 3.07408H35.3631V5.64604H37.9351V7.44641H35.3631V12.6442C35.3631 13.3068 35.7673 13.7109 36.3919 13.7109H37.8445V15.7305H36.098C34.2058 15.7305 33.1586 14.6099 33.1586 12.6271V3.07408ZM38.8904 5.64604H41.0582V6.89527C41.5909 5.93998 42.4911 5.37047 43.5934 5.37047C43.8478 5.35888 44.1024 5.38993 44.3466 5.46233V7.48315C44.0813 7.42486 43.8097 7.40017 43.5383 7.40966C41.94 7.40966 41.0582 8.75688 41.0582 11.0655V15.7305H38.8904V5.64604ZM49.4158 5.37047C51.804 5.37047 54.3944 6.82179 54.3944 10.9185V11.2125H46.6234C46.79 13.0116 47.8359 14.0037 49.5811 14.0037C50.8304 14.0037 51.8959 13.3239 52.1347 12.3882H54.3393C54.1188 14.4078 52.0245 16.0061 49.5811 16.0061C46.4581 16.0061 44.4936 13.9669 44.4936 10.6797C44.4936 7.75259 46.3858 5.36435 49.4158 5.36435V5.37047ZM52.0796 9.41211C51.7673 8.16288 50.7936 7.37292 49.4158 7.37292C48.0931 7.37292 47.1574 8.18125 46.79 9.41211H52.0796ZM60.2731 5.37047C62.6614 5.37047 65.2517 6.82179 65.2517 10.9185V11.2125H57.4807C57.646 13.0116 58.6932 14.0037 60.4385 14.0037C61.6877 14.0037 62.7532 13.3239 62.992 12.3882H65.1966C64.9761 14.4078 62.8818 16.0061 60.4385 16.0061C57.3154 16.0061 55.3497 13.9669 55.3497 10.6797C55.3497 7.75259 57.2419 5.36435 60.2731 5.36435V5.37047ZM62.9369 9.41211C62.6246 8.16288 61.651 7.37292 60.2731 7.37292C58.9504 7.37292 58.0135 8.18125 57.646 9.41211H62.9369Z"
                fill="#000000"
              ></path>
              <path
                d="M65.7852 5.33374H69.6615L66.9058 2.70668L68.4306 1.13901L71.0577 3.83956V0H73.3357V3.83956L75.9627 1.14513L77.4863 2.70668L74.7319 5.32762H78.607V7.49541H74.7098L77.4827 10.1898L75.9627 11.7208L72.1967 7.93631L68.4306 11.7208L66.9058 10.196L69.6798 7.50153H65.7852V5.33374ZM71.0515 10.6062H73.3296V15.7502H71.0515V10.6062Z"
                fill="#43E660"
              ></path>
            </svg>
          </Link>
          <form onSubmit={handleSubmit(onSubmit)}>
            {!userUpdatingUsername && (
              <div className="container md:w-5/6 mx-auto flex flex-col gap-10 mt-20">
                <div className="text-center flex flex-col gap-5">
                  <h1 className={`text-4xl lg:text-5xl  font-extrabold `}>
                    {usernameParam
                      ? `Claim @${usernameParam} on Linktree today`
                      : "Join Linktree"}
                  </h1>

                  <p className="text-[#676b5f]">Sign up for free!</p>
                </div>

                <div className="flex flex-col gap-4">
                  <div>
                    <div className="relative w-full">
                      <input
                        type="text"
                        id="email"
                        autoFocus
                        {...register("email", {
                          required: {
                            value: true,
                            message: "Please enter an email address",
                          },
                          pattern: {
                            value:
                              /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
                            message: "Let's double-check your email address",
                          },
                        })}
                        className={`transition-all peer w-full appearance-none border-0 rounded-lg  bg-gray-100  hover:ring-2 ring-gray-300 px-2.5 pb-2 pt-6 text-sm text-gray-900  focus:outline-1  outline-offset-1 focus:outline-offset-4 outline-gray-900 ${
                          errors.email
                            ? "ring-2 ring-red-600"
                            : "ring-0 focus:ring-0"
                        }`}
                        placeholder=" "
                      />
                      <label
                        htmlFor="email"
                        className="absolute left-1 top-5 z-10 px-2 text-sm text-gray-500 transform scale-75 -translate-y-4 origin-[0] cursor-text select-none transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-5 peer-focus:scale-75 peer-focus:-translate-y-4"
                      >
                        Email
                      </label>

                      <img
                        src={errors.email ? "/passwrong.svg" : "/passright.svg"}
                        className="absolute right-4 top-1/2 w-5 -translate-y-1/2"
                        alt="emailvalidatorImage"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 ml-2 text-sm text-red-600 ">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {userUpdatingPassword && (
                    <div>
                      <div className="relative w-full">
                        <input
                          type={passwordType}
                          id="password"
                          {...register("password", {
                            required: {
                              value: true,
                              message: "Please enter your password",
                            },
                            minLength: {
                              value: 8,
                              message: "Password must be at least 8 characters",
                            },
                          })}
                          className={`transition-all peer w-full appearance-none border-0 rounded-lg  bg-gray-100  hover:ring-2 ring-gray-300 px-2.5 pb-2 pt-6 text-sm text-gray-900  focus:outline-1  outline-offset-1 focus:outline-offset-4 outline-gray-900 ${
                            errors.password
                              ? "ring-2 ring-red-600"
                              : "ring-0 focus:ring-0"
                          }`}
                          placeholder=" "
                        />
                        <label
                          htmlFor="password"
                          className="absolute left-1 top-5 z-10 px-2 text-sm text-gray-500 transform scale-75 -translate-y-4 origin-[0] cursor-text select-none transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-5 peer-focus:scale-75 peer-focus:-translate-y-4"
                        >
                          Password
                        </label>
                        <img
                          onClick={handlePasswordView}
                          src="/eyecross.svg"
                          className="absolute right-4 top-1/2 w-5 -translate-y-1/2"
                          alt="eye"
                        />
                      </div>
                      {errors.password && (
                        <p className="mt-1 ml-2 text-sm text-red-600 ">
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full rounded-full bg-[rgb(129,41,217)] hover:bg-[rgb(93,24,162)] py-3 font-bold text-white disabled:bg-[#e0e2d9] disabled:text-[#a8aaa2]"
                    disabled={errors.email || errors.password}
                  >
                    {userUpdatingPassword ? "Create account" : "Continue"}
                  </button>
                </div>

                <div className="flex flex-col gap-4">
                  <p className="text-[#676b5f] text-center text-sm">
                    By clicking{" "}
                    <span className="font-bold">Create account</span>, you agree
                    to Linktree&apos;s{" "}
                    <span className="underline">privacy notice</span>,{" "}
                    <span className="underline">T&Cs</span> and to receive
                    offers, news and updates.
                  </p>
                  <p className="text-center select-none">OR</p>
                  <button
                    className="w-full rounded-full flex gap-3 justify-center items-center border-2 hover:bg-gray-100 border-gray-100 py-3 "
                    onClick={() => {
                      signIn("google");
                    }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className=" "
                      role="Image"
                      aria-hidden="true"
                      aria-labelledby=" "
                    >
                      <path
                        fill="#4285F4"
                        d="M21.6 12.23c0-.71-.06-1.4-.18-2.05H12v3.87h5.38a4.6 4.6 0 0 1-2 3.02v2.5h3.24c1.89-1.73 2.98-4.3 2.98-7.34Z"
                      ></path>
                      <path
                        fill="#34A853"
                        d="M12 22c2.7 0 4.96-.9 6.62-2.42l-3.23-2.51c-.9.6-2.04.95-3.39.95-2.6 0-4.8-1.76-5.6-4.12H3.06v2.6A10 10 0 0 0 12 22Z"
                      ></path>
                      <path
                        fill="#FBBC05"
                        d="M6.4 13.9a6.01 6.01 0 0 1 0-3.8V7.5H3.06a10 10 0 0 0 0 9l3.34-2.6Z"
                      ></path>
                      <path
                        fill="#EA4335"
                        d="M12 5.98c1.47 0 2.79.5 3.82 1.5L18.7 4.6A10 10 0 0 0 3.06 7.5l3.34 2.6c.8-2.36 3-4.12 5.6-4.12Z"
                      ></path>
                    </svg>
                    <span className="font-bold">Sign up with Google</span>
                  </button>
                  <button
                    className="w-full rounded-full flex gap-3 justify-center items-center border-2 hover:bg-gray-100 border-gray-100 py-3 "
                    onClick={() => {
                      signIn("github");
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 30 30"
                    >
                      <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
                    </svg>

                    <span className="font-bold">Sign up with Github</span>
                  </button>
                  <div className="text-center text-sm">
                    <p className="text-gray-700 my-10">
                      Already have an account?{" "}
                      <Link
                        href="/login"
                        className="text-blue-800 underline cursor-pointer"
                      >
                        Log in
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {userUpdatingUsername && (
              <div className="container md:w-5/6 mx-auto flex flex-col gap-10 my-20">
                <div className="flex flex-col gap-5">
                  <button
                    className="font-semibold text-blue-600 flex gap-2 items-center py-2 px-3 -ml-3 rounded-full w-fit hover:bg-gray-100"
                    onClick={() => {
                      setUserUpdatingUsername(false);
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className=" rotate-90 "
                      role="Image"
                      aria-hidden="true"
                      aria-labelledby=" "
                    >
                      <path
                        fill="#2563eb"
                        d="m1.7 4 .36.35L7.71 10l5.64-5.65.36-.35.7.7-.35.36-6 6h-.7l-6-6L1 4.71 1.7 4Z"
                      ></path>
                    </svg>
                    <span>Back</span>
                  </button>
                  <h1 className={`text-4xl lg:text-5xl font-extrabold`}>
                    Choose your username
                  </h1>
                  <p className="text-[#676b5f]">Claim your free Link in Bio</p>
                </div>

                <div>
                  <div className="relative w-full">
                    <input
                      type="text"
                      id="username"
                      autoFocus
                      {...register("username", {
                        required: true,

                        minLength: {
                          value: 12,
                          message: "Usernames must be 2 characters or longer",
                        },

                        onChange: (e) => {
                          setValue(
                            "username",
                            e.target.value.length <= 10
                              ? "Linktr.ee/"
                              : e.target.value
                          );
                        },

                        validate: async (val) => {
                          const usernameValue = val.split("Linktr.ee/")[1];
                          const usernameExists = await checkUsernameAvailailty(
                            usernameValue
                          );
                          if (usernameExists) {
                            await suggestionsArrUpdater(usernameValue);
                            return "That username is already taken";
                          } else {
                            return true;
                          }
                        },
                      })}
                      className={`transition-all peer w-full appearance-none border-0 rounded-lg  bg-gray-100  hover:ring-2 ring-gray-300 px-2.5 pb-2 pt-2 text-sm text-gray-900  focus:outline-1  outline-offset-1 focus:outline-offset-4 outline-gray-900 ${
                        errors.username
                          ? "ring-2 ring-red-600"
                          : "ring-0 focus:ring-0"
                      }`}
                      placeholder="username"
                    />

                    <img
                      src={
                        errors.username ? "/passwrong.svg" : "/passright.svg"
                      }
                      className="absolute right-4 top-1/2 w-5 -translate-y-1/2"
                      alt="usernamevalidatorImage"
                    />
                  </div>
                  {errors.username && (
                    <p className="mt-3 ml-3 text-sm text-red-600 ">
                      {errors.username.type === "minLength"
                        ? watch("username").length === 10
                          ? "Please enter a username"
                          : errors.username.message
                        : errors.username.message}
                    </p>
                  )}
                </div>

                {errors.username?.type === "validate" && (
                  <div className="flex flex-wrap gap-2">
                    <div className="font-bold">Available:</div>
                    {suggestionsArr.map((item, index) => {
                      return (
                        <span
                          key={index}
                          onClick={() => {
                            clearErrors("username");
                            setValue("username", "Linktr.ee/" + item);
                          }}
                          className="cursor-pointer underline text-blue-600"
                        >
                          {item}
                        </span>
                      );
                    })}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full rounded-full bg-[rgb(129,41,217)] hover:bg-[rgb(93,24,162)] py-3 font-bold text-white disabled:bg-[#e0e2d9] disabled:text-[#a8aaa2]"
                  disabled={errors.username}
                >
                  Continue
                </button>
              </div>
            )}
          </form>
          <p className="text-xs cursor-pointer text-gray-700 hover:text-gray-950">
            Cookie preferences
          </p>
        </div>
      </div>
      <div className="lg:block min-h-[100vh] w-full hidden bg-[url('/signup.png')] bg-no-repeat bg-cover bg-center"></div>
    </div>
   
  );
}
