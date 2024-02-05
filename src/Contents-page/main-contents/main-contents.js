import { useEffect, useState } from "react";
import "./main-contents.css";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function MainContents() {
  const [todoInput, setTodoInput] = useState(false);
  const location = useLocation();
  const { userNameLogin, loginPassword } = location.state;
  const [doo, setDoo] = useState("");
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get("http://localhost:3000/loginData").then((res) => {
      setDatas(res.data);
    });
  };

  const todoSubmit = () => {
    const currentDate = new Date();
    const date = `${currentDate.getDate()}|${currentDate.getMonth() + 1}|${currentDate.getFullYear()}`;
    const newTodo = { doo: doo, date: date };
    setTodos([...todos, newTodo]);
    setDoo("");
    setTodoInput(false);
  };

  const todoComplete = (index) => {
    const completedTodo = todos[index];
    setCompletedTodos([...completedTodos, completedTodo]);
    setTodos((prevTodos) => prevTodos.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="relative w-[85%] h-[88vh] bg-[#5d5d5d]">
        <div className="p-[40px] w-[100%] h-[8vh] flex justify-end items-center">
          <span className="flex justify-center items-center w-[100px] h-[50px] text-[white] bg-[#a65cce] cursor-pointer" onClick={() => setTodoInput(true)}>
            <i className="pi pi-plus pr-[5px]"></i>Add
          </span>
        </div>
        {todoInput === true ? (
          <>
            {/* todo input box  */}
            <div className="todoo z-[3] w-[400px] h-[120px] bg-[#5d5d5d] border-[#a65cce] border-[2px]">
              <div className="text-center mt-[40px]">
                <span className="absolute top-[5px] right-[10px] cursor-pointer text-[white]" onClick={() => setTodoInput(false)}>
                  <i className="pi pi-times"></i>
                </span>
                <input type="text" placeholder="Enter todo" className="p-[10px] in bg-[#aaa5a5] rounded-[8px]" onChange={(e) => setDoo(e.target.value)} />
                <button className="w-[100px] ml-[5px] h-[50px] text-[white] bg-[#a65cce] border-[#a65cce] border-[2px] rounded-[8px]" onClick={todoSubmit}>
                  Done
                </button>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
        <div className="w-[100%] h-[70vh] flex justify-around items-center ">
          <div className="w-[350px] h-[450px] bg-[#7f7f7f93]">
            <h2 className="p-[15px] text-center font-bold text-[white]">History</h2>
          </div>
          <div className="w-[350px] h-[450px] bg-[#7f7f7f93] text-[white]">
            <h2 className="p-[15px] text-center font-bold text-[white]">To-Do</h2>
            {todos.map((todo, index) => (
              <div key={index} className="w-[90%] m-auto flex justify-between mb-[10px] bg-[#a8a5a5] items-center p-[10px]">
                <span>{todo.date}</span>
                <span>{todo.doo}</span>
                <input type="checkbox" onClick={() => todoComplete(index)} className="accent-[green]" />
              </div>
            ))}
          </div>
          <div className="w-[350px] h-[450px] bg-[#7f7f7f93] text-[white]">
            <h2 className="p-[15px] text-center font-bold text-[white]">Complete</h2>
            {completedTodos.map((completedTodo, index) => (
              <div key={index} className="w-[90%] m-auto flex justify-between mb-[10px] bg-[#a8a5a5] items-center p-[10px]">
                <span>{completedTodo.date}</span>
                <span>{completedTodo.doo}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
