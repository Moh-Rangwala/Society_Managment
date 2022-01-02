import Header from "./components/Header/Header";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./pages/Home/Home";
import AboutUs from "./pages/AboutUs/AboutUs";
import Admin from "./pages/Admin/Admin";
import ContactUs from "./pages/ContactUs/Contactus";
import LoginSignup from "./pages/LoginSignup/LoginSignUp";
import Manager from "./pages/Manager/Manager";
import Resident from "./pages/Resident/Resident";
import Services from "./pages/Services/Services";
import Visitor from "./pages/Visitor/Visitor";
import PageNotFound from "./PageNotFound";
import { init } from "emailjs-com";
import "./App.css";
import { USER_ID } from "./api/api";
import CrudAddPage from "./pages/CrudPage/CrudAddPage";
import CrudEditPage from "./pages/CrudPage/CrudEditPage";
import { Toaster } from "react-hot-toast";
import "react-confirm-alert/src/react-confirm-alert.css";
import ChatManager from "./pages/ChatManager/ChatManager";
import Gallery from "./pages/Gallery/Gallery";
import Blog from "./pages/Blog/Blog";

function App() {
  init(USER_ID);
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Toaster />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/about-us" component={AboutUs} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/contact-us" component={ContactUs} />
          <Route exact path="/admin/crud-add-page" component={CrudAddPage} />
          <Route exact path="/admin/crud-edit-page" component={CrudEditPage} />
          <Route exact path="/manager/crud-add-page" component={CrudAddPage} />
          <Route
            exact
            path="/manager/crud-edit-page"
            component={CrudEditPage}
          />
          <Route exact path="/login-signup" component={LoginSignup} />
          <Route exact path="/manager" component={Manager} />
          <Route exact path="/manager/chat-user" component={ChatManager} />
          <Route exact path="/resident" component={Resident} />
          <Route exact path="/services" component={Services} />
          <Route exact path="/visitor" component={Visitor} />
          <Route exact path="/gallery" component={Gallery} />
          <Route exact path="/blog" component={Blog} />
          <Route exact component={PageNotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
