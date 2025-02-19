"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import styles from "./styles.module.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/login`, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      const { token } = data;

      if (token) {
        // localStorage.setItem("token", token);
        Cookies.set("token", token, { expires: 1 });
        setSuccessMessage("Login successful! Redirecting to homepage...");
        setTimeout(() => {
          router.push("/homepage");
        }, 1000);
      } else {
        setErrorMessage("Login failed. Please check your email and password.");
      }
    } catch (error) {
      setErrorMessage("Login failed. Please try again later.");
      console.error("Login failed:", error);
      setErrorMessage("Login failed. Please try again later.");
      console.error("Login failed:", error);
      console.error("Error details:", error.message, error.stack);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h2 className={styles.title}>Login</h2>
        <form onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              className={styles.input}
              placeholder="Email"
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              className={styles.input}
              placeholder="Password"
            />
          </div>
          <button type="submit" className={styles.loginButton}>
            Login
          </button>
        </form>
        {successMessage && (
          <p className={styles.successMessage}>{successMessage}</p>
        )}
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        <p className={styles.signup}>
          Don{"'"}t have an account?{" "}
          <a href="/RegistrationPage" className={styles.signupLink}>
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
