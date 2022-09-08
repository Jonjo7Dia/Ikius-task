import styles from "./blogPosts.module.css";
import Link from "next/link";
import Date from "../components/date";
import Image from "next/image";



export default function BlogPosts(props) {
  return (
    <section className={``}>
    <h2 >Blog</h2>
    <ul >
      {props.allPostsData.map(({ id, date, title }) => (
        <li className={''} key={id}>
          {title}
          <br />
          {id}
          <br />
          {date}
        </li>
      ))}
    </ul>
  </section>
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

      
