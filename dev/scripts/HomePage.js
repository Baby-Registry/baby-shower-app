import React from 'react';
import {
    Link
} from 'react-router-dom';


// This page is completely static
// <Homepage />
const Homepage = (props) => {
    return (
        <main className="homepage">
            {  props.loggedIn === true ?
                <Link to="/dashboard"><div className="linkToDash"> <h4> Go to My Dashboard </h4> </div></Link>
            : null
            }
            <section className="hero">
                <h2 className="heading__hero layout__XYCenter">Make your baby shower extra special with Betsy!</h2>
            </section>
            <div className="wrapper">
    
                <section className="layout__opposite clearfix layout__half padding">
                    
                    
                    <div className="home__graphic clearfix">
                        <ol className="clearfix">
                            <li>Search for Etsy gifts</li>
                            <li>Invite your firends&family</li>
                            <li>Keep track of your guests choices</li>
                        </ol>    
                        <div className="toyCollection">              
                            <img src="/assets/baby-boy.png" alt="Graphic of baby girl" className="graphics" />
                            <img src="/assets/toy-train.png" alt="Graphic of baby girl" className="graphics" />
                            <img src="/assets/cot.png" alt="Graphic of baby girl" className="graphics" />
                            <img src="/assets/doll.png" alt="Graphic of baby girl" className="graphics" />
                        </div>
                    </div>
                </section>
            </div>
        </main>


    )
}


export default Homepage;