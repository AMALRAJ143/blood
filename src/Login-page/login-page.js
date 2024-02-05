import "./login-page.css";
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function LoginPage() {
  const Navigate = useNavigate();
  const [pageRoute, setPageRoute] = useState(false);


  // .....................logic for login page ..............

  //for password show & hide
  const [showPasswordLogin, setShowPasswordLogin] = useState(false);
  const togglePasswordVisibilityLogin = () => {
    setShowPasswordLogin(!showPasswordLogin);
  };

  const [userNameLogin, setUserNameLogin] = useState("");
  const [userNameErrorLogin, setUserNameErrorLogin] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [errormessage, setErrorMessage] = useState("");
  // const [loginData,setLoginData] = useState([]);

//  // ......................fetching Login data using axious ...........
//  useEffect(() => {
//   GetLoginData()
// }, [])

// const GetLoginData = () => {
//   axios.get("http://localhost:3000/loginData").then((res) => {
//     setSignupData(res.data);
//     console.log(SignupData);
//   })
// }

// const PostLoginData = () => {
//   axios.post("http://localhost:3000/loginData", { userName: userName, fullName: fullName, email: email, password: password }).then(() => {
//     GetSignupData();
//   })
// }

  const validateLoginInputs = () => {
    let isValid = true;

    // Validate User Name
    if (!userName.trim()) {
      setUserNameError('Please enter a user name.');
      isValid = false;
    }


    return isValid;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (validateLoginInputs) {
      try {
        const response = await axios.get("http://localhost:3000/loginData");
        const signupData = response.data;

        // Check if the entered credentials match any user in the signup data
        const user = signupData.find(
          (user) => user.userName === userNameLogin && user.password === loginPassword
        );
        if (user) {
          console.log('Login successful!');
          Navigate("/Contents",{state:{userNameLogin,loginPassword}}); // Redirect to the desired page on successful login
        }
        else {
          setErrorMessage("Invalid username or password.") 
          console.log('Invalid username or password.');
        }
      } catch (error) {
        console.error('Error fetching signup data:', error);
      }
    }
  };


  //  ........................logic for signup page .....................

  //for password show & hide
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [SignupData, setSignupData] = useState([]);

  const [userName, setUserName] = useState('');
  const [userNameError, setUserNameError] = useState('');

  const [fullName, setFullName] = useState('');
  const [fullNameError, setFullNameError] = useState('');

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  // ......................fetching Signup data using axious ...........
  useEffect(() => {
    GetSignupData()
  }, [])

  const GetSignupData = () => {
    axios.get("http://localhost:3000/loginData").then((res) => {
      setSignupData(res.data);
      console.log(SignupData);
    })
  }

  const PostSignupData = () => {
    axios.post("http://localhost:3000/loginData", { userName: userName, fullName: fullName, email: email, password: password }).then(() => {
      GetSignupData();
    })
  }

  const validateInputs = () => {
    let isValid = true;

    // Validate User Name
    if (!userName.trim()) {
      setUserNameError('Please enter a user name.');
      isValid = false;
    }

    // Validate Full Name
    if (!fullName.trim()) {
      setFullNameError('Please enter your full name.');
      isValid = false;
    }

    // Validate Password
    if (!password.trim()) {
      setPasswordError('Please enter a password.');
      isValid = false;
    }

    // Validate Confirm Password
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
      isValid = false;
    }

    return isValid;
  };

  //submit handling
  const handleSubmit = (e) => {
    if (validateInputs()) {
      console.log('Form submitted successfully!');
      PostSignupData();
      Navigate("/")
    }
    else {
      e.preventDefault();
    }
  };


  return (
    <>
      {
        pageRoute === true ? (
          <>

            {/* ..........................SignUpPage........................ */}

            <div className="w-[100%] h-[100vh] flex justify-center items-center bg-[#fafafc]">
              <form className="grid justify-center items-center w-[500px] h-[520px] bg-[#d9dae5]" onSubmit={handleSubmit}>

                <h1 className="text-center text-[#a65cce] text-[45px] font-bold">Register</h1>

                <div className="w-[400px] h-[40px] ">
                  <input
                    type="text"
                    placeholder="User Name"
                    value={userName}
                    onChange={(e) => {
                      setUserName(e.target.value);
                      setUserNameError('');
                    }}
                    className={`text-[#a65cce] w-[95%] h-[40px] indent-[20px] rounded-[8px] ${userNameError ? 'border-red-500' : ''}`}
                  />
                  {userNameError && <p className="text-red-500 text-sm">{userNameError}</p>}
                </div>

                <div className="w-[400px] h-[40px] ">
                  <input
                    type="text"
                    placeholder="Enter your Name"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      setFullNameError('');
                    }}
                    className={`text-[#a65cce] w-[95%] h-[40px] indent-[20px] rounded-[8px] ${fullNameError ? 'border-red-500' : ''}`}
                  />
                  {fullNameError && <p className="text-red-500 text-sm">{fullNameError}</p>}
                </div>

                <div className="w-[400px] h-[40px] ">
                  <input
                    type="email"
                    placeholder="Enter your Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError('');
                    }}
                    className={`text-[#a65cce] w-[95%] h-[40px] indent-[20px] rounded-[8px] ${emailError ? 'border-red-500' : ''}`}
                  />
                  {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                </div>


                <div className="w-[400px] h-[40px] relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError('');
                    }}
                    className={`text-[#a65cce] relative w-[95%] h-[40px] indent-[20px] rounded-[8px] ${passwordError ? 'border-red-500' : ''}`}
                  />
                  <button
                    type="button"
                    className="w-[40px] h-[24px] bg-[#d9dae5] rounded-[8px] border-none"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <i className="pi pi-eye absolute right-[30px] top-[12px] text-[#a65cce]"></i>
                    ) : (
                      <i className="pi pi-eye-slash absolute right-[30px] top-[12px] text-[#a65cce]"></i>
                    )}
                  </button>
                  {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                </div>

                <div className="w-[400px] h-[40px] relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setConfirmPasswordError('');
                    }}
                    className={`text-[#a65cce] relative w-[95%] h-[40px] indent-[20px] rounded-[8px] ${confirmPasswordError ? 'top-[0] border-red-500' : ''}`}
                  />
                  <button
                    type="button"
                    className="w-[40px] h-[24px] bg-[#d9dae5] rounded-[8px] border-none"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <i className="pi pi-eye absolute right-[30px] top-[12px] text-[#a65cce]"></i>
                    ) : (
                      <i className="pi pi-eye-slash absolute right-[30px] top-[12px] text-[#a65cce]"></i>
                    )}
                  </button>
                  {confirmPasswordError && <p className="text-red-500 absolute top-[37px] text-sm">{confirmPasswordError}</p>}
                </div>

                <div className="flex justify-center items-center gap-[10px]">
                  <button
                    type="submit"
                    className="w-[50%] h-[40px] bg-[#a65cce] text-[white] hover:bg-[white] hover:text-[#a65cce] hover:border-[#a65cce] hover:border-[2px] rounded-[50px]"
                  >
                    Submit
                  </button>
                  {errormessage && <p className="text-red-500 text-sm">{errormessage}</p>}
                </div>

                <p className='text-center'>Already Have an Account ?<span className='text-[blue] cursor-pointer' onClick={() => setPageRoute(false)}> Login</span></p>
              </form>
            </div>

          </>
        ) : (
          <>

            {/* ........................................LoginPage................................... */}

            <div className="w-[100%] h-[100vh] flex justify-center items-center bg-[#fafafc]">

              <form onSubmit={handleLoginSubmit} className="grid justify-center items-center w-[500px] h-[360px] bg-[#d9dae5]" >

                <h1 className="text-center text-[#a65cce] text-[45px] font-bold">Login </h1>

                <div className="w-[400px] h-[40px] ">
                  <input
                    type="text"
                    placeholder="User Name"
                    value={userNameLogin}
                    onChange={(e) => {
                      setUserNameLogin(e.target.value);
                      setUserNameErrorLogin('');
                    }}
                    className={`text-[#a65cce] w-[95%] h-[40px] indent-[20px] rounded-[8px] ${userNameErrorLogin ? 'border-red-500' : ''}`}
                  />
                  {userNameErrorLogin && <p className="text-red-500 text-sm">{userNameErrorLogin}</p>}
                </div>

                <div className="w-[400px] h-[40px] relative">
                  <input
                    value={loginPassword}
                    onChange={(e) => {
                      setLoginPassword(e.target.value);
                    }}
                    type={showPasswordLogin ? 'text' : 'password'}
                    placeholder="Password"
                    className="text-[#a65cce] relative w-[95%] h-[40px] indent-[20px] rounded-[8px]"
                  />
                  <button
                    type="button"
                    className=" w-[40px] h-[24px] bg-[#d9dae5] rounded-[8px] border-none"
                    onClick={togglePasswordVisibilityLogin}
                  >
                    {showPassword ? (
                      <i className="pi pi-eye absolute right-[30px] top-[12px] text-[#a65cce]"></i>
                    ) : (
                      <i className="pi pi-eye-slash absolute right-[30px] top-[12px] text-[#a65cce]"></i>
                    )}
                  </button>
                </div>

                <div className="flex justify-center relative items-center gap-[0px]">
                  <button
                    type="submit"
                    className="w-[50%] h-[40px] bg-[#a65cce] text-[white] hover:bg-[white] hover:text-[#a65cce] hover:border-[#a65cce] hover:border-[2px] rounded-[50px]"
                  >
                    Login
                  </button>
                  {errormessage && <p className="text-red-500 absolute top-[-20px] text-sm">{errormessage}</p>}
                </div>


                <div className="text-center ">
                  don't Have an Account ?  <span className="text-[blue] cursor-pointer " onClick={() => setPageRoute(true)} >Signup</span>
                </div>
              </form>
            </div>
          </>
        )
      }
    </>
  )
}
