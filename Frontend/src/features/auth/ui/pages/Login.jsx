import React from "react";
import { useAuth } from "../../hook/useAuth";
import { CrossedEyeIcon, EyeIcon, LoadingIcon } from "../../../../shared/ui/components/Icons";
import { NavLink } from "react-router";

const Login = () => {
  const {register, handleSubmit, reset, errors, showPassword, setShowPassword, isSubmitting, setIsSubmitting, loginFormSubmitHandler} = useAuth(true);
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-indigo-50 via-white to-purple-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-xl p-8 md:p-12 border border-gray-100">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Log in
            </h1>
            <p className="text-gray-600 text-sm">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit(loginFormSubmitHandler)} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="Enter your email"
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-0 ${
                    errors?.email
                      ? "border-red-300 focus:border-red-500 bg-red-50"
                      : "border-gray-200 focus:border-indigo-500 bg-gray-50 focus:bg-white"
                  }`}
                />
              </div>
              {errors?.email?.message && (
                <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="Enter your password"
                  className={`w-full px-4 py-3 pr-12 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-0 ${
                    errors?.password
                      ? "border-red-300 focus:border-red-500 bg-red-50"
                      : "border-gray-200 focus:border-indigo-500 bg-gray-50 focus:bg-white"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none transition-colors"
                >
                  {showPassword ? (
                    <EyeIcon style="w-5 h-5" />
                  ) : (
                    <CrossedEyeIcon style="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors?.password?.message && (
                <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-linear-to-r from-indigo-600 to-purple-600 text-white py-3.5 rounded-lg font-semibold text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <LoadingIcon style="animate-spin h-5 w-5" />
                  <span>Logging in...</span>
                </>
              ) : (
                "Log in"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <NavLink
                to="/register"
                className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                Sign up
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
