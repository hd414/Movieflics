import axios from '../../axios';
import React, { useState, useEffect } from 'react';
import './row.styles.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ButtonGroup from '../Button_Group/ButtonGroup';
import CarouselItem from '../Carousel/Carousel.item';
import aos from 'aos';
import 'aos/dist/aos.css';





const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 8,
        slidesToSlide: 3,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1060 },
        items: 5.5,
        slidesToSlide: 3,
    },
    tablet: {
        breakpoint: { max: 1060, min: 800 },
        items: 4,
        slidesToSlide: 1,
    },
    smallerDevice: {
        breakpoint: { max: 800, min: 500 },
        items: 3,
        slidesToSlide: 1,
    },
    mobile: {
        breakpoint: { max: 500, min: 0 },
        items: 2,
        slidesToSlide: 1,
    },
};


const Row = ({ title, fetchUrl, Movies, isLargeRow, BackdropHandler, playHandler }) => {

    const baseImgUrl = 'https://image.tmdb.org/t/p/original/';
    const [movies, setMovies] = useState([]);


    // useEffect(() => {

    //     async function fetchData() {
    //         const request = await axios.get(fetchUrl);
    //         // console.log('movies', request.data.results);
    //         setMovies(request.data.results);
    //         console.log('movies', movies);
    //         return request;
    //     }
    //     fetchData();

    // }, [fetchUrl]);



    const HandlePlay = (movie) => {
        playHandler(movie);
    }

    const handleClick = (movie) => {
        BackdropHandler(movie);
    }


    useEffect(() => {
        aos.init({ duration: 1000, easing: 'ease-in-sine' })
    }, [])


    return (

        <div data-aos="fade-up" className="row" >
            <h1 style={{ marginTop: '2rem', marginBottom: "0px" }}>{title}</h1>

            <Carousel
                swipeable
                draggable
                arrows={false}
                responsive={responsive}
                customButtonGroup={<ButtonGroup />}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                autoPlay={false}
                autoPlaySpeed={1000}
                keyBoardControl={true}
                customTransition="all .8s ease-in-out"
                transitionDuration={1000}
                containerClass="carousel-container row-posters hover-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                deviceType={''}
                customDot={null}
                showDots={false}
                itemClass="carousel-item row-poster hover-item"
            >




                {
                    Movies.map((movie) => {
                        return (
                            <CarouselItem
                                key={movie.id}
                                movie={movie}
                                image={baseImgUrl + movie.poster_path}
                                handleItemExpand={handleClick}
                                HandlePlay={HandlePlay}
                                title={movie.title}

                            />
                        )
                    })
                }


            </Carousel>

        </div >
    )
}

export default Row
