import { useAuth } from "../../../auth/authContext";
import { doSignOut, sendResetPasswordEmail } from "../../../auth/auth";
import { useNavigate } from "react-router-dom";
import Title from "../title/Title";
import { useGetUserData } from "../../../hooks/useGetUserData";

const Profile = () => {
  const { currentUser } = useAuth() || {
    currentUser: null,
    userLoggedIn: false,
    loading: false,
  };

  const navigate = useNavigate();

  //@ts-ignore
  const userData = useGetUserData(currentUser?.uid ?? "");

  return (
    <>
      <Title titleName="" back={true} subtitle="" />
      <div className="profile section">
        <div className="profile__wrapper">
          <div className="profile__user__img">
            <img src="/default-pb.png" alt="profile" />
          </div>
          <h5 className="profile__user__displayname">
            Name: {userData ? `${userData.displayName}` : null}
          </h5>
          <h5 className="profile__user__email">
            E-Mail: {userData ? `${userData.email}` : null}
          </h5>
          <h5 className="profile__user__role">
            Role: {userData ? `${userData.role}` : null}
          </h5>
        </div>

        <button
          onClick={() => {
            sendResetPasswordEmail(currentUser?.email ?? "").then(() => {
              doSignOut().then(() => {
                navigate("/?reset=true");
              });
            });
          }}
          className="profile__user--reset"
        >
          Reset Password
        </button>
        <button
          onClick={() => {
            doSignOut().then(() => {
              navigate("/");
            });
          }}
          className="profile__user--logout"
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Profile;
