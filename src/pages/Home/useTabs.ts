import { fetchChannelListAPI, type ChannelItemType } from "@/apis/list"
import { useEffect, useState } from "react"

const useTabs = () => {
    const [channelList, setChannelList] = useState<ChannelItemType[]>([])

    useEffect(() => {
        fetchChannelListAPI().then((res) => {
            setChannelList(res.data.data.channels)
        }).catch((err) => {
            throw new Error(err.message)
        })
    }, [])

    return { channelList }  
}

export default useTabs