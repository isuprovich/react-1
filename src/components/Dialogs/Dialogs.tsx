import s from './Dialogs.module.css';
import Message from './Messages/Message';
import Dialog from './Dialog/Dialog';
import { AddMessageFormRedux } from './Messages/AddMessageForm';
import {InitialStateType} from '../../redux/dialogsReducer'
import {Row, Col} from 'antd'

type PropsType = {
    dialogsPage: InitialStateType
    sendMessage: (messageText: string) => void
}

const Dialogs: React.FC<PropsType> = (props) => {

    const dialogs = props.dialogsPage.dialogsData.map(d => <Dialog key={d.id} id={d.id} name={d.name} />);
    const messagesList = props.dialogsPage.messages.map(m => <Message message={m.message} key={m.id} id={m.id} />);

    const addNewMessage = (values: {newMessageText: string}) => {
        props.sendMessage(values.newMessageText);
    }

    return <>
        <Row style={{height: '80%'}}>
            <Col>
                {dialogs}
            </Col>
            <Col flex={'auto'} style={{ width: 'avilable', height: 'avilable'}}>
                        {messagesList}
            </Col>
        </Row>
        <Row>
            <AddMessageFormRedux onSubmit={addNewMessage} />
        </Row>
    </>
}

export default Dialogs;