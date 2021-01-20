import React, { useEffect, useState } from 'react';
import './App.css';

import MovieRow from './components/MovieRow';

import Tmdb from './Tmbd';

const App =()=>{

  const [movieList, setMovieList] = useState([]);

  const loadAll = async ()=>{
    let list = await Tmdb.getHomeList();
    setMovieList(list);
  }

  useEffect(()=>{

    loadAll();
  },[]);
  
  return(
    <div className="page">
      <section className="lists">
        {movieList.map((item, key)=>(
          <MovieRow
            key={key}
            data={item}
          />
        ))}
      </section>
    </div>
  )
}
export default App;