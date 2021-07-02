import s from './preloader.module.css'
import 'antd/dist/antd.css';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
const antIcon = <LoadingOutlined style={{ fontSize: 100, }} spin />

let Preloader = () => {
    return <div className={s.rollerWrapper}>
        <Spin indicator={antIcon} />
    </div>
}

export default Preloader