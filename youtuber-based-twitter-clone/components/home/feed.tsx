'use client';
import React from 'react'
import { useState , useContext } from 'react'
import { BsStars } from "react-icons/bs";
import FeedBox from "./feedBox";
import Post from "../post/post";
import { TwitterContext } from "../../context/TwitterContext";


const style = {

    wrapper: "flex-[2] border-l border-r border-[#38444d]",
    header: "sticky top-0 bg-[#15202b] z-10 p-4 flex justify-between items-center",
    headerTitle: "text-xl font-bold",
}

/*
const tweets = [
  {
    displayName: "John Doe",
    username: "0x8Cd390fe2a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "Hello, this is my first tweet!",
    isProfileImageNft: false,
    timestamp: '2024-06-01T12:00:00Z',
  },
  {
    displayName: "John Doe",
    username: "0x8Cd390fe2a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "Hello, this is my first tweet!",
    isProfileImageNft: false,
    timestamp: '2024-06-01T12:00:00Z',
  },
  {
    displayName: "John Doe",
    username: "0x8Cd390fe2a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "Hello, this is my first tweet!",
    isProfileImageNft: false,
    timestamp: '2024-06-01T12:00:00Z',
  },
  {
    displayName: "John Doe",
    username: "0x8Cd390fe2a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "Hello, this is my first tweet!",
    isProfileImageNft: false,
    timestamp: '2024-06-01T12:00:00Z',
  },
  {
    displayName: "John Doe",
    username: "0x8Cd390fe2a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "Hello, this is my first tweet!",
    isProfileImageNft: false,
    timestamp: '2024-06-01T12:00:00Z',
  }
]
  */
interface Tweet {
  author: TweetAuthor
  tweet: string
  timestamp: string
}

interface TweetAuthor {
  name: string
  walletAddress: string
  profileImage: string
  isProfileImageNft: boolean
}


function Feed() {

  const { tweets } = useContext(TwitterContext); 

  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <div className={style.headerTitle}>Home</div>
          <BsStars />
        </div>

      <FeedBox />

      {tweets.map((tweeter: Tweet, index: number) => (
        <Post
          key={index}
          displayName={
            tweeter.author.name === 'Unnamed'
              ? `${tweeter.author.walletAddress.slice(
                  0,
                  4,
                )}...${tweeter.author.walletAddress.slice(41)}`
              : tweeter.author.name
          }
          userName={`${tweeter.author.walletAddress.slice(
            0,
            4,
          )}...${tweeter.author.walletAddress.slice(41)}`}
          text={tweeter.tweet}
          avatar={tweeter.author.profileImage}
          isProfileImageNft={tweeter.author.isProfileImageNft}
          timestamp={tweeter.timestamp}
        />
      ))}

    </div>
  );
}


export default Feed;