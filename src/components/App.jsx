import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getImages } from '../Services/getNews';
import { Circles } from 'react-loader-spinner';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import css from'./styles.module.css'
import Notiflix from 'notiflix';


export const App = () => {
  const [isShowModal, setIsShowModal] = useState(false)
  const [query, setquery] = useState('')
  const [page, setpage] = useState(1)
  const [images, setimages] = useState([])
  const [visible, setvisible] = useState(false)
  const [isHiden, setisHiden] = useState(true)
  const [selectedImage, setselectedImage] = useState(null)

  useEffect(() => {
    
  if(!query)return;  
   setvisible(true)
    getImages(query, page)
        .then(images => {
            if(images.hits.length <= 0) {
              Notiflix.Notify.failure('Nothing was found :(')
              return
            } 
            setimages((prevState) => ([...prevState, ...images.hits]))
            setisHiden(page > Math.ceil(images.totalHits / 12) || images.hits.length < 12)
            // setisHiden(images.hits.length < 12)
            })
          .finally(() => {
            setvisible(false)
          })
  
    
    }, [query, page])
  

  const onSubmit = (query) => {
    setquery(query)
    setpage(1)
    setimages([])
  };

  const loadMoreImages = () => {
      setpage((prevState) => prevState + 1)
    }
      

  const openModal = (image) => {
    setselectedImage(image)
    setIsShowModal(true)
  };

  const closeModalImage = () => {
    setselectedImage(null)
    setIsShowModal(false)
  };

    return (
      <>
        <Searchbar onSubmit={onSubmit} />
        <ImageGallery images={images} openModal={openModal} />
        {visible &&
            <Circles
            height="80"
            width="80"
            color="#3f51b5"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass={css.wrapper}
            visible={visible}
          />}
        {isHiden? '' : <Button loadMoreImages={loadMoreImages}/>}
        {isShowModal && (
        <Modal image={selectedImage} closeModalImage={closeModalImage}/>)}
      </>
    );
  }

