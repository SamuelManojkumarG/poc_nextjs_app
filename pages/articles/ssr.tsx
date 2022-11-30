import Link from "next/link";
import styles from "../../styles/Home.module.css";
import React from "react";
import ReactHtmlParser from 'react-html-parser';

type proptype ={
  data: {
    title: string;
    body: string;
  }
}

export default function Articles({data}:proptype) {

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.grid}>
          <Link href="/" className={styles.card}>
            Go back
          </Link>

          <div>
            <h2>{data.title}</h2>
            <React.Fragment>
              {ReactHtmlParser(data.body)}
            </React.Fragment>
          </div>
        </div>
      </main>
    </div>
  );
}

// This gets called on every request
export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch(`http://localhost:3004/articles/1`)
    const data = await res.json()
  
    // Pass data to the page via props
    return { props: { data } }
  }
  
