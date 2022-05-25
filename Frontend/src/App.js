import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Table from "./components/Table";
import Myform from "./components/Myform";
import OpenCamera from "./components/OpenCamera";
import Test from "./components/Test";
import DashBoard from "./components/DashBoard";
import Login from "./components/Login";
import Admin from "./components/Admin";
// import table from "./components/table";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/Admin" element={<Admin />} />
        <Route exact path="/Register" element={<Myform />} />
        <Route exact path="/camera/:id" element={<OpenCamera />} />
        <Route exact path="/table" element={<Table />} />
        <Route exact path="/test" element={<Test />} />
        <Route exact path="/Dashboard/:pc" element={<DashBoard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
