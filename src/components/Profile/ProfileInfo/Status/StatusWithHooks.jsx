import React, { useEffect, useState } from 'react';
import s from './Status.module.css';

const StatusWithHooks = (props) => {

    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    const activateEditMode = () => {
        setEditMode(true);
    }
    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status)
    }
    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }

    return <>
        <div className={s.status}>
            {!editMode && <div
                className={s.statusText}
                onDoubleClick={activateEditMode}
            >{props.status || 'Введите статус'}</div>
            }
            {editMode &&
                <input
                    onChange={onStatusChange}
                    value={status}
                    className={s.statusText}
                    autoFocus={true}
                    onBlur={deactivateEditMode}
                />
            }
        </div>
    </>
}

export default StatusWithHooks;