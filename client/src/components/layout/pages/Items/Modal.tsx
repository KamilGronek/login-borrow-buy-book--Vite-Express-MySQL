import React from 'react';
import Modal from 'react-modal';
import "../../../../styles/Modal.scss"
import { useShowBorrowedBook } from "../../../../hooks/useBorrowedBooks";
 
Modal.setAppElement('#root')


type ModalProps = {
  id: number,
  modalIsOpen: boolean,
  openModal: void
 }




export function PictureModal({id,modalIsOpen,openModal}: ModalProps) {

     const { data } =   useShowBorrowedBook()

    const modalPicture =()=>{
        return  data?.data
          .filter((book:any)=> book.id ===  id)
          .map((largePicture: any) =>(
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
          onRequestClose={openModal}
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
                width: '400px',
                height: '650px'
              }
            }}
      >
        {modalPicture()}
     </Modal>
    )
}


