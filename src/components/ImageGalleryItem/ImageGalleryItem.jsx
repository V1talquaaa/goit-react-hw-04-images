import css from './ImageGalleryItem.module.css'

const ImageGalleryItem = ({webformatURL, largeImageURL, openModal}) => {
    return (
    <li className={css.ImageGalleryItem}>
    <img src={webformatURL} alt='' className={css.ImageGalleryItemImage} onClick={() => openModal({largeImageURL})}/>
  </li>)
  
};


export { ImageGalleryItem }
