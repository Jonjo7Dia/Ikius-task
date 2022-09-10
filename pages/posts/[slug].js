import Layout from "../../components/layout";
import Head from "next/head";
import Date from "../../components/date";
import { Image, StructuredText } from "react-datocms";
import Link from "next/link";
import articleStyles from "../../styles/articles.module.css";
import LineBreaker from "../../components/lineBreaker";
import BlogPosts from "../../components/blogPosts";
import { request, sortBlogPosts } from "../../lib/datocms";
import {pathQuery,articleQuery, blogPostsQuery} from '../../lib/APIqueries';
export default function Post(props) {
  const links=[props.allPostsData[0].slug, props.allPostsData[1].slug];

  return (
    <Layout links={links}>
      <Head>
        <title>{props.postData.title}</title>
      </Head>
      <article className={articleStyles.blogArticle}>
        <div className={articleStyles.authorDate}>
          <div className={articleStyles.author}>
            <Image
              data={props.postData.author.profilePicture.responsiveImage}
              className={articleStyles.profilePic}
              
            />
            <h1>{props.postData.author.name}</h1>
          </div>
          <Date dateString={props.postData.publishDate} />
        </div>
        <div className={articleStyles.banner}>
          <Image
            data={props.postData.coverImage.responsiveImage}
            className={articleStyles.image}
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
        <h1 className={articleStyles.headingXl}>{props.postData.title}</h1>
        <div className={articleStyles.lightText}></div>
        <div className={articleStyles.articleText}>
          <StructuredText data ={props.postData.content.value} />
           </div>
      </article>
      <LineBreaker />

      <BlogPosts
        title={"Other Posts"}
        fontSize={"24px"}
        allPostsData={props.allPostsData}
      />
    </Layout>
  );
}
export async function getStaticPaths() {
  const slugQuery = await request({
    query: pathQuery(),
  });
  let paths = [];
  slugQuery.allArticles.map((p) => paths.push(`/posts/${p.slug}`));

  return {
    paths,
    fallback: false,
  };
}


export async function getStaticProps({ params }) {
  const post = await request({
    query: articleQuery(),
    variables: { slug: params.slug },
  });
  const allPostsData = await request({
    query: blogPostsQuery(),
  });
  return {
    props: {
      postData: post.article,
      allPostsData: sortBlogPosts(allPostsData.allArticles)
    },
  };
}
