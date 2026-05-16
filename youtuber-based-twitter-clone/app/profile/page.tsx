import ProfileHeader from "@/components/profile/profileHeader";
import ProfileTweets from "@/components/profile/profileTweets";
import SideBar from "@/components/sideBar";
import Widget from "@/components/widgets/Widget";

const style = {
  wrapper: `flex justify-center h-screen w-screen select-none bg-[#15202b] text-white`,
  content: `max-w-[1400px] w-2/3 flex justify-between`,
  mainContent: `flex-[2] border-r border-l border-[#38444d] overflow-y-scroll`,
}


export default function Profile() {
  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <SideBar InitialSelectedIcon ={'Profile'} />
        <div className={style.mainContent}>
          <ProfileHeader />
          <ProfileTweets />
        </div>
        <Widget />
      </div>
    </div>
  )
}