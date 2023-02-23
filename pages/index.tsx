import type { NextPage } from "next";
import { sanityClient, urlFor } from "../sanity";
import Head from "next/head";
import Header from "../components/Header.js";
import { Post } from "../typinng";
import Link from "next/link";
import Footer from "../components/Footer";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import {useSession,signIn} from 'next-auth/react'
interface Props {
  posts: [Post];
}

const Home = ({ posts }: Props) => {

    

  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Seas Code</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <Header />
      {/* <div className="flex justify-between items-center bg-yellow-400 border-y border-black py-10 lg:py-0 ">
        <div className="px-10 space-y-5">
          <h1 className="text-6xl ma-w-xl font-serif">
            {" "}
            <span className="underline decoration-black decoration-4">
              {" "}
              Medium{" "}
            </span>{" "}
            is a place to write,reacd and connect
          </h1>
          <h2>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
            ullam rerum excepturi debitis, fugit deserunt labore ad odit
            dignissimos accusamus magni ratione! Deserunt ratione iure eligendi
            ipsam labore laboriosam, repellendus adipisci dignissimos at!
            Eveniet?
          </h2>
        </div>
        <img
          className="hidden md:inline-flex h-32 lg:h-full"
          src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png"
          alt=""
        />
      </div> */}

      {/* carosel implementaion */}
      <div>
        <Carousel autoPlay={true} showArrows={false} interval={2000} infiniteLoop={true}>
          <div>
            <img
              src="https://codecondo.com/wp-content/uploads/2017/04/Programming-Blogs-and-Website.jpg"
              alt="image1"
            />
          </div>
          <div>
            <img
              src="https://codecondo.com/wp-content/uploads/2017/04/Programming-Blogs-and-Website.jpg"
              alt="image2"
            />
          </div>
          <div>
            <img
              src="https://codecondo.com/wp-content/uploads/2017/04/Programming-Blogs-and-Website.jpg"
              alt="image3"
            />
          </div>
          {/* <div>
            <img
              src="https://www.dice.com/binaries/large/content/gallery/dice/insights/2021/03/shutterstock_1536573389.jpg"
              alt="image4"
            /> */}
          {/* </div> */}
          {/* <div>
                      <img src="/5.png" alt="image5"/>
                      <p className="legend">Image 5</p>
  
                  </div> */}
        </Carousel>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 lg:p-6">
        {posts.map((post) => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className="dark:border-white-400 dark:border-5 border rounded-lg group cursor-pointer overflow-hidden">
              <img
                className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out "
                src={urlFor(post.mainImage).url()!}
                alt=""
              />
              <div className="flex justify-between p-5 bg-white dark:bg-black ">
                <div>
                  <p className="text-lg font-bold">{post.title}</p>
                  <p className="text-gray-500">
                    {post.description} by {post.author.name}
                  </p>
                </div>
                <img
                  className="h-12 w-12 rounded-full"
                  src={urlFor(post.author.image).url()!}
                  alt=""
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const query = `*[_type =="post"]{
    _id,
      title,
      slug,
      author ->{
        name,
        image
      },
      description,
      mainImage,
      slug
  }`;
  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  };
};
