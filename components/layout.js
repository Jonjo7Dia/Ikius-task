import styles from "./layout.module.css";
import Link from "next/link";


export default function Layout({ children, links}) {
  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <main>{children}</main>
      </div>
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerList}>
            <div className={styles.footerLinks}>
              <h1>Blog Posts</h1>
              <ul>
                <li>
                  <Link href={`/posts/${links[0]}`}>
                    <u> Link to first post</u>
                  </Link>
                </li>
                <li>
                  <Link href={`/posts/${links[1]}`}>
                    <u> Link to second post</u>
                  </Link>
                </li>
              </ul>
            </div>
            <div className={styles.footerDesc}>
              <h1>Footer</h1>
              <h4>Ikius Recruitment Task</h4>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
