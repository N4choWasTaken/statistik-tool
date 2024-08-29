import Header from "../components/header/Header";
import Title from "../components/title/Title";

export default function Unverified() {
  return (
    <>
      <Header />
      <Title titleName="" back={true} subtitle="" />
      <div className="section">
        <h1>Imprint</h1>
        <p>
          <strong>Last Updated:</strong> 29. Aug 2024
        </p>

        <p>
          Creators: <br />
          Nico & Thierry <br />
          nicofortino2.0@gmail.com
          <br />
          thierrygmuer@outlook.com
        </p>
      </div>
    </>
  );
}
