import { useEffect } from "react";
import css from './Modal.module.css'
import PropTypes from 'prop-types';

const Modal = ({image, closeModalImage}) =>  {
  useEffect(() => {
    const handlePressESC = (e) => {
      if(e.code === 'Escape')
      closeModalImage()
    }
    window.addEventListener('keydown', handlePressESC)
  
    return () => {
      window.removeEventListener('keydown', handlePressESC)
    }
  }, [closeModalImage])
  

  const closeModal = (e) => {
    if(e.target === e.currentTarget) {
    closeModalImage();
    }
    
  };

    return (
      <div className={css.Overlay} onClick={closeModal}>
        <div className={css.Modal}>
          <img src={image.largeImageURL} alt={image.tags} />
        </div>
      </div>
    );
  }

Modal.propTypes = {
  image: PropTypes.object,
  closeModalImage: PropTypes.func.isRequired,
}

  export {Modal}