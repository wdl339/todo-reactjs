
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/register.scss';

function Register() {
    const navigate = useNavigate()
    const [code, setCode] = useState("")
    const [isSending, setIsSending] = useState(false)
    const [isChecked, setIsChecked] = useState(false)

    const handleSendingCode = async () => {
        const email = document.querySelector('.txtemail').value
        if (email){
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
    }

    const handleRegister = () => {
        const enteredCode = document.querySelector('.txtcode').value;
        const userName = document.querySelector('.txtusername').value;
        const passWord = document.querySelector('.txtpassword').value;
        const canvasUrl = document.querySelector('.txtcanvasurl').value;
        const email = document.querySelector('.txtemail').value;
        if (enteredCode === code && userName && passWord && canvasUrl && email && isSending && isChecked) {
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
            <div className='col-9'>
                <div class="form-outline mb-4">
                    <label class="form-label username" for="form2Example1">用户</label>
                    <input name='userName' type="text" id="form2Example1" class="form-control txtusername" />
                </div>

                <div class="form-outline mb-4">
                    <label class="form-label password" for="form2Example2">密码</label>
                    <i class="fas fa-question-circle" data-bs-toggle="modal" data-bs-target="#passwordModal"></i>
                    <input name='passWord' type="password" id="form2Example2" class="form-control txtpassword" />
                </div>

                <div class="modal fade" id="passwordModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">温馨提示</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            尽量不要用你平时常用的密码，因为我不太能保证网站的安全性
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">我知道了</button>
                        </div>
                        </div>
                    </div>
                </div>

                <div class="form-outline mb-4">
                    <label class="form-label canvasUrl" for="form2Example3">canvas日历订阅</label>
                        <i class="fas fa-question-circle" data-bs-toggle="modal" data-bs-target="#canvasModal"></i>
                    <input name='canvasUrl' type="text" id="form2Example3" class="form-control txtcanvasurl" />
                </div>

                <div class="modal fade" id="canvasModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">如何订阅canvas日历?</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            登录canvas ，进入日历视图，点击蓝色的那个“日历订阅”，复制链接到这里来
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">我知道了</button>
                        </div>
                        </div>
                    </div>
                </div>

                <div class="form-outline mb-4">
                    <label class="form-label email" for="form2Example4">邮箱</label>
                    <input name='email' type="text" id="form2Example4" class="form-control txtemail" />
                </div>

                <div class="form-outline mb-4">
                    <label class="form-label code" for="form2Example5">验证码</label>
                    <input type="text" id="form2Example5" class="form-control txtcode" />
                </div>

                <div class="row mb-4">
                    <div class="col d-flex justify-content-center">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" checked={isChecked}  onChange={() => setIsChecked(!isChecked)}/>
                            <label class="form-check-label"> 我已阅读 </label> 
                            <span className="highlight" data-bs-toggle="modal" data-bs-target="#detailModal">说明书</span>
                        </div>
                    </div>
                </div>

                <div class="modal fade" id="detailModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">说明书</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>1. 同步canvas任务和同步教务处通知，点击按钮后，请等待界面提示同步成功。</p>
                            <p>2. 请不要太频繁地使用同步教务处通知的功能。</p>
                            <p>3. 同步教务处通知时，会添加教务处最新的10条通知。不会重复添加，但如果你删掉过这10条之一的通知，它也会再被添加上。
                                因此，建议使用“仅保留最近10条未精选记录”功能，以免重复添加。
                            </p>
                            <p>4. 点击任务/记录标题可以进入详情页面。刚同步的教务处通知的细节部分是有所省略的，可以点击“更新”按钮来获取完整内容。</p>
                            <p>5. 一切解释权归wdl同学所有。</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">我知道了</button>
                        </div>
                        </div>
                    </div>
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