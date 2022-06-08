import React, { useEffect, useRef } from 'react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './SingleMovie.css'
import { noPoster, img_500 } from '../../config/config';
import {BsBookmarkHeart} from 'react-icons/bs'
import { Link} from 'react-router-dom';
import { updateBookmarkList,updateIDList, getIDList, removeID, removeFromList } from '../../features/bookmarkSlice';
import { useSelector, useDispatch } from 'react-redux';


const SingleMovie = ({data, media_type}) => {
    
    const dispatch = useDispatch()
    const {bookmarkList,idList} = useSelector((state) => state.bookmark);
   
    const setLocalStorage = ()=>{
        localStorage.setItem('Bookmarks', JSON.stringify(bookmarkList));
        localStorage.setItem('BookmarksID',JSON.stringify(idList))
        return
    }

    const bookmarkElement = useRef();
   
    useEffect(()=>{
        setLocalStorage()
    },[bookmarkList,idList])
     
    useEffect(()=>{
        const bookmarkId = JSON.parse(localStorage.getItem('BookmarksID'));
        dispatch(getIDList(bookmarkId))
    },[])

    useEffect(()=>{
        const g = document.querySelectorAll(".movie_bookmark_container");
        for (let i= 0; i < g.length; i++) {
           const id =  parseInt(g[i].id)
           //console.log(idList,id)
           if (idList.includes(id)) {
               console.log(id,'coreeddd')
               g[i].classList.add('bookmarked')
               console.log(idList.includes(id)) 
           }
        }
      },[])

    const bookMark = (e,data,id)=>{
        if(e.currentTarget.classList.contains('bookmarked')){
            e.currentTarget.classList.remove('bookmarked')
            dispatch(removeFromList(id))
            dispatch(removeID(id))
            toast("Item removed from bookmark!");

        }else{
            e.currentTarget.classList.add('bookmarked')
            dispatch(updateBookmarkList(data))
            dispatch(updateIDList(id))
            toast.success("Item added to bookmark!");
       }
      
    }

    const {poster_path, name, title, original_title, first_air_date, release_date ,id} = data
    let type = (media_type === 'tv' || media_type === 'TV Show')? 'tvshow' : media_type 
   
  return (
   
    <div key={id}  className='single_movie_card'>
        <span className='movie_bookmark_container' ref={bookmarkElement} id={id} onClick={(e)=>bookMark(e,data,id)}><BsBookmarkHeart className='movie_bookmark'/></span>
         <Link to={`/${type}/${id}`}>
            <div className='movie_image_container'>
                <img className='movie_image' src={!poster_path ? noPoster : `${img_500}${poster_path}`} alt={name ||title}/>
            </div>
            <div className='single_movie_content hide'>
                <h2>{ 
                    original_title?.length <20 || name?.length <20 ? original_title ||name 
                        : `${original_title?.substring(0,20)}...` || `${name?.substring(0,20)}...`
                    }
                </h2>
                <p>{media_type === 'tv'? 'TV Show' : media_type }</p>
                <p>{first_air_date || release_date}</p>
            </div>
        </Link>
        <ToastContainer 
          position="top-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
    </div>
   
  )
}

export default SingleMovie
