import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Home from "./Home";
function App()
{
return (
<Router>
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Home" element={<Home />} />
    </Routes>
</Router>
);
}
export default App;