'use client'

import Feed from "@/components/home/feed";
import SideBar from "@/components/sideBar";
import Image from "next/image";
import Widget from "@/components/widgets/Widget";
import { TwitterContext } from '../context/TwitterContext'
import { useContext } from 'react'

const style = {
  wrapper: `flex justify-center h-screen w-screen select-none bg-[#15202b] text-white`,
  content: `max-w-[1400px] w-2/3 flex justify-between`,
  loginContainer: `w-full h-full flex flex-col justify-center items-center pb-48`,
  walletConnectButton: `text-2xl text-black bg-white font-bold mb-[-3rem] mt-[3rem] px-6 py-4 rounded-full cursor-pointer hover:bg-[#d7dbdc]`,
  loginContent: `text-3xl font-bold text-center mt-24`,
}


export default function Home() {

  const { appStatus, connectWallet } = useContext(TwitterContext)

  const app = (status = appStatus) => {

    switch (status) {
      case "connected":
        return userLoggedIn;

      case "notConnected":
        return noUserFound;

      case "noMetaMask":
        return noMetaMaskFound;

      case "error":
        return error;

      default:
        return loading;
    }
  }


  const userLoggedIn = (
      <div className={style.content}>
        <SideBar InitialSelectedIcon ={"Home"} />
        <Feed />
        <Widget />
      </div>
    )
  

  const noUserFound = (
      <div className={style.loginContainer}>
        <Image src={"/assets/metamask.png"} alt={"metamask icon"} width='200' height='200'/>
        <div className={style.loginContent}>No User Found</div>
        <button className={style.walletConnectButton} onClick={connectWallet}>
          Connect Wallet
        </button>
      </div>
    )
  

  const noMetaMaskFound = (
      <div className={style.loginContainer}>
        <Image src={"/assets/metamask.png"} alt={"metamask icon"} width='200' height='200'/>

        <div>
          <a href={'https://metamask.io'} target="_blank" rel="noopener noreferrer">Connect MetaMask</a>
        </div>
      </div>
    )
  

  const error = (
      <div className={style.loginContainer}>
        <Image src={"/assets/error.png"} alt={"error icon"} width='200' height='200'/>
        <div className={style.loginContent}>Error Occurred</div>
      </div>
    )
  

  const loading = (
      <div className={style.loginContainer}>
        <div>appStatus: {appStatus}</div>
        <div className={style.loginContent}>Loading...</div>
      </div>
    )
  

  return (<div className={style.wrapper}>{app(appStatus)}</div>
  );
}

/* <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentatio
          </a>
        </div>
      </main>
    </div> */
