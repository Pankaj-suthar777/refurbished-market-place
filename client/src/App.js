import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedPage from "./components/ProtectedPage";
import Spinner from "./components/Spinner";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import ProductInfo from "./pages/ProductInfo";
import Search from "./pages/Home/Search";

function App() {
  const { loading } = useSelector((state) => state.loaders);
  return (
    <div>
      {loading && <Spinner></Spinner>}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedPage>
                <Home></Home>
              </ProtectedPage>
            }
          ></Route>
          <Route
            path="/product/:id"
            element={
              <ProtectedPage>
                <ProductInfo></ProductInfo>
              </ProtectedPage>
            }
          ></Route>
          <Route
            path="/search"
            element={
              <ProtectedPage>
                <Search></Search>
              </ProtectedPage>
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <ProtectedPage>
                <Profile></Profile>
              </ProtectedPage>
            }
          ></Route>
          <Route
            path="/admin"
            element={
              <ProtectedPage>
                <Admin></Admin>
              </ProtectedPage>
            }
          ></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
