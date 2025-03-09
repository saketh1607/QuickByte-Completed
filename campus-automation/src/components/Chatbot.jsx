import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as stringSimilarity from 'string-similarity'; 

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const toggleChatbot = () => setIsOpen(!isOpen);

    const responses = {
        'menu': 'You can browse the menu by scrolling up or search for your favorite dish in the search bar.',
        'order': 'Click "Order Now" to place an order for your selected item.',
        'hours': 'We are open from 9 AM to 5PM every day.',
        'delivery': 'we offer preordering in campus.',
        'contact': 'You can reach us at support@quickbite.com or call us at +1-800-123-4567.',
        'Name':'The platform name is Quick Bite.',
        'QuickStore':'You can go to QuickStore by pressing toggle bar on navvar',
        'stationary':'You can go to QuickStore by pressing toggle bar on navvar',
        'books':'You can go to QuickStore by pressing toggle bar on navvar',
        'print':'You can go to QuickStore by pressing toggle bar on navvar',
        'help':'Welcome to our platform ..Ask anything you want',
        
    };


    const getBestMatch = (query) => {
        const queries = Object.keys(responses);
        const match = stringSimilarity.findBestMatch(query, queries);
        return match.bestMatch.target; 
    };

    const sendQuery = () => {
        if (inputValue.trim()) {
            const userMessage = { text: `You: ${inputValue}`, type: 'user' };
            setMessages((prevMessages) => [...prevMessages, userMessage]);
            setInputValue('');

            setTimeout(() => {
                const bestMatchKey = getBestMatch(inputValue.toLowerCase());
                const botMessage = {
                    text: `Bot: ${responses[bestMatchKey] || 'Sorry, I didn’t understand that. Can you ask differently?'}`,
                    type: 'bot',
                };
                setMessages((prevMessages) => [...prevMessages, botMessage]);
            }, 500);
        }
    };

    return (
        <>
            <div
                id="chatbot"
                style={{
                    display: isOpen ? 'flex' : 'none',
                    flexDirection: 'column',
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    width: '300px',
                    height: '400px',
                    backgroundColor: '#f1f1f1',
                    border: '1px solid #ccc',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                }}
            >
                <div
                    id="chatbot-header"
                    style={{
                        padding: '10px',
                        backgroundColor: '#1976d2',
                        color: '#fff',
                        borderTopLeftRadius: '10px',
                        borderTopRightRadius: '10px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <span>Chat with us!</span>
                    <button
                        id="chatbot-close"
                        onClick={toggleChatbot}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#fff',
                            fontSize: '20px',
                            cursor: 'pointer',
                        }}
                    >
                        ×
                    </button>
                </div>
                <div
                    id="chatbot-messages"
                    style={{
                        flex: 1,
                        padding: '10px',
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                    }}
                >
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            style={{
                                textAlign: msg.type === 'user' ? 'right' : 'left',
                                backgroundColor: msg.type === 'user' ? '#1976d2' : '#e0e0e0',
                                color: msg.type === 'user' ? '#fff' : '#000',
                                padding: '8px',
                                borderRadius: '10px',
                                maxWidth: '80%',
                                alignSelf: msg.type === 'user' ? 'flex-end' : 'flex-start',
                            }}
                        >
                            {msg.text}
                        </div>
                    ))}
                </div>
                <div
                    id="chatbot-input"
                    style={{
                        display: 'flex',
                        padding: '10px',
                        borderTop: '1px solid #ccc',
                    }}
                >
                    <input
                        type="text"
                        id="chatbot-query"
                        placeholder="Ask me something..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        style={{
                            flex: 1,
                            padding: '8px',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            marginRight: '10px',
                        }}
                    />
                    <button
                        onClick={sendQuery}
                        style={{
                            padding: '8px 12px',
                            backgroundColor: '#1976d2',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        Send
                    </button>
                </div>
            </div>
            <button
                id="chatbot-toggle"
                onClick={toggleChatbot}
                style={{
                    display: isOpen ? 'none' : 'block',
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    backgroundColor: '#1976d2',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    fontSize: '24px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                }}
            >
                💬
            </button>
        </>
    );
};

export default Chatbot;