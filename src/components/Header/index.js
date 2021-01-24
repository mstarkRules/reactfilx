import React from 'react';
import './Header.css';

export default ()=>{
    return(
        <header className="black">
            <div className="header--logo">
                <a href="/">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix"/>
                </a>
            </div>
            <div className="header--user">
                <a href="/">
                    <img src="https://occ-0-2545-3852.1.nflxso.net/dnm/api/v6/0RO1pLmU93-gdXvuxd_iYjzPqkc/AAAABQazGc8OxX63e1mRo_dG4rnAjvy-KW57vP-CaAUavTsm33zC29Zx30V6AA0Ma8x_nqX7LNVfRMVbpvQzf3xT4C1muU9z.png" alt="Usuário"/>
                </a>
            </div>
        </header>
    );
}