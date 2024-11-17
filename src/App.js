import './App.css';
import BannerAnuncios from './components/BannerAnuncios/BannerAnuncios';
import Footer from './components/Footer/Footer';
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
        <Footer />
      </footer>
    </div>

  );
}

export default App;
