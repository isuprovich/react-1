import Message from './Messages/Message';
import Dialog from './Dialog/Dialog';
import { AddMessageFormRedux } from './Messages/AddMessageForm';
import { InitialStateType } from '../../redux/dialogsReducer'
import { Row, Col } from 'antd'

type PropsType = {
    dialogsPage: InitialStateType
    sendMessage: (messageText: string) => void
}

const Dialogs: React.FC<PropsType> = (props) => {

    const dialogs = props.dialogsPage.dialogsData.map(d => <Dialog key={d.id} id={d.id} name={d.name} />);
    const messagesList = props.dialogsPage.messages.map(m => <Message message={m.message} key={m.id} id={m.id} />);

    const addNewMessage = (values: { newMessageText: string }) => {
        props.sendMessage(values.newMessageText);
    }

    return <>
        <Row style={{ height: '100%' }} gutter={[8, 8]}>
            <Col style={{ height: '100%' }}>
                {dialogs}
            </Col>
            <Col flex={'auto'} style={{ width: 'avilable', height: 'avilable' }}>
                <Row>
                    <Col style={{width: '100%', height: '80vh', overflow: 'auto'}}>
                        {messagesList}
                    </Col>
                </Row>
                <Row>
                    <AddMessageFormRedux onSubmit={addNewMessage} />
                </Row>
            </Col>
        </Row>
    </>
}

export default Dialogs;