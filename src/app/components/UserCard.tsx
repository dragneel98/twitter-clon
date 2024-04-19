"use client"

import {Card, CardHeader, CardBody, CardFooter, Avatar, Button} from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import { IconHeart, IconMessageCircle, IconRepeat } from '@tabler/icons-react'

export default function UserCard(
    {name ,userName, avatarUrl, content  }:{
        name : string,
        userName : string,
        avatarUrl : string,
        content : string | null
    }) {

  const [isFollowed, setIsFollowed] = useState(false);

  return (
    <Card className="shadow-none bg-transparent hover:bg-slate-800 transition border-b rounded-none cursor-pointer border-white/20">
      <CardHeader className="justify-between">
        <div className="flex gap-3">
          <Link href={`/${userName}`}>
            <Avatar radius="full" size="md" src={avatarUrl} />
          </Link>
          
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600"> {name} </h4>
            <h5 className="text-small tracking-tight text-default-400"> {userName} </h5>
          </div>
        </div>
        <Button
          className={isFollowed ? "bg-transparent text-foreground border-default-200" : "ml-3 "}
          color="primary"
          radius="full"
          size="sm"
          variant={isFollowed ? "bordered" : "solid"}
          onPress={() => setIsFollowed(!isFollowed)}
        >
          {isFollowed ? "Unfollow" : "Follow"}
        </Button>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-white">
        <p>
          {content}
        </p>
      </CardBody>
      <CardFooter className="gap-3">
        <button>
        <IconMessageCircle className="w-4 h-4"/>
        </button>
        <button>
        <IconRepeat className="w-4 h-4"/>
        </button>
        <button>
        <IconHeart className="w-4 h-4"/>
        </button>
      
        {/* <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">4</p>
          <p className=" text-default-400 text-small">Following</p>
        </div>
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">97.1K</p>
          <p className="text-default-400 text-small">Followers</p>
        </div> */}
      </CardFooter>
    </Card>
  );
}
