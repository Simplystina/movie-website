import React, { useEffect } from 'react'
import './SingleMovieDetail.css'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {BsBookmark} from 'react-icons/bs'
import {AiFillYoutube} from 'react-icons/ai'
import { getDetails } from '../../features/detailsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from '../../Components'
import { noPoster, img_500 } from '../../config/config';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay} from "swiper";
import { clearState } from '../../features/searchSlice'


const SingleMovieDetail = () => {

    const navigate = useNavigate();
    const {detailsList, isLoading} = useSelector((state)=>state.details)
    const dispatch = useDispatch()

    let { id, path } = useParams();


    const  type = path ==='tvshow'? 'tv':'movie'

    const goBack = ()=>{
        dispatch(clearState())
       navigate(-1)
    }

    
    useEffect(()=>{
        dispatch(getDetails({type, id})) 

         // eslint-disable-next-line
    },[id])
    

    
    if(isLoading){
        return <Loader/>
    }
    const {poster_path,
         original_name,
         tagline,
         seasons,
         last_air_date,
         genres,
         overview,
         vote_average,
          similar,
          credits,
          videos,
          original_title,
          runtime
        } = detailsList
  return (
    <div className='page_container'>
        <button onClick={goBack} className='back_btn'>Go back</button>
        <div className='movie_detail_container'>
            <div className='movie_detail_image_container'>
                <img src={!poster_path ? noPoster : `${img_500}${poster_path}`} alt='movie_image'></img>
            </div>
            <div className='movie_detail_content'>
                <div className='movie_detail_heading'>
                    <h2>{original_name || original_title}</h2>
                    <h4>{tagline}</h4>
                   {
                       type ==='tv'? <p>TV Show -{seasons?.length} Season</p> 
                       :  <p>Movie - {runtime}mins</p>
                   }
                    <p>{last_air_date?.slice(0,4)}</p>
                </div>
                <div className='movie_detail_genre'>
                    {
                        genres?.map((genre)=>{
                            return( <span key={genre?.id}>{genre.name}</span>)})
                    }
                </div>
                <p className='movie_detail_text'>{overview}</p>
                <p className='movie_detail_rating'>Rating: <span>{vote_average}</span></p>
                <p className='cast_header'>Cast:</p>
                <div className='cast_images_container'>
                    <Swiper
                      spaceBetween={0}
                      slidesPerView={window.innerWidth<= 400? 3 : 5}
                      className="mySwiper"
                      autoplay={{
                        delay: 2000,
                      }}
                      loop={true}
                      modules={[Autoplay]}
                    >
                    {
                        credits?.cast?.map((item)=>{
                            const names = item.name.split(' ')

                            return(
                                <SwiperSlide>
                                    <div key={item.id} className='cast_image_container'>
                                        <img key={item.id} className='cast_image' src={!item.profile_path ? noPoster : `${img_500}${item.profile_path}`} alt='name'/>
                                       <div className='cast_names'>
                                           <p>{names[0]}</p>
                                           <p>{names[1]}</p>
                                        </div> 
                                    </div>
                                </SwiperSlide>
                            )
                        })
                    }
                    
                    </Swiper>
                </div>
                <div className='similar'><span className='similar_heading'>Similar:</span> 
                {
                   
                    similar?.results.map((item)=>{
                        return (
                           <Link key={item.id} className='movie_detail_links' to={`/${type}/${item.id}`}>{item.name|| item.title}</Link>
                        )
                    })
                }

                </div>
                <div className='btn_container'>
                    <button className='bookmark_btn'><BsBookmark className='btn_icon'/>Add to Bookmark</button>
                    <a href={`https://www.youtube.com/watch?v=${videos?.results[0]?.key}`} rel="noreferrer" target="_blank"><button className='youtube_btn'><AiFillYoutube className='btn_icon'/> Watch trailer</button></a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SingleMovieDetail
