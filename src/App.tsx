import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import usePlayers from "./hooks/usePlayers";
import Landing from "./ui/pages/Landing";
import GameActive from "./ui/pages/GameActive";
import GameReplay from "./ui/pages/GameReplay";
import Wizard from "./ui/pages/Wizard";
import PlayerOverview from "./ui/pages/PlayerOverview";
import SaisonOverview from "./ui/pages/SaisonOverview";
import PlayerDetail from "./ui/pages/PlayerDetail";
import SaisonDetail from "./ui/pages/SaisonDetail";
import GameTimeout from "./ui/components/gametimeout/GameTimeout";
import Register from "./ui/components/auth/register/Register";
import Login from "./ui/components/auth/login/Login";
import { useAuth } from "./auth/authContext";
import { useGetUserData } from "./hooks/useGetUserData";
import Unverified from "./ui/pages/Unverified";
import ProfilePage from "./ui/pages/ProfilePage";
import Imprint from "./ui/pages/Imprint";
import DataPrivacy from "./ui/pages/DataPrivacy";

const App: React.FC = () => {
  const { players } = usePlayers();
  const { userLoggedIn, currentUser } = useAuth() || {
    currentUser: null,
    userLoggedIn: false,
    loading: false,
  };

  //@ts-ignore
  const userData = useGetUserData(currentUser?.uid ?? "");

  const allPlayerRoutes = players.map((player) => ({
    key: String(player.id),
    name: `${player.Name} #${player.Number}`,
    href: `/player/${player.id}`,
  }));

  if (!userData && !players)
    return (
      <div className="loader__wrapper">
        <div className="loader">🏐</div>
      </div>
    );

  return (
    <Router>
      <Routes>
        {userLoggedIn && userData.role !== "unverified" ? (
          <>
            {/* wait until this array is done loading */}
            {allPlayerRoutes.map((player) => (
              <Route
                key={player.key}
                path={player.href}
                element={<PlayerDetail playerId={player.key} />}
              />
            ))}
            <Route path="/" element={<Landing />} />
            <Route path="/game-active" element={<GameActive />} />
            <Route path="/game-replay" element={<GameReplay />} />
            <Route path="/game-timeout" element={<GameTimeout />} />
            <Route path="/wizard" element={<Wizard />} />
            <Route path="/player" element={<PlayerOverview />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/overview-season" element={<SaisonOverview />} />
            <Route
              path="/season-detail/Season-24-25"
              element={<SaisonDetail />}
            />
          </>
        ) : userLoggedIn && userData.role === "unverified" ? (
          <>
            <Route path="/" element={<Unverified />} />
            <Route path="/profile" element={<ProfilePage />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        )}
        <Route path="/imprint" element={<Imprint />} />
        <Route path="/data-privacy" element={<DataPrivacy />} />
      </Routes>
    </Router>
  );
};

export default App;
