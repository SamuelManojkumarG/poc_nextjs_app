import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../../../styles/Home.module.css";
import ReactHtmlParser from 'react-html-parser';

type proptype = {
  post: {
    id: string;
    name: string;
    introduction: string;
    text: string;
  };
};

const Post = ({ post }: proptype) => {
  const router = useRouter();
  const { ar_id } = router.query;
  console.log("Article id: " + ar_id);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.grid}>
          <Link href="/articles" className={styles.card}>
            Go back
          </Link>
          <div>
            <h2>{post.name}</h2>
            <p>{ReactHtmlParser(post.introduction)}</p>
            <p>{ReactHtmlParser(post.text)}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Post;

// Generates `/posts/1` and `/posts/2`
export async function getStaticPaths() {
  // Fetch data from external API
  // const res = await fetch(`http://localhost:3004/articles`)
  // const data = await res.json()

  // const paths = data.map((post: any) => ({
  //   params: { ar_id: String(post.id) },
  // }))

  return {
    paths: [{ params: { ar_id: 'd81af7f9ebf1ceb7e23d690c97b96025' } }, { params: { ar_id: '2d1a8c2a6ba0872a614e344b73a2eeef' } }],
    // paths,
    fallback: false, // can also be true or 'blocking'
  }
}

export async function getStaticProps(context: any){
  const { params } = context;
  const response = await fetch(`http://localhost:3004/articles/${ params.ar_id }`);
  const data = await response.json();
 
  return {
      props:{
          post: data,
      },
      revalidate: 10,
  }
}

