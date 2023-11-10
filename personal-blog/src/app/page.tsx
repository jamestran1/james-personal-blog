import { notFound } from 'next/navigation';
import { getPersonalBlog } from '../../handlers/getPersonalBlogHanlder';
import LandingPage from './LandingPage';

export default async function Home() {
  const { error, content } = await getPersonalBlog();
  if (error) notFound()
  return (
    <div className="container">
      {
        content.Content?.items?.map((item, index) => {
          if (item?.__typename === "LandingPage") {
            return <LandingPage key={index} content={item} />
          }
        })
      }
    </div>
  )
}
