import { useSearchParams } from 'react-router-dom'
import { fetchDetailAPI, type DetailDataType } from '@/apis/detail'
import { useEffect, useState } from 'react'
import { NavBar } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
   
const Detail = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  console.log('id', id)
  const [detail, setDetail] = useState<DetailDataType | null>(null)
  useEffect(() => {
    fetchDetailAPI(id || '').then((res) => {
      setDetail(res.data.data)
    }).catch((err: any) => {
      throw new Error(err.message)
    })
  }, [id])

  if (!detail) {
    return <div>is loading...</div>
  }
  
  return <div>
    <NavBar onBack={() => navigate(-1)}>{detail?.title}</NavBar>
    <div dangerouslySetInnerHTML={{ __html: detail?.content}}></div>
  </div>
}

export default Detail