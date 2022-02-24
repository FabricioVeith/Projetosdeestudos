/* eslint-disable import/no-anonymous-default-export */
import React, {useEffect, useState} from "react";
import './App.css'
import Tmdb from "./Tmdb";
import MovieRow from "./components/MovieRow";
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';
    

export default () => {

  const [movieList, setMovieList] = useState ([]);
  const [featuredData, setFeaturedData] = useState (null);
  const [blackHeader, setBlackHeader] = useState (false);

  useEffect(()=>{
    const loadAll = async () => {
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
       setFeaturedData(chosenInfo);
    
    }

    loadAll();
  }, []);

  useState(()=>{
    const scrollLister = () => {
      if(window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollLister);

    return () => {
      window.removeEventListener('scroll', scrollLister);
    }

  }, []);


  return (
    <div className="page">

      <Header black={blackHeader} />

        {featuredData &&
          <FeaturedMovie item={featuredData}/>
        }



      <section className="list">
        {movieList.map((item,key)=>(
          <MovieRow key={key} title={item.title} items={item.items}/>
        ))}
      </section>

      <footer>
        Desevolvido Por <span>Fabricio Veith</span><br/>
        Direitos de imagenes para Netflix<br/>
        Dados pegos no site Themovie.org
      </footer>

    </div>
  );
}