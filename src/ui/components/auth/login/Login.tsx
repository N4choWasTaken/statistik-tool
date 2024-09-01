import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { doSignInWithEmailAndPassword } from "../../../../auth/auth";
import { useAuth } from "../../../../auth/authContext/index";

const Login = () => {
  const queryParameters = new URLSearchParams(window.location.search);
  const resetPassword = queryParameters.get("reset") ?? "";
  const { userLoggedIn } = useAuth() || {
    currentUser: null,
    userLoggedIn: false,
    loading: false,
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisibility = () => {
    const passwordInput = document.getElementById(
      "password"
    ) as HTMLInputElement;
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      setPasswordShown(true);
    } else {
      passwordInput.type = "password";
      setPasswordShown(false);
    }
  };

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
                <div
                  className="login__input__field--passwordtoggle"
                  onClick={() => togglePasswordVisibility()}
                >
                  {passwordShown ? (
                    <svg
                      width="29"
                      height="23"
                      viewBox="0 0 29 23"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M1.58088 12.0386C1.6068 12.0762 1.63742 12.1189 1.67305 12.1666C1.83801 12.3874 2.08902 12.6876 2.41982 13.0412C3.08057 13.7475 4.04279 14.6491 5.23585 15.5363C7.63065 17.317 10.9014 19 14.5 19C18.0986 19 21.3694 17.317 23.7641 15.5363C24.9572 14.6491 25.9194 13.7475 26.5802 13.0412C26.911 12.6876 27.162 12.3874 27.327 12.1666C27.3626 12.1189 27.3932 12.0762 27.4191 12.0386C27.3845 12.0018 27.3433 11.9597 27.295 11.9122C27.0806 11.7015 26.7596 11.4174 26.3486 11.0832C25.5284 10.4163 24.373 9.56879 23.0466 8.73593C20.3663 7.05295 17.0967 5.5 14.5 5.5C11.9033 5.5 8.6337 7.05295 5.95338 8.73593C4.62697 9.56879 3.47163 10.4163 2.65137 11.0832C2.24043 11.4174 1.91939 11.7015 1.705 11.9122C1.65668 11.9597 1.61546 12.0018 1.58088 12.0386ZM5.42162 7.88904C8.1163 6.19704 11.5967 4.5 14.5 4.5C17.4033 4.5 20.8837 6.19704 23.5784 7.88904C24.9395 8.74368 26.1279 9.61492 26.9795 10.3073C27.4045 10.6529 27.7514 10.9586 27.996 11.1991C28.1171 11.3181 28.2217 11.4295 28.2996 11.527C28.3379 11.5751 28.3784 11.6303 28.4117 11.6891C28.4345 11.7292 28.5 11.847 28.5 12C28.5 12.1177 28.462 12.2148 28.4444 12.2571C28.4213 12.3128 28.3923 12.3676 28.363 12.4179C28.304 12.5194 28.2237 12.6371 28.1281 12.765C27.9357 13.0227 27.6593 13.3514 27.3104 13.7244C26.6118 14.4712 25.6053 15.4134 24.3609 16.3387C21.8806 18.183 18.4014 20 14.5 20C10.5986 20 7.11935 18.183 4.63915 16.3387C3.39471 15.4134 2.38818 14.4712 1.68955 13.7244C1.34067 13.3514 1.06433 13.0227 0.871872 12.765C0.776335 12.6371 0.695965 12.5194 0.636959 12.4179C0.607719 12.3676 0.578741 12.3128 0.555625 12.2571C0.538049 12.2148 0.5 12.1177 0.5 12C0.5 11.847 0.565509 11.7292 0.588284 11.6891C0.621628 11.6303 0.662083 11.5751 0.700441 11.527C0.778292 11.4295 0.882859 11.3181 1.00399 11.1991C1.24857 10.9586 1.59551 10.6529 2.0205 10.3073C2.87212 9.61492 4.06053 8.74368 5.42162 7.88904ZM10.6464 8.14645C12.7747 6.01819 16.2253 6.01819 18.3536 8.14645C20.4818 10.2747 20.4818 13.7253 18.3536 15.8536C16.2253 17.9818 12.7747 17.9818 10.6464 15.8536C8.51819 13.7253 8.51819 10.2747 10.6464 8.14645ZM17.6464 8.85356C15.9087 7.11582 13.0913 7.11582 11.3536 8.85356C9.61582 10.5913 9.61582 13.4087 11.3536 15.1464C13.0913 16.8842 15.9087 16.8842 17.6464 15.1464C19.3842 13.4087 19.3842 10.5913 17.6464 8.85356Z"
                        fill="black"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="28"
                      height="23"
                      viewBox="0 0 28 23"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M22.3146 0.111394C22.5292 0.285142 22.5624 0.599985 22.3886 0.814616L19.1686 4.79226C19.2615 4.83286 19.3541 4.87409 19.4465 4.91591C21.6257 5.90233 23.7208 7.24156 25.2695 8.37608C26.0445 8.9438 26.6891 9.46496 27.1439 9.87095C27.3701 10.0729 27.5566 10.2528 27.6903 10.3998C27.7562 10.4722 27.8185 10.5465 27.8673 10.6182C27.8917 10.6539 27.9195 10.6988 27.943 10.75C27.9627 10.793 28 10.8838 28 11C28 11.1177 27.962 11.2148 27.9444 11.2571C27.9213 11.3129 27.8923 11.3676 27.863 11.4179C27.804 11.5194 27.7237 11.6371 27.6281 11.765C27.4357 12.0227 27.1593 12.3514 26.8104 12.7244C26.1118 13.4712 25.1053 14.4134 23.8609 15.3387C21.3806 17.183 17.9014 19 14 19C12.3535 19 10.783 18.6761 9.33374 18.1652C9.07741 18.0748 8.82479 17.9785 8.57611 17.8771L5.38862 21.8146C5.21487 22.0292 4.90003 22.0624 4.6854 21.8886C4.47077 21.7149 4.43763 21.4 4.61138 21.1854L7.6287 17.4581C7.55808 17.4245 7.48784 17.3904 7.41797 17.356C5.23271 16.2805 3.40812 14.8581 2.12995 13.6623C1.49037 13.0639 0.98261 12.5176 0.63114 12.0931C0.456105 11.8817 0.314922 11.6947 0.214564 11.5425C0.164894 11.4672 0.119639 11.392 0.0848188 11.3213C0.0621465 11.2753 0 11.1487 0 11C0 10.847 0.0655093 10.7292 0.0882838 10.6891C0.121628 10.6304 0.162083 10.5751 0.200441 10.527C0.278292 10.4295 0.382859 10.3181 0.503986 10.1991C0.748574 9.95866 1.09551 9.65291 1.5205 9.30736C2.37212 8.61493 3.56053 7.74369 4.92162 6.88906C7.6163 5.19705 11.0967 3.50002 14 3.50002C15.3322 3.50002 16.7775 3.85629 18.202 4.39698L21.6114 0.185417C21.7851 -0.0292127 22.1 -0.0623541 22.3146 0.111394ZM17.5376 5.2177C16.2935 4.77174 15.0843 4.50002 14 4.50002C11.4033 4.50002 8.1337 6.05297 5.45338 7.73595C4.12697 8.56881 2.97163 9.41631 2.15137 10.0833C1.74043 10.4174 1.41939 10.7015 1.205 10.9122C1.15668 10.9597 1.11546 11.0019 1.08088 11.0386C1.15476 11.1458 1.26133 11.2862 1.40135 11.4553C1.72263 11.8433 2.20064 12.359 2.81315 12.932C4.03913 14.079 5.78393 15.4372 7.85957 16.4588C7.99728 16.5266 8.13639 16.5929 8.27685 16.6575L9.92614 14.6201C8.02092 12.48 8.09435 9.19856 10.1464 7.14646C11.9205 5.3724 14.6134 5.07715 16.6933 6.26072L17.5376 5.2177ZM16.0535 7.05107C14.3768 6.17861 12.261 6.44611 10.8536 7.85357C9.21773 9.48939 9.1218 12.082 10.5657 13.83L16.0535 7.05107ZM11.2874 14.5279L16.8856 7.61246C16.9749 7.68872 17.062 7.76909 17.1464 7.85357C18.8842 9.59131 18.8842 12.4087 17.1464 14.1465C15.5469 15.7461 13.0324 15.8732 11.2874 14.5279ZM10.658 15.3054C12.7959 16.9693 15.8884 16.8187 17.8536 14.8536C19.9818 12.7253 19.9818 9.27472 17.8536 7.14646C17.7441 7.037 17.6311 6.93316 17.515 6.83495L18.5149 5.59978C18.6878 5.67276 18.861 5.74856 19.0341 5.82692C21.132 6.77656 23.1667 8.07523 24.6786 9.18278C25.4339 9.7361 26.0523 10.237 26.4779 10.617C26.6707 10.7891 26.8181 10.9312 26.9191 11.0386C26.8932 11.0762 26.8626 11.1189 26.827 11.1666C26.662 11.3875 26.411 11.6876 26.0802 12.0412C25.4194 12.7476 24.4572 13.6491 23.2641 14.5363C20.8694 16.317 17.5986 18 14 18C12.4852 18 11.0276 17.702 9.66626 17.2221C9.52145 17.171 9.37777 17.1179 9.23525 17.0629L10.658 15.3054ZM0.975518 10.8648C0.975518 10.8648 0.977653 10.8689 0.98022 10.876C0.976521 10.8682 0.975518 10.8648 0.975518 10.8648Z"
                        fill="black"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M22.8146 1.11139C23.0292 1.28514 23.0624 1.59999 22.8886 1.81462L5.88862 22.8146C5.71487 23.0292 5.40003 23.0624 5.1854 22.8886C4.97077 22.7149 4.93763 22.4 5.11138 22.1854L22.1114 1.18542C22.2851 0.970787 22.6 0.937646 22.8146 1.11139Z"
                        fill="#FCFCFC"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </div>

            <p className="login__resetpassword">
              Forgot your password?{" "}
              <a className="c-pointer" href="/resetpassword">
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
