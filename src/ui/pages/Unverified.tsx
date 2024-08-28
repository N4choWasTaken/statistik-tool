import Header from "../components/header/Header";

export default function Unverified() {
  return (
    <>
      <Header />
      <div className="section">
        <h1>Hold tight!</h1>

        <p>
          We are currently verifying your account. This process may take time.
        </p>
      </div>
    </>
  );
}
