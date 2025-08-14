import { http } from '@/utils'
import type { ResType } from './shared'

export type ChannelItemType = {
    id: number
    name: string
}

type ChannelListType = {
    channels: ChannelItemType[]
}

// 获取频道列表
export const fetchChannelListAPI = () => {
    return http.request<ResType<ChannelListType>>({
        url: '/channels',
        method: 'GET',
    })
}

// 获取文章列表
export type ArticleListType = {
    results: ArticleItemType[]
    pre_timestamp: string
}

type ArticleItemType = {
    art_id: string
    title: string
    aut_id: string
    comm_count: number
    pubdate: string
    aut_name: string
    is_top: 0 | 1
    cover: {
        type: 0 | 1 | 3
        images: string[]
    }
}

type ArticleListParamsType = {
    channel_id: string
    timestamp: string
}

export const fetchArticleListAPI = (params: ArticleListParamsType) => {
    return http.request<ResType<ArticleListType>>({
        url: '/articles',
        method: 'GET',
        params,
    })
}