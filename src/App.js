import React, { useEffect, useState } from 'react';
import './App.css';

import MovieRow from './components/MovieRow/';
import FeaturedMovie from './components/FeaturedMovie/';
import Header from './components/Header/';

import Tmdb from './Tmbd';

import { Spinner } from 'react-activity';
import 'react-activity/lib/Spinner/Spinner.css';

const App =()=>{

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [blackHeader, setBlackHeader] = useState(false);

  const loadAll = async ()=>{
    let list = await Tmdb.getHomeList();
    setMovieList(list);

    loadFeaturedData(list);
  }

  const loadFeaturedData = async(list)=>{
    setLoading(true);

    let originals = list.filter(i=>i.slug === 'originals');
    let randomChosen = Math.floor(Math.random()* (originals[0].items.results.length - 1 ));
    let chosen = originals[0].items.results[randomChosen];

    let choseInfo = await Tmdb.getMovieInfo(chosen.id,'tv');

    let choseMovieInfo = await Tmdb.getMovieInfo(chosen.id,'movie');

    setFeaturedData(choseInfo);

    setLoading(false);
  }

  useEffect(()=>{

    loadAll();
  },[]);

  useEffect(()=>{
    const scrollListener = ()=>{
      if(window.scrollY > 10){
        setBlackHeader(true);
      } else{
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);

    return ()=>{
      window.removeEventListener('scroll', scrollListener);

    }
  },[])
    
  return(
    
    <div className="page">
      
      <Header black={blackHeader}/>
      {loading &&
        <div className="spinner">
          <Spinner
          
          />
        </div>
        
      }
      
      {featuredData &&
        <FeaturedMovie
          item={featuredData}
        />
      }
      {!loading &&
        <section className="lists">
        {movieList.map((item, key)=>(
          <MovieRow
            key={key}
            data={item}
          />
        ))}
      </section>
      }
      
      <footer>
        Feito com <span role="img" aria-label="coração">❤️</span> por 
        
        <a className="footer--link" href="https://www.linkedin.com/in/marcos-paulo-amorim-b08228160/"  target="_blank"> MStark</a><br/>
        Direitos de imagem pertencem a Netflix <br/>
        Informações base da API do Themoviedb.org 
      </footer>
      
    </div>
  )
}
export default App;