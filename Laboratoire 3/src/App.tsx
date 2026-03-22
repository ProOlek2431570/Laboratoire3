import BlogDetails from "./components/CardsBlog/BlogDetails";
import BlogList from "./components/CardsBlog/BlogList";
import Footer from "./components/footer";
import Header from "./components/header";

const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

export default function App() {
  return <>
  <Header />
  {id ? <BlogDetails id={id} />
    :<BlogList />
  }
  <Footer />
  </>
      
}

