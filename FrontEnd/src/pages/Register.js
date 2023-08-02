// import React, { useState, useEffect } from 'react';
// import { Button, Form, Input, Spin } from 'antd';
// import '../resources/authentication.css'
// // import { Link } from '@mui/icons-material';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { message } from 'antd';
// function Register() {
//     const [loading, setLoading] = useState(false);
//     const Navigate = useNavigate();
//     const onfinish = async (values) => {
//         setLoading(true);
//         try {
//             await axios.post("api/register/", values);
//             setLoading(false);
//             message.success("Registration successfull");
//         } catch (error) {
//             setLoading(false);
//             message.error("Registration failed");
//         }
//     };



//     // this is used because if anyone is allready register than user directly neviage to home page without regiter or login
//     useEffect(() => {
//         if (localStorage.getItem('resume-user')) {
//             Navigate('/home')
//         }
//     })




//     return (

//         <div className="auth-parent">
//             {loading && (<Spin size='large' />)}

//             <h1 style={{ marginRight: '90px', color: 'white', fontSize: '300%' }} >REGISTER TO TECH <br /> TONIC</h1>

//             <Form layout='vertical' onFinish={onfinish}>
//                 <h1>REGISTER</h1>
//                 <hr />

//                 <Form.Item name='email' label='email'  >
//                     <Input />
//                 </Form.Item>
//                 <Form.Item name='Name' label='name'  >
//                     <Input />
//                 </Form.Item>
//                 <br />
//                 <Form.Item name='password' label='Password'  >
//                     <Input type='password' />
//                 </Form.Item>
//                 <br />
//                 {/* <Form.Item name='cpassword' label='Confirm Password'  >
//                     <Input type='password' />
//                 </Form.Item> */}
//                 <br />
//                 <div className="d-fles align-items-center justify-content-between" >
//                     <Link to='/login'>
//                         <Button style={{ color: "white" }}>

//                             Click Here to Login
//                         </Button>
//                     </Link>
//                     <Button onClick={() => Navigate("/home")} style={{ color: 'white', marginLeft: '50px' }} name='Primary' htmlType='submit'>
//                         REGISTER
//                     </Button>
//                 </div>

//                 {/* <Button type='primary' htmlType='submit'>
//                     Register
//                 </Button> */}
//             </Form>

//         </div>
//     )
// }

// export default Register



import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Spin } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { message } from 'antd';

function Register() {
    const [loading, setLoading] = useState(false);
    const Navigate = useNavigate();

    const onfinish = async (values) => {
        setLoading(true);
        try {
            await axios.post("api/register/", values);
            setLoading(false);
            message.success("Registration successful");
        } catch (error) {
            setLoading(false);
            if (error.response) {
                const { data } = error.response;
                // Assuming the API returns a dictionary with field-specific errors
                for (const field in data) {
                    message.error(data[field][0]);
                }
            } else {
                message.error("Registration failed");
            }
        }
    };

    useEffect(() => {
        if (localStorage.getItem('resume-user')) {
            Navigate('/home');
        }
    }, [Navigate]);

    return (
        <div className="auth-parent">
            {loading && (<Spin size='large' />)}

            <h1 style={{ marginRight: '90px', color: 'white', fontSize: '300%' }} >REGISTER TO TECH <br /> TONIC</h1>

            <Form layout='vertical' onFinish={onfinish}>
                <h1>REGISTER</h1>
                <hr />
                <Form.Item name='email' label='email' rules={[{ required: true, message: 'Please enter your email' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name='name' label='name' rules={[{ required: true, message: 'Please enter your name' }]}>
                    <Input />
                </Form.Item>
                <br />
                <Form.Item name='password' label='password' rules={[{ required: true, message: 'Please enter your password' }]}>
                    <Input type='password' />
                </Form.Item>
                <br />
                <Form.Item name='cpassword' label='Confirm Password' rules={[
                    { required: true, message: 'Please confirm your password' },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject('Passwords do not match');
                        },
                    }),
                ]}>
                    <Input type='password' />
                </Form.Item>
                <br />
                <div className="d-flex align-items-center justify-content-between" >
                    <Link to='/login'>
                        <Button style={{ color: "white" }}>
                            Click Here to Login
                        </Button>
                    </Link>
                    <Button type='primary' htmlType='submit' style={{ color: 'white', marginLeft: '50px' }}>
                        REGISTER
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default Register;

