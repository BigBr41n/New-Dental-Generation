import Devider from "@/components/chatComponents/Devider";
import Message from "@/components/chatComponents/Message";
import { FaArrowDown, FaArrowUp, FaHashtag } from "react-icons/fa6";
import { TbPinnedFilled } from "react-icons/tb";
import { useSocket } from "../../socketContext";

import { useState, useEffect, useRef } from "react";
import { jwtDecode } from "jwt-decode";

export default function Chat1({ initialMessages, chanId }) {
  const [messages, setMessages] = useState(initialMessages || []);
  const [msgToSend, setMessageToSend] = useState("");
  const [page, setPage] = useState(1);
  const [preventFetch, setPrevent] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const containerRef = useRef(null);
  const lastMessageRef = useRef(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const socket = useSocket();
  const userInfo = jwtDecode(localStorage.getItem("token"));

  // tracking the last message to scroll to it

  useEffect(() => {
    if (!socket && !chanId) return;
    setMessages(initialMessages);
  }, [initialMessages]);

  useEffect(() => {
    setMessages([]);
    scrollToBottom();
  }, [chanId]);

  useEffect(() => {
    if (!socket && !chanId) return;

    //console.log("passed");
    socket.emit("joinGroup", chanId);

    socket.on("channelMessage", (msg) => {
      if (msg.channelId === chanId) {
        setMessages((prev) => [...prev, msg]);
      }
      if (msg.sender._id === userInfo.userId) {
        scrollToBottom();
      }
    });

    return () => {
      socket.off("message");
      socket.off("channelMessage");
    };
  }, [socket, chanId, initialMessages]);

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
      setMessageToSend("");
    }
  }

  function sendMessage() {
    if (!msgToSend.trim()) return;

    socket.emit("channelMessage", {
      content: msgToSend,
      channelId: chanId,
      type: "text",
    });
  }

  const fetchMoreMessages = async () => {
    if (isFetching || !chanId || preventFetch) return;
    const container = containerRef.current;

    if (container.scrollTop != 0 || isFetching) return;
    setIsFetching(true);

    try {
      console.log("gonna fetch more messages");
      let nextPage = page + 1;
      console.log(nextPage);
      const response = await fetch(
        `http://localhost:3000/api/v1/channels/${chanId}?page=${nextPage}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }

      console.log(data);

      if (data.data) {
        console.log("fetched more messages");
        setMessages((prev) => [...data.data.messages, ...prev]);
        if (data.data.messages.length < 30) {
          setPrevent(true);
        }
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      container.addEventListener("scroll", fetchMoreMessages);
    }

    // Cleanup event listener on component unmount
    return () => {
      if (container) {
        container.removeEventListener("scroll", fetchMoreMessages);
      }
    };
  }, [messages]);

  return (
    <div className="flex h-full flex-col bg-neutral-950">
      <div className="z-20 flex flex-col flex-1">
        <div className="relative h-full flex-1 bg-neutral">
          <div className="absolute top-0 right-0 left-0 z-20 flex flex-col">
            {/* for the title of the channel */}
            <header
              className="flex flex-shrink-0 items-end justify-between !pt-0 relative z-10 border-grey-secondary border-b bg-base-300"
              style={{
                height: "48px",
                minHeight: "48px",
                maxHeight: "48px",
                paddingTop: 0,
              }}
            >
              <section className="flex h-full w-full items-center justify-between pl-3">
                <div className="flex w-full items-center font-medium">
                  <div className="flex items-center justify-center gap-3">
                    <div className="flex items-center gap-3 font-medium">
                      <span className="flex items-center gap-[2px]">
                        <FaHashtag />| start-here
                      </span>
                    </div>
                  </div>
                </div>
              </section>
            </header>

            {/* for the pinned messages */}
            <header
              className=" flex flex-shrink-0 items-end justify-between !pt-0 relative z-10 border-grey-secondary border-b bg-base-300"
              style={{
                height: "60px",
                minHeight: "60px",
                maxHeight: "60px",
                paddingTop: 0,
              }}
            >
              <section className="flex h-full w-full items-center justify-between">
                <div className="flex w-full items-center font-medium bg-slate-600 ">
                  <div className="flex items-center justify-center gap-3 ">
                    <button
                      className=" transition-all px-5 py-2 rounded-lg my-2 ml-2 btn-sm border-my-gold  hover:bg-my-gold  text-my-gold hover:text-my-black"
                      style={{ border: "1px solid var(--gold)" }}
                    >
                      <TbPinnedFilled className="text-2xl " />
                    </button>
                    <div className="line-clamp-2 cursor-pointer text-xs">
                      <div className="text-my-gold font-bold text-base">
                        Pinned Message
                      </div>
                      <span className="line-clamp-1 text-caption">
                        Good morning students...
                      </span>
                    </div>
                  </div>
                </div>
              </section>
            </header>

            {/* for the new messages not watched */}
            <div className="absolute top-[108px] right-0 left-0 z-[11] user-select-none flex h-[28px] items-center justify-between overflow-hidden text-ellipsis whitespace-nowrap bg-indigo-800 bg-opacity-80 px-3 font-semibold text-accent-content text-md backdrop-blur-[20px] backdrop-filter transform cursor-pointer transition-all duration-200 translate-y-0 opacity-100">
              <div>New since 5 days ago</div>
              <div className="flex items-center">
                {" "}
                Jump to unread <FaArrowUp className="ml-2" />
              </div>
            </div>
          </div>

          {/* for the chat  */}
          <div
            className="absolute translate-y-0 opacity-100"
            style={{ top: "48px", left: "0", width: "100%", bottom: "66px" }}
          >
            <div
              ref={containerRef}
              className="z-10 overflow-y-auto overflow-x-hidden transition-transform duration-keyboard will-change-transform"
              style={{ height: "100%" }}
            >
              <div className="viewport relative will-change-transform translate-y-0 ">
                <div className="w-full">
                  {messages &&
                    messages.map((message, index) => {
                      const isLastMessage = index === messages.length - 1;
                      return (
                        <div key={message._id}>
                          <Message message={message} />
                          <Devider />
                          <div
                            ref={isLastMessage ? lastMessageRef : null}
                          ></div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
          {/* for the input of the message */}
          <div className="absolute right-0 bottom-0 left-0 z-20 flex flex-col">
            <footer
              className="relative mb-inset-bottom   z-20 w-full bg-base-100 transition-transform duration-keyboard translate-y-0"
              style={{ paddingBottom: "0px" }}
            >
              {/* this for the user when he scroll up he can return and scroll to the present msg */}
              <div className="w-full user-select-none flex h-[28px] items-center justify-between overflow-hidden text-ellipsis whitespace-nowrap bg-opacity-80 px-3 font-medium text-sm backdrop-blur-[20px] backdrop-filter  z-100 mb-inset-bottom transform cursor-pointer transition-all duration-75 bg-base-300 text-base-content translate-y-0 opacity-100 bottom-full">
                <div>Viewing older messages</div>
                <div className="flex items-center">
                  See present <FaArrowDown className="ml-2" />
                </div>
              </div>

              {/* for the input  */}
              <div className="flex flex-shrink-0  w-full items-center gap-3 border-gray-700 border-t px-3 py-2">
                <button
                  className=" relative bg-neutral-950 flex-shrink-0 cursor-pointer overflow-hidden rounded-full p-1"
                  style={{
                    backgroundColor:
                      "hsl(211.3 46.939% 9.6078% / 1 !important) !important",
                  }}
                >
                  <input
                    type="file"
                    accept="image/*,video/*,audio/*,text/*,application/*,.mp3, .wav, .ogg, .mp4, .mov, .avi, .mkv, .webm, .m4a, .pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .json"
                    className="absolute bg-my-white opacity-0 shadow-xl"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transform transition-all "
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </button>
                <form className="relative block min-h-[32px] rounded-2xl bg-neutral-950 flex-1">
                  <textarea
                    id="chat-input"
                    className=" top-0 left-0 resize-none border-none bg-transparent px-3 py-[6px] text-sm outline-none  w-full"
                    placeholder="Message #⭐ | lifestyle-flexing"
                    style={{ height: "32px" }}
                    onChange={(e) => setMessageToSend(e.target.value)}
                    onKeyDown={handleKeyDown}
                  ></textarea>
                </form>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
