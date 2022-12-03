import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../../styles/Home.module.css";

export default function Articles() {
  const [data, setData] = useState<{id: string; name: string;}[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3004/articles")
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
                <a href={link}>
                  <h2 className={styles.list_title}>{post.name}</h2>
                </a>
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
