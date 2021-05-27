import React from 'react';
import s from './Status.module.css';

class Status extends React.Component {
    state = {
        editMode: false,
        status: this.props.status
    }
    activateEditMode = () => {
        this.setState({ editMode: true })
    }
    deactivateEditMode = () => {
        this.setState({ editMode: false })
        this.props.updateStatus(this.state.status);
    }
    onStatusChange = (e) => {
        this.setState({ status: e.currentTarget.value});
    }
    componentDidUpdate(pervProps) {
        if (pervProps.status !== this.props.status) {
            this.setState({status: this.props.status})
        }
    }
    render() {
        return <>
            <div className={s.status}>
                {!this.state.editMode &&
                    <div
                        className={s.statusText}
                        onDoubleClick={this.activateEditMode}>
                        {this.props.status || 'Введите статус'}
                    </div>
                }
                {this.state.editMode &&
                    <input
                        onChange={this.onStatusChange}
                        value={this.state.status}
                        className={s.statusText}
                        autoFocus={true}
                        onBlur={this.deactivateEditMode.bind(this)}
                    />
                }
            </div>
        </>
    }
}

export default Status;