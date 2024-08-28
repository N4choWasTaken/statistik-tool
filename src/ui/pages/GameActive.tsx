import { useAuth } from "../../auth/authContext";
import GameTable from "../components/gametable/GameTable";
import { useGetUserData } from "../../hooks/useGetUserData";
import Title from "../components/title/Title";

export default function Table() {
  const { currentUser } = useAuth() || {
    currentUser: null,
    userLoggedIn: false,
    loading: false,
  };

  //@ts-ignore
  const userData = useGetUserData(currentUser?.uid ?? "");

  return (
    <>
      {userData.role === "admin" || userData.role === "moderator" ? (
        <GameTable />
      ) : (
        <>
          <Title titleName="Back" back={true} subtitle="" />
          <div className="section">
            <a className="itemlist__link--error" href="/">
              We are sorry, but you don't have permission to view this page :(
            </a>
          </div>
        </>
      )}
    </>
  );
}
