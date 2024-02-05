import "./contentsPage.css";
import Header from "./header-part/headerPart";
import MainContents from "./main-contents/main-contents";
import SideBarPart from "./sidebarPart/sidebarPart";

export default function ContentṣPage(){
    return(
        <>
        <Header></Header>
        <div className="flex">
        <SideBarPart></SideBarPart>
        <MainContents/>
        </div>
        
        </>
    )
}