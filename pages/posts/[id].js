import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import Date from "../../components/date";
import Image from "next/image";
import Link from "next/link";
import utilStyles from "../../styles/utils.module.css";
import articleStyles from "../../styles/articles.module.css";
import { getSortedPostsData } from "../../lib/posts";

import BlogPosts from "../../components/blogPosts";
export default function Post({ postData, allPostsData }) {
  const name = "Jonathan Hjelmstrom";
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article className={articleStyles.blogArticle}>
        <div className={articleStyles.authorDate}>
          <div className={articleStyles.author}>
            <Image
              priority
              src="/images/profile.png"
              className={utilStyles.borderCircle}
              height={40}
              width={40}
              alt={"jonathan profile pic"}
            />
            <h1>{name}</h1>
          </div>
          <Date dateString={postData.date} />
        </div>
        <div className={articleStyles.banner}>
          <Image
            priority
            src={`/images/${postData.id}.png`}
            height={250}
            width={800}
            alt={"jonathan profile pic"}
          />
        </div>
      </article>
      <div className={articleStyles.homeButton}>
        <Link href="/">
          <a>
            ← <u>Back to home</u>
          </a>
        </Link>
      </div>
      <article className={articleStyles.blogArticle}>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}></div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>

      <BlogPosts
        title={"Other Posts"}
        fontSize={"24px"}
        allPostsData={allPostsData}
      />
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // Add the "await" keyword like this:
  const postData = await getPostData(params.id);
  const allPostsData = getSortedPostsData();

  return {
    props: {
      postData,
      allPostsData,
    },
  };
}
