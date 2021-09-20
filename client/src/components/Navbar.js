import React, { useState} from 'react'
import {Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

function Navbar() {
  const pathname = window.location.pathname //name of page aka /login etc.
  const path = pathname === '/' ? 'home' : pathname === '/search' ? 'search' : pathname === '/profile' ? 'user' : pathname.substr(1)

  const [activeItem, setActiveItem] = useState(path)
  const handleItemClick = (e, { name }) => setActiveItem(name)
 
  
    return (
        <div className='nav-container'>
            <div className="nav">
            <Link to="/">
                <div><Icon name='home' size='big' className={activeItem === 'home' ? "active-icon" : "inactive-icon"} onClick = {handleItemClick}/></div>
            </Link> 
            <Link to="/search">
                <div><Icon name='search' size='big' className={activeItem === 'search' ? "active-icon" : "inactive-icon"} 
                onClick = {handleItemClick}/></div>
            </Link> 
            <Link to="/profile">
                <div><Icon name='user' size='big' className={activeItem === 'user' ? "active-icon" : "inactive-icon"} 
                onClick = {handleItemClick}/></div>
            </Link>   
            </div>
        </div>
    )
  }


export default Navbar


