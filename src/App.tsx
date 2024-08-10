import { useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import Wishlist from "./components/Wishlist";
import Profile from "./components/Profile";

function App() {
  const [formType, setFormType] = useState("register");
  return (
    <>
      <div
        style={{
          boxSizing: "border-box",
          padding: "20px 30px",
        }}
      >
        <button
          onClick={() => setFormType("register")}
          style={{ marginRight: "10px" }}
        >
          Register
        </button>
        <button
          onClick={() => setFormType("login")}
          style={{ marginRight: "10px" }}
        >
          Login
        </button>
        <button
          onClick={() => setFormType("wishlist")}
          style={{ marginRight: "10px" }}
        >
          Wist list
        </button>
        <button onClick={() => setFormType("profile")}>Profile</button>
      </div>
      <div style={{ width: "100vw" }}>
        {formType === "register" && <Register></Register>}
        {formType === "login" && <Login></Login>}
        {formType === "wishlist" && <Wishlist></Wishlist>}
        {formType === "profile" && <Profile></Profile>}
      </div>
    </>
  );
}

export default App;
