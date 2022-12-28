import React from 'react';
import {CenteredContent, Logo, Row, Divider, Button} from "../../utils/sharedStyles";
import Input from "../../components/Input";
import {useNavigate, Link} from "react-router-dom";
import Api from '../../config/axios';
import {toast} from "react-toastify";
import {validateEmail} from "../../utils/helpers";

function Login() {
  const [loginType, setLoginType] = React.useState(0);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      Api.setToken(token);
      navigate('/app/chat');
    }
  }, [navigate]);

  React.useEffect(() => {
    setEmail('');
    setPhone('');
    setPassword('');
  }, [loginType]);

  const login = React.useCallback(async () => {
    try {
      if (email && !validateEmail(email)) return toast.warn('Email is not valid');
      const res = await Api.post('/user/login', {email, phone, password});
      localStorage.setItem('token', res.data.token);
      Api.setToken(res.data.token);
      navigate('/app/chat')
    } catch (e) {
      toast.warn(e.response.data.message);
    }
  }, [email, phone, password, navigate]);

  const signUp = React.useCallback(async () => {
    try {
      if (!validateEmail(email)) return toast.warn('Email is not valid');
      const res = await Api.post('/user', {name, email, phone, password});
      localStorage.setItem('token', res.data.token);
      Api.setToken(res.data.token);
      navigate('/app/chat')
    } catch (e) {
      toast.warn(e.response.data.message);
    }
  }, [name, email, password, navigate]);

  return (
    <div className="container">
      <Link to="/"><Logo/></Link>
      {!loginType ?
        <CenteredContent>
          <Button onClick={() => setLoginType(1)} width={350}>Login With Phone</Button>
          <br/>
          <Button onClick={() => setLoginType(2)} width={350}>Login With Email</Button>
          <Row align="center" style={{margin: '25px 0'}}>
            <Divider/>
            <h3 style={{margin: '10px'}}>OR</h3>
            <Divider/>
          </Row>
          <Button onClick={() => setLoginType(3)} width={350}>Sign Up</Button>
        </CenteredContent>
        :
        loginType !== 3 ?
          <CenteredContent>
            <h3>Login With {loginType === 1 ? 'Phone' : 'Email'}</h3>
            {loginType === 1 ?
              <Input placeholder="Phone" type="number" value={phone} onChange={setPhone} />
              :
              <Input placeholder="Email" type="email" value={email} onChange={setEmail} />
            }
            <Input placeholder="Password" type="password" value={password} onChange={setPassword} />
            <br/><br/>
            <Button onClick={login} width={350}>Login</Button>
          </CenteredContent>
          :
          <CenteredContent>
            <h3>Sign Up</h3>
            <Input placeholder="Name" value={name} onChange={setName} />
            <Input placeholder="Email" type="email" value={email} onChange={setEmail} />
            <Input placeholder="Password" type="password" value={password} onChange={setPassword} />
            <br/><br/>
            <Button onClick={signUp} width={350}>Sign Up</Button>
          </CenteredContent>
      }
    </div>
  )
}

export default Login;
