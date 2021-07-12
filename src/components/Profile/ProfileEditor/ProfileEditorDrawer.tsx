import { useState } from 'react'
import { Drawer, Form, Button, Col, Row, Input } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile } from '../../../redux/profileSelectors'
import { capitalizeString } from '../../../utils/capitalizeString'
import { updateProfileInfoThunk } from '../../../redux/profileReducer'
import Checkbox from 'antd/lib/checkbox/Checkbox'

const ProfileEditorDrawer = () => {
    const [visible, setVisible] = useState(false)
    const [profileEditForm] = Form.useForm()
    const [profileEditContactsForm] = Form.useForm()
    const dispatch = useDispatch()
    const showDrawer = () => { setVisible(true) }
    const onClose = () => {
        profileEditForm.resetFields()
        profileEditContactsForm.resetFields()
        setVisible(false)
    }
    const onSave = () => {
        const newInfo = {...profileEditForm.getFieldsValue(), contacts: {...profileEditContactsForm.getFieldsValue()}}
        console.log(newInfo)
        dispatch(updateProfileInfoThunk(newInfo))
        setVisible(false)
    }
    const profile = useSelector(getProfile)
    
    return <>
        <Button type='primary' onClick={showDrawer} style={{display: 'block', margin: '0 auto', marginTop: '16px'}}>
            <EditOutlined />Редактировать профиль
        </Button>
        <Drawer
            title="Редактировать профиль"
            width={420}
            onClose={onClose}
            visible={visible}
            bodyStyle={{ paddingBottom: 80 }}
            footer={
                <div
                    style={{
                        textAlign: 'right',
                    }}
                >
                    <Button onClick={onClose} style={{ marginRight: 8 }}>
                        Отмена
                    </Button>
                    <Button onClick={onSave} type={!profileEditForm.isFieldsTouched() ? 'primary' : 'ghost'}>
                        Сохранить изменения
                    </Button>
                </div>
            }
        >
            <Form form={profileEditForm} name='profileEditForm' layout="vertical" hideRequiredMark initialValues={{ ...profile }}>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="fullName"
                            label="Ваше имя"
                            rules={[{ required: true, message: 'Введите ваше имя' }]}
                        >
                            <Input placeholder="Введите ваше имя" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="lookingForAJob"
                            valuePropName="checked"
                        >
                            <Checkbox>Ищу работу</Checkbox>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="lookingForAJobDescription"
                            label="Описание"
                        >
                            <Input.TextArea rows={2} placeholder="Введите описание" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="aboutMe"
                            label="Обо мне"
                        >
                            <Input.TextArea rows={2} placeholder="Введите описание" />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <Form form={profileEditContactsForm} name='profileEditContactsForm' layout="vertical" hideRequiredMark initialValues={{ ...profile?.contacts }}>
                {Object.keys(profile!.contacts).map(contact => {
                    return (
                        <Row gutter={16} key={contact}>
                            <Col span={24}>
                                <Form.Item
                                    name={contact}
                                    label={capitalizeString(contact)}
                                >
                                    <Input placeholder={`Введите ссылку`} />
                                </Form.Item>
                            </Col>
                        </Row>
                    )
                })}
            </Form>
        </Drawer>
    </>
}

export default ProfileEditorDrawer