'use client'

import { createContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { client } from '../lib/client'

export const TwitterContext = createContext()

export const TwitterProvider = ({ children }) => {
  const [appStatus, setAppStatus] = useState('loading') // Set initial to loading
  const [currentAccount, setCurrentAccount] = useState('')
  const [tweets, setTweets] = useState([])
  const [currentUser, setCurrentUser] = useState({})
  const router = useRouter()

  const createUserAccount = async (userWalletAddress = currentAccount) => 
  {
    if(!window.ethereum) return setAppStatus('noMetaMask')

    try
    {
      const userDoc = {
        _type: 'users',
        _id: userWalletAddress,
        name: 'Unnamed',
        isProfileImageNft: false,
        profileImage: 'https://i.imgur.com/6VBx3io.png',
        walletAddress: userWalletAddress
      }

      await client.createIfNotExists(userDoc)
    }
    catch(err)
    {
      router.push('/')
      setAppStatus('error')
      console.log(err)
    }

  }

  
  const fetchTweets = async () => {
      const query = `*[_type == "tweets"]{
        "author": author->{name, walletAddress, profileImage, isProfileImageNft},
        tweet,
        timestamp
      }|order(timestamp desc)`
      const sanityResponse = await client.fetch(query)
      console.log(sanityResponse)
      setTweets([])
      sanityResponse.forEach(async (items) => {
        const profileImageUrl = await getNftProfileImage(items.author.profileImage, items.author.isProfileImageNft);
        if (items.author.isProfileImageNft) {
          const newItem = {
            tweet: items.tweet,
            timestamp: items.timestamp,
            author: {
              name: items.author.name,
              walletAddress: items.author.walletAddress,
              profileImage: profileImageUrl,
              isProfileImageNft: items.author.isProfileImageNft,
            },
          }

          setTweets(prevState => [...prevState, newItem])
        } else {
          setTweets(prevState => [...prevState, items])
        }
        /*
        const newItem = {
          tweet: items.tweet,
          timestamp: items.timestamp,
          author: {
            name: items.author.name,
            walletAddress: items.author.walletAddress,
            profileImage: profileImageUrl,
            isProfileImageNft: items.author.isProfileImageNft,
          }
        }
        setTweets((prevTweets) => [...prevTweets, newItem])
        */
    })
      
  }

  const getNftProfileImage = async (imageUri, isNft) => {
    if (isNft) {
      return `https://ivory-rational-bat-614.mypinata.cloud/ipfs/${imageUri}`
    } else if (!isNft) {
      return imageUri
    }
  }

  const getCurrentUserDetails = async (userAccount = currentAccount) => {
    if(appStatus !== 'connected' || !userAccount) return

      const query = `
        *[_type == "users" && _id == "${userAccount}"]{
          "tweets": tweets[]->{timestamp, tweet}|order(timestamp desc),
          name,
          profileImage,
          isProfileImageNft,
          coverImage,
          walletAddress
        }
      `
      const response = await client.fetch(query)

      const profileImageUri = await getNftProfileImage(
        response[0].profileImage,
        response[0].isProfileImageNft,
      )

      setCurrentUser({
        tweets: response[0].tweets,
        name: response[0].name,
        profileImage: profileImageUri,
        walletAddress: response[0].walletAddress,
        coverImage: response[0].coverImage,
        isProfileImageNft: response[0].isProfileImageNft,
      })
    
    

  }


  async function checkIfWalletIsConnected() {
    if (!window.ethereum) return setAppStatus('noMetaMask')

    try {
      const addressArray = await window.ethereum.request({ method: 'eth_accounts' })
      
      if (addressArray.length > 0) {
        setAppStatus('connected')
        setCurrentAccount(addressArray[0])
        createUserAccount(addressArray[0])
      } else {
        // Only push to home if you aren't already there to avoid loops
        setAppStatus('notConnected')
      }
    } catch (err) {
      setAppStatus('error')
      console.log(err)
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  useEffect(() => {
    if (appStatus !== 'connected' || !currentAccount) return

    getCurrentUserDetails(currentAccount)
    fetchTweets()
      
    }, [currentAccount, appStatus])
  

  


  const connectWallet = async () => {
    if (!window.ethereum) return setAppStatus('noMetaMask')
    try {
      setAppStatus('loading')
      const addressArray = await window.ethereum.request({method: 'eth_requestAccounts',})
      if (addressArray.length > 0) 
      {
        setAppStatus('connected')
        setCurrentAccount(addressArray[0])
        createUserAccount(addressArray[0])
      } 
      else 
      {
        router.push('/');
        setAppStatus('notConnected');
      }
    } 
    
    catch (err) 
    {
      setAppStatus('error')
      console.log(err);
    }
  }



  return (
    <TwitterContext.Provider value={{ appStatus, currentAccount, tweets, currentUser, connectWallet, getCurrentUserDetails, fetchTweets }}>
      {children}
    </TwitterContext.Provider>
  )
}


/*
'use client'

import { createContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export const TwitterContext = createContext()

export const TwitterProvider = ({ children }) => {

  const [appStatus, setAppStatus] = useState('')
  const [currentAccount, setCurrentAccount] = useState('')
  const router = useRouter()

  

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return setAppStatus('noMetaMask')

    try 
    {
      const addressArray = await window.ethereum.request({method: 'eth_accounts',})
      if (addressArray.length > 0) 
      {
        setAppStatus('connected')
        setCurrentAccount(addressArray[0])
      } 
      else 
      {
        router.push('/')
        setAppStatus('notConnected')
      }
    } 
    
    catch (err) 
    {
      setAppStatus('error')
      console.log(err);
    }
  }

  const connectWallet = async () => {
    if (!window.ethereum) return setAppStatus('noMetaMask')
    try {
      setAppStatus('loading')
      const addressArray = await window.ethereum.request({method: 'eth_requestAccounts',})
      if (addressArray.length > 0) 
      {
        setAppStatus('connected')
        setCurrentAccount(addressArray[0])
      } 
      else 
      {
        router.push('/');
        setAppStatus('notConnected');
      }
    } 
    
    catch (err) 
    {
      setAppStatus('error')
      console.log(err);
    }
  }

  

  return (
    <TwitterContext.Provider value={{ appStatus,  currentAccount , connectWallet}}>
      {children}
    </TwitterContext.Provider>
  )
}

*/