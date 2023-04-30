import Admin from "./Pages/Admin/Admin";
import LoginForm from "./Pages/Login/LoginForm";
import SignupForm from "./Pages/Register/SignupForm";
import User from "./Pages/User/User";
import NotFound from "./Pages/NotFound/NotFound";
import {
  BrowserRouter as Router,
  Route,
  BrowserRouter,
  Routes,
} from "react-router-dom";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* anyother page then this give 404 error */}
          <Route path="/login"  element={<LoginForm/>} />
          <Route path="/register"  element={<SignupForm/>} />
          <Route path="/admin/:name"  element={<Admin/>} />
          <Route path="/user/:name"  element={<User/>} />
          <Route path='*' element={<NotFound />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
