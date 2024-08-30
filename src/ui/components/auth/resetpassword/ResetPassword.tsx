import { useState } from "react";
import { Navigate } from "react-router-dom";
import {
  sendResetPasswordEmail,
} from "../../../../auth/auth";
import { useAuth } from "../../../../auth/authContext/index";
import Title from "../../title/Title";

const ResetPassword = () => {
  const { userLoggedIn } = useAuth() || {
    currentUser: null,
    userLoggedIn: false,
    loading: false,
  };

  const [email, setEmail] = useState("");
  const [isReseting, setisReseting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setisReseting(true);
    setErrorMessage(""); // Clear previous error messages

    try {
      await sendResetPasswordEmail(email);
      window.location.href = "/?reset=true";
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    } finally {
      setisReseting(false);
    }
  };

  return (
    <div>
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
        <Title titleName="" back={true} subtitle="" />
        <div>
          <div>
            <div className="login__title">
              <h3>Reset Password</h3>
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
                  Your E-Mail
                </label>
              </div>
            </div>

            <button
              className={
                isReseting ? "login__btn login__btn--disabled" : "login__btn"
              }
              type="submit"
              disabled={isReseting}
            >
              {isReseting ? "Reseting password..." : "Reset password"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ResetPassword;
