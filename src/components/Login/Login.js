import GoogleLogin from 'react-google-login'
import './Login.css'
import axios from 'axios';
import history from '../../history'
const Login = () => {
  const responseGoogle = (Response) => {
   console.log(Response,"Response")
    axios.post(`${process.env.REACT_APP_URL}/signIn`, {
      email: Response.profileObj.email,
      username: Response.profileObj.name,
    }).then(res => {
      console.log("Received",res)
      localStorage.setItem("UserID",Response.profileObj.name.replace(/\s/g, ""))
      localStorage.setItem('accessToken', res.data.accessToken)   
      history.push('/');
      window.location.reload(false);
    }).catch(err => {
      console.log(err)
    })
  }

  const errorGoogle = (error) => {
    console.log(error)
  }

	return (
    <div className='Login'>
      <h1 className = 'Login__Lable'>Programming : Programming club</h1>

    <GoogleLogin 
    className = 'Login__Google'
    clientId={`${process.env.REACT_APP_API}`}
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={errorGoogle}
    cookiePolicy={'single_host_origin'}
    />
    <br></br>  <br></br>
    <p className='fontstyle'> <b>*Kindly use Daiict G-suite Account only*</b></p>
 </div>
	)
}

export default Login;