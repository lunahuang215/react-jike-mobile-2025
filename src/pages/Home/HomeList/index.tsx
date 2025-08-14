import { Image, InfiniteScroll, List } from 'antd-mobile'
// mock数据
import { fetchArticleListAPI, type ArticleListType } from '@/apis/list'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type PropsType = {
  channelId: string
}
const HomeList = (props: PropsType) => {
  const { channelId } = props
  const [articleList, setArticleList] = useState<ArticleListType>({
    results: [],
    pre_timestamp: '' + new Date().getTime(),
  })

  useEffect(() => {
    fetchArticleListAPI({
      channel_id: channelId,
      timestamp: '' + new Date().getTime(),
    }).then((res) => {
      console.log(res.data.data)
      setArticleList({
        results: res.data.data.results,
        pre_timestamp: res.data.data.pre_timestamp,
      })
    }).catch((err) => {
      throw new Error(err.message)
    })
  }, [channelId])

  const [hasMore, setHasMore] = useState(true)

  const loadMore = async () => {
    console.log('loadMore')
    if (hasMore === false) {
      return
    }
    try {
      const res = await fetchArticleListAPI({
        channel_id: channelId,
        timestamp: articleList.pre_timestamp,
      })
      console.log(res.data.data)
      setArticleList({
        results: [...articleList.results, ...res.data.data.results],
        pre_timestamp: res.data.data.pre_timestamp,
      })
      if (res.data.data.pre_timestamp === null) {
        setHasMore(false)
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  const navigate = useNavigate()
  const goDetail = (id: string) => {
    navigate(`/detail?id=${id}`)
  }
return (
    <>
      <List>
        {articleList.results.map((item) => (
          <List.Item
            onClick={() => goDetail(item.art_id)}
            key={item.art_id}
            prefix={
              <Image
                src={item.cover?.images?.[0]}
                style={{ borderRadius: 20 }}
                fit="cover"
                width={40}
                height={40}
              />
            }
            description={item.pubdate}
            >
            {item.title}
          </List.Item>
        ))}
      </List>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} threshold={100}/>
    </>
  )
}

export default HomeList
