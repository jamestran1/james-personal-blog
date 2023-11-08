import { LandingPage } from "../../generated/graphql"
import parse from 'html-react-parser'

type LandingPageProps = {
    content: LandingPage
}

function LandingPage({content}: LandingPageProps) {
    return (
        <div>
            <h1>{content.Title}</h1>
            <h2>{content.SubTitle}</h2>
            {parse(content.MainBody || '')}
        </div>
    )
}

export default LandingPage