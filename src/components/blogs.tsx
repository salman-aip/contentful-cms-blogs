import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/lib/contentful";

import { PageIntro } from "./PageIntro";
import { Container } from "./Container";
import { FadeIn } from "./FadeIn";
import { Border } from "./Border";
import { Button } from "./Button";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Stay up-to-date with the latest industry news as our marketing teams finds new ways to re-purpose old CSS tricks articles.",
};

export default async function BlogsPage() {
  let blogs: object[] = [];

  await client
    .getEntries({
      content_type: `${process.env.NEXT_PUBLIC_CONTENTFUL_CONTENT_TYPE_BLOG}`,
    })
    .then((res: any) => {
      blogs = res.items;
    });

  return (
    <>
      <PageIntro eyebrow="Blog" title="The latest articles and news">
        <p>
          Stay up-to-date with the latest industry news as our marketing teams finds new ways to
          re-purpose old CSS tricks articles.
        </p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <div className="space-y-24 lg:space-y-32">
          {blogs.map((blog: any, index: any) => {
            return (
              <FadeIn key={index}>
                <article>
                  <Border className="pt-16">
                    <div className="relative lg:-mx-4 lg:flex lg:justify-end">
                      <div className="pt-10 lg:w-2/3 lg:flex-none lg:px-4 lg:pt-0">
                        <h2 className="font-display text-2xl font-semibold text-neutral-950">
                          <Link
                            href={`/${blog.sys.id}`}
                            // as={`/blog/${blog.fields.blog_title}`}
                          >
                            {blog.fields.blog_title}
                          </Link>
                        </h2>
                        <dl className="lg:absolute lg:left-0 lg:top-0 lg:w-1/3 lg:px-4">
                          <dt className="sr-only">Published</dt>
                          <dd className="absolute left-0 top-0 text-sm text-neutral-950 lg:static">
                            <time dateTime={blog.fields.date}>{blog.fields.date}</time>
                          </dd>
                          <dt className="sr-only">Author</dt>
                          <dd className="mt-6 flex gap-x-4">
                            <div className="flex-none overflow-hidden rounded-xl bg-neutral-100">
                              <Image
                                alt=""
                                src={`https://${blog.fields.authorImage.fields.file.url}`}
                                className="h-12 w-12 object-cover grayscale"
                                width={100}
                                height={100}
                              />
                            </div>
                            <div className="text-sm text-neutral-950">
                              <div className="font-semibold">{blog.fields.authorName}</div>
                              <div>{blog.fields.role}</div>
                            </div>
                          </dd>
                        </dl>
                        <p className="mt-6 max-w-2xl text-base text-neutral-600">
                          {blog.fields.blog_sub_title}
                        </p>
                        <Button
                          href={`/${blog.sys.id}`}
                          aria-label={`Read more: ${blog.fileds?.blog_title}`}
                          className="mt-8"
                          // as={`/blog/${blog.fields.blog_title}`}
                        >
                          Read more
                        </Button>
                      </div>
                    </div>
                  </Border>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </>
  );
}
