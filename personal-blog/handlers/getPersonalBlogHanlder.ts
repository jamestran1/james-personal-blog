import { PersonalBlog } from "../graphql/Start.graphql"
import { gql } from "graphql-tag"
import { PersonalBlogProps } from "../models/Props";

const singleKeyUrl = process.env.NEXT_PUBLIC_CONTENT_GRAPH_ENDPOINT as string

export async function getPersonalBlog() {
    let headers = {}
    let url = singleKeyUrl

    const parsedGQL = gql`${PersonalBlog}`
    
    const res = await fetch(url, {
        headers,
        method: "POST",
        body: JSON.stringify({
            query: parsedGQL.loc?.source.body,
        })

    })
    
    const json = await res.json()

    const {error, content}: PersonalBlogProps = {error: json.errors || null, content: json.data || null}

    return {error, content}
}