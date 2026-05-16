"use client";

import { useRouter, useSearchParams , usePathname } from 'next/navigation';
import { VscTwitter } from "react-icons/vsc";
import SideBarOption from "./sideBarOption";
import React, { useState, useContext } from "react";
import { TwitterContext } from '../context/TwitterContext'
import { RiHome7Line, RiHome7Fill, RiFileList2Fill } from "react-icons/ri";
import { BiHash } from "react-icons/bi";
import { FiBell, FiMoreHorizontal } from "react-icons/fi";
import { HiOutlineMail, HiMail } from "react-icons/hi";
import { BsBookmark, BsBookmarkFill, BsPerson, BsPersonFill } from "react-icons/bs";
import { FaRegListAlt, FaHashtag, FaBell } from "react-icons/fa";
import { CgMore } from "react-icons/cg";
import { customStyles } from '../lib/constants';
import Modal from 'react-modal'; 
import  ProfileImageMinter  from './mintingModel/ProfileImageMinter';



const style = {
    wrapper: 'flex-[0.7] px-8 flex flex-col',
    twitterIconContainer: 'text-3xl m-4',
    tweetButton: 'bg-[#1d9bf0] hover:bg-[#1b8cd8] flex items-center justify-center rounded-3xl font-bold h-[50px] mt-[20px] cursor-pointer',
    navContainer: 'flex-1',
    profileButton: 'flex items-center mb-6 cursor-pointer hover:bg-[#333c45] rounded-3xl p-2',
    profileLeft: 'flex items-center justify-center mr-4',
    profileImage: 'h-12 w-12 rounded-full',
    profileRight: 'flex-1 flex',
    details: 'flex-1',
    name: 'text-lg font-bold',
    handle: 'text-[#8899a6]',
    moreContainer: 'flex items-center mr-2',
}



export default function SideBar({InitialSelectedIcon = 'Home'}: {InitialSelectedIcon: string}) {

    const [selected, setSelected] = useState(InitialSelectedIcon);
    const { currentAccount, currentUser } = useContext(TwitterContext)
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const isMinting = searchParams.get('mint');

    return (
        <div className={style.wrapper}>
            <div className={style.twitterIconContainer}>
                <VscTwitter />
            </div>
            
            <div className={style.navContainer}>
                <SideBarOption text="Home" Icon={selected == 'Home' ? RiHome7Fill : RiHome7Line} isActive={Boolean(selected == 'Home')} setSelected={setSelected} redirect="/"/>
                <SideBarOption text="Explore" Icon={selected == 'Explore' ? FaHashtag : BiHash} isActive={Boolean(selected == 'Explore')} setSelected={setSelected} redirect="/" />
                <SideBarOption text="Notification" Icon={selected == 'Notification' ? FaBell : FiBell} isActive={Boolean(selected == 'Notification')} setSelected={setSelected} redirect="/"/>
                <SideBarOption text="Messages" Icon={selected == 'Messages' ? HiMail : HiOutlineMail} isActive={Boolean(selected == 'Messages')} setSelected={setSelected}  redirect="/"/>
                <SideBarOption text="Bookmarks" Icon={selected == 'Bookmarks' ? BsBookmarkFill : BsBookmark} isActive={Boolean(selected == 'Bookmarks')} setSelected={setSelected} redirect="/" />
                <SideBarOption text="Lists" Icon={selected == 'Lists' ? RiFileList2Fill : FaRegListAlt} isActive={Boolean(selected == 'Lists')} setSelected={setSelected} redirect="/" />
                <SideBarOption text="Profile" Icon={selected == 'Profile' ? BsPersonFill : BsPerson} isActive={Boolean(selected == 'Profile')} setSelected={setSelected} redirect="/profile" />
                <SideBarOption text="More" Icon={CgMore} isActive={Boolean(selected == 'More')} setSelected={setSelected} redirect="/" />

                

            <div onClick={() => router.push(`${pathname}/?mint=${currentAccount}`)} className={style.tweetButton}>Mint</div>
            

            </div>

            <div className={style.profileButton}>
                <div className={style.profileLeft}>
                  <img
                    src={currentUser.profileImage}
                    alt='profile'
                    className={
                      currentUser.isProfileImageNft
                        ? `${style.profileImage} smallHex`
                        : style.profileImage
                    }
                  />
                </div>
                <div className={style.profileRight}>
                  <div className={style.details}>
                    <div className={style.name}>{currentUser.name}</div>
                    <div className={style.handle}>
                      @{currentAccount.slice(0, 6)}...{currentAccount.slice(39)}
                    </div>
                  </div>
                  <div className={style.moreContainer}>
                    <FiMoreHorizontal />
                  </div>
                </div>
            </div>
            
            {/* <div className={style.profileButton}>
                <div className={style.profileLeft}>
                    <img className={currentUser.isProfileImageNft ? `${style.profileImage} smallHex` : style.profileImage} src="https://avatars.githubusercontent.com/u/17177659?s=280&v=4" alt="Profile" />
                </div>
                <div className={style.profileRight}>
                    <div className={style.name}>{currentUser.name}</div>
                    <div className={style.handle}>
                        @{currentAccount.slice(0, 6)}...{currentAccount.slice(39)}
                    </div>
                    <div className={style.moreContainer}>
                        <FiMoreHorizontal />
                    </div>
                </div>
            </div> */}

            <Modal
            isOpen={Boolean(isMinting)}
            onRequestClose={() => router.back()}
            style={customStyles}>

                <ProfileImageMinter />
            </Modal>
            
        </div>
    );
}