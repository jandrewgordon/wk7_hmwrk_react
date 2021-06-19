import './App.css';
import FilmContainer from './Containers/FilmContainer';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Studio Ghibli</h1>
      </header>
      <h2>Films:</h2>
      <FilmContainer/>
    </div>
  );
}

export default App;
