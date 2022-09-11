export function schemaData(author, title, description, image, datePublished) {
  return {
    "@context": "https://schema.org/",
    "@type": "Blog",
    name: title,
    image: image,
    description: description,
    datePublished: datePublished,
    author: { "@type": "Person", name: author },
  };
}
