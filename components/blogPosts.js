import styles from "./blogPosts.module.css";
import Link from "next/link";
import Date from "../components/date";
import Image from "next/image";
import classes from "./blogPosts.module.css";

export default function BlogPosts(props) {
  return (
    <div className={classes.links}>
      <div className={styles.listTitle}>
        <h1 style={{fontSize : props.fontSize}}>{props.title}</h1>
      </div>
      
      <div className={styles.blogPosts}>
        {props.allPostsData.map(({ id, date, title }) => (
          <Link href={`/posts/${id}`}>
            <div className={styles.blogPost}>
              <div className={styles.blogPhoto}>
                <Image
                  priority
                  className={styles.blogImg}
                  src={`/images/${id}.png`}
                  width={"300"}
                  height={"200"}
                  alt={"jonathan profile pic"}
                />
              </div>
              <div className={styles.blogData}>
                <div className={styles.wrapper}>
                  <div className={styles.blogTitle}>{title}</div>
                  <div className={styles.blogDate}>
                    <Date dateString={date} />
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
