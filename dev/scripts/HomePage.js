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
                <h2 className="heading__hero layout__XYCenter">A Registry For Your Special One</h2>
            </section>
            <div className="wrapper">
    
                <section className="layout__opposite clearfix layout__half padding">

                    <div className="home__description">
                        <div className="smallWrap">
                            <h3 className="heading__section">Make your baby shower extra special with Baby Registry!</h3>
                            <p>1. Search for Etsy gifts</p>
                            <p>2. Invite guests to your event</p>
                            <p>3. Keep track of your guests choices!</p>
                        </div>
                    </div>
                    
                    <div className="home__graphic">
                        <img src="/assets/svg-babyGirl-black.svg" alt="Graphic of baby girl" className="graphics layout__XYCenter" />
                    </div>
                </section>
                {/* <section>
                    <img src="/assets/baby.jpeg" alt="Baby girl in a tutu eating cake"/>
                </section> */}
            </div>
        </main>


    )
}


export default Homepage;