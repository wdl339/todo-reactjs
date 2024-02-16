
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.scss';

function Register() {
    const navigate = useNavigate()
    const [code, setCode] = useState("")
    const [isSending, setIsSending] = useState(false)

    const handleSendingCode = async () => {
        const email = document.querySelector('.txtemail').value
        const generatedCode = String(Math.floor(Math.random() * 1000000)).padEnd(6, '0')
        setCode(generatedCode)
        setIsSending(true)
        fetch('https://todo-nodejs-nu.vercel.app/api/email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email:email, code:generatedCode }),
            });
    }

    const handleRegister = () => {
        const enteredCode = document.querySelector('.txtcode').value;
        const userName = document.querySelector('.txtusername').value;
        const passWord = document.querySelector('.txtpassword').value;
        const canvasUrl = document.querySelector('.txtcanvasurl').value;
        const email = document.querySelector('.txtemail').value;
        if (enteredCode === code && userName && passWord && canvasUrl && email && isSending) {
          fetch('https://todo-nodejs-nu.vercel.app/insert-user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userName: userName, passWord: passWord, canvasUrl: canvasUrl, email: email }),
          })
            .then(response => response.json())
            .then(data => {
                if (data.error){
                    alert(data.error)
                } else {
                    console.log("注册成功")
                    navigate('/');
                }
            })
        } else {
          console.log("其他问题")
        }
      };

    return ( 
        <div className='col-12 register'>
            <h3>注册</h3>
            <br></br>
            <div className='col-6'>
                <div class="form-outline mb-4">
                    <label class="form-label username" for="form2Example1">用户</label>
                    <input name='userName' type="text" id="form2Example1" class="form-control txtusername" />
                </div>

                <div class="form-outline mb-4">
                    <label class="form-label password" for="form2Example2">密码</label>
                    <span class="question-mark" data-toggle="tooltip" data-placement="top" title="不要用你平时常用的密码,因为wdl在后台能看到">
                        <i class="fas fa-question-circle"></i>
                    </span>
                    <input name='passWord' type="password" id="form2Example2" class="form-control txtpassword" />
                </div>

                <div class="form-outline mb-4">
                    <label class="form-label canvasUrl" for="form2Example3">canvas日历订阅</label>
                    <span class="question-mark" data-toggle="tooltip" data-placement="top" title="登录canvas,进入日历视图,点击蓝色的那个“日历订阅”,复制链接">
                        <i class="fas fa-question-circle"></i>
                    </span>
                    <input name='canvasUrl' type="text" id="form2Example3" class="form-control txtcanvasurl" />
                </div>

                <div class="form-outline mb-4">
                    <label class="form-label email" for="form2Example4">邮箱</label>
                    <input name='email' type="text" id="form2Example4" class="form-control txtemail" />
                </div>

                <div class="form-outline mb-4">
                    <label class="form-label code" for="form2Example5">验证码</label>
                    <input type="text" id="form2Example5" class="form-control txtcode" />
                </div>
                
                <div className='btns-area'>
                    <button onClick={() => handleSendingCode()} class="btn btn-primary btn-block mb-4">获取验证码</button>
                    <button onClick={() => handleRegister()} class="btn btn-primary btn-block mb-4">注册</button>
                </div>
            
            </div>
        </div>
     );
}

export default Register;