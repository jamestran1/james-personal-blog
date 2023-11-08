import Image from 'next/image'
import { getPersonalBlog } from '../../handlers/getPersonalBlogHanlder';
import LandingPage from './LandingPage';

// export const getData = async () => {
//   const { error, content } = await getPersonalBlog();
//   return {
//       props: { error, content }
//   }
// }

export default async function Home() {
  const { error, content } = await getPersonalBlog();
  if (error) return <p>{JSON.stringify(error)}</p>
  return (
    <div>
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
