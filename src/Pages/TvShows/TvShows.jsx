import React,{useEffect} from 'react'
import {BiSlideshow} from 'react-icons/bi'
import { useSelector, useDispatch } from 'react-redux';
import { getTvShows } from '../../features/tvshowsSlice';
import { updatePageNumber } from '../../features/tvshowsSlice';
import { Genre, Loader, Pagination, SingleMovie } from '../../Components';
import { updateID, resetPageNumber } from '../../features/tvshowsSlice';


const genresList = [
    { genre: 'Action & Adventure', id: 10759 },
    { genre: 'Animation', id: 16 },
    { genre: 'Comedy', id: 35 },
    { genre: 'Drama', id: 18 },
    { genre: 'Soap', id: 10766 },
    { genre: 'War & Politics', id: 10768 },
    { genre: 'Documentary', id: 99 },
    { genre: 'Sci Fi & Fantasy', id: 10765 },
    { genre: 'Mystery', id: 9648 },
    { genre: 'Crime', id: 80 },
    { genre: 'Talk', id: 10767 },
]
const TvShows = () => {

    const {isLoading, pageNumber, tvshowsList, movieId, pageCount} = useSelector((state) =>state.tvshows);
  const dispatch = useDispatch()
    

  useEffect(()=>{
    console.log(pageNumber,'recent pagenumber', movieId,'movieid')
    dispatch(getTvShows({ movieId, pageNumber}))
     window.scrollTo(0, 0)

     
     // eslint-disable-next-line
    },[pageNumber])  

  if(isLoading){
    return(
        <div className='page_container'>
            <div className='page_heading' >
               <h2><BiSlideshow className='page_icon'/>Popular TV Shows</h2>
               <p>Discover Popular TV Shows that you'd love</p>
        </div>
            <Loader/>
        </div>
     
    )
}

  return (
    <div className='page_container'>
        <div className='page_heading' >
           <h2><BiSlideshow className='page_icon'/>Popular TV Shows</h2>
           <p>Discover Popular TV Shows that you'd love</p>
        </div>
        <Genre genresList={genresList}
               movieId={movieId} 
               pageNumber={pageNumber}
               getData={getTvShows}
               updateID={updateID}
               resetPageNumber={resetPageNumber}
        />
        <div className='movies_container'>
            {
                 tvshowsList.map((tvshow)=>{
                     return(
                         <SingleMovie
                          media_type='TV Show'
                           data={tvshow}
                           
                         />
                     )
                 })
            }
        </div>
        <Pagination 
        updatePageNumber={updatePageNumber} 
        pageNumber={pageNumber}
        pageCount={pageCount >17? 17: pageCount}/>
    </div>
  )
}

export default TvShows
