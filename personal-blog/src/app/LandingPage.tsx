import Image from 'next/image'
import { LandingPage } from "../../generated/graphql"
import parse from 'html-react-parser'

type LandingPageProps = {
    content: LandingPage
}

function LandingPage({content}: LandingPageProps) {
    return (
        <div>
            <div className="grid justify-items-center">
                <h1 className="text-3xl" data-edit-edit="Title">{content.Title}</h1>
                <h2 className="text-1xl underline decoration-wavy" data-edit-edit="SubTitle">{content.SubTitle}</h2>
            </div>
            <Image src={content.MainImage?.Url || ''} width={2688} height={1536} alt='zen coder'/>
            <span data-edit-edit="MainBody">{parse(content.MainBody || '')}</span>
            <div>
                <span className='text-right'>{content.FooterText}</span>
            </div>
        </div>
    )
}

export default LandingPage