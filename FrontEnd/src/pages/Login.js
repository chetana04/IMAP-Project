import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, message, Spin } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import '../resources/authentication.css'
import axios from 'axios';


// function Login() {

//     const Navigate = useNavigate();
//     const [loading, setLoading] = useState(false);
//     const onfinish = async (values) => {
//         setLoading(true);
//         try {
//             const user = await axios.post("api/login/", values);
//             setLoading(false);
//             // message.success("Login successfull");
//             localStorage.setItem('sheyresume-user', JSON.stringify(user.data));
//             Navigate('/home')
//         } catch (error) {
//             setLoading(false);
//             // message.error("Login failed");
//         }
//     };


//     // this is used because if anyone is allready register than user directly neviage to home page without regiter or login 
//     useEffect(() => {
//         if (localStorage.getItem('sheyresume-user')) {
//             Navigate('/home')
//         }
//     })

//     return (

//         <>
//             <section>

//                 <div className="auth-parent">
//                     <h1 style={{ marginRight: '90px', color: 'white', fontSize: '300%' }} >LOGIN TO TECH TONIC<br /> </h1>
//                     <Form layout='vertical' onFinish={onfinish}>
//                         <h1>Login</h1>
//                         {loading && (<Spin size='large' />)}
//                         <hr />
//                         <Form.Item name='email' label='Email'  >
//                             <Input />
//                         </Form.Item>
//                         <br />
//                         <Form.Item name='password' label='Password'  >
//                             <Input type="password" />
//                         </Form.Item>
//                         <br />

//                         <div >

//                             <Link to='/register'>
//                                 <button >
//                                     Click Here to Register
//                                 </button>
//                             </Link>
//                             <Button name='Primary' style={{ color: 'white', marginLeft: '50px' }} htmlType='submit'>
//                                 LOGIN
//                             </Button>
//                         </div>
//                     </Form>

//                 </div>
//             </section>
//         </>
//     )
// }

// export default Login;


// import React, { useEffect, useState } from 'react';
// import { Button, Form, Input, message, Spin } from 'antd';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

function Login() {
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onfinish = async (values) => {
        setLoading(true);
        try {
            const response = await axios.post("api/login/", values);
            setLoading(false);

            // Assuming the response contains the JWT token
            const { data } = response;
            localStorage.setItem('resume-user', JSON.stringify(data));

            message.success("Login successful");
            Navigate('/home');
        } catch (error) {
            setLoading(false);
            // Display error message to the user based on response status
            if (error.response) {
                const { status } = error.response;
                if (status === 401) {
                    message.error("Invalid credentials");
                } else {
                    message.error("Login failed");
                }
            } else {
                message.error("Login failed");
            }
        }
    };

    // Redirect to home if already logged in
    useEffect(() => {
        if (localStorage.getItem('resume-user')) {
            Navigate('/home');
        }
    }, [Navigate]);

    return (
        <section>
            <div className="auth-parent">
                <h1 style={{ marginRight: '90px', color: 'white', fontSize: '300%' }}>LOGIN TO TECH TONIC<br /> </h1>
                <Form layout='vertical' onFinish={onfinish}>
                    <h1>Login</h1>
                    {loading && (<Spin size='large' />)}
                    <hr />
                    <Form.Item name='email' label='Email'>
                        <Input />
                    </Form.Item>
                    <br />
                    <Form.Item name='password' label='Password'>
                        <Input type="password" />
                    </Form.Item>
                    <br />
                    <div>
                        <Link to='/register'>
                            <Button>
                                Click Here to Register
                            </Button>
                        </Link>
                        <Button type='primary' style={{ color: 'white', marginLeft: '50px' }} htmlType='submit'>
                            LOGIN
                        </Button>
                    </div>
                </Form>
            </div>
        </section>
    );
}

export default Login;
