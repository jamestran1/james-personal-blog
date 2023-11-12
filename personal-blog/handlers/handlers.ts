import { PersonalBlog } from '../graphql/Start.graphql';
import BlogPostsQuery from '../graphql/BlogPosts.graphql';
import BlogPostsFragment from '../graphql/fragment.graphql';
import { gql } from 'graphql-tag';
import { BlogPostsProps, PersonalBlogProps } from '../models/Props';

const singleKeyUrl = process.env.NEXT_PUBLIC_CONTENT_GRAPH_ENDPOINT as string;

export async function getPersonalBlog() {
    let headers = {};
    let url = singleKeyUrl;

    const parsedGQL = gql`
        ${PersonalBlog}
    `;

    const res = await fetch(url, {
        headers,
        method: 'POST',
        body: JSON.stringify({
            query: parsedGQL.loc?.source.body,
        }),
        next: {
            revalidate: 3600,
        },
    });

    const json = await res.json();

    const { error, content }: PersonalBlogProps = {
        error: json.errors || null,
        content: json.data || null,
    };

    return { error, content };
}

export type Variables = {
    slug?: string;
    tags?: string[];
    created?: string;
};

export async function getBlogPosts(
    operationName:
        | 'ALlBlogPosts'
        | 'BlogPostsBySlug'
        | 'BlogPostByTag'
        | 'BlogPostByDate' = 'ALlBlogPosts',
    variables: Variables = {} as Variables
) {
    let headers = {};
    let url = singleKeyUrl;

    const parsedGQL = gql`
        ${BlogPostsQuery}
        ${BlogPostsFragment}
    `;

    const res = await fetch(url, {
        headers,
        method: 'POST',
        body: JSON.stringify({
            query: parsedGQL.loc?.source.body,
            operationName: operationName,
            variables: variables,
        }),
        next: {
            revalidate: 3600,
        },
    });

    const json = await res.json();

    const { error, content }: BlogPostsProps = {
        error: json.errors || null,
        content: json.data || null,
    };

    return { error, content };
}
