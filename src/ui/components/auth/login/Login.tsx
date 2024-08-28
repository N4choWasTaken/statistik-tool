import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import {
  doSignInWithEmailAndPassword,
  doSignOut,
  sendResetPasswordEmail,
} from "../../../../auth/auth";
import { useAuth } from "../../../../auth/authContext/index";

const Login = () => {
  const queryParameters = new URLSearchParams(window.location.search);
  const resetPassword = queryParameters.get("reset") ?? "";
  const { userLoggedIn, currentUser } = useAuth() || {
    currentUser: null,
    userLoggedIn: false,
    loading: false,
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSigningIn(true);
    setErrorMessage(""); // Clear previous error messages

    try {
      await doSignInWithEmailAndPassword(email, password);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <div>
      {resetPassword && (
        <div className="section">
          <a className="itemlist__link--notice" href="/">
            An email has been sent to reset your password. Please check your
            inbox.
          </a>
        </div>
      )}

      {errorMessage && (
        <div className="section">
          <a className="itemlist__link--error" href="/">
            {errorMessage === "Firebase: Error (auth/invalid-credential)."
              ? "Your e-mail or password is incorrect. Please try again."
              : errorMessage}
          </a>
        </div>
      )}

      {userLoggedIn && <Navigate to={"/"} replace={true} />}

      <main className="login section">
        <div>
          <div>
            <div className="login__title">
              <h3>Log-in</h3>
              <h4>HU23 - VBC Limmattal - Statistics</h4>
            </div>
          </div>
          <form onSubmit={onSubmit}>
            <div className="login__input__wrapper">
              <div className="login__input__field">
                <input
                  id="email"
                  type="email"
                  className="login__input"
                  autoComplete="email"
                  required
                  value={email}
                  placeholder=" "
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label
                  className="login__label text-select-none"
                  htmlFor="email"
                >
                  E-Mail
                </label>
              </div>
              <div className="login__input__field">
                <input
                  id="password"
                  type="password"
                  className="login__input"
                  autoComplete="current-password"
                  required
                  value={password}
                  placeholder=" "
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label
                  className="login__label text-select-none"
                  htmlFor="password"
                >
                  Password
                </label>
              </div>
            </div>

            <p className="login__resetpassword">
              Forgot your password?{" "}
              <a
                className="c-pointer"
                onClick={() => {
                  sendResetPasswordEmail(currentUser?.email ?? "").then(() => {
                    doSignOut().then(() => {
                      window.location.href = "/?reset=true";
                    });
                  });
                }}
              >
                Reset password
              </a>
            </p>

            <button
              className={
                isSigningIn ? "login__btn login__btn--disabled" : "login__btn"
              }
              type="submit"
              disabled={isSigningIn}
            >
              {isSigningIn ? "Signing In..." : "Sign In"}
            </button>
          </form>
          <p className="login__signup">
            Don't have an account? <Link to={"/register"}>Sign up</Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;
