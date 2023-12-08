import { Modal, Toast } from 'flowbite-react';
import { HiCheck} from 'react-icons/hi';
import Markdown from '../../components/Markdown';
import remarkGfm from 'remark-gfm';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'; 
import {useState, useEffect} from 'react';
import Post from "../../components/BlogPost";

const BlogPost = () => {
    const { id } = useParams();
    const [blogPost, setBlogPost] = useState(null);
    const [openModal, setOpenModal] = useState(true);
    const [ searchParams, _ ] = useSearchParams();
    const navigate = useNavigate();


    useEffect(() => {
        const fetchBlogPost = async () => {
            try {
                const response = await fetch(`/blog/posts/${id}`);
                if (response.ok) {
                    const postData = await response.json();
                    setBlogPost(postData);
                } else {
                    navigate("/404");
                }
            } catch (error) {
                console.error('Error fetching blog post:', error);
            }
        };

        fetchBlogPost();
    }, [id]);

    if (!blogPost) {
        return <div>Loading...</div>; // Placeholder for loading state
    }

    return (<>
            {searchParams.get("success") && (<Modal show={openModal} position="top-center" onClose={() => setOpenModal(false)}>
            <div className="w-full flex items-center justify-center">
            <Toast className="max-w-full">
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                  <HiCheck className="h-5 w-5" />
                </div>
                <div className="ml-3 text-sm font-normal">Item moved successfully.</div>
                <Toast.Toggle onClick={() => setOpenModal(false)} />
              </Toast>
            </div>
            </Modal>)}
              <div className="p-16">
                <Post {...blogPost}/>
              </div>
           </>);
};
export default BlogPost;

const blogpost = `
# Finding Forever Homes: A Look Inside Our Dog Shelter

![Dog Shelter](https://via.placeholder.com/800x400)

Welcome to our humble abode, where wagging tails and loving hearts abound! Our dog shelter is more than just a sanctuary for these furry friends; it's a place of hope, compassion, and second chances.

## A Haven for Paws

At our shelter, each canine resident has a unique tale to tell. Some arrived as strays, while others were surrendered by owners facing difficult circumstances. Despite their diverse backgrounds, they all share a common longing for warmth, care, and a forever home.

## Our Commitment

### 1. **Care Beyond Measure**
   Our dedicated team of caretakers and volunteers pour their hearts into ensuring every dog feels cherished. From regular meals and medical attention to playtime and socialization, we prioritize their well-being.

### 2. **Finding Perfect Matches**
   We believe in the magic of matchmaking—pairing each dog with the ideal human companion. Through thorough assessments and interactions, we strive to unite these dogs with families that match their personalities and needs.

### 3. **Community Engagement**
   Education and awareness are key! We conduct workshops, events, and outreach programs to foster a community that values responsible pet ownership and advocates for animal welfare.

## Meet Some of Our Residents

### Luna 🌙
![Luna](https://via.placeholder.com/400x400)
This radiant beauty has an affinity for cuddles and long walks under the moonlight. Luna's gentle demeanor and playful antics steal the hearts of everyone she meets.

### Max 🐾
![Max](https://via.placeholder.com/400x400)
A spirited adventurer, Max thrives on outdoor activities and endless games of fetch. His boundless energy and unwavering loyalty make him a cherished companion.

### Bailey 🎾
![Bailey](https://via.placeholder.com/400x400)
Bailey, the tennis ball enthusiast! This bubbly pup has an insatiable love for tennis balls and a heart as big as the smiles he brings to people's faces.

## How You Can Help

- **Adopt, Don't Shop:** Consider giving a loving home to one of our furry friends.
- **Volunteer:** Join our team and contribute your time and skills.
- **Donate:** Every contribution goes a long way in providing care and comfort to our residents.

## Conclusion

Every bark, every wag, and every furry cuddle is a testament to the joy these dogs bring into our lives. Our shelter is not just a temporary stop—it's a beacon of hope and a stepping stone towards a brighter future for these wonderful companions. Join us in our mission to find forever homes and spread love, one paw at a time!
`;
