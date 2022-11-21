import React from 'react';
import Modal from 'react-modal';
// import {useSelector,useDispatch} from "react-redux"
// import {openModal} from '../redux/actions/libraryActions'
Modal.setAppElement('#root')

function PictureModal() {
    // const dispatch = useDispatch();
    // const borrowedBooks = useSelector((state) => state.library.borrowedBooks)
    // const modalIsOpen =  useSelector((state)=> state.modal.modalIsOpen)
    // const id = useSelector(state => state.id.id)

    const modalPicture =()=>{
        return  borrowedBooks
          .filter((book)=> book.id === id)
          .map(largePicture =>(
              <div key ={largePicture.id}>
                     <img src ={largePicture.cover.large} alt="" 
                     style={{height:"500px",padding:"60px 10px"}}
                     />
              </div>
          ))
      }
    return (
        <Modal
        isOpen={modalIsOpen} 
        onRequestClose={() => dispatch(openModal(false))}
        style={{
            overlay: {
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            },
            content: {
              margin : "0 auto",
              background: 'white',
              overflow: 'auto',
              WebkitOverflowScrolling: 'touch',
              borderRadius: '4px',
              outline: 'none',
              padding: '20px',
              width: '400px'
            }
          }}
    >
        {modalPicture()}
    </Modal>
    )
}

export default PictureModal
