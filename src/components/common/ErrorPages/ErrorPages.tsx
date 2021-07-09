import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

type PropsType = {
    errorMessage: string
}

export const Code500:React.FC<PropsType> = ({errorMessage}) => {
    return (
        <Result
            status="500"
            title="500"
            subTitle={errorMessage}
            extra={<Button type="primary"><Link to='/profile'>Вернуться</Link></Button>}
        />
    )
}

export const Code404:React.FC<PropsType> = ({errorMessage}) => {
    return (
        <Result
            status="404"
            title="404"
            subTitle={errorMessage}
            extra={<Button type="primary"><Link to='/profile'>Вернуться</Link></Button>}
        />
    )
}