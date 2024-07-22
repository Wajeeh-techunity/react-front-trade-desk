import React, { useState, useEffect, useRef } from 'react';
import Pusher from 'pusher-js';
import GroupChat from './GroupChat';
// import CreateUserGroupModal from './CreateUserGroupModal';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Spinner from 'react-bootstrap/Spinner';
import { BiSolidMessageAdd } from "react-icons/bi";
import { MdAddAPhoto } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';



const apiURL = process.env.REACT_APP_API_URL;

const Dashboard_tabs = () => {
  const [activeTab, setActiveTab] = useState('public_chat');
  const [publicChatMessages, setPublicChatMessages] = useState([]);
  const [publicChatUsers, setPublicChatUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [privateChatRecipient, setPrivateChatRecipient] = useState(null);
  const [privateChatMessages, setPrivateChatMessages] = useState([]);
  const [activeUserID, setActiveUserID] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userGroups, setUserGroups] = useState([]);
  const [createMessage, setCreateMessage] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedPubFile, setSelectedPubFile] = useState(null);
  const [selectedPubSendFile, setSelectedPubSendFile] = useState(null);
  const [selectedPubImage, setSelectedPubImage] = useState(null);
  const [showPubModal, setShowPubModal] = useState(false);
  const [imagePubPopshow, setimagePubPopshow] = useState(false);

  const [selectedPvtFile, setSelectedPvtFile] = useState(null);
  const [selectedPvtSendFile, setSelectedPvtSendFile] = useState(null);
  const [selectedPvtImage, setSelectedPvtImage] = useState(null);
  const [showPvtModal, setShowPvtModal] = useState(false);
  const [imagePvtPopshow, setimagePvtPopshow] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const closePop = () => {
    
    setimagePubPopshow(false);
    setSelectedPubFile(null);
    setSelectedPubSendFile(null); 
    // document.getElementById('gr_message_img').click();
  };

  const closePvtPop = () => {
    setimagePvtPopshow(false);
    setSelectedPvtFile(null);
    setSelectedPvtSendFile(null); 
    // document.getElementById('gr_message_img').click();
  };

  const openimages = () => {
    document.getElementById('pub_message_img').click();
  };
  const openPvtimages = () => {
    document.getElementById('pvt_message_img').click();
  };

  const imageShow = () => {
    document.getElementById('pub_message_img').click();
  };

  const NullImageState = () => {
    setSelectedPubFile(null);
    setSelectedPubSendFile(null);      
  };

  const NullPvtImageState = () => {
    setSelectedPvtFile(null);
    setSelectedPvtSendFile(null);      
  };

  // const handleImageClick = (image) => {
  //   setSelectedPubImage(image);
  //   imagePubPopshow(true);
  // };
  
  const handleCloseModal = () => {
    imagePubPopshow(false);
    setSelectedPubImage(null);
  };
  

  const publicChatBoxRef = useRef(null);
  const privateChatBoxRef = useRef(null);
  useEffect(() => {
    fetch(`${apiURL}/api/historymessages`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        
        const mappedData = data.map(message => ({
          userId: message.user_id,
          message: message.content,
          username: message.username, 
          image: message.image, 
          created_at: message.created_at, 
        }));
  
        
        setPublicChatMessages(mappedData);
      })
      .catch(error => {
        console.error('Error fetching chat history:', error);
      });

      
      const pusher = new Pusher('4d1436b3901b6d80a9b8', {
        cluster: 'ap2',
        encrypted: true,
        authEndpoint: `${apiURL}/api/pusher/auth`,
        auth: {
          params: {
            user_id: localStorage.getItem('user_id'), 
          },
        },
      });

      pusher.connection.bind('connected', () => {
        const socketId = pusher.connection.socket_id;
        const channelName = 'one-chat'; 
        const authData = {
          user_id: localStorage.getItem('user_id'),
          user_info: {
            name: localStorage.getItem('user_name'), 
            
          },
        };
      
        const stringToSign = `${socketId}:${channelName}`;
        
        
      });

    if (activeTab === 'public_chat') {
      const channel = pusher.subscribe('chat');
      
      channel.bind('test-event', (data) => {
        
        setPublicChatMessages((prevMessages) => [
          ...prevMessages,
          { message: data.message, username: data.username, image: data.image, created_at: data.created_at }
        ]);
        setPublicChatUsers((prevUsers) => [...prevUsers, data.username]);
      });
    }

    
    if (activeTab === 'pvt_chat') {
      fetch(`${apiURL}/api/allusers`)
        .then(response => response.json())
        .then(data => {
          setUsers(data);
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });


    }

    if (activeTab === 'grp_chat') {
      fetch(`${apiURL}/api/user_groups/${localStorage.getItem('user_id')}`)
        .then(response => response.json())
        .then(data => {
          
          setUserGroups(data);
        })
        .catch(error => {
          console.error('Error fetching user groups:', error);
        });
    }


    
    const privateChatChannel = pusher.subscribe('one-chat');
      
    
    privateChatChannel.bind('one-message-5-6', (data) => {
      
      const loggedInUserId = localStorage.getItem('user_id');
      
      if (data.sender_id == loggedInUserId || data.receiver_id == loggedInUserId) {
        
        setPrivateChatMessages((prevMessages) => [
          ...prevMessages,
          {
            message: data.message,
            sender_id: data.sender_id,
            receiver_id: data.receiver_id,
            sender_name: data.sender_name,
            created_at: data.created_at,
            image: data.image,
          },
        ]);                
      }
      if (data.receiver_id == loggedInUserId) {
        
        // addNotification({
        //   title: data.sender_name,
        //   message: data.message,
        //   duration: 4000,
        //   icon: 'assets/images/user_msg.png',
        //   native: true,
        //   onClick: ()=> window.location = `${apiURL}/dashboard`,
        // })
        
      }
    });
  
    return () => {            
      pusher.disconnect();  
    };
  }, [activeTab, privateChatRecipient]);

  useEffect(() => {
    privateChatBoxRef.current.scrollTop = privateChatBoxRef.current.scrollHeight;
  }, [privateChatMessages]);
  

  const handleGroupCreated = (newGroup) => {
    setUserGroups(prevUserGroups => [...prevUserGroups, newGroup]);
  };

  const handlePubFileChange = (event) => {      
    const file = event.target.files[0];
    
    setSelectedPubSendFile(file);
    if (file) {
      setSelectedPubFile(URL.createObjectURL(file));
    } else {
      console.error('No file selected');
    }
  };

  const handlePvtFileChange = (event) => {      
    const file = event.target.files[0];
    
    setSelectedPvtSendFile(file);
    if (file) {
      setSelectedPvtFile(URL.createObjectURL(file));
    } else {
      console.error('No file selected');
    }
  };

  const handlePubIconClick = () => {
    setimagePubPopshow(true);
    // document.getElementById('gr_message_img').click();
  };

  const handlePvtIconClick = () => {
    setimagePvtPopshow(true);
    // document.getElementById('gr_message_img').click();
  };

  const sendMessage = (chatBoxId, userMessageId) => {
    const userid = localStorage.getItem('user_id');
    
    
    const userMessage = document.getElementById(userMessageId).value;

    const formData = new FormData();
    formData.append('image', selectedPubSendFile);    
    formData.append('message', userMessage);
    formData.append('user_id', userid); 

    fetch(`${apiURL}/api/messages`, {
      method: 'POST',    
      body: formData,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        
        setimagePubPopshow(false);
        setSelectedPubFile(null);
        setSelectedPubSendFile(null);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });

    document.getElementById(userMessageId).value = '';
  };

  const formatTime = (timestamp) => {
    const messageTime = new Date(timestamp);
  
    if (isNaN(messageTime.getTime())) {
      return ''; 
    }
  
    const now = new Date();
    const timeDiff = now - messageTime;
  
    if (timeDiff < 10 * 1000) {
      return 'Just Now'; 
    } else if (timeDiff < 24 * 60 * 60 * 1000) {
      return messageTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return messageTime.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const ChatBox = ({ messages }) => {
    const chatBoxRef = useRef(null);
  
    useEffect(() => {
      
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }, [messages]);
  
    const formatTime = (timestamp) => {
      const messageTime = new Date(timestamp);
    
      if (isNaN(messageTime.getTime())) {
        return ''; 
      }
    
      const now = new Date();
      const timeDiff = now - messageTime;
    
      if (timeDiff < 10 * 1000) {
        return 'Just Now'; 
      } else if (timeDiff < 24 * 60 * 60 * 1000) {
        return messageTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      } else {
        return messageTime.toLocaleDateString([], { month: 'short', day: 'numeric' });
      }
    };

    const clicktonitfy = () => {

    }
  
    return (
      <div className="msg_scroll chat-box" id="chatBox_public" ref={chatBoxRef}>
        {messages.map((messageData, index) => (
          <div key={index} className="msg d-flex align-content-center">
            {/* <img src="assets/images/user_prof.png" alt="" /> */}
            <div className='userletter'>
                {messageData.username.charAt(0)}
            </div>            
            <ul className="list-unstyled m-0 p-0">
              <li><strong>@{messageData.username}</strong><span className="time">{formatTime(messageData.created_at)}</span></li>
              {messageData.message &&
                <li><p>{messageData.message}</p></li>
              }                     
              {messageData.image &&
                <li className='g_msg_img'>
                  <img width='60px' height='50px' src={messageData.image} alt="Message Image" />
                </li>
              }
              <hr />
            </ul>
          </div>
        ))}
        {/* <button onClick={clicktonitfy}>Notify</button> */}
      </div>
    );
  };

  const handleTabChange = (tabKey, recipientId = null, userID = null) => {
    setActiveTab(tabKey);
    setPrivateChatRecipient(recipientId);
  
    if (recipientId) {
      
      var senderId = localStorage.getItem('user_id');
      setActiveUserID(userID);
      setCreateMessage(true);
      fetchPrivateChatHistory(recipientId, senderId);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  

  const fetchPrivateChatHistory = (recipientId, senderId) => {

    setLoading(true);
   
    
    fetch(`${apiURL}/api/privatechat/${recipientId}?senderId=${senderId}`)
      .then(response => response.json())
      .then(data => {
        
        setLoading(false);
        setPrivateChatMessages(data);
        privateChatBoxRef.current.scrollTop = privateChatBoxRef.current.scrollHeight;
                
      })
      .catch(error => {
        setLoading(false);
        console.error('Error fetching private chat history:', error);
      });
  };

  const sendPrivateChatMessage = (chatBoxId, userMessageId) => {
    const recipientId = privateChatRecipient;      
    const userMessage = document.getElementById(userMessageId).value;
    const userid = localStorage.getItem('user_id');

    const formData = new FormData();
    formData.append('image', selectedPvtSendFile);    
    formData.append('message', userMessage);
    formData.append('sender_id', userid); 
    formData.append('receiver_id', recipientId); 
  
    
    fetch(`${apiURL}/api/privatemessages`, {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        

        setimagePvtPopshow(false);
        setSelectedPvtFile(null);
        setSelectedPvtSendFile(null);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  
    
    document.getElementById(userMessageId).value = '';
  };

  return (
    <div>
      <ul className="nav nav-tabs" role="tablist">        
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === 'public_chat' ? 'active' : ''}`}
            data-toggle="tab"
            href="#public_chat"
            role="tab"
            onClick={() => handleTabChange('public_chat')}
          >
            Join Public Chat
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === 'pvt_chat' ? 'active' : ''}`}
            data-toggle="tab"
            href="#pvt_chat"
            role="tab"
            onClick={() => handleTabChange('pvt_chat')}
          >
            Private Chat
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === 'grp_chat' ? 'active' : ''}`}
            data-toggle="tab"
            href="#grp_chat"
            role="tab"
            onClick={() => handleTabChange('grp_chat')}
          >
            Join Group Chat
          </a>
        </li>
      </ul>

      <div className="tab-content">
        
        <div className={`tab-pane ${activeTab === 'public_chat' ? 'active' : ''}`} id="public_chat" role="tabpanel">
            <ChatBox messages={publicChatMessages} />
          <div className="user-input">
            {/* <img src="assets/images/msg_prof.png" alt="" /> */}
            <div className='userletter'>
                {localStorage.getItem('user_name').charAt(0)}
            </div>
            <div className='gr_img'>
                <FaPlusCircle  onClick={handlePubIconClick} />                
            </div>

            <>
            <Modal show={imagePubPopshow} className='grp_modal imagepopup' onHide={handleClose}  aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header>
            <Modal.Title>Sent Image</Modal.Title>
            
                <RxCrossCircled  onClick={closePop} />                  
            
            </Modal.Header>
            <Modal.Body className='text-center pt-t pb-5'>                    
              <Button variant="secondary" onClick={openimages}>                     
                <MdAddAPhoto />
              </Button>
              <div className='selectimage'>                                      
                {selectedPubFile && (
                  <>
                  <RxCrossCircled  onClick={NullImageState} />
                  <img src={selectedPubFile} />
                  </>
                )}                 
              </div>                              
            </Modal.Body>
            <Modal.Footer> 
            {selectedPubFile && (  
              <button onClick={() => sendMessage('chatBox_public', 'userMessage_public')}>
                  <i className="fa-solid fa-paper-plane"></i>
              </button>     
            )}
            </Modal.Footer>
            </Modal>
            </>


            <>
            <Modal show={showPubModal} className='msg_image-show' onHide={handleCloseModal} aria-labelledby="contained-modal-title-vcenter" centered>
              <Modal.Header>
                <Modal.Title></Modal.Title>
                <RxCrossCircled onClick={handleCloseModal} />
              </Modal.Header>
              <Modal.Body className='text-center pt-t pb-5'>
                {selectedPubImage && <img src={selectedPubImage} alt="Selected Image" />}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
              </Modal.Footer>
            </Modal>
            </>
            
            <input
              type="text"
              className="user_message"
              id="userMessage_public"
              placeholder="Type your message"
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  sendMessage('chatBox_public', 'userMessage_public');
                }
              }}
            />
            <input id='pub_message_img' className='gr_img d-none' type="file" onChange={handlePubFileChange} />
            <button onClick={() => sendMessage('chatBox_public', 'userMessage_public')}>
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </div>
        </div>

        <div className={`tab-pane ${activeTab === 'pvt_chat' ? 'active' : ''}`} id="pvt_chat" role="tabpanel">
          <div className='row'>
            <div className='col-md-3'>
              <div>
                <input
                  type="text"
                  value={searchQuery}
                  className='form-control searh_users'
                  onChange={handleSearchChange}
                  placeholder="Search Users..."
                />
                <ul className='pvt_chat msg_scroll '>          
                  
                {users.map(user => {            
                    if (
                        user.id !== 1 && 
                        user.id !== 3 && 
                        user.id !== 4 && 
                        user.id !== parseInt(localStorage.getItem('user_id')) &&
                        user.name.toLowerCase().includes(searchQuery.toLowerCase())
                    ) {
                        return (
                            <div className="item" key={user.id}>
                                <li 
                                    onClick={() => handleTabChange('pvt_chat', user.id, user.id)} 
                                    className={activeUserID === user.id ? 'active' : ''} 
                                >

                                <div className='userletter'>
                                    {user.name.charAt(0)}
                                </div>
                      
                                    {user.name}
                                </li>            
                            </div>
                        );
                    } else {
                        return null; // Return null if the condition is not met
                    }
                })}
                              
                </ul>
              </div>
            </div>
            <div className='col-md-9'>
              <div className="msg_scroll chat-box" id="chatBox_pvt"  ref={privateChatBoxRef}>
                
                {createMessage === false ?
                  <div className='c-msg'>
                  <BiSolidMessageAdd />
                </div>
                : true}
                {privateChatMessages.map((message, index) => (
                    <div key={index} className="msg d-flex align-content-center">
                      <div className='userletter'>
                      {message.sender_name && message.sender_name.charAt(0)}
                      </div>  
                      <ul className="list-unstyled m-0 p-0">
                      <li><strong>@{message.sender_name}</strong><span className="time">{formatTime(message.created_at)}</span></li>
                        {message.message &&
                          <li><p>{message.message}</p></li>
                        }                     
                        {message.image &&
                          <li className='g_msg_img'>
                            <img width='60px' height='50px' src={message.image} alt="Message Image" />
                          </li>
                        }
                      
                        <hr />
                      </ul>
                    </div>            
                ))}
                {loading && <Spinner animation="grow" />}
              </div>          
              <div className="user-input">
                {/* <img src="assets/images/msg_prof.png" alt="" /> */}
                <div className='userletter'>
                    {localStorage.getItem('user_name').charAt(0)}
                </div>
                <div className='gr_img'>
                    <FaPlusCircle  onClick={handlePvtIconClick} />                
                </div>

                <>
                <Modal show={imagePvtPopshow} className='grp_modal imagepopup' onHide={handleClose}  aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header>
                <Modal.Title>Sent Image</Modal.Title>
                
                    <RxCrossCircled  onClick={closePvtPop} />                  
                
                </Modal.Header>
                <Modal.Body className='text-center pt-t pb-5'>                    
                  <Button variant="secondary" onClick={openPvtimages}>                     
                    <MdAddAPhoto />
                  </Button>
                  <div className='selectimage'>                                      
                    {selectedPvtFile && (
                      <>
                      <RxCrossCircled  onClick={NullPvtImageState} />
                      <img src={selectedPvtFile} />
                      </>
                    )}                 
                  </div>                              
                </Modal.Body>
                <Modal.Footer> 
                {selectedPvtFile && (  
                  <button onClick={() => sendPrivateChatMessage('chatBox_pvt', 'userMessage_pvt')}>
                    <i className="fa-solid fa-paper-plane"></i>
                  </button>   
                )}
                </Modal.Footer>
                </Modal>
                </>
                <input
                  type="text"
                  className="user_message"
                  id="userMessage_pvt"
                  placeholder="Type your message"
                  onKeyPress={(event) => {
                    if (event.key === 'Enter') {
                      sendPrivateChatMessage('chatBox_pvt', 'userMessage_pvt');
                    }
                  }}
                />
                <input id='pvt_message_img' className='gr_img d-none' type="file" onChange={handlePvtFileChange} />
                <button onClick={() => sendPrivateChatMessage('chatBox_pvt', 'userMessage_pvt')}>
                  <i className="fa-solid fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
            

            
        </div>

        <div className={`tab-pane ${activeTab === 'grp_chat' ? 'active' : ''}`} id="grp_chat" role="tabpanel">
          {/* <GroupChat activeTab={activeTab} userGroups={userGroups} /> */}
          <GroupChat activeTab={activeTab} userGroups={userGroups} onGroupCreated={handleGroupCreated}  setUserGroups={setUserGroups} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard_tabs;