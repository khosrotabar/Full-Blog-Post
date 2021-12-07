import { Fragment } from "react";
import Head from "next/head";

import PostContent from "../../components/posts/post-detail/post-content";
import { getPostData, getPostfiles } from "../../lib/posts-util";

function PostDetailPage(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.post.title}</title>
        <meta name="description" content={props.post.excerpt} />
      </Head>
      <PostContent post={props.post} />
    </Fragment>
  );
}

export function getStaticProps(context) {
  const { params } = context;
  const { slug } = params;

  const postDetail = getPostData(slug);

  return {
    props: {
      post: postDetail,
    },
  };
}

export function getStaticPaths() {
  const postFileNames = getPostfiles();

  const slugs = postFileNames.map((postFileName) =>
    postFileName.replace(/\.md$/, "")
  );

  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: false,
  };
}

export default PostDetailPage;
