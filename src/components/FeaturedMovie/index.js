import React, {useState, useEffect} from 'react';
import './FeaturedMovie.css';

import Modal from '../../components/ModalMore';

export default({item})=>{

    const [genres, setGenres] = useState([]);
    const [description, setDescription] = useState('');
    const [more, setMore] = useState(false);
    const [activeModal, setActiveModal] = useState(false);

    console.log('item: ',item);

    let firstDate = new Date(item.first_air_date);

    const loadDescription=()=>{
        setMore(false);
        let desc = item.overview;

        if (desc.length >100){
            desc = desc.substring(0,100)+'...';
            setMore(true);
        }

        setDescription(desc);
        
        
    }
    

    const loadGenres=()=>{
        let gen = []
        
        for(let i in item.genres){
            gen.push(item.genres[i].name);
        }
        setGenres(gen);
    }
    

    useEffect(()=>{
        loadDescription();
        loadGenres();
    },[])

    const handleMore=()=>{
        setActiveModal(true);
    }
    
    

    return(

        
        <section className="featured"
            style={{
                backgroundSize: 'cover',
                backgroundPosition:'center',
                backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
            }}
        >
            {activeModal &&
                <Modal
                     data={item.overview}
                     image={item.backdrop_path}
                />
            }
            
            <div className="featured--vertical">
                <div className="featured--horizontal">
                    <div className="featured--name">{item.name}</div>
                    <div className="featured--info">
                        <div className="featured--points">{item.vote_average} pontos</div>
                        <div className="featured--year">{firstDate.getFullYear()}</div>
                        <div className="featured--seasons">{item.number_of_seasons} temporada{item.number_of_seasons !== 1 ?'s':''}</div>
                    </div>
                    <div className="featured--description">{description} {more && <div className="featured--descriptionMore" onClick={handleMore}> Ver mais</div>
                        }
                        
                    </div>
                    
                    <div className="featured--buttons">
                        <a href={`/watch/${item.id}`} className="featured--watchbutton">► Assistir</a>
                        <a href={`/list/add/${item.id}`} className="featured--mylistbutton">+ Minha Lista</a>
                    </div>
                    <div className="featured--genres"><strong>Gêneros: </strong> {genres.join(', ')} </div>
                
                </div>
            </div>
        </section>
    )
}