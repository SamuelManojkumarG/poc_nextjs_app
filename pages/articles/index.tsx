import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../../styles/Home.module.css";

export default function Articles() {
  const [data, setData] = useState<{id: number; title: string; body: string;}[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3004/posts")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No data</p>;

  const loadList = () => {
    var postsList = data.map((post) => {
        var link = "/articles/dynamic/" + post.id;
        return (
            <li key={post.id}>
                <Link href={link}>
                  <h2>{post.title}</h2>
                  <p>{post.body}</p>
                </Link>
            </li>
        );
      })
    return (<ul>{postsList}</ul>);
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.grid}>
          <Link href="/" className={styles.card}>
            Go back
          </Link>

          <div>
            <h2>The links navigate to article data using dynamic routing and isr</h2>
            {loadList()}
          </div>
        </div>
      </main>
    </div>
  );
}
