import { notFound } from 'next/navigation';
import { getBlogPosts } from '../../../../handlers/handlers';
import parse from 'html-react-parser';
import Image from 'next/image';

export default async function Page({ params }: { params: { slug: string } }) {
    const { error, content } = await getBlogPosts('BlogPostsBySlug', {
        slug: params.slug + '/',
    });
    if (error) return notFound();
    // @ts-ignore
    const post = content.BlogPost?.items[0] || {};
    return (
        <div className="bg-white px-6 py-32 lg:px-8">
            <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
                <p className="text-base font-semibold leading-7 text-indigo-600">
                    Posts
                </p>
                <h1
                    data-epi-edit="Title"
                    className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
                >
                    {post.Title}
                </h1>
                <time dateTime={post.Created} className="text-gray-500">
                    {post.Created}
                </time>
                {post.Tags?.map((tag: string | null, index: number) => {
                    return (
                        <a
                            key={index}
                            href="#"
                            data-epi-edit="Tags"
                            className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                        >
                            {tag}
                        </a>
                    );
                })}
                <div>
                    <span
                        data-epi-edit="Excerpt"
                        className="mt-6 text-xl leading-8"
                    >
                        {post.Excerpt}
                    </span>
                </div>
                <Image
                    data-epi-edit="FeatureImage"
                    src={post.FeatureImage || ''}
                    alt="App screenshot"
                    width={800}
                    height={600}
                    className="rounded-xl"
                />
                <div className="mt-10 max-w-2xl">
                    <span data-epi-edit="Content" className="mt-6">
                        {parse(post.Content || '')}
                    </span>
                </div>
            </div>
        </div>
    );
}
