'use client'

import type { NextPage } from "next";
import axios from "axios";
import { useEffect, useState} from "react";
import { Input } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const  Posts: NextPage =(props)=>   {

  const [posts, setPosts] = useState<Post[]>([]);
  const [savedPosts, setSavedPosts] =useState<Post[]>([]);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const savePost = (post: Post) => {
    setSavedPosts((prevPosts) => [...prevPosts, post]);
    console.log(savedPosts)
    console.log("saved post", post.id);
  };

  const selectPageHandler = (selectedPage: any) => {
    if (selectedPage >= 1 && selectedPage <= Math.ceil(filteredPosts.length / 20)) {
      setCurrentPage(selectedPage);
    }
  };
  
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );



  useEffect(() => {
    async function getPosts() {
      try {
        const response = await axios.get<Post[]>("https://jsonplaceholder.typicode.com/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    getPosts();
  }, []);

  return (
    <>
       <div className="">
        <div className="mx-10 my-7">
        <Input placeholder="Search by title"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}  
                    sx={{ width: "33%",}}
                    />
        </div>

        <ul>

          {
            posts && filteredPosts.slice((currentPage - 1) * 20, currentPage * 20).map(post => (
              <li key={post.id} className="border p-5 shadow-lg rounded-lg w-2/3 mx-10 my-6">
  
              <h2><span className="font-bold">Title:</span> {post.title}</h2>
              <p className="my-4"><span className="font-bold">Description:</span> {post.body}</p>

              <Button colorScheme='teal' variant='outline' size="sm" onClick={()=>{savePost(post)}}>Save </Button>
            </li>
          ))
        }
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
        {[...Array(Math.ceil(filteredPosts.length / 20))].map((_, i) => (
          <span
            key={i}
            onClick={() => selectPageHandler(i + 1)}
            className={`${
              currentPage === i + 1 ? 'bg-gray-300' : 'bg-white'
            } cursor-pointer border px-4 py-3 mx-1`}
          >
            {i + 1}
          </span>
        ))}
        <span
          onClick={() => selectPageHandler(currentPage + 1)}
          className={`${
            currentPage < Math.ceil(filteredPosts.length / 20) ? '' : 'opacity-0'
          } cursor-pointer border px-4 py-3 ml-1`}
        >
          ▶
        </span>
      </div>

    </>
  );
}

export default Posts;