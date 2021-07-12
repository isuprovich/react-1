import 'antd/dist/antd.css';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
const antIcon = <LoadingOutlined style={{ fontSize: 100, }} spin />

let Preloader = () => {
    return <Spin indicator={antIcon} style={{
        zIndex: 200,
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translateX(-50%) translateY(-50%)'
    }} />
}

export default Preloader