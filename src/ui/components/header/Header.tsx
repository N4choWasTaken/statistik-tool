import { useAuth } from "../../../auth/authContext";
import { useGetUserData } from "../../../hooks/useGetUserData";

const Header = () => {
  const { currentUser } = useAuth() || {
    currentUser: null,
    userLoggedIn: false,
    loading: false,
  };

  //@ts-ignore
  const userData = useGetUserData(currentUser?.uid ?? "");

  return (
    <>
      <div className="header section">
        <div className="header__header">
          <h5 className="header__header__user">
            <div
              className="header__header__user__profile c-pointer"
              onClick={() => {
                window.location.href = "/profile";
              }}
            >
              <div className="header__header__user__profile--img">
                <img src="/src/assets/default-pb.png" alt="profile" />
              </div>
              {userData && currentUser
                ? `${userData?.displayName}`
                : `${currentUser?.email}`}
            </div>
          </h5>
        </div>
      </div>
    </>
  );
};

export default Header;
