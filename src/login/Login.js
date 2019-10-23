import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import axios from "axios";
import "./Login.css";
// eslint-disable-next-line import/imports-first
import "bootstrap-css-only/css/bootstrap.min.css";
// eslint-disable-next-line import/imports-first
import "@fortawesome/fontawesome-free/css/all.min.css";

// eslint-disable-next-line no-unused-vars
export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:3001/user/login",
      data: {
        Email: email,
        Password: password
      }
    })
      .then(res => {
        // eslint-disable-next-line no-alert
        alert("Đăng nhập thành công!");
        console.log(res);
        console.log(res.data.token);
      })
      .catch(err => {
        // eslint-disable-next-line no-alert
        alert("Đăng nhập không thành công!");
        console.log(err);
      });
  }
  return (
    <div className="Login">
      <div className="titleLogin">
        <label className="titleLogin">Login</label>
      </div>
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email">
          <FormLabel>Email</FormLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel>Password</FormLabel>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button block disabled={!validateForm()} type="submit">
          Login
        </Button>
      </form>
      <div className="link">
        <a href="/register">Register</a>
      </div>
      <div className="link">
        <a href="/">Doashboard</a>
      </div>
    </div>
  );
}

// import React from 'react'
// import { Form, Icon, Input, Button, Checkbox } from 'antd';
// import { Link, Redirect } from 'react-router-dom'
// import axios from 'axios'
// class NormalLoginForm extends React.Component {
//   renderRedirect = () => {
//       return <Redirect to='/home' />
//   }
//   handleSubmit = e => {
//     e.preventDefault();
//     this.props.form.validateFields((err, values) => {
//       if (!err) {
//         axios({
//           method: 'post',
//           url: 'http://localhost:3000/user/login',
//           data: {
//             Email: values.email,
//             Password: values.password
//           }
//         })
//         .then(res=>{
//           console.log(res)
//           if(res.data){
//             this.renderRedirect()
//           }
//           else{
//             alert("tai khoan")
//           }
//         })
//         .catch(err=>{
//           console.log(err)
//         })
//       }
//     });
//   };

//   render() {
//     const { getFieldDecorator } = this.props.form;
//     return (
//       <div className="login">
//         <Form onSubmit={this.handleSubmit} className="login-form">
//         <h2>Login</h2>
//           <Form.Item>
//             {getFieldDecorator('email', {
//               rules: [{ required: true, message: 'Please input your username!' }],
//             })(
//               <Input
//                 prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
//                 placeholder="Email"
//               />,
//             )}
//           </Form.Item>
//           <Form.Item>
//             {getFieldDecorator('password', {
//               rules: [{ required: true, message: 'Please input your Password!' }],
//             })(
//               <Input
//                 prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
//                 type="password"
//                 placeholder="Password"
//               />,
//             )}
//           </Form.Item>
//           <Form.Item>
//             {getFieldDecorator('remember', {
//               valuePropName: 'checked',
//               initialValue: true,
//             })(<Checkbox>Remember me</Checkbox>)}
//             <a className="login-form-forgot" href="#">
//               Forgot password
//           </a>
//             <Button type="primary" htmlType="submit" className="login-form-button">
//               Log in
//           </Button>
//             Or
//             <Link to='/register'> register now!</Link>
//           </Form.Item>
//         </Form>
//         </div>
//     );
//   }
// }

// const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
// export default WrappedNormalLoginForm
