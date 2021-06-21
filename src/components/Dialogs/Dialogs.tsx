import s from './Dialogs.module.css';
import Message from './Messages/Message';
import Dialog from './Dialog/Dialog';
import { AddMessageFormRedux } from './Messages/AddMessageForm';
import {InitialStateType} from '../../redux/dialogsReducer'

type PropsType = {
    dialogsPage: InitialStateType
    sendMessage: (messageText: string) => void
}

const Dialogs: React.FC<PropsType> = (props) => {

    let dialogs = props.dialogsPage.dialogsData.map(d => <Dialog key={d.id} id={d.id} name={d.name} />);
    let messagesList = props.dialogsPage.messages.map(m => <Message message={m.message} key={m.id} id={m.id} />);

    let addNewMessage = (values: {newMessageText: string}) => {
        props.sendMessage(values.newMessageText);
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsList}>
                {dialogs}
            </div>
            <div className={s.messagesList}>
                {messagesList}
            </div>
            <AddMessageFormRedux onSubmit={addNewMessage} />
        </div>
    );
}

export default Dialogs;