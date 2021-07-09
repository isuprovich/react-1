import React, { useEffect } from 'react';
import { FilterType } from '../../redux/usersReducer';
import { useSelector } from 'react-redux';
import { getUsersSearchFilter } from '../../redux/usersSelectors';
import { Form, Input, Button, Radio, Row, Col } from 'antd';

type FriendFormType = "true" | "false" | "null"
type FormType = {
    term: string,
    friend: FriendFormType
}
type UsersSearchFormType = { onFilterChange: (filter: FilterType) => void }

export const UsersSearchForm: React.FC<UsersSearchFormType> = React.memo(({ onFilterChange }) => {
    const filter = useSelector(getUsersSearchFilter)
    const [form] = Form.useForm()
    const onFinish = (values: FormType) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === "null" ? null : values.friend === "true" ? true : false
        }
        onFilterChange(filter)
    };
    useEffect(() => { form.setFieldsValue(filter) }, [filter])
    return (
        <div>
            <Form
                name="search"
                initialValues={{ term: filter.term, friend: String(filter.friend) as FriendFormType }}
                onFinish={onFinish}
                form={form}
            >
                <Row gutter={[8, 8]} justify="center" align="middle">
                    <Col>
                        <Form.Item name="term" style={{ display: 'inline' }} shouldUpdate>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item name="friend" style={{ display: 'inline' }} shouldUpdate>
                            <Radio.Group value={filter.friend}>
                                <Radio.Button value="null">Все</Radio.Button>
                                <Radio.Button value="true">Только друзья</Radio.Button>
                                <Radio.Button value="false">Кроме друзей</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                    <Col>
                        <Button type="primary" htmlType="submit">
                            Поиск
                        </Button>
                    </Col>
                </Row>
            </Form>

        </div>
    )
})
