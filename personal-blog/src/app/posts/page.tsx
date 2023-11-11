import { notFound } from 'next/navigation';
import { getBlogPosts } from '../../../handlers/handlers';
import Image from 'next/image';
import parse from 'html-react-parser';

export default async function Posts() {
  const { error, content } = await getBlogPosts();
  if (error) notFound()
  return (
    <div className="container flex flex-row">
      <div id="posts" className='basis-3/4'>
        {
            content.BlogPost?.items?.map((item: any, index: any) => {
                return (
                    <div key={index}>
                        <h1 data-epi-edit="Title" className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{item.Title}</h1>
                        <h2 data-epi-edit="SubTitle">{item.SubTitle}</h2>
                        <p data-epi-edit="Excerpt" className="mt-6 text-xl leading-8 text-gray-700">{item.Excerpt}</p>
                        <span data-epi-edit="Content">{parse(item.Content || '')}</span>
                    </div>
                )
            })
        }
      </div>
      <div id="navigation" className='basis-1/4'>
        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
            <a href="#">
            <span className="absolute inset-0"></span>
            Tags
            </a>
        </h3>
        {
        content.BlogPost?.facets?.Tags?.map((item: any, index: any) => {
            return (
                <div key={index}>
                    <a href="#" className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">{item.name} ({item.count})</a>
                </div>
            )
        })
        }
        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
            <a href="#">
            <span className="absolute inset-0"></span>
            Dates
            </a>
        </h3>
        {
            content.BlogPost?.facets?.Created?.map((item: any, index: any) => {
                return (
                    <div key={index}>
                        <time dateTime={item.name} className="text-gray-500">{item.name} ({item.count})</time>
                    </div>
                )
            })
        }
      </div>
    </div>
  )
}
