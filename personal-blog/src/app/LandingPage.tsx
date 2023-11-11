import Image from 'next/image'
import { ContentAreaItemModelSearch, LandingPage } from "../../generated/graphql"
import parse from 'html-react-parser'
import FeaturePost from './FeaturePost'
import { FeaturePostProps } from '../../models/Props'

type LandingPageProps = {
    content: LandingPage
}

function LandingPage({content}: LandingPageProps) {
    return (
        <div>
            <div className="grid justify-items-center">
                <h1 className="text-3xl" data-epi-edit="Title">{content.Title}</h1>
                <h2 className="text-1xl underline decoration-wavy" data-epi-edit="SubTitle">{content.SubTitle}</h2>
            </div>
            <Image data-epi-edit="MainImage" src={content.MainImage || ''} width={2688} height={1536} alt='zen coder'/>
            <span data-epi-edit="MainBody">{parse(content.MainBody || '')}</span>

            <FeaturePost data-epi-edit="FeaturePosts" featurePosts={content.FeaturePosts as ContentAreaItemModelSearch[]} />
        </div>
    )
}

export default LandingPage