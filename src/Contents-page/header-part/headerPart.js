import { Link, useLocation } from "react-router-dom";
import "./headerPart.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function HeaderPart() {
    const [popup, setPopup] = useState(false);
    const location = useLocation();
    const { userNameLogin, loginPassword } = location.state;
    const [datas, setDatas] = useState([]);
    const [userFullName, setUserFullName] = useState("");
    const [userFullPassword, setUserFullPassword] = useState("");
    const [userFullEmail, setUserFullEmail] = useState("");
    const [profile, setProfile] = useState(false);

    // .........................data Handling..........
    useEffect(() => {
        getData()
    }, [])
    const getData = () => {
        axios.get("http://localhost:3000/loginData").then((res) => {
            setDatas(res.data)
            // console.log(res.data)
            const user = res.data.find((item) => item.userName === userNameLogin && item.password === loginPassword);
            if (user) {
                setUserFullName(user.fullName);
                setUserFullEmail(user.email);
                setUserFullPassword(user.password);
            }
        })

    }
    const getFirstLetter = (name) => {
        return name ? name.charAt(0).toUpperCase() : "";
    };

    return (
        <>
            <div className=" flex justify-between items-center p-[10px] w-[100%] h-[12vh] bg-[#a65cce]">
                {
                    popup === true ? (
                        // popup 
                        <>
                            <div className="absolute text-center w-[200px] h-[200px] bg-[#5d5d5d] border-[2px] border-[white] text-[white] z-[3] top-[10px] right-0">

                                <div className="absolute right-[10px] top-[10px] text-[red]" onClick={() => setPopup(false)}><i className="pi pi-times"></i>
                                </div>

                                <div className="cursor-pointer pt-[30px]" onClick={() => setProfile(!profile)} >Profile<i className="pi pi-user pl-[5px]"></i>
                                </div>
                                {
                                    profile === true ? (
                                        <>
                                            <p className="pt-[10px]">{userFullName}</p>
                                            <p>{userFullEmail}</p>
                                            <p>{userFullPassword}</p>
                                        </>
                                    ) : ("")
                                }

                                <div className="cursor-pointer pt-[25px]" >
                                    <Link to="/" > Logout <i className="pi pi-sign-out pl-[5px]"></i>
                                    </Link>
                                </div>

                            </div>
                        </>
                    ) : ("")
                }

                        {/* normal content */}
                        <div>
                            <p className="text-[black] font-bold text-[30px] pl-[20px]">{userFullName}</p>
                        </div>
                        <div className="w-[50px] h-[50px]  bg-[#d9dae5] cursor-pointer rounded-[50%]" onClick={() => setPopup(true)}>
                            <span className="w-[100%px] h-[100%] flex justify-center items-center " >{getFirstLetter(userFullName)}</span>
                        </div>
            </div>
        </>
    )
}