import React from 'react';


// This page is completely static
// <Homepage />
const Homepage = () => {
    return (
        <main className="homepage">
            <div className="wrapper">
                <section className="hero">
                    <h2 className="heading__hero layout__XYCenter">Stress-free Event Planning</h2>
                </section>
    
                <section className="layout__opposite clearfix layout__half padding">

                    <div className="home__description">
                        <p className="smallWrap">Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis debitis sed voluptatibus consequuntur impedit, minus, officia provident distinctio dolor voluptates perferendis eum nam nesciunt! Commodi enim aliquam illo facere consectetur, at dignissimos nemo soluta quis laudantium sint atque quae officia, a magni sapiente labore voluptatibus, fuga harum reiciendis quam. Sit nam eaque dolore, a veniam quos nulla dolores nobis officiis? Dolorum beatae fugiat, repudiandae officiis eos excepturi quis dolores cumque!</p>
                    </div>
                    
                    <div className="home__graphic">
                        <img src="/assets/svg-babyGirl.svg" alt="Graphic of baby girl" className="graphics layout__XYCenter" />
                    </div>
                </section>
                <section>
                    <img src="/assets/baby.jpeg" alt="Baby girl in a tutu eating cake"/>
                </section>
            </div>
        </main>


    )
}


export default Homepage;