import { useState } from "react";
import { supabase } from "./supabaseClient";
import "./auth.css";

export default function Auth({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleAuth = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    if (isRegister) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setMessage(error.message);
      } else if (data.session) {
        onLogin(data.session.user);
      } else {
        setMessage("Registration successful. Please login.");
        setIsRegister(false);
      }
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMessage(error.message);
      } else {
        onLogin(data.user);
      }
    }

    setLoading(false);
  };

  return (
    <div className="auth-screen">
      <div className="auth-glow glow-one"></div>
      <div className="auth-glow glow-two"></div>

      <div className="auth-card">
        <div className="auth-logo">INFOSYS</div>

        <h1>SP / DSE</h1>

        <p className="auth-subtitle">
          Preparation Kit
        </p>

        <div className="auth-tabs">
          <button
            className={!isRegister ? "active" : ""}
            onClick={() => {
              setIsRegister(false);
              setMessage("");
            }}
          >
            Login
          </button>

          <button
            className={isRegister ? "active" : ""}
            onClick={() => {
              setIsRegister(true);
              setMessage("");
            }}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleAuth}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength="6"
            required
          />

          <button
            className="auth-submit"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : isRegister
              ? "Create Account"
              : "Login"}
          </button>
        </form>

        {message && (
          <div className="auth-message">
            {message}
          </div>
        )}

        <p className="auth-footer">
          {isRegister
            ? "Already have an account?"
            : "New to the preparation kit?"}{" "}
          <button
            onClick={() => {
              setIsRegister(!isRegister);
              setMessage("");
            }}
          >
            {isRegister ? "Login" : "Register"}
          </button>
        </p>
      </div>
    </div>
  );
}