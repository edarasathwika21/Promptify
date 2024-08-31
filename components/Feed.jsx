'use client'

import { useEffect, useState } from "react"
import PromptCard from "./PromptCard"


const PromptCardList=({data,handleTagClick})=>{
return(
  <div className="mt-16 prompt_layout">
    {data.map((post)=>
    (<PromptCard
    key={post._id}
    post={post}
    handleTagClick={handleTagClick}
    />))}


  </div>
)
}

const Feed=() =>{
  const [searchText,setSearchText]=useState('')
  const [searchedResults,setSearchedResults]=useState([])
  const [searchTimeOut,setSearchTimeOut]=useState(null)
  const [posts,setPosts]=useState([])


  const filterprompts=(searchtext)=>{
    const regex=new RegExp(searchtext,"i")

    return posts.filter(
      (item)=>
        regex.test(item.creator.username) ||
      regex.test(item.tag)||
      regex.test(item.prmpt)

    )

  }
  const handleSearchChange=(e)=>{

    clearTimeout(searchTimeOut)
    setSearchText(e.target.value)
    setSearchTimeOut( setTimeout(()=>{

const searchResult=filterprompts(e.target.value)
setSearchedResults(searchResult)
    },500))
  }


  const handleTagClick=(tagName)=>{
    setSearchText(tagName)
    const searchResult=filterprompts(tagName)
    setSearchedResults(searchResult)

  }
 
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/prompt');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
        // Handle the error, e.g., set an error state or display a message
      }
    };
    useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input type="text" placeholder="Search for a tag or a username" 
        value={searchText} onChange={handleSearchChange}  required
        className="search_input peer"/>
      </form>


{searchText ? (<PromptCardList data={searchedResults} handleTagClick={handleTagClick}
      />
):(<PromptCardList data={posts} handleTagClick={handleTagClick}
/>)}
      
      </section>
  )
}

export default Feed