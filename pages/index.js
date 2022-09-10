import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import {Image, StructuredText } from "react-datocms";

import utilStyles from "../styles/utils.module.css";
import LineBreaker from '../components/lineBreaker'
import BlogPosts from '../components/blogPosts';
import {request, sortBlogPosts} from '../lib/datocms';
import {blogPostsQuery, homepageQuery} from '../lib/APIqueries'

export async function getStaticProps() {
  const data = await request({
    query: blogPostsQuery(),
  });
  const home = await request({
    query: homepageQuery()
  })
  return {
    props: {
      data: sortBlogPosts(data.allArticles),
      home,
    }
  }
}


export default function Home({ data,home }) {
  const links=[data[0].slug, data[1].slug];
  return (
    <Layout links={links}>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.frontPage}>
        <h1>{home.blog.title}</h1>
        <Image
          data={home.blog.author.profilePicture.responsiveImage}
          className={utilStyles.borderCircle}
        />
          <StructuredText data={home.blog.description.value} />
      <LineBreaker></LineBreaker>
      </section>
      <BlogPosts title={'Blog'} fontSize={'40px'} allPostsData={data}/>
      
    </Layout>
  );
}

