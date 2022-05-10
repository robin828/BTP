import React from "react";
import LoginPage from "./pages/common/LoginPage";
import UserLogin from "./pages/common/UserLogin";
import { ThemeProvider } from "@mui/styles";
import theme from "./theme";
import Header from "./pages/common/Header";
// import { Link } from 'react-router-dom'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./pages/users/LandingPage";
import ChatPage from "./pages/users/ChatPage";
import AddVideoForm from "./pages/users/AddVideoForm";
import VideoAnalytics from "./pages/users/VideoAnalytics";

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState();
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Router>
          {/* {localStorage.getItem("email") && <Header />} */}
          {/* <LandingPage /> */}
          <Switch>
            <>
              {/* <LandingPage /> */}
              {/* <LoginPage setIsLoggedIn={setIsLoggedIn} /> */}
              <Route exact path="/" component={LoginPage} />
              <Route exact path="/user/login" render={() => <UserLogin setIsLoggedIn={setIsLoggedIn} />} />
              {<Header />}
              {<Route exact path="/videos" component={LandingPage} />}
              {<Route exact path="/videos/:id" component={ChatPage} />}
              {<Route exact path="/add/video" component={AddVideoForm} />}
              {<Route exact path="/videos/analytics/:id" component={VideoAnalytics} />}

              {/* {localStorage.getItem('email') && <Route exact path="/videos" component={LandingPage} />}
              {localStorage.getItem('email') && <Route exact path="/videos/:id" component={ChatPage} />}
              {localStorage.getItem('email') && <Route exact path="/add/video" component={AddVideoForm} />} */}
            </>
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
