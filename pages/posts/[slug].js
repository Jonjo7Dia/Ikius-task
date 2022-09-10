import Layout from "../../components/layout";
import Head from "next/head";
import Date from "../../components/date";
import { Image, StructuredText, renderMetaTags} from "react-datocms";
import Link from "next/link";
import articleStyles from "../../styles/articles.module.css";
import LineBreaker from "../../components/lineBreaker";
import BlogPosts from "../../components/blogPosts";
import { request, sortBlogPosts } from "../../lib/datocms";
import {pathQuery,articleQuery, blogPostsQuery, seoArticleQuery} from '../../lib/APIqueries';


export default function Post({postData, seoTags, allPostsData}) {
  const links=[allPostsData[0].slug, allPostsData[1].slug];
  return (
    <Layout links={links}>
      <Head>
      {renderMetaTags(seoTags.article.seo)}
      </Head>
      <article className={articleStyles.blogArticle}>
        <div className={articleStyles.authorDate}>
          <div className={articleStyles.author}>
            <Image
              data={postData.author.profilePicture.responsiveImage}
              className={articleStyles.profilePic}
              
            />
            <h1>{postData.author.name}</h1>
          </div>
          <Date dateString={postData.publishDate} />
        </div>
        <div className={articleStyles.banner}>
          <Image
            data={postData.coverImage.responsiveImage}
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
        <h1 className={articleStyles.headingXl}>{postData.title}</h1>
        <div className={articleStyles.articleText}>
          <StructuredText data ={postData.content.value} />
           </div>
      </article>
      <LineBreaker />

      <BlogPosts
        title={"Other Posts"}
        fontSize={"24px"}
        allPostsData={allPostsData}
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
  const seoTags = await request({
    query: seoArticleQuery(),
    variables: { slug: params.slug },

  })
  return {
    props: {
      postData: post.article,
      allPostsData: sortBlogPosts(allPostsData.allArticles),
      seoTags,
    },
  };
}
