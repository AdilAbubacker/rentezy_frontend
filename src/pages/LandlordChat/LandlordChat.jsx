import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

function LandlordChat() {
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [socket, setSocket] = useState(null)
    const [chattedUsers, setChattedUser] = useState([])
    const userId = useSelector(state => state.auth.userId)
    const { tenantId } = useParams() 
    const navigate = useNavigate()
    const [selectedChatterId, setSelectedChatterId] = useState(tenantId);

    useEffect(() => {
        console.log(userId)
        const roomName = `${tenantId}_${userId}`;
        console.log(roomName)
        const chatSocket = new WebSocket(
          `ws://127.0.0.1:8006/ws/chat/${roomName}/`
          );
          setSocket(chatSocket);
        }, [userId, tenantId])
        
        
      useEffect(() => {
        if (socket) {
          socket.onopen = () => {
            console.log('websocket connetion opened')
          };
          
          socket.onmessage = (e) => {
            const data = JSON.parse(e.data);
                console.log('onmessage worked:',data);
                setMessages((prevMessages) => [...prevMessages, data]);
                console.log()
              };
              
              socket.onclose = (e) => {
                console.error('Chat socket closed unexpectedly');
              };
              
              return () => {
                // Cleanup WebSocket connection when component unmounts
                socket.close();
              };
            }
          }, [socket])
        
        
        useEffect(() => {
          const loadMessages = async () => {
            try {
              const response = await axios.get(`http://127.0.0.1:8006/chat/chatmessages/${userId}/${tenantId}/`)
              console.log('messages loaded:', response.data)
              setMessages(response.data)
            } catch (error) {
              console.log('error retrieving messages', error)
            }
          }
          loadMessages();
        }, [userId, tenantId])
  
        useEffect(() => {
          const fetchUsersChattedWith = async () => {
            try {
              console.log('userid:',userId)
              const response = await axios.get(`http://127.0.0.1:8006/chat/users_chatted_with/${userId}`)
              console.log('chatted users loaded:',response.data)
              setChattedUser(response.data)
            } catch (error) {
              console.log('error retrieving messages', error)
            }
          }
          fetchUsersChattedWith();
        }, [tenantId])
            
  
        const handleSendMessage = async () => {
          try {
              const newMessage = {
                  sender: userId,
                  receiver: tenantId,
                  message_content: messageInput,
              };
              const response = await axios.post('http://127.0.0.1:8006/chat/create/', newMessage);
              console.log(response.data)
  
              if (socket) {
                  socket.send(JSON.stringify(newMessage));
                  console.log('message send')
  
                  setMessageInput('');    
              }
          } catch (error) {
              console.error('error sending messages:', error);
          }
  
          setMessageInput('');
      };
  

  return (
    <div>
    <div class="flex h-screen antialiased font-manrope text-gray-800 ">
      <div class="flex flex-row h-full w-full overflow-y-hidden">
        <div class="flex flex-col py-8 pl-6 pr-1 w-72 bg-white ">
          <div class="flex flex-row items-center justify-center h-12 w-full">
            <div
              class="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              ></path>
            </svg>
          </div>
          <div class="ml-2 font-extrabold font-manrope text-2xl">RentEzy Chat</div>
        </div>
       
        <div class="flex flex-col mt-8">
          <div class="flex flex-row items-center justify-between text-xs">
            <span class="font-bold">Active Conversations</span>
            <span
              class="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">4</span>
          </div>
          <div class="flex flex-col space-y-1 mt-4 -mx-2 h-[28rem] overflow-y-auto">

          {chattedUsers.map((chattedUser, index) => (
            <button 
            className={`flex flex-row items-center rounded-xl p-2 ${
              selectedChatterId === chattedUser.id ? 'bg-gray-100' : 'hover:bg-gray-100'
            }`}            
            onClick={() => {
              setSelectedChatterId(chattedUser.id);
              navigate(`/landlord/chat/${chattedUser.id}`);
            }}
            >
            <div class="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                     {chattedUser.username.charAt(0).toUpperCase()}
             </div>
              <div class="ml-2 text-sm font-semibold">{chattedUser.username}</div>
            </button>
          ))}
          
           
       

           
          </div>
        </div>
      </div>
      <div class="flex flex-col flex-auto h-full p-6">
        <div class="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-50 h-full p-4">
          <div class="flex flex-col h-full overflow-x-auto mb-4">
            <div class="flex flex-col h-full">
              <div class="grid grid-cols-12 gap-y-2">

              {messages.map((message, index) => (
                <>
                  {message.sender === userId ? (
                <div class="col-start-6 col-end-13 p-3 rounded-lg">
                  <div class="flex items-center justify-start flex-row-reverse">
                    <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">A</div>
                    <div class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                      <div>{message.message_content}</div>
                      {/* <div class="absolute text-[9px] w-3 bottom-0 right-0 -mb-5 mr-9 text-gray-500 whitespace-nowrap">{formatRelativeTime(message.timestamp)}</div> */}
                    </div>
                  </div>
                </div>

                  ) : (

                <div class="col-start-1 col-end-8 p-3 rounded-lg">
                  <div class="flex flex-row items-center">
                    <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">A</div>
                    <div class="relative ml-3 text-sm font-manrope bg-white-A700 py-2 px-4 shadow rounded-xl" >
                      <div>{message.message_content}</div>
                      {/* <div class="absolute text-[9px] w-3 bottom-0 left-0 -mb-5 ml-1 text-gray-500 whitespace-nowrap">{formatRelativeTime(message.timestamp)}</div> */}
                    </div>
                  </div>
                </div>
                    )}

                </>
                     ))}

              

                
              </div>
            </div>
          </div>
          <div
            class="flex flex-row items-center h-16 rounded-xl bg-white-A700 w-full px-4"
          >
            <div>
              <button
                class="flex items-center justify-center text-gray-400 hover:text-gray-600"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  ></path>
                </svg>
              </button>
            </div>
            <div class="flex-grow ml-4">
              <div class="relative w-full">
                <input
                  type="text"
                  class="flex w-full border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                />
                <button
                  class="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
                >
                  <svg
                    class="w-6 h-6"

                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            <div class="ml-4">
              <button
                class="flex items-center text-white-A700 justify-center bg-blue-400 py-2 hover:bg-indigo-600 rounded-xl text-white px-4 flex-shrink-0"
                onClick={handleSendMessage}
              >
                <span>Send</span>
                <span class="ml-2">
                  <svg
                    class="w-4 h-4 transform rotate-45 -mt-px"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    ></path>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    </div>
  )
}

export default LandlordChat
