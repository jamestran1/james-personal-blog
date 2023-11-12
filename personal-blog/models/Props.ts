import exp from 'constants';
import { ALlBlogPostsQuery, ContentModelReferenceSearch, Maybe, PersonalBlogQuery } from '../generated/graphql';
export type PersonalBlogProps = {
    error: any,
    content: PersonalBlogQuery,
}
export type BlogPostsProps = {
    error: any,
    content: ALlBlogPostsQuery,
}

export type FeaturePostProps = {
    Title: string
    Tags: string[]
    ContentLink: Maybe<ContentModelReferenceSearch>
    Excerpt: string
    FeatureImage: string
    Created: string
}