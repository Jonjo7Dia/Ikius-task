export function blogPostsQuery(){
    return `query MyQuery {
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
      
      `
}

export function pathQuery(){
    return `query MyQuery {
        allArticles {
          slug
        }
      }
      `
};

export function articleQuery(){
    return `query MyQuery($slug: String) {
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
      `
}

export function homepageQuery(){
    return `query MyQuery {
        blog {
          author {
            name
            profilePicture {
              responsiveImage {
                alt
                aspectRatio
                base64
                height
                bgColor
                sizes
                src
                srcSet
                title
                webpSrcSet
                width
              }
            }
          }
          description {
              value
          }
          title
        }
      }
      `
}

export function seoHomepageQuery(){
    return `query MyQuery {
        blog {
          seo:_seoMetaTags {
            attributes
            content
            tag
          }
        }
      }
      `
}
export function seoArticleQuery(){
    return `query MyQuery($slug: String) {
        article(filter: {slug: {eq: $slug}}){
           seo: _seoMetaTags {
             attributes
             content
             tag
           }
         }
       }
       `
}