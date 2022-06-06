import React from 'react'
import './Pagination.css'
import { useDispatch } from 'react-redux';


const Pagination = ({updatePageNumber,pageNumber, pageCount }) => {
    const dispatch = useDispatch()
    const pageValues = Array.from({length: pageCount}, (_, i) => i + 1)
    
   
    //const {isLoading, pageNumber,trendingList, pageCount} = useSelector((state) =>state.trending);
    
    

    
    const changeNumber = (e)=>{
       
        const id = parseInt(e.currentTarget.id)
        dispatch(updatePageNumber(id))
        console.log(pageNumber,'changing number')
    }
    const prevNumber =()=>{
        if (pageNumber>1) {
            dispatch(updatePageNumber(pageNumber-1))
            return
        }
        dispatch(updatePageNumber(pageCount))

        
    }
    const nextNumber =()=>{
       if (pageNumber<pageCount) {
        dispatch(updatePageNumber(pageNumber+1))
        return
       }
       dispatch(updatePageNumber(1))
    }
  return (
    <div className='pagination'>
        <span id='prev' onClick={prevNumber}  className='prev'>prev</span>
        {
            pageValues.map((value)=>{
                return (
                    <span onClick={changeNumber} id={value} 
                    className={pageNumber ===value ?'page_number active': 'page_number not_active'} key={value}>{value}</span>
                )
            })
        }
        <span id='next' onClick={nextNumber} className='next' >next</span>
    </div>
  )
}

export default Pagination
