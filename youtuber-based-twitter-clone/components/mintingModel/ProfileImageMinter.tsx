'use client'
import React, { useState , useContext } from 'react';
import { TwitterContext } from '../../context/TwitterContext';
import { useRouter } from 'next/navigation';
import { client } from '../../lib/client'
import { contractABI , contractAddress } from '../../lib/constants';
import { ethers } from 'ethers'
import { pinJSONToIPFS , pinFileToIPFS } from '../../lib/pinata'
import InitialState from './InitialState';
import LoadingState from './LoadingState';
import FinishedState from './FinishedState';

declare let window: any;
let metamask: any;

if (typeof window !== 'undefined') {
  metamask = window.ethereum
}




interface Metadata {
  name: string
  description: string
  image: string
}

interface HeaderObject {
  key: string | undefined
  value: string | undefined
}

const getEthereumContract =  async () => 
{
    if(!metamask) return

    const provider = new ethers.BrowserProvider(metamask);
    const signer = await provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress,contractABI,signer)

    return transactionContract
}


const ProfileImageMinter = () =>
{
    const { currentAccount, setAppStatus } = useContext(TwitterContext)
    const [status, setStatus] = useState('initial');
    const router = useRouter();

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [profileImage, setProfileImage] = useState<File | undefined>(undefined);

    const mint = async() => {
        if(!name || !description || !profileImage) return
        setStatus('loading')

        try
        {
          const pinataMetadata = {
              name: `${name} - ${description}`
            
          }
        
          const ipfsImageHash = await pinFileToIPFS(profileImage, pinataMetadata)
        
          await client
          .patch(currentAccount)
          .set({profileImage: ipfsImageHash})
          .set({isProfileImageNft : true})
          .commit()
        
          const imageMetaData: Metadata = {
              name: name,
              description: description,
              image: `ipfs://${ipfsImageHash}`,
          }

        

        
        // This line sends the transaction AND waits for the user to sign in MetaMask
        
        
          const ipfsJsonHash = await pinJSONToIPFS(imageMetaData)
          if (!ipfsJsonHash) throw new Error("Metadata upload failed");
        
          const contract = await getEthereumContract()

          if (!contract) {
            throw new Error("Wallet not connected or contract not found");
          }

          // const tx = await contract.mint(currentAccount, `ipfs://${ipfsJsonHash}`);
          // await tx.wait();

          try {
            // 1. Trigger the transaction
            // Ethers automatically finds the 'mint' function in your ABI
            const tx = await contract.mint(currentAccount, `ipfs://${ipfsJsonHash}`);
                    
            console.log("Transaction Hash:", tx.hash);
            setStatus('loading'); // Keep loading until it's actually on-chain
                    
            // 2. Wait for the transaction to be confirmed (mined)
            const receipt = await tx.wait(); 
                    
            console.log("Transaction confirmed in block:", receipt.blockNumber);
            setStatus('finished');
                    
          } catch (error) {
            console.error("User rejected or transaction failed:", error);
            setStatus('initial');
          }
        
          /*
          const transactionParameters = {
            to: contractAddress,
            from: currentAccount,
            data: await contract.mint(currentAccount, `ipfs://${ipfsJsonHash}`),
          }

          try {
            await metamask.request({
              method: 'eth_sendTransaction',
              params: [transactionParameters],
            })
          
            setStatus('finished')
          } 
          catch (error) 
          {
            console.log(error)
            setStatus('finished')
          }*/


        }
        catch (error) {
          console.error("Minting failed:", error);
          setStatus('initial');
        }
        



    }

    const modalChildren = (modalStatus = status) => {
        switch (modalStatus) 
        {
            case 'initial':
              return (
                <InitialState profileImage={profileImage} setProfileImage ={setProfileImage} name={name} setName={setName} description={description} setDescription={setDescription} mint={mint} />
              )
          
            case 'loading':
              return <LoadingState />
          
            case 'finished':
              return <FinishedState />
          
            default:
              router.push('/')
              setAppStatus('error')
              break
    }


    }
    
    return <>{modalChildren(status)}</>
}

export default ProfileImageMinter;