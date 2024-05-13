import React from 'react'

const internship = () => {
   const [posts, setPosts] = useState([]);

   useEffect(() => {
     const fetchPosts = async () => {
       try {
         const response = await fetch("http://localhost:3002/internships");
         if (response.ok) {
           const data = await response.json();
           setPosts(data); // Update state with fetched data
           console.log(data);
         } else {
           console.error("Failed to fetch posts");
         }
       } catch (error) {
         console.error("Error fetching posts:", error);
       }
     };

     fetchPosts();
   }, []);

   return (
     <div>
       <div className="bg-blue-100 text-blue-900 rounded-md p-4 mb-6">
         <h2 className="text-lg font-semibold mb-2">
           Internship Opportunities
         </h2>
         <p>
           Explore exciting internship opportunities at RSET to gain valuable
           experience and kickstart your career!
         </p>
       </div>
       <div>
         <h2 className="text-xl font-semibold mb-4">Internships</h2>
         <ul>
           {posts.map((post, index) => (
             <li key={index} className="mb-2">
               {post.content}
             </li>
           ))}
         </ul>
       </div>
     </div>
   );
}

export default internship;