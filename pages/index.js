import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import Image from "next/image";
import utilStyles from "../styles/utils.module.css";
import LineBreaker from '../components/lineBreaker'
import BlogPosts from '../components/blogPosts';
import {request} from '../lib/datocms';

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
export async function getStaticProps() {
  const data = await request({
    query: HOMEPAGE_QUERY,
  });
  return {
    props: {
      data
    }
  }
}


export default function Home({ data }) {

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.frontPage}>
        <h1>My Blog</h1>
        <Image
          priority
          src="/images/profile.png"
          className={utilStyles.borderCircle}
          height={144}
          width={144}
          alt={"jonathan profile pic"}
        />
        <p>
          Hello I am <strong>Jonathan</strong> I am a software developer from
          Denmark. I love learning about new technologies and coding!
        </p>
      <LineBreaker></LineBreaker>
      </section>
      <BlogPosts title={'Blog'} fontSize={'40px'} allPostsData={data}/>
      
    </Layout>
  );
}

