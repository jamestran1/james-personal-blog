import exp from 'constants';
import { BlogPostsQuery, PersonalBlogQuery } from '../generated/graphql';
export type PersonalBlogProps = {
    error: any,
    content: PersonalBlogQuery,
}
export type BlogPostsProps = {
    error: any,
    content: BlogPostsQuery,
}

export type FeaturePostProps = {
    Title: string
    Tags: string[]
    Excerpt: string
    FeatureImage: string
    Created: string
}