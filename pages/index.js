import Head from "next/head";
import Layout from "../components/layout";
import { Image, StructuredText, renderMetaTags } from "react-datocms";
import utilStyles from "../styles/utils.module.css";
import LineBreaker from "../components/lineBreaker";
import BlogPosts from "../components/blogPosts";
import { request, sortBlogPosts } from "../lib/datocms";
import {
  blogPostsQuery,
  homepageQuery,
  seoHomepageQuery,
} from "../lib/APIqueries";
import { schemaData } from "../lib/schemaData";
export async function getStaticProps() {
  const data = await request({
    query: blogPostsQuery(),
  });
  const home = await request({
    query: homepageQuery(),
  });
  const seoTags = await request({
    query: seoHomepageQuery(),
  });
  return {
    props: {
      data: sortBlogPosts(data.allArticles),
      home,
      seoTags,
    },
  };
}

export default function Home({ data, home, seoTags }) {
  const links = [data[0].slug, data[1].slug];
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            schemaData(
              home.blog.author.name,
              home.blog.title,
              home.blog.description.value,
              home.blog.author.profilePicture.url
            )
          ),
        }}
      />
      <Layout links={links}>
        <Head>{renderMetaTags(seoTags.blog.seo)}</Head>

        <section className={utilStyles.frontPage}>
          <h1>{home.blog.title}</h1>
          <Image
            data={home.blog.author.profilePicture.responsiveImage}
            className={utilStyles.borderCircle}
          />
          <StructuredText data={home.blog.description.value} />
          <LineBreaker></LineBreaker>
        </section>
        <BlogPosts title={"Blog"} fontSize={"40px"} allPostsData={data} />
      </Layout>
    </>
  );
}
