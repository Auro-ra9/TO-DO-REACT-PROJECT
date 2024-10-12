import { BrowserRouter, Route, Routes } from "react-router-dom";
import List from "./components/List";

const App = () => {
  return (
    <>
      <h1 style={{marginLeft:"150px"}}>TODO APP</h1>
    <div className="notepad-container">
      <List />
      <BrowserRouter>
      <Routes>
        <Route path="/list" element={<List/>}/>
      </Routes>
      </BrowserRouter>
    </div>
    </>
  );
};

export default App;
