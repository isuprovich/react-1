import React, { useState } from 'react'
import { Drawer, Form, Button, Col, Row, Input, Select, Switch } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { getProfile } from '../../../redux/profileSelectors'
import { ContactsType } from '../../../types/types'

const { Option } = Select

const ProfileEditorDrawer = () => {
    const [visible, setVisible] = useState(false)
    const showDrawer = () => { setVisible(true) }
    const onClose = () => { setVisible(false) }
    const profile = useSelector(getProfile)
    console.log(profile)

    return <>
        <Button type='text' onClick={showDrawer}>
            <EditOutlined />
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
                    <Button onClick={onClose} type="primary">
                        Сохранить изменения
                    </Button>
                </div>
            }
        >
            <Form layout="vertical" hideRequiredMark initialValues={{ ...profile }}>
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
                            label="Ищу работу"
                        >
                            <Switch checked={profile?.lookingForAJob}></Switch>
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
                
                {
                    Object.keys(profile!.contacts).map(key => {
                        console.log()
                        return <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name={key}
                                    label={key}
                                >
                                    <Input placeholder={`Введите ссылку вашего ${key}`} />
                                </Form.Item>
                            </Col>
                        </Row>
                    })}
            </Form>
        </Drawer>
    </>
}

export default ProfileEditorDrawer