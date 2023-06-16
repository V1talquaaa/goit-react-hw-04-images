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
  query &&
  getImages(query, page)
      .then(images => {
        console.log(images.hits)
          if(images.hits.length <= 0) {
            Notiflix.Notify.failure('Nothing was found :(')
          }
          if(images.hits.length < 12 ) {
            setisHiden(true)
          }
          setimages((prevState) => ([...prevState, ...images.hits]))
          setisHiden(false)
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


// export class App extends Component {
//   state = {
//     isShowModal: false,
//     query: '',
//     page: 1,
//     images: [],
//     visible: false,
//     isHiden: true,
//     selectedImage: null,
//   };

//   componentDidUpdate(_, prevState) {
//     if (prevState.query !== this.state.query || prevState.page !== this.state.page) {
//       this.setState({visible: true, isHiden: false})
//       getImages(this.state.query, this.state.page) 
//       .then(images => {
//           if(images.hits.length <= 0) {
//             Notiflix.Notify.failure('Nothing was found :(')
//           }
//           if(images.hits.length < 12 ) {
//             this.setState({isHiden: true})
//           }
//           this.setState(prevState => ({images: [...prevState.images, ...images.hits]}))})
//         .finally(() => {
//           this.setState({visible: false})
//         })
//       } 
//   }

//   onSubmit = (query) => {
//     this.setState({query: query, page: 1, images: []});
//   };

//   loadMoreImages = () => {
//         this.setState(prevState => ({page: prevState.page + 1}))
//     }
      

//   openModal = (image) => {
//     this.setState({ selectedImage: image, isShowModal: true });
//   };

//   closeModalImage = () => {
//     this.setState({ selectedImage: null, isShowModal: false });
//   };

//   render() {
//     return (
//       <>
//         <Searchbar onSubmit={this.onSubmit} />
//         <ImageGallery images={this.state.images} openModal={this.openModal} />
//         {this.state.visible &&
//             <Circles
//             height="80"
//             width="80"
//             color="#3f51b5"
//             ariaLabel="circles-loading"
//             wrapperStyle={{}}
//             wrapperClass={css.wrapper}
//             visible={this.state.visible}
//           />}
//         {this.state.isHiden? '' : <Button loadMoreImages={this.loadMoreImages}/>}
//         {this.state.isShowModal && (
//         <Modal image={this.state.selectedImage} closeModalImage={this.closeModalImage}/>)}
//       </>
//     );
//   }
// }
