import React from 'react';
import BannerAnuncios from '../BannerAnuncios/BannerAnuncios';
import Tendencias from "../Tendencias/Tendencias";
import Comics from "../../data/comics.json";

function Home() {
  console.log("hola");
  
  return (
    <div>
      <section>
        <BannerAnuncios />
      </section>
      <section>
        <Tendencias comics= {Comics} />
      </section>

    </div>
  )
}

export default Home