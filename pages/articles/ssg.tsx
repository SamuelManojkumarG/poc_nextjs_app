import Link from "next/link";
import styles from "../../styles/Home.module.css";
import ReactHtmlParser from 'react-html-parser';
import React from "react";

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
            <React.Fragment>{ReactHtmlParser(data.body)}</React.Fragment>
          </div>
        </div>
      </main>
    </div>
  );
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export async function getStaticProps() {
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    const res = await fetch('http://localhost:3004/articles/1')
    const data = await res.json()
  
    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
      props: {
        data,
      },
    }
  }