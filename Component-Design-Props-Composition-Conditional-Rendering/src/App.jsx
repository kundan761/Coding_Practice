import React from "react";
import Greeting from "./components/Greeting.jsx";
import UserProfile from "./components/UserProfile.jsx";
import Dashboard from "./components/Dashboard.jsx";
import "./App.css";
import UserDashboard from "./components/UserDashboard.jsx";
function App() {
  return (
    <div className="App">
      <div style={{ display: "flex", gap: "20%" }}>
        <div>
          <Greeting name="John" timeOfDay="Morning" />
          <Greeting name="Sarah" timeOfDay="Afternoon" />
          <Greeting name="Alex" timeOfDay="Evening" />
        </div>
        <UserProfile
          name={"John Doe"}
          email={"jhonDoe@example.com"}
          bio={"I like to code."}
          imageUrl={
            "https://i.pinimg.com/736x/f3/85/d7/f385d78eba93e8b768bcc04bf96fe5a5.jpg"
          }
        />
      <div>
        <Dashboard isLoggedIn={true} />
        <Dashboard isLoggedIn={false} />
      </div>
      </div>
      <hr />

      <UserDashboard
        name="Emily Smith"
        email="emily.smith@example.com"
        bio="Frontend developer and designer."
        imageUrl="https://i.pinimg.com/736x/f3/85/d7/f385d78eba93e8b768bcc04bf96fe5a5.jpg"
        isLoggedIn={true}
      />

      <UserDashboard
        name="Guest"
        email=""
        bio=""
        imageUrl=""
        isLoggedIn={false}
      />
    </div>
  );
}

export default App;
