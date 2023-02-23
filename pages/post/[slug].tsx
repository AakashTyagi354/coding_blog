import { GetStaticProps } from "next";
import Header from "../../components/Header";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typinng";
import PortableText from "react-portable-text";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useSession, signIn, signOut } from "next-auth/react";
interface Props {
  post: Post;
}
interface IFormInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}
const Post = ({ post }: Props) => {
  const session = useSession();
  const [submited, setSubmited] = useState(false);

  console.log(post.comments);
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await fetch("/api/createComment", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(() => {
        console.log(data);
        setSubmited(true);
      })
      .catch((error) => {
        console.log(error);
        setSubmited(false);
      });
  };
  return (
    <main>
      <Header />
      <img
        className="w-full h-40 object-cover"
        src={urlFor(post.mainImage).url()}
        alt=""
      />
      <article className="max-w-3xl mx-auto p-5">
        <h1 className="text-3xl mt-10 mb-3">{post.title}</h1>
        <h2 className="text-xl font-light text-gray-500 mb-2">
          {post.description}
        </h2>
        <div className="flex items-center space-x-2">
          <img
            className="h-10 w-10 rounded-full"
            src={urlFor(post.author.image).url()!}
            alt=""
          />
          <p className="font-extralight text-sm">
            Blog post by{" "}
            <span className="text-green-600">{post.author.name}</span> -
            Publised at {new Date(post._createdAt).toLocaleString()}
          </p>
        </div>
        <div className="mt-10">
          <PortableText
            className=""
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            content={post.body}
            serializers={{
              h1: (props: any) => (
                <h1 className="text-2xl font-bold my-5">{...props}</h1>
              ),
              h2: (props: any) => (
                <h1 className="text-xl font-bold my-5">{...props}</h1>
              ),
              li: ({ children }: any) => (
                <li className="ml-4 list-disc">{children}</li>
              ),
              link: ({ herf, children }: any) => (
                <a href={herf} className="text-blue-500 hover:underline">
                  {children}
                </a>
              ),
            }}
          />
        </div>
      </article>
      <hr className="max-w-lg my-5 mx-auto border border-yellow-500" />
      
      {session.data !== null ? <>
        {submited ? (
        <div className="flex flex-col p-10 my-10 bg-yellow-500 text-white max-w-2xl mx-auto">
          <h3 className="text-3xl font-bold">
            Thank you for submitting your comment!
          </h3>
          <p>Once it has been approved,it will apear below!</p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col p-5 max-w-2xl mx-auto mb-10"
        >
          <h3 className="text-sm text-yellow-500 ">Enjoyed this artical</h3>
          <h4 className="text-3xl font-bold">Leave a comment below</h4>
          <hr className="py-3 mt-2" />

          <input
            {...register("_id")}
            type="hidden"
            name="_id"
            value={post._id}
          />
          <label className="block mt-5">
            <span className="text-gray-700 dark:text-white">Name</span>
            <input
              {...register("name", { required: true })}
              className=" dark:bg-white shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring"
              type="text"
              placeholder="John Applesed"
            />
          </label>
          <label className="block mt-5">
            <span className="text-gray-700 dark:text-white">Email</span>
            <input
              {...register("email", { required: true })}
              className=" dark:bg-white shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring"
              type="email"
              placeholder="John Applesed"
            />
          </label>
          <label className="block mt-5">
            <span className="text-gray-700 dark:text-white">Comment</span>
            <textarea
              {...register("comment", { required: true })}
              className=" dark:bg-white shadow border rounded py-2 px-3 form-textarea mt-1 block w-full ring-yellow-500 outline-none focus:ring"
              placeholder="write some thing"
              rows={8}
            />
          </label>
          {/* error for validation */}
          <div className="flex flex-col p-5">
            {errors.name && (
              <div className="bg-red-600 flex items-center p-1 rounded-full mt-1">
                <CancelOutlinedIcon className="text-white ml-1" />
                <p className="mx-auto text-white">The Name field is required</p>
              </div>
              // <span className="text-red-500">-</span>
            )}
            {errors.email && (
              <div className="bg-red-600 flex items-center p-1 rounded-full mt-1">
                <CancelOutlinedIcon className="text-white ml-1" />
                <p className="mx-auto text-white">
                  The Email field is required
                </p>
              </div>
            )}
            {errors.comment && (
              <div className="bg-red-600 flex items-center p-1 mt-1 rounded-full">
                <CancelOutlinedIcon className="text-white ml-1" />
                <p className="mx-auto text-white">
                  The Comment field is required
                </p>
              </div>
            )}
          </div>
          <input
            type="submit"
            className="shadow bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline focus:outline-none py-2 text-white font-bold rounded cursor-pointer"
          />
        </form>
      )}
      </>:<div className="flex justify-center items-center">
      <p className=" text-sm md:text-2xl text-gary-600">Wants to leave a comment <button className="pl-1 pr-1 underline text-blue-600" onClick={signIn}>  login </button>with you account</p>
      </div>
}
      <div className="flex flex-col p-10 my-10 max-w-2xl mx-auto shadow-yellow-500 shadow space-y-2">
        <h3 className="text-4xl">comments</h3>
        <hr className="pb-2" />
        {post.comments.map((comment) => (
          <div key={comment._id} className="">
            <p className="">
              <span className="text-yellow-500">{comment.name}</span> :
              {comment.comment}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Post;

export const getStaticPaths = async () => {
  const query = `*[_type =="post"]{
        _id,
          slug{
          current
          }
     }`;
  const posts = await sanityClient.fetch(query);
  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type =="post" && slug.current == $slug][0]{
        _id,
        _createdAt,
        title,
        author->{
            name,
            image
        },
        'comments':*[
          _type=="comment"&& post._ref == ^._id && approved == true
        ],
    
        description,
        mainImage,
        slug,
        body
    }`;
  const post = await sanityClient.fetch(query, { slug: params?.slug });
  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post,
    },
    revalidate: 60, //adfter 60 sec it will update old cash
  };
};
