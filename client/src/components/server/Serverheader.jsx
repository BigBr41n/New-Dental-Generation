/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { ChevronDown, Landmark, LogOut, PlusCircle, Settings, Trash, UserPlus, Users } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { useModal } from "@/hooks/useModalStore";
import { Link } from "react-router-dom";
export default function ServerHeader({server, role}) {
    // its a sort of controlling a user behavior in the app so 
    // play with the auth here an see the result 
    const isAdmin = true;
    const isModerator =true;
    const dentist = true;
    const{ onOpen} = useModal();
    // const isAdmin = role === MemberRole.ADMIN;
    // const isModerator = isAdmin || role = MemberRole.MODERATOR;
return (
    <div>
        {isAdmin ? <DropdownMenu >
        <DropdownMenuTrigger className=" focus:outline-none " asChild>
            <button className=" w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-800 border-b-2 hover:bg-slate-800 transition">
                {/* {server.name} */}
                first
                <ChevronDown className="h-5 w-5 ml-auto"/>
            </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" w-56 text-xs font-medium text-neutral-400 space-y-[2px] bg-my-dark-blue  border-none  ">
            {isModerator &&(
                <DropdownMenuItem className="text-indigo-400 px-3 py-2 text-sm cursor-pointer hover:bg-slate-900 "
                    onClick={()=> onOpen("invitePeople", {server})}
                    style={{ display:"flex",flexDirection:"row"}}>
                    Invite People 
                    <UserPlus className="h-4 w-4 ml-auto"/>
                </DropdownMenuItem>
            )}

            {isAdmin &&(
                <DropdownMenuItem className=" px-3 py-2 text-sm cursor-pointer hover:bg-slate-900 " 
                    style={{ display:"flex",flexDirection:"row" ,}} 
                    onClick={()=> onOpen("editServer", {server})}    
                >
                    Server Settings 
                    <Settings className="h-4 w-4 ml-auto"/>
                </DropdownMenuItem>
            )}
            {isAdmin &&(
                <DropdownMenuItem 
                    className=" px-3 py-2 text-sm cursor-pointer hover:bg-slate-900 " 
                    style={{ display:"flex",flexDirection:"row"}}
                    onClick={()=> onOpen("manageMembers", {server})}    

                >
                    Manage Members 
                    <Users className="h-4 w-4 ml-auto"/>
                </DropdownMenuItem>
            )}
            { isModerator &&(
                <DropdownMenuItem 
                    className=" px-3 py-2 text-sm cursor-pointer hover:bg-slate-900 " 
                    style={{ display:"flex",flexDirection:"row"}}
                    onClick={()=>onOpen("createChannel",{server})}
                >
                    create channel 
                    <PlusCircle className="h-4 w-4 ml-auto"/>
                </DropdownMenuItem>
            )}
            {isModerator &&(
                <DropdownMenuSeparator className="bg-my-tin"/>
            )}
            {isAdmin &&(
                <DropdownMenuItem className="text-rose-500 px-3 py-2 text-sm cursor-pointer hover:bg-slate-900 " style={{ display:"flex",flexDirection:"row"}}>
                    Delete Server 
                    <Trash className="h-4 w-4 ml-auto"/>
                </DropdownMenuItem>
            )}
            {!isAdmin &&(
                <DropdownMenuItem className="text-rose-500 px-3 py-2 text-sm cursor-pointer hover:bg-slate-900 " style={{ display:"flex",flexDirection:"row"}}>
                    Leave Server 
                    <LogOut className="h-4 w-4 ml-auto"/>
                </DropdownMenuItem>
            )}

        </DropdownMenuContent>
    </DropdownMenu> :
        <Link href="/courses" className="flex flex-row items-center bg-my-gold justify-center text-my-black py-4 font-bold text-lg gap-2 leading-8">
            <Landmark />
            SKILL UP
        </Link>
    }
    </div>
  )
}
