import { LandingPage } from "../../generated/graphql"
import parse from 'html-react-parser'

type LandingPageProps = {
    content: LandingPage
}

function LandingPage({content}: LandingPageProps) {
    return (
        <div>
            <h1 data-edit-edit="Title">{content.Title}</h1>
            <h2 data-edit-edit="SubTitle">{content.SubTitle}</h2>
            <span data-edit-edit="MainBody">{parse(content.MainBody || '')}</span>
        </div>
    )
}

export default LandingPage