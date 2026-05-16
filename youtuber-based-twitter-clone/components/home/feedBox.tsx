"use client"
import React from 'react'
import { useState , useContext } from 'react'
import  Image  from 'next/image'
import { BsCardImage,BsEmojiSmile, } from "react-icons/bs";
import { RiFileGifLine , RiBarChartHorizontalFill } from 'react-icons/ri';
import { IoMdCalendar } from 'react-icons/io';
import { MdOutlineLocationOn } from 'react-icons/md';
import { client } from '../../lib/client';
import { TwitterContext } from '../../context/TwitterContext';


import { ethers } from 'ethers'
import { TweetcontractAddress, TweetcontractABI } from '../../lib/tweetConstants';
declare let window: any;
let metamask: any;
if (typeof window !== 'undefined') {
  metamask = window.ethereum
}



const style = {
    wrapper: 'px-4 flex flex-row border-b border-[#38444d] pb-4',
    tweetBoxLeft: 'mr-4',
    tweetBoxRight: 'flex-1',
    profileImage: 'w-12 h-12 rounded-full',
    inputField: 'bg-transparent outline-none text-lg w-full h-full',
    formLowerContainer: 'flex',
    iconsContainer: 'text-[#1d9bf0] flex flex-1 items-center',
    icon: 'mr-2',
    SubmitGeneral: 'px-4 py-2 rounded-3xl font-bold',
    SubmitActive: 'bg-[#1d9bf0] text-white',
    SubmitInactive: 'bg-[#196195] text-[#95999e]',
}


function FeedBox() {

    const [tweetMessage, setTweetMessage] = useState("");
    const { currentAccount , currentUser , tweets } = useContext(TwitterContext);

    const uploadToBlockchain = async (status: string) => {
        try {

            if(!metamask) return console.log("No wallet found");
            const provider = new ethers.BrowserProvider(metamask);
            const signer = await provider.getSigner();
            const statusContract = new ethers.Contract(TweetcontractAddress,TweetcontractABI,signer)
            console.log("Initializing Blockchain transaction...");
            const transaction = await statusContract.setStatus(status);
            await transaction.wait(); 
            console.log("Blockchain Sync Complete:", transaction.hash);
        } catch (error) {
            console.error("Blockchain Error:", error);
        }
    }


    const postTweet = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Tweeted: ", tweetMessage);

        if (!tweetMessage) return;

        try {
            await uploadToBlockchain(tweetMessage);
        }
        catch(e){
            console.error("Transaction failed:", e);
        }

        const tweetId = `${currentAccount}_${Date.now()}`;

        const tweetdoc = {
            _type: 'tweets',
            _id: tweetId,
            tweet: tweetMessage,
             timestamp: new Date(Date.now()).toISOString(),
             author: {
                _key: tweetId,
                _type: 'reference',
                _ref: currentAccount,
             },
        }

        await client.createIfNotExists(tweetdoc);
        await client
      .patch(currentAccount)
      .setIfMissing({ tweets: [] })
      .insert('after', 'tweets[-1]', [
        {
          _key: tweetId,
          _ref: tweetId,
          _type: 'reference',
        },
      ])
      .commit()

    setTweetMessage("");
    }

    return (
        <div className={style.wrapper}>
            <div className={style.tweetBoxLeft}>
                <img src={currentUser.profileImage} alt="profile" className={currentUser.isProfileImageNft ? `${style.profileImage} smallHex` : style.profileImage} width={48} height={48} />
            </div>
            <div className={style.tweetBoxRight}>
                <form>  {/*onSubmit={postTweet} */}
                    <textarea 
                    className={style.inputField} 
                    placeholder="What's Happening?" 
                    value={tweetMessage} 
                    onChange={(e) => setTweetMessage(e.target.value)} />

                    <div className={style.formLowerContainer}>
                        <div className={style.iconsContainer}>
                            <BsCardImage className={style.icon} />
                            <RiFileGifLine className={style.icon} />
                            <RiBarChartHorizontalFill className={style.icon} />
                            <BsEmojiSmile className={style.icon} />
                            <IoMdCalendar className={style.icon} />
                            <MdOutlineLocationOn className={style.icon} />
                        </div>
                        <button className={`${style.SubmitGeneral} ${tweetMessage ? style.SubmitActive : style.SubmitInactive}`} onClick={(e) => postTweet(e)}>
                            Tweet
                        </button>
                    </div>
                    
                </form>
            </div>
        </div>
    );
}

export default FeedBox;