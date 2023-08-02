import React, { useEffect, useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import 'antd/dist/antd.css';
import { Tabs, Form, Button, Spin, message } from 'antd';
import PersonalInfo from '../components/PersonalInfo';
import SkillsEducation from '../components/SkillsEducation';
import ExperienceProjects from '../components/ExperienceProjects';
import axios from 'axios';

function Profile() {
    const [loading, setLoading] = useState(false);
    const user = JSON.parse(localStorage.getItem('resume-user'));

    const onFinish = async (values) => {
        setLoading(true);
        try {
            // Send a PUT request to update user data in Django backend
            const result = await axios.put('/api/update/', { ...values, _id: user._id });

            // Update the user data in localStorage with the updated data from the backend
            localStorage.setItem('resume-user', JSON.stringify(result.data));

            setLoading(false);
            message.success('Profile Updated Successfully');
        } catch (error) {
            setLoading(false);
            message.error('Update failed');
        }
    };

    return (
        <>
            <DefaultLayout>
                {loading && <Spin size='large' />}
                <div className='update-profile'>
                    <h4>
                        <b>Update Profile</b>
                    </h4>
                    <hr />
                    <Form layout='vertical' onFinish={onFinish} initialValues={user}>
                        <Tabs defaultActiveKey='1'>
                            <Tabs.TabPane tab='Personal Info' key='1'>
                                <PersonalInfo />
                            </Tabs.TabPane>
                            <Tabs.TabPane tab='Skills and Education' key='2'>
                                <SkillsEducation />
                            </Tabs.TabPane>
                            <Tabs.TabPane tab='Experience / Projects' key='3'>
                                <ExperienceProjects />
                            </Tabs.TabPane>
                        </Tabs>
                        <Button htmlType='submit'>UPDATE</Button>
                    </Form>
                </div>
            </DefaultLayout>
        </>
    );
}

export default Profile;
