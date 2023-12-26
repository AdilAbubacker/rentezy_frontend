import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


function Chat() {
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [socket, setSocket] = useState(null)

    const userId = useSelector(state => state.auth.userId)
    // const { ownerId } = useParams() 
    const ownerId = 2 
    
    useEffect(() => {
        console.log(userId)
        const roomName = `${userId}_${ownerId}`;
        console.log(roomName)
        const chatSocket = new WebSocket(
            `ws://127.0.0.1:8006/ws/chat/${roomName}/`
        );
        setSocket(chatSocket);
    }, [userId])


    useEffect(() => {
        if (socket) {
            socket.onopen = () => {
                console.log('websocket connetion opened')
            };

            socket.onmessage = (e) => {
                const data = JSON.parse(e.data);
                const message = data.message_content;
                console.log(data, 'return message user');
                setMessages((prevMessages) => [...prevMessages, data]);
                console.log('onmessage worked')
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
                console.log(userId,'kkkkkkkkkk')
                const response = await axios.get(`http://127.0.0.1:8006/chat/chatmessages/${userId}/${ownerId}/`)
                console.log(userId,'hhhhhhhhhhhh')

                setMessages(response.data)
            } catch (error) {
                console.log('error retrieving messages', error)
            }
        }
        loadMessages();
    }, [userId])


    const handleSendMessage = async () => {
        try {
            const newMessage = {
                sender: userId,
                receiver: ownerId,
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
    <div className="flex flex-col h-screen bg-gray-100">
         {/* <ChatHeader name={name} image={img} /> */}
            {/* {userId} {doctorId} */}
            <div className="flex-grow overflow-y-auto px-4 py-8" >
                {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex flex-col mb-4 ${
                                message.sender == userId ? 'items-end' : 'items-start'
                            }`}
                        >
                            <div
                                className={`rounded-lg p-2 max-w-xs ${
                                    message.sender == userId
                                        ? 'bg-green-500 text-white'
                                        : 'bg-white text-gray-800'
                                }`}
                            >
                                {message.message_content}
                            </div>
                            <div className="text-xs text-gray-400 mt-1 ml-2">
                                {/* {formatRelativeTime(message.timestamp)} */}
                                </div>
                        </div>
                    ))
                }
            </div>
            <div className="bg-white p-4 border-t flex">
                <input
                    className="border rounded p-2 w-full"
                    type="text"
                    placeholder="Type your message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                />
                <button
                    className="ml-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={handleSendMessage}
                >
                    Send
                </button>
            </div>
        </div>
  )
}

export default Chat