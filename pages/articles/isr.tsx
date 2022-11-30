import Link from "next/link";
import styles from "../../styles/Home.module.css";

type proptype ={
  data: {
    title: string;
    body: string;
  }
}

export default function Articles({data}: proptype) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.grid}>
          <Link href="/" className={styles.card}>
            Go back
          </Link>

          <div>
            <h2>{data.title}</h2>
            <p>{data.body}</p>
          </div>
        </div>
      </main>
    </div>
  );
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps() {
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/1')
    const data = await res.json()
  
    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
      props: {
        data,
      },
       // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
      revalidate: 10,
    }
  }