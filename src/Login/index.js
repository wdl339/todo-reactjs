
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.scss';

function Login({setIsLoggedIn}) {
    const navigate = useNavigate()

    const handleSignIn = async () => {
        const userName = document.querySelector('.txtusername').value
        const passWord = document.querySelector('.txtpassword').value
    
        const response = await fetch('https://todo-nodejs-nu.vercel.app/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userName:userName, passWord:passWord }),
            });

            if (response.ok) {
                const { token } = await response.json();
                console.log('Token:', token);
                localStorage.setItem('token', token);
                setIsLoggedIn(true);
                navigate('/task');
            } else {
                console.log('登录失败');
            }
    }

    const loginButtonRef = useRef(null)
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          loginButtonRef.current.click();
        }
      };

    return ( 
        <div className='col-12 login'>
            <h3>登录</h3><br></br>
            <form method='POST' action='https://todo-nodejs-nu.vercel.app/insert-user' className='col-6' onKeyPress={handleKeyPress}>
                <div class="form-outline mb-4">
                    <label class="form-label username" for="form2Example1">用户</label>
                    <input name='userName' type="text" id="form2Example1" class="form-control txtusername" />
                </div>

                <div class="form-outline mb-4">
                    <label class="form-label password" for="form2Example2">密码</label>
                    <input name='passWord' type="password" id="form2Example2" class="form-control txtpassword" />
                </div>
                
                <div className='btns-area'>
                    <button type="submit" class="btn btn-primary btn-block mb-4">注册</button>
                    <button type="button" ref={loginButtonRef} onClick={() => handleSignIn()} class="btn btn-primary btn-block mb-4">登录</button>
                </div>
                
            
            </form>
        </div>
     );
}

export default Login;