import "./App.css";
import Navbar from "./Components/Navbar";
import Login from "./Pages/Login";
import RegistrationScreen from "./Pages/Register";
import Table from "./Pages/Table";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import UserList from "./Pages/User-List";
import EditUser from "./Pages/EditUser"
import CreateNew from "./Pages/Create-New"
import UserInfo from "./Pages/UserInfo"
import ViewUser from "./Pages/ViewUser";
import EditJsonUser from "./Pages/EditJsonuser";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Table />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<RegistrationScreen />} />
          <Route path="/UserList" element={<UserList />} />
          <Route path="/editUser/:userId" element={<EditUser />} />
          <Route path="/viewUser/:userId" element={<ViewUser />} />
          <Route path="/editJsonUser/:userId" element={<EditJsonUser />} />
          <Route path="/createNew" element={<CreateNew />} />
          <Route path="/userInfo/:userId" element={<UserInfo />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
