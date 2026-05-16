'use client'

import { TwitterContext } from "@/context/TwitterContext"
import Post from "../post/post"
import { useContext } from "react"


const style = {
  wrapper: `no-scrollbar`,
  header: `sticky top-0 bg-[#15202b] z-10 p-4 flex justify-between items-center`,
  headerTitle: `text-xl font-bold`,
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
  timestamp: string
  tweet: string
}

// interface Tweets extends Array<Tweet> {}

interface Author {
  name: string
  profileImage: string
  walletAddress: string
  isProfileImageNft: boolean
}

export default function ProfileTweets()
{
  const { currentUser , currentAccount } = useContext(TwitterContext)
  
     return (
        <div className={style.wrapper}>

            {currentUser.tweets?.map((tweet :Tweet , index : number) => (
                <Post  
                    key={index}
                    displayName={currentUser.name == 'Unnamed' ? `${currentUser.walletAddress.slice(0, 4)}...${currentUser.walletAddress.slice(-4)}` : currentUser.name}
                    userName={`${currentAccount.slice(0, 4)}...${currentAccount.slice(-4)}`}
                    avatar={currentUser.profileImage}
                    isProfileImageNft={currentUser.isProfileImageNft}
                    text={tweet.tweet}
                    timestamp={tweet.timestamp}
                />
        ))}
        </div>
    );
}