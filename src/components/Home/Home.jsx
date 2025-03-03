import React from 'react';
import BannerAnuncios from '../BannerAnuncios/BannerAnuncios';
import Tendencias from "../Tendencias/Tendencias";

function Home() {
  
  return (
    <div>
      <section>
        <BannerAnuncios />
      </section>
      <section>
        <Tendencias />
      </section>
    </div>
  )
}

export default Home