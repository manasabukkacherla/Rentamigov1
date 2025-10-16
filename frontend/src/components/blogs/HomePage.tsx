import { useNavigate } from "react-router-dom";
import ImageSlider from "../blogs/ImageSlider";
import { mockBlogs } from "../blogs/data/mockData";
import SearchBar from "../blogs/SearchBar";
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import BlogList from "../blogs/BlogList";
import TrendingSection from "../blogs/TrendingSection";
import TopicPicks from "../blogs/TopicPicks";
import BlogCard from "../blogs/BlogCard";
import HomeFooter from "../blogs/HomeFooter";
import Navbar from "./Navbar";
import axios from "axios";

interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  media: {
    coverImage: string;
    images?: string[];
  };
  tags: string[];
  category: string;
  readTime: number;
  author: User;
  likes: number;
  views: number; // New: View count
  shares: 0;
  comments: Comment[];
  reviews: Review[];
  createdAt: Date;
  updatedAt: Date;
  userHasLiked: boolean;
}

interface Comment {
  _id: string;
  author: User;
  comment: string;
  createdAt: string;
  likes: string[];
}

interface User {
  _id: string;
  fullName: string;
}

interface Review {
  _id: string;
  author: User;
  comment: string;
  rating: number;
  createdAt: string;
  likes: string[];
}

const HomePage = () => {
  const navigate = useNavigate();
  const [currentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [randomBlog, setRandomBlog] = useState<Blog | null>(null);
  const blogsPerPage = 6;

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = mockBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const [allBlogs, setAllblogs] = useState<Blog[]>([]);

  const handleRandomBlog = () => {
    if (allBlogs.length > 0) {
      const randomIndex = Math.floor(Math.random() * allBlogs.length);
      setRandomBlog(allBlogs[randomIndex]);
    }
  };

  if (!randomBlog) {
    handleRandomBlog();
  }

  const filteredBlogs = allBlogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) =>
        blog.tags.some((blogTag) =>
          blogTag.toLowerCase().includes(tag.toLowerCase())
        )
      );

    return matchesSearch && matchesTags;
  });

  // const trendingBlogs = [...allBlogs]
  //   .sort((a, b) => (b.views ?? 0) - (a.views ?? 0)) // Sort by shares in descending order
  //   .slice(0, 3); // Get the top 3

  const trendingBlogs = [...allBlogs]
    .sort((a, b) => {
      // First, sort by shares in descending order
      if ((b.shares ?? 0) !== (a.shares ?? 0)) {
        return (b.shares ?? 0) - (a.shares ?? 0);
      }
      // If shares are equal, sort by views in descending order
      return (b.views ?? 0) - (a.views ?? 0);
    })
    .slice(0, 3); // Get the top 3 blogs

  const fetchBlogs = async () => {
    const response = await axios.get("/api/blog/");
    // console.log(response.data)

    if (response.data.success) {
      return response.data.data;
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchBlogs();
        setAllblogs(response);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    getData();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8">
        <section>
          <ImageSlider blogs={allBlogs.slice(0, 5)} />
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
          />
        </section>
        <br />
        <br />
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 pl-4">
            Latest Posts
          </h2>
          <p className="text-gray-600 pl-4">
            Discover the latest thoughts, ideas, and stories from our community.
          </p>

          <br />
          <BlogList blogs={filteredBlogs} />
        </div>

        {/* Random Blog Feature */}
        {randomBlog && (
          <div className="mb-12 bg-white rounded-xl p-6 shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Featured Blog
              </h2>
              <button
                onClick={handleRandomBlog}
                className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-md transition flex items-center"
              >
                <span>Pick Random Blog</span>
              </button>
            </div>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <img
                  src={randomBlog.media.coverImage}
                  alt={randomBlog.title}
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
              </div>
              <div className="md:w-2/3">
                <div className="flex flex-wrap gap-2 mb-3">
                  {randomBlog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block bg-gray-100 text-black text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  {randomBlog.title}
                </h3>
                <p className="text-gray-600 mb-4">{randomBlog.excerpt}</p>
                <a
                  onClick={() => navigate(`/blog/${randomBlog._id}`)}
                  style={{ cursor: "pointer" }}
                  className="inline-flex items-center text-black hover:text-gray-700 font-medium transition"
                >
                  Read full article
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Trending Section */}
        <TrendingSection blogs={trendingBlogs} />

        {/* Topic Picks Section */}
        <TopicPicks blogs={mockBlogs.slice(0, 3)} />

        {/* All Blogs Section with Pagination */}
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8">All Blogs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>

            {/* <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          /> */}
          </div>
        </section>
      </main>
      <HomeFooter />
    </div>
  );
};

export default HomePage;
