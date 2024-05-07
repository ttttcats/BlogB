import { Module } from '@nestjs/common';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import { defineCollection, defineConfig, s } from 'velite';

const computedFields = <T extends { slug: string }>(data: T) => ({
  ...data,
  permalink: data.slug.split('/').slice(1).join('/'),
  pageNum : 0,
});
const posts = defineCollection({
  name: 'Post',
  pattern: 'blog/**/*.mdx',
  schema: s
    .object({
      slug: s.path(),
      title: s.string().max(100),
      description: s.string().max(200),
      date: s.isodate(),
      // thumbnail: s.image().optional().nullable(),
      thumbnail: s.string(),
      published: s.boolean().default(false),
      body: s.mdx(),
      tags: s.array(s.string()),
    })
    .transform(computedFields),
});

// export default defineConfig({
//   root: 'content',
//   output: {
//     data: '.velite',
//     assets: 'public/static',
//     base: '/static/',
//     name: '[name]-[hash:6].[ext]',
//     clean: true,
//   },
//   collections: { posts },
//   mdx: {
//     rehypePlugins: [
//       rehypeSlug,
//       [rehypePrettyCode, { theme: 'dark-plus' }],
//       [
//         rehypeAutolinkHeadings,
//         {
//           behavior: 'wrap',
//           properties: {
//             className: ['subheading-anchor'],
//             ariaLabel: 'Link to section',
//           },
//         },
//       ],
//     ],
//     remarkPlugins: [],
//   },
// });