import React from 'react';
import s from './Status.module.css';

class Status extends React.Component {
    state = {
        editMode: false,
        status: this.props.status
    }
    activateEditMode = () => {
        this.setState({ editMode: true })
        console.log('Edit status mode')
    }
    deactivateEditMode = () => {
        this.setState({ editMode: false })
        this.props.updateStatus(this.state.status);
        console.log('Save status')
    }
    onStatusChange = (e) => {
        this.setState({ status: e.currentTarget.value});
        console.log('On status change')
    }
    componentDidUpdate(pervProps) {
        if (pervProps.status !== this.props.status) {
            this.setState({status: this.props.status})
            console.log('status did update')
        }
    }
    render() {
        console.log('render status')
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