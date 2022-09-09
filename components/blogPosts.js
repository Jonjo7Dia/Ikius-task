import styles from "./blogPosts.module.css";
import Link from "next/link";
import Date from "../components/date";
import {Image } from 'react-datocms';

export default function BlogPosts(props) {
  const allPostsData = props.allPostsData.allArticles;
  return (
    <div className={styles.links}>
      <div className={styles.listTitle}>
        <h1 style={{fontSize : props.fontSize}}>{props.title}</h1>
      </div>
      
      <div className={styles.blogPosts}>
        {allPostsData.map((data) => (
          <Link href={`/posts/${data.id}`} key={data.id}>
            <div className={styles.blogPost}>
              <div className={styles.blogPhoto}>
                <Image data={data.coverImage.responsiveImage} className={styles.blogImg}/>
              </div>
              <div className={styles.blogData}>
                <div className={styles.wrapper}>
                  <div className={styles.blogTitle}>{data.title}</div>
                  <div className={styles.blogDate}>
                    <Date dateString={data.publishDate} />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section> */
