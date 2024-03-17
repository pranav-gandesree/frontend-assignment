'use client'

import type { NextPage } from "next";
import axios from "axios";
import { useEffect, useState} from "react";
import { Input } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
// import { useDispatch } from 'react-redux';
// import { savePhoto } from '../../redux/slice';

interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const  Photos: NextPage =(props)=>  {
  const [savedPhotos, setSavedPhotos] = useState<Photo[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  // const dispatch = useDispatch();


  const selectPageHandler = (selectedPage: any) => {
    if (selectedPage >= 1 && selectedPage <= Math.ceil(photos.length / 20)) {
      setCurrentPage(selectedPage);
    }
  };
  
  const filteredPhotos = photos.filter(photo =>
    photo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

 const handleSavePhoto = (photo: Photo) => {
  setSavedPhotos((prevPhotos) => {
    const newPhotos = [...prevPhotos, photo];
    console.log("Saved photo", photo.id);
    console.log("Updated savedPhotos:", newPhotos);
    // dispatch(savePhoto(photo)); 
    return newPhotos;
  });
};


  

  useEffect(() => {
    async function getPosts() {
      try {
        const response = await axios.get<Photo[]>("https://jsonplaceholder.typicode.com/photos");
        setPhotos(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    getPosts();
  }, []);

  return (
    <>
       <div>
       <div className="mx-10 my-7">
          <Input placeholder="Search by title"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}  
                        sx={{ width: "33%",
                       }}
                        />
        </div>
      <ul>
        {
         photos &&
         filteredPhotos.slice((currentPage - 1) * 20, currentPage * 20).map(photo => (
          <li key={photo.id} className="border p-5 shadow-lg rounded-lg w-2/3 mx-10 my-6">

            <p className="text-lg my-4">{photo.title}</p>
            <div className="my-6">
            <a href={photo.url} target="_blank" rel="noopener noreferrer">
                <img src={photo.thumbnailUrl} alt={photo.title} />
            </a>
            </div>
            <Button colorScheme='teal' variant='outline' size="sm" onClick={() => handleSavePhoto(photo)}>Save </Button>
          </li>
        ))}
      </ul>
    </div>

    

    <div className="pagination p-3 mx-4 flex justify-center">
  <span
    onClick={() => selectPageHandler(currentPage - 1)}
    className={`${
      currentPage > 1 ? '' : 'opacity-0'
    } cursor-pointer border px-4 py-3 mr-1`}
  >
    ◀
  </span>
  {[...Array(Math.ceil(photos.length / 20))].map((_, i) => {
    // Render page numbers dynamically based on the current page
    if (currentPage <= 5 && i < 5) {
      return (
        <span
          key={i}
          onClick={() => selectPageHandler(i + 1)}
          className={`${
            currentPage === i + 1 ? 'bg-gray-300' : 'bg-white'
          } cursor-pointer border px-4 py-3 mx-1`}
        >
          {i + 1}
        </span>
      );
    } else if (i >= currentPage - 3 && i <= currentPage + 1) {
      return (
        <span
          key={i}
          onClick={() => selectPageHandler(i + 1)}
          className={`${
            currentPage === i + 1 ? 'bg-gray-300' : 'bg-white'
          } cursor-pointer border px-4 py-3 mx-1`}
        >
          {i + 1}
        </span>
      );
    } else if (currentPage >= Math.ceil(photos.length / 20) - 4 && i >= Math.ceil(photos.length / 20) - 5) {
      return (
        <span
          key={i}
          onClick={() => selectPageHandler(i + 1)}
          className={`${
            currentPage === i + 1 ? 'bg-gray-300' : 'bg-white'
          } cursor-pointer border px-4 py-3 mx-1`}
        >
          {i + 1}
        </span>
      );
    } else if (i === Math.ceil(photos.length / 20)) {
      // Render the last page number
      return (
        <span
          key={i}
          onClick={() => selectPageHandler(i + 1)}
          className={`${
            currentPage === i + 1 ? 'bg-gray-300' : 'bg-white'
          } cursor-pointer border px-4 py-3 mx-1`}
        >
          {i + 1}
        </span>
      );
    } else if (i === currentPage + 1) {
      // Render the next page number after page 5
      return (
        <span
          key={i}
          onClick={() => selectPageHandler(i + 1)}
          className={`bg-white cursor-pointer border px-4 py-3 mx-1`}
        >
          {i + 1}
        </span>
      );
    } else if (i === currentPage - 4) {
      // Render the previous page number before page 6
      return (
        <span
          key={i}
          onClick={() => selectPageHandler(i + 1)}
          className={`bg-white cursor-pointer border px-4 py-3 mx-1`}
        >
          {i + 1}
        </span>
      );
    }
    return null;
  })}
  <span
    onClick={() => selectPageHandler(currentPage + 1)}
    className={`${
      currentPage < Math.ceil(photos.length / 20) ? '' : 'opacity-0'
    } cursor-pointer border px-4 py-3 ml-1`}
  >
    ▶
  </span>
</div>


    </>
  );
}

export default Photos;