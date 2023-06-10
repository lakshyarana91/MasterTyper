// import Header from "./components/Header";
import Res from "./components/Res";
import TypeArea from "./components/TypeArea";
import { useGlobalContext } from "./hooks/Context";

function App() {
  const { timer, result } = useGlobalContext();

  return (
    <div className="app">
      <div className="header">
        <div className="hText">
          <h1>Master Typer</h1>
        </div>
      </div>

      {result ? <Res /> : <TypeArea />}
    </div>
  );
}

export default App;
