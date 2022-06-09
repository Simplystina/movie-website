import React,{useEffect} from 'react'
import {BsBookmarkFill} from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { SingleMovie } from '../../Components'
import { getBookmarkList} from '../../features/bookmarkSlice'

const Bookmark = () => {

    const dispatch = useDispatch()
    const {bookmarkList} = useSelector((state) =>state.bookmark);

    useEffect(() => {
        const bookmarks = JSON.parse(localStorage.getItem('Bookmarks'));
        dispatch(getBookmarkList(bookmarks))
       
      }, []);

  return (
    <div className='page_container bookmark_page_container'>
        <div className='page_heading' >
           <h2><BsBookmarkFill className='page_icon'/>Your Bookmarks</h2>
           <p>Here are the movies and shows you've saved from all across Movio...</p>
        </div>
        <div className='movies_container'>
            {
                bookmarkList.map((movie)=>{
                    return (
                        <SingleMovie
                           key={movie.id}
                            media_type='movie'
                            data={movie}
                         />
                    )
                })
            }
        </div>
    </div>
  )
}

export default Bookmark
