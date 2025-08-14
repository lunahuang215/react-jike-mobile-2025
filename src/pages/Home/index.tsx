import { Tabs } from 'antd-mobile';
import './index.css'
import useTabs from './useTabs'
import HomeList from './HomeList'

const Home = () => {
    const { channelList } = useTabs()
    
  return <div className="home">
    <div className="tabContainer">
    <Tabs defaultActiveKey="0">
          {channelList.map((item) => (
            <Tabs.Tab title={item.name} key={item.id}>
              <div className="listContainer">
              <HomeList channelId={'' + item.id}/>
              </div>
            </Tabs.Tab>
          ))}
        </Tabs>
    </div>
  </div>;
};
    
export default Home;