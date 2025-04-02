import React, { useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login submitted", { email, password, rememberMe });
    // Additional login logic for email/password can be added here.
  };

  const handleSuccess = async (credentialResponse: any) => {
    try {
      console.log(credentialResponse, "credentialResponse");

      // Step 1: Get user data from Google
      const response = await axios.post(
        "https://api.rentamigo.in//api/auth/google",
        {
          credential: credentialResponse.credential,
        }
      );

      const userData = response.data;
      console.log("Google login successful", userData);

      // Step 2: Verify if the user is an employee
      const verificationResponse = await axios.post(
        "https://api.rentamigo.in//api/employees/verify",
        {
          email: userData.user.email,
        }
      );

      if (verificationResponse.data.success) {
        const role = verificationResponse.data.data.role; // Assuming role is returned
        console.log("Employee verified:", verificationResponse.data.data.employeeId);

        // Store user data in localStorage
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...userData.user,
            employeeId: verificationResponse.data.data.employeeId,
            role,
          })
        );

        // Redirect to appropriate dashboard based on role
        if (role === "manager") {
          navigate("/ManagerDashboard");
        } else {
          navigate("/Empdashboard");
        }
      } else {
        console.error("Employee verification failed");
        alert(
          "You are not registered as an employee. Please contact your administrator."
        );
      }
    } catch (error) {
      console.error("Error during Google login:", error);

      if (axios.isAxiosError(error) && error.response?.status === 404) {
        alert(
          "You are not registered as an employee. Please contact your administrator."
        );
      } else {
        alert("Failed to login with Google. Please try again.");
      }
    }
  };

  const handleError = () => {
    console.log("Google login failed");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
      <div className="w-full max-w-[400px] space-y-6 sm:space-y-8">
        <div className="flex flex-col items-center space-y-2">
          <img
            src="/src/assets/logo.png"
            alt="Rentamigo"
            className="w-12 h-12 sm:w-16 sm:h-16"
          />
          <p className="text-sm text-center text-muted-foreground">rentamigo</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Email/Password Fields (optional, uncomment if needed) */}
          {/* <div className="space-y-2 text-center">
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">
              Welcome back
            </h1>
            <p className="text-sm text-muted-foreground">
              Please enter your credentials to sign in
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                placeholder="Enter your email"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a
                  href="/forgot-password"
                  className="text-xs sm:text-sm text-primary hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked as boolean)}
            />
            <Label
              htmlFor="remember"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember me
            </Label>
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90"
            size="lg"
          >
            Sign in
          </Button>

          <div className="text-center">
            <p className="text-xs sm:text-sm text-muted-foreground">
              Don't have an account?{" "}
              <a href="/signup" className="text-primary hover:underline">
                Sign up for free
              </a>
            </p>
          </div> */}

          <div className="space-y-3">
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={handleError}
              // Optionally, customize the button appearance here
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
