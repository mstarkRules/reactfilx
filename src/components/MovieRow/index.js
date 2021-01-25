import React, {useState} from 'react';
import './MovieRow.css';

import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';


export default (props)=>{
    const [scrollX, setScrollX] = useState(0);

    const handleLeftArrow=()=>{
        //pegar o valor pra se scrollar pra esquerda
        //usar o tamanho da tela /2
        let x = scrollX + Math.round(window.innerWidth /2);
        if(x >0){
            x = 0;
        }
        setScrollX(x);
    }

    const handleRightArrow=()=>{
        //pega o valor que quer scrollar
        let x = scrollX - Math.round(window.innerWidth /2);
        // pega o tamanho da lista de itens
        let listW = props.data.items.results.length * 150;
        //agora verifico se a diferença do tamanho da tela
        //menos o tamanho da lista é maior que o valor que
        //se quer rolar. Se for maior, tem que voltar um pouco.
        if((window.innerWidth - listW) > x){
            // 60 é o valor dos paddings laterais de 30
            x = (window.innerWidth - listW) - 60;
        }
        setScrollX(x);
    }

    return (
        <div className="movieRow">
            <h2>{props.data.title}</h2>
            <div className="movieRow--left" onClick={handleLeftArrow}>
                <NavigateBeforeIcon style={{fontSize: 50}}/>
            </div>
            <div className="movieRow--right" onClick={handleRightArrow}>
                <NavigateNextIcon style={{fontSize: 50}} />
            </div>
            <div className="movieRow--listarea">
                <div className="movieRow--list" style={{
                    marginLeft: scrollX,
                    width: props.data.items.results.length * 150
                }}>
                    {props.data.items.results.length > 0 && props.data.items.results.map((item, key)=>(
                        <div key={key} className="movieRow--item">
                            <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} 
                                alt={item.original_title}
                            />
                        </div>
                        
                    ))}
                </div>
            </div>
        </div>
    )
}