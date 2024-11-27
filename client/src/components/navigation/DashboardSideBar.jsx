import { Section } from "lucide-react";
import { IoSettingsOutline } from "react-icons/io5";
import ProfileImage from "../chatComponents/ProfileImage";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";

export default function DashboardSidebar({ chatId }) {
  const [privateChats, setPrivateChats] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrivateChats = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authorization token is missing");

        const response = await fetch("http://localhost:3000/api/v1/chats/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch private chats: ${response.statusText}`
          );
        }

        const data = await response.json();
        setPrivateChats(data);
      } catch (err) {
        console.error("Error fetching private chats:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPrivateChats();
  }, []);

  return (
    <section className="flex flex-1 flex-col overflow-x-hidden border-grey-secondary border-r bg-base-100 pt-inset-top lg:border-0">
      <div className="flex w-full flex-1 flex-col items-center overflow-y-auto overflow-x-hidden pt-3">
        <div className="flex flex-col rounded-md border border-base-300 w-full border-none px-3">
          <button
            className="relative flex flex-row items-center  gap-3 border-base-300 border-b p-3 text-left text-sm last:border-0 active:bg-info hover:bg-info tracking-[0.015em] w-full border-none bg-transparent"
            style={{ flexDirection: "row" }}
          >
            <IoSettingsOutline />
            <div className="flex-1">Settings</div>
          </button>
          <button
            className="relative flex items-center gap-3 border-base-300 border-b p-3 text-left text-sm last:border-0 active:bg-info hover:bg-info tracking-[0.015em] w-full border-none bg-transparent"
            style={{ flexDirection: "row" }}
          >
            <IoSettingsOutline />
            <div className="flex-1">Settings</div>
          </button>
          <button
            className="relative flex items-center gap-3 border-base-300 border-b p-3 text-left text-sm last:border-0 active:bg-info hover:bg-info tracking-[0.015em] w-full border-none bg-transparent"
            style={{ flexDirection: "row" }}
          >
            <IoSettingsOutline />
            <div className="flex-1">Settings</div>
          </button>
        </div>
        <div className="my-3 h-[2px] w-[80%] bg-base-200"></div>
        <section className="mb-2 flex flex-col gap-2 px-1">
          <h3 className="mb-1 ml-1 w-full font-bold text-gray-400 text-xs uppercase">
            Direct messages
          </h3>
          <div className="flex w-full">
            <input
              type="text"
              placeholder="Search DMs"
              className="input input input-bordered input-md flex-1 input-sm input-bordered focus:outline-offset-0"
            />
          </div>
        </section>
        <div className="flex flex-col p-2">
          {privateChats.data &&
            privateChats.data.map((chat) => {
              return (
                <div
                  key={chat.recipient._id}
                  className="flex flex-col rounded-md  w-full "
                  style={{ width: "240px", maxWidth: "300px" }}
                >
                  <button
                    style={{ flexDirection: "row" }}
                    className="relative flex items-center flex-row gap-3 border-base-300 border-b p-3 text-left text-sm last:border-0 active:bg-info hover:bg-info !bg-info !font-bold group w-full cursor-pointer bg-transparent px-3 py-2"
                    onClick={() => {
                      chatId(chat.recipient._id);
                    }}
                  >
                    <ProfileImage image={chat.recipient.avatar} />
                    <div className="flex-1">
                      <div className="mb-1 font-medium text-xs uppercase opacity-80">
                        <div className="overflow-ellipsis text-sm normal-case">
                          <span className="inline-flex items-center overflow-ellipsis">
                            {`${chat.recipient.firstName} ${chat.recipient.lastName}`}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className=" rounded-full p-2 invisible group-hover:visible hover:bg-gray-500">
                      <IoMdClose className="text-xl" />
                    </button>
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
