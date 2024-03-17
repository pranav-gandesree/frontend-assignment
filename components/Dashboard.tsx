import Link from "next/link";
import React from "react";


const Dashboard= () =>{
  return (
    <>
        <div className="">
            <div className="h-screen bg-black  text-white text-2xl">
                <ul className="pt-5 flex flex-col gap-5 px-3">
                    <li>
                        <Link href="/">Posts</Link>
                    </li>
                    <li>
                        <Link href="/photos">Photos</Link>
                    </li>
                    <li>
                        <Link href="/saved">Saved Posts</Link>
                    </li>
                </ul>
            </div>
        </div>
    </>
  )
}

export default Dashboard;
