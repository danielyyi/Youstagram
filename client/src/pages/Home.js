import React from 'react'
import Navbar from '../components/Navbar';
import Headerbar from '../components/Headerbar';
import Post from '../components/Post';

import astro from '../astro.jpg'
import zuck from '../zuck.jpg'
import flowers from '../flowers.jpg'


function Home(){
    return(
        <div> 
            <Headerbar  />
            <div className="fake-headerbar"></div>

            <Post props = {astro}/>
            <Post props = {flowers}/>
            <Post props = {zuck}/>

            <div style={{height:75}}></div>
            <Navbar  />
        </div>
    )
}
export default Home;