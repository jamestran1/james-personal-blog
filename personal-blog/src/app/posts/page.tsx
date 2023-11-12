import { notFound, useSearchParams } from 'next/navigation';
import { Variables, getBlogPosts } from '../../../handlers/handlers';
import Image from 'next/image';
import { HashtagIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

function ShortDate(date: string) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

export default async function Posts({
    params,
    searchParams,
}: {
    params: { slug: string };
    searchParams?: {
        tags?: string[];
        created?: string;
        operationName:
            | 'ALlBlogPosts'
            | 'BlogPostsBySlug'
            | 'BlogPostByTag'
            | 'BlogPostByDate';
    };
}) {
    const { tags, created, operationName } = searchParams || {};
    console.log(tags, created, operationName);
    const { error, content } = await getBlogPosts(operationName, {
        tags,
        created,
    });
    if (error) notFound();
    return (
        <div className="container flex flex-row bg-white py-24 sm:py-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 basis-3/4">
                <div className="mx-auto max-w-2xl lg:max-w-4xl">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        From the blog
                    </h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600">
                        Learn how to grow your business with our expert advice.
                    </p>
                    <div className="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
                        {content.BlogPost?.items?.map((post: any, key: any) => (
                            <article
                                key={key}
                                className="relative isolate flex flex-col gap-8 lg:flex-row"
                            >
                                <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
                                    <Image
                                        src={post?.FeatureImage || ''}
                                        alt={post?.Title || ''}
                                        width={256}
                                        height={256}
                                        className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
                                    />
                                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-x-4 text-xs">
                                        <time
                                            dateTime={post?.Created}
                                            className="text-gray-500"
                                        >
                                            {post?.Created}
                                        </time>
                                        <a
                                            href="#"
                                            className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                                        >
                                            {post?.Tags?.at(0)}
                                        </a>
                                    </div>
                                    <div className="group relative max-w-xl">
                                        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                            <a
                                                href={
                                                    post?.ContentLink?.Url || ''
                                                }
                                            >
                                                <span className="absolute inset-0" />
                                                {post?.Title}
                                            </a>
                                        </h3>
                                        <p className="mt-5 text-sm leading-6 text-gray-600">
                                            {post?.Excerpt}
                                        </p>
                                    </div>
                                    <div className="mt-6 flex border-t border-gray-900/5 pt-6">
                                        <div className="relative flex items-center gap-x-4">
                                            <Image
                                                width={40}
                                                height={40}
                                                src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                alt=""
                                                className="h-10 w-10 rounded-full bg-gray-50"
                                            />
                                            <div className="text-sm leading-6">
                                                <p className="font-semibold text-gray-900">
                                                    <a href="#">
                                                        <span className="absolute inset-0" />
                                                        James Tran
                                                    </a>
                                                </p>
                                                <p className="text-gray-600">
                                                    Optimizely Software Engineer
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>

            <nav
                className="flex flex-1 flex-col basis-1/4"
                aria-label="Sidebar"
            >
                <ul role="list" className="-mx-2 space-y-1">
                    <li>
                        <CalendarDaysIcon
                            className={classNames(
                                'text-gray-400 group-hover:text-indigo-600',
                                'h-6 w-6 shrink-0'
                            )}
                            aria-hidden="true"
                        />
                        <ul role="list" className="-mx-2 mt-2 space-y-1">
                            {content.BlogPost?.facets?.Created?.map(
                                (item, index) => (
                                    <li key={index}>
                                        <a
                                            href={
                                                '/posts?created=' +
                                                ShortDate(item?.name || '') +
                                                '&operationName=BlogPostByDate'
                                            }
                                            className={classNames(
                                                ShortDate(item?.name || '') ===
                                                    created
                                                    ? 'bg-gray-50 text-indigo-600'
                                                    : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                                                'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                            )}
                                        >
                                            <div
                                                className={classNames(
                                                    false
                                                        ? 'text-indigo-600'
                                                        : 'text-gray-400 group-hover:text-indigo-600',
                                                    'h-6 w-6 shrink-0'
                                                )}
                                                aria-hidden="true"
                                            />
                                            {ShortDate(item?.name || '')}
                                            {item?.count ? (
                                                <span
                                                    className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-white px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-gray-600 ring-1 ring-inset ring-gray-200"
                                                    aria-hidden="true"
                                                >
                                                    {item.count}
                                                </span>
                                            ) : null}
                                        </a>
                                    </li>
                                )
                            )}
                        </ul>
                    </li>
                    <li>
                        <HashtagIcon
                            className={classNames(
                                'text-gray-400 group-hover:text-indigo-600',
                                'h-6 w-6 shrink-0'
                            )}
                            aria-hidden="true"
                        />
                        <ul role="list" className="-mx-2 mt-2 space-y-1">
                            {content.BlogPost?.facets?.Tags?.map(
                                (item, index) => (
                                    <li key={index}>
                                        <a
                                            href={
                                                '/posts?tags=' +
                                                item?.name +
                                                '&operationName=BlogPostByTag'
                                            }
                                            className={classNames(
                                                item?.name === tags
                                                    ? 'bg-gray-50 text-indigo-600'
                                                    : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                                                'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                            )}
                                        >
                                            <div
                                                className={classNames(
                                                    false
                                                        ? 'text-indigo-600'
                                                        : 'text-gray-400 group-hover:text-indigo-600',
                                                    'h-6 w-6 shrink-0'
                                                )}
                                                aria-hidden="true"
                                            />
                                            {item?.name}
                                            {item?.count ? (
                                                <span
                                                    className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-white px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-gray-600 ring-1 ring-inset ring-gray-200"
                                                    aria-hidden="true"
                                                >
                                                    {item.count}
                                                </span>
                                            ) : null}
                                        </a>
                                    </li>
                                )
                            )}
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
