import Layout from "../../components/layout";
import Head from "next/head";
import Date from "../../components/date";

import { Image, StructuredText } from "react-datocms";
import Link from "next/link";
import utilStyles from "../../styles/utils.module.css";
import articleStyles from "../../styles/articles.module.css";
import LineBreaker from "../../components/lineBreaker";
import BlogPosts from "../../components/blogPosts";
import { request } from "../../lib/datocms";
export default function Post(props) {
  console.log(props.postData)
  return (
    <Layout>
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

const PATH_QUERY = `query MyQuery {
  allArticles {
    slug
  }
}
`;

const HOMEPAGE_QUERY = `query MyQuery {
  allArticles {
    id
    title
    author {
      name
    }
    content {
      value
    }
    coverImage {
      url
      responsiveImage {
        alt
        aspectRatio
        base64
        bgColor
        height
        sizes
        src
        srcSet
        title
        webpSrcSet
        width
      }
    }
    publishDate
    slug
  }
}

`;

export async function getStaticPaths() {
  const slugQuery = await request({
    query: PATH_QUERY,
  });
  let paths = [];
  slugQuery.allArticles.map((p) => paths.push(`/posts/${p.slug}`));

  return {
    paths,
    fallback: false,
  };
}

const ARTICLE_QUERY = `query MyQuery($slug: String) {
  article(filter: {slug: {eq: $slug}}) {
    publishDate
    id
    title
    author {
      name
      profilePicture {
        responsiveImage {
          alt
          aspectRatio
          base64
          bgColor
          height
          sizes
          src
          srcSet
          title
          webpSrcSet
          width
        }
      }
    }
    content {
      value
    }
    coverImage {
      url
      responsiveImage {
        alt
        aspectRatio
        base64
        bgColor
        height
        sizes
        src
        srcSet
        title
        webpSrcSet
        width
      }
    }
    slug
  }
}
`;

export async function getStaticProps({ params }) {
  const post = await request({
    query: ARTICLE_QUERY,
    variables: { slug: params.slug },
  });
  const allPostsData = await request({
    query: HOMEPAGE_QUERY,
  });
  return {
    props: {
      postData: post.article,
      allPostsData,
    },
  };
}
