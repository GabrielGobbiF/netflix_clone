import React, { useEffect, useState } from 'react';
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header/Header';


export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setblackHeader] = useState(false);

  // quando a tela for carregada
  //execute o codigo
  useEffect(() => {
    const loadAll = async () => {
      //pegar lista
      let list = await Tmdb.getHomelist();
      setMovieList(list);

      //pegar o principal
      let originals = list.filter(i => i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];

      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');

      setFeaturedData(chosenInfo);

    }
    loadAll();
  }, []);


  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 10){
        setblackHeader(true);
      }else {
        setblackHeader(false);
      }
    }
    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  })

  return (
    <div className="page">

      <Header black={blackHeader} />


      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
         feito com <span role="img" aria-label="coração">❤</span> por Gabriel Gobbi<br/>
         direitos de imagem Netflix<br/>
         Dados pela https://www.themoviedb.org/<br/>
      </footer>
    </div>
  )
}