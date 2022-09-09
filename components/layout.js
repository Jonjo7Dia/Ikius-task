import Head from "next/head";
import styles from "./layout.module.css";
import Link from "next/link";

const name = "Jonathan Hjelmstrom's Ikius test case";
export const siteTitle = "Ikius test case";

export default function Layout({ children, home }) {
  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Learn how to build a personal website using Next.js"
          />
          <meta
            property="og:image"
            content={`https://og-image.vercel.app/${encodeURI(
              siteTitle
            )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
          />
          <meta name={name} content={siteTitle} />
        </Head>
        <main>{children}</main>
      </div>
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerList}>
            <div className={styles.footerLinks}>
              <h1>Blog Posts</h1>
              <ul>
                <li>
                  <Link href="/posts/ssg-ssr">
                    <u> Link to first post</u>
                  </Link>
                </li>
                <li>
                  <Link href="/posts/ssg-ssr">
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
