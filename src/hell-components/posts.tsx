import { useEffect, useState } from "preact/hooks";
import Date from "./dateformatter";
import "../styles/blogs.css";

export default function Posts({ posters }) {
  const [posts, setPosts] = useState(posters);
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState("Date");

  useEffect(() => {
    if (searchTerm) {
      filterPosts();
    } else {
      switchOrder();
    }
  }, [order, posters, searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleNewOrder = (event) => {
    setOrder(event.target.value);
  };

  function filterPosts() {
    let filteredPosts = posters.filter((element) => {
      return element.data.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });
    setPosts(filteredPosts);
  }

  function switchOrder() {
    let sortedPosts = [...posters]; // Create a new array instead of mutating existing ones

    if (order.toLowerCase() === "name") {
      sortedPosts.sort((a, b) => a.data.title.localeCompare(b.data.title));
    } else if (order.toLowerCase() === "date") {
      sortedPosts.sort(
        (a, b) => a.data.pubDate.valueOf() - b.data.pubDate.valueOf()
      );
    }

    setPosts(sortedPosts); // Update state with the new sorted array
  }

  return (
    <div>
      <div class="search-section">
        <input
          class="searchbar"
          placeholder="Search for blogs"
          value={searchTerm}
          onInput={handleSearch}
        ></input>
        {!searchTerm ? (
          <select value={order} onChange={handleNewOrder}>
            <option value="Date">Date</option>
            <option value="Name">Name</option>
          </select>
        ) : (
          <br></br>
        )}
      </div>
      <section>
        {posts.length === 0 ? (
          <h3 style={{ textAlign: "center" }}>No posts found :(</h3>
        ) : (
          <ul>
            {posts?.map((post) => (
              <li>
                <a href={`/blog/${post.slug}/`}>
                  <h4 class="title">{post.data.title}</h4>
                  <p class="date">
                    <Date date={post.data.pubDate} />
                  </p>
                  <p class="description">{post.data.description}</p>
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
