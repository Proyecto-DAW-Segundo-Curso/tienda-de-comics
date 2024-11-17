import './App.css';
import BannerAnuncios from './components/BannerAnuncios/BannerAnuncios';
import Header from './components/Header/Header';
import Tendencias from './components/Tendencias/Tendencias';

function App() {
  return (
    <div className="App">
      <header>
        <Header />
      </header>
      <main>
        <section>
          <BannerAnuncios />
        </section>
        <section>
          <Tendencias />
        </section>
      </main>
      <footer>

      </footer>
    </div>

  );
}

export default App;
