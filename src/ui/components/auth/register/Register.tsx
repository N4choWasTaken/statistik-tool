// register.tsx
import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../../../../auth/authContext";
import { doCreateUserWithEmailAndPassword } from "../../../../auth/auth";

const Register = () => {
  const [userName, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { userLoggedIn } = useAuth() || {
    currentUser: null,
    userLoggedIn: false,
    loading: false,
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isRegistering) {
      setIsRegistering(true);
      try {
        await doCreateUserWithEmailAndPassword(userName, email, password);
        // Redirect to login page
        window.location.href = "/";
      } catch (error) {
        setErrorMessage(error as string);
      }
      setIsRegistering(false);
    }
  };

  return (
    <>
      {userLoggedIn && <Navigate to={"/"} replace={true} />}
      <main className="login section">
        <div>
          <div>
            <div className="login__title">
              <h1>Register</h1>
              <h4>For HU23 - VBC Limmattal - Statistics</h4>
            </div>
          </div>
          <form onSubmit={onSubmit}>
            <div className="login__input__wrapper">
              <div className="login__input__field">
                <input
                  className="login__input"
                  id="name"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder=" "
                  value={userName}
                  onChange={(e) => setuserName(e.target.value)}
                />
                <label className="login__label text-select-none" htmlFor="name">
                  Username
                </label>
              </div>
              <div className="login__input__field">
                <input
                  className="login__input"
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder=" "
                  value={email}
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
                  className="login__input"
                  id="password"
                  disabled={isRegistering}
                  type="password"
                  autoComplete="new-password"
                  required
                  placeholder=" "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label
                  className="login__label text-select-none"
                  htmlFor="password"
                >
                  Password
                </label>
              </div>
              <div className="login__input__field">
                <input
                  className="login__input"
                  id="confirmPassword"
                  disabled={isRegistering}
                  type="password"
                  autoComplete="off"
                  required
                  placeholder=" "
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <label
                  className="login__label text-select-none"
                  htmlFor="confirmPassword"
                >
                  Confirm Password
                </label>
              </div>
            </div>

            {errorMessage && <span>{errorMessage}</span>}

            <button
              type="submit"
              disabled={isRegistering}
              className={
                isRegistering ? "login__btn login__btn--disabled" : "login__btn"
              }
            >
              {isRegistering ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
          <p className="login__signup">
            Already have an account? {"   "}
            <Link
              to={"/"}
              className="text-center text-sm hover:underline font-bold"
            >
              Continue
            </Link>
          </p>
        </div>
      </main>
    </>
  );
};

export default Register;
