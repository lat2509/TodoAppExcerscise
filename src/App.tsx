import 'normalize.css'
import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./Headers/header";
function App() {

  return (
    <div className="">
      <div className="fixed top-0 right-0 left-0 z-10">
        <Header />

      </div>
      <div className="flex items-center justify-center absolute h-full w-full bg-[url('/todo-bg.jpg')] bg-cover bg-no-repeat"><Outlet /></div>
    </div>
  );
}

export default App;
