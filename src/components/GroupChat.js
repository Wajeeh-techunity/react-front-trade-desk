import React, { useState, useEffect, useRef } from 'react';
import Pusher from 'pusher-js';
import Spinner from 'react-bootstrap/Spinner';
import { FaPlusSquare } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BiSolidMessageAdd } from "react-icons/bi";
import { IoAttach } from "react-icons/io5";
import { MdAddAPhoto } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TiUserAdd } from "react-icons/ti";




const apiURL = process.env.REACT_APP_API_URL;

const CreateUserGroupModal = ({onGroupCreated}) => {
    const [loading, setLoading] = useState(false);    
    const [users, setUsers] = useState([]);
    const [selectedUserIds, setSelectedUserIds] = useState([]);
    const [groupName, setGroupName] = useState('');
    const [step, setStep] = useState(1); // Updated to start with group name
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setStep(1);
        setShow(true);
    };
  
    const getUsers = () => {
      setLoading(true);
      fetch(`${apiURL}/api/allusers`)
        .then(response => response.json())
        .then(data => {
          setUsers(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching users:', error);
          setLoading(false);
        });
    };
  
    const handleUserSelection = (userId) => {
      const updatedUserIds = [...selectedUserIds];
      if (updatedUserIds.includes(userId)) {
        const index = updatedUserIds.indexOf(userId);
        updatedUserIds.splice(index, 1);
      } else {
        updatedUserIds.push(userId);
      }
      setSelectedUserIds(updatedUserIds);
    };
  
    const handleNextStep = () => {
        if (step === 1 && groupName.trim() !== '') {
          setStep(2); // Move to the next step if group name is entered
        } else if (step === 2 && selectedUserIds.length > 0) {

          setLoading(true);
            const currentUserId = parseInt(localStorage.getItem('user_id'));
          // Prepare the data to be sent
          const data = {
            groupName,
            selectedUserIds,
            createdBy: currentUserId,
          };
      
          // Send a POST request to the Laravel API
          fetch(`${apiURL}/api/creategroup`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
            .then(response => response.json())
            .then(result => {
             
              var group_name = result.group_name;

              onGroupCreated({ id: result.id, name: group_name, created_at: result.created_at, 
                created_user_id: result.created_user_id });
              // Reset form state
              setGroupName(group_name);
              setSelectedUserIds([]);
              setGroupName('');
              setLoading(false);
              handleClose();
            })
            .catch(error => {
              console.error('Error sending data to server:', error);
              // Handle the error, e.g., display an error message
            });
        }
      };
      
  
    const handlePreviousStep = () => {
      if (step === 2) {
        setStep(1); // Move back to the previous step
      }
    };
  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          +
        </Button>
        
        <Modal show={show} className='grp_modal crt_grp_mod' onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header closeButton>
            <Modal.Title>{step === 1 ? 'Create Group' : 'Select Users'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {step === 1 && (
              <>
                <label htmlFor="groupName">Group Name:</label>
                <input
                  type="text"
                  id="groupName"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                />
              </>
            )}
            {step === 2 && (
              <>
              <div className='user_list'>

              
                <button className='c-group' onClick={getUsers}>
                  <FaPlusSquare />
                </button>
                {loading && <Spinner animation="grow" />}
                {users.map(user => (
                  user.id !== 1 && user.id !== 3 && user.id !== 4 && user.id !== parseInt(localStorage.getItem('user_id')) ? (
                    <div key={user.id} className="item groupuser">
                      <input
                        type="checkbox"
                        checked={selectedUserIds.includes(user.id)}
                        onChange={() => handleUserSelection(user.id)}
                      />
                      <span>{user.name}</span>
                    </div>
                  ) : null
                ))}
                </div>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            {step === 2 && (
              <Button variant="secondary" onClick={handlePreviousStep}>
                Previous
              </Button>
            )}
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleNextStep}>
              {step === 1 ? 'Next' : 'Create Group'}
              
            </Button>
            {loading && <Spinner animation="grow" />}
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  
const GroupChat = ({ activeTab, userGroups, onGroupCreated, setUserGroups   }) => {
    const [users, setUsers] = useState([]);
    const groupChatBoxRef = useRef(null);
    const [activeUserID, setActiveUserID] = useState(null);
    const [groupTitle, setGroupTitle] = useState(null);
    const [groupMembers, setGroupMembers] = useState([]);
    const [groupMembersIds, setGroupMembersID] = useState([]);
    const [loading, setLoading] = useState(false);
    const [chatloading, setChatLoading] = useState(false);
    const [selectedGroupId, setSelectedGroupId] = useState(null);
    const [show, setShow] = useState(false);
    const [imagePopshow, setimagePopshow] = useState(false);
    const [showAddUserModal, setshowAddUserModal] = useState(false);
    const handleClose = () => setShow(false);
    const [isCurrentUserAuthor, setIsCurrentUserAuthor] = useState(false);
    const currentUser = localStorage.getItem('user_name');
    const [groupMessages, setGroupMessages] = useState([]);
    const [groupCreater, setGroupCreater] = useState(null);
    const [createMessage, setCreateMessage] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedSendFile, setSelectedSendFile] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedUserIds, setSelectedUserIds] = useState([]);


    useEffect(() => {
      userGroups.forEach(group => {
          checkCurrentUserAuthor(group.id);
      });
      groupChatBoxRef.current.scrollTop = groupChatBoxRef.current.scrollHeight;      
    }, [groupMessages, userGroups]);


    useEffect(() => {
      const pusher = new Pusher('4d1436b3901b6d80a9b8', {
        cluster: 'ap2',
        encrypted: true,        
      });
      const channel = pusher.subscribe('group-chat');
      channel.bind('group-message', (data) => {
       
        //
        const group_id = localStorage.getItem('group_id');
        //
              
       
        if(data.groupId == group_id){
          //
          setGroupMessages((prevMessages) => [
            ...prevMessages,
            {
              message: data.message,            
              user_name: data.user_name,          
              created_at: data.created_at,          
              image: data.image,          
            },
          ]);
        }  

      });
      return () => {            
        pusher.disconnect();  
      };
      
    }, []);
    
    const handleFileChange = (event) => {      
      const file = event.target.files[0];
      setSelectedSendFile(file);
      if (file) {
        setSelectedFile(URL.createObjectURL(file));
      } else {
        console.error('No file selected');
      }
    };

    const handleUserSelection = (userId) => {
      const updatedUserIds = [...selectedUserIds];
      if (updatedUserIds.includes(userId)) {
        const index = updatedUserIds.indexOf(userId);
        updatedUserIds.splice(index, 1);
      } else {
        updatedUserIds.push(userId);
      }
      setSelectedUserIds(updatedUserIds);
    };

    const completeUsersAdd = () => {
     
     
      setLoading(true);

      const data = {
          selectedGroupId: selectedGroupId,
          selectedUserIds: selectedUserIds
      };
  
      fetch(`${apiURL}/api/addnewusersgroup`, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
        },        
          body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
         
          setLoading(false);
          setshowAddUserModal(false);
          setGroupMembers(data.all_group_members);
          setGroupMembersID(data.all_group_members_Ids);
          
      })
      .catch(error => {
          console.error('Error:', error);
      });
  };
  

    const handleIconClick = () => {
      setimagePopshow(true);
      // document.getElementById('gr_message_img').click();
    };

    const closePop = () => {
      setimagePopshow(false);
      // document.getElementById('gr_message_img').click();
    };

    const openimages = () => {
      document.getElementById('gr_message_img').click();
    };

    const imageShow = () => {
      document.getElementById('gr_message_img').click();
    };

    const NullImageState = () => {
      setSelectedFile(null);
      setSelectedSendFile(null);      
    };

    const handleImageClick = (image) => {
      setSelectedImage(image);
      setShowModal(true);
    };
    
    const handleCloseModal = () => {
      setShowModal(false);
      setSelectedImage(null);
    };

    const sendMessageToGroup = () => {
      const userMessage = document.getElementById('userMessage_grp').value;
      const currentUserId = localStorage.getItem('user_id');
     
      const formData = new FormData();
      formData.append('image', selectedSendFile);
      formData.append('groupId', selectedGroupId);
      formData.append('message', userMessage);
      formData.append('userId', currentUserId);          
    
      fetch(`${apiURL}/api/groupmessage`, {
        method: 'POST',
        body: formData,
      })
      .then(response => response.json())
      .then(result => {
         
          setimagePopshow(false);
          setSelectedFile(null);
          setSelectedSendFile(null);
          // setGroupMessages((prevMessages) => [
          //   ...prevMessages,
          //   {
          //     message: result.message,            
          //     user_name: result.user_name,          
          //     created_at: result.created_at,          
          //   },
          // ]);

          document.getElementById('userMessage_grp').value = '';
      })
      .catch(error => {
          console.error('Error sending message:', error);        
      });
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

    const handleDeleteGroup = (groupId) => {
        setSelectedGroupId(groupId); // Set the selected group ID for deletion
       
        setShow(true);
    };

    const openGroup = (groupId) => {  
        setChatLoading(true);
        fetch(`${apiURL}/api/groupdetail/${groupId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(response => response.json())
        .then(result => {
         
          const groupData = result.group; // Check if 'group' data is present in the result
          if (groupData) {
              setGroupTitle(groupData.name);
              setGroupMembers(result.user_names);
              setGroupMembersID(result.user_id);
              checkCurrentUserAuthor(groupId);
              setSelectedGroupId(groupId);
              setCreateMessage(true);
              localStorage.setItem('group_id', groupId);
              setGroupCreater(result.created_user_name)
              setChatLoading(false);
             
          } else {
              console.error('Group data not found in the server response.');
          }
        })
        .catch(error => {
        console.error('Error sending data to server:', error);
        });

        fetchGroupChatHistory(groupId);
    }

    const addUsersInGroup = () => {
     
      setshowAddUserModal(true);

      fetch(`${apiURL}/api/allusers`)
        .then(response => response.json())
        .then(data => {
          setUsers(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching users:', error);
          setLoading(false);
        });
    }

    const handleUserCloseModal = () => {
      setshowAddUserModal(false);
    }

    const fetchGroupChatHistory = (groupId) => {

      fetch(`${apiURL}/api/groupchathistory/${groupId}`)
          .then(response => response.json())
          .then(data => {
              setGroupMessages(data);
              groupChatBoxRef.current.scrollTop = groupChatBoxRef.current.scrollHeight;
          })
          .catch(error => {
              console.error('Error fetching group chat history:', error);
          });
    };

    const checkCurrentUserAuthor = (groupId) => {
      const currentUserId = localStorage.getItem('user_id');
      const group = userGroups.find(group => group.id === groupId);
      if (group && group.createdBy === currentUserId) {
          setIsCurrentUserAuthor(true);
      } else {
          setIsCurrentUserAuthor(false);
      }
    };

    const confirmDeleteGroup = () => {
        if (selectedGroupId) {
            // Make the API call to delete the group
            fetch(`${apiURL}/api/deletegroup/${selectedGroupId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => {
                if (response.ok) {
                    // Group deleted successfully, update the userGroups state in Dashboard_tabs
                    setUserGroups(prevUserGroups => prevUserGroups.filter(group => group.id !== selectedGroupId));
                } else {
                    // Handle error cases
                    console.error('Failed to delete group');
                }
            })
            .catch(error => {
                console.error('Error deleting group:', error);
            })
            .finally(() => {
                setSelectedGroupId(null); // Reset the selected group ID
            });
        }
    };

    const cancelDeleteGroup = () => {
        setSelectedGroupId(null); // Reset the selected group ID
    };
    
  return (
    <div>
        
        <>        
        <div className='row'>
          <div className='col-sm-12 col-md-3'>
            <div className='grp_list'>
              <h4>Your Groups</h4>              
              <CreateUserGroupModal onGroupCreated={onGroupCreated} />
            </div>
            <div className='msg_scroll grp_chat_scroll'>

            {userGroups.map(group => (
                <div key={group.id} className="msg grpBox">
                    <div className='userletter'>                        
                        {group.name.charAt(0).toUpperCase()}
                    </div>
                    <ul className="list-unstyled m-0 p-0">
                        <li>
                            <strong onClick={() => openGroup(group.id)}>@
                                {group.name}
                            </strong> 
                            <span className="time">
                                {formatTime(group.created_at)}
                                
                                {group.created_user_id == localStorage.getItem('user_id') && 
                                <button onClick={() => handleDeleteGroup(group.id)} className='delete_group'>
                                  <i className="fa-solid fa-trash"></i>
                                </button>
                                }
                            </span>
                        </li>
                        <hr />
                    </ul>
                </div>
            ))}

            {selectedGroupId && (
                    <>
                <Modal show={show} className='grp_modal' onHide={handleClose}  aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                <Modal.Title>Are you sure you want to delete this.</Modal.Title>
                </Modal.Header>
                <Modal.Body className='text-center pt-t pb-5'>
                    
                    <Button variant="secondary" onClick={confirmDeleteGroup}>
                        Yes
                    </Button>
                    {/* <Button variant="secondary" onClick={cancelDeleteGroup}>
                        No
                    </Button> */}
                
                </Modal.Body>
                <Modal.Footer>
                
                <Button variant="secondary" onClick={cancelDeleteGroup}>
                    Close
                </Button>
                
                </Modal.Footer>
                </Modal>
                </>
                
            )}
            
            </div>
          </div>
          <div className='col-sm-12 col-md-9'>
            {createMessage === false ?
              <div className='c-msg g-mg'>
              <BiSolidMessageAdd />
            </div>
            : true}
            {chatloading && <Spinner animation="grow" className='dash' />}
            <div className='head_group'>
              {groupTitle &&
                <div className='grp_icon'> 
                    {groupTitle.charAt(0).toUpperCase() }
                </div>
              }                                                                    
              <div>
                  <h2>{groupTitle}</h2>
                  <span className='member'>
                    <p>
                      {groupMembers.map((member, index) => {
                          if (member == currentUser) {
                              return 'You';
                          } else {
                              return member;
                          }
                      }).join(', ')}
                    </p>
                </span>
              </div>
              <div className='creatername'>
                {groupCreater ?
                  <span>Created By <strong>{groupCreater}</strong></span>
                : null}

                {groupCreater === localStorage.getItem('user_name') && (
                    <TiUserAdd onClick={addUsersInGroup} />
                )}          
                


                <Modal show={showAddUserModal} className='moreusers' onHide={handleUserCloseModal} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header>
                  <Modal.Title>Add More Users.</Modal.Title>
                  <RxCrossCircled onClick={handleUserCloseModal} />
                </Modal.Header>
                <Modal.Body className='text-center pt-t pb-5'>
                <div className='user_list'>
                    {users.map(user => {
                        if (
                            user.id !== 1 && 
                            user.id !== 3 && 
                            user.id !== 4 && 
                            user.id !== parseInt(localStorage.getItem('user_id')) &&
                            !groupMembersIds.includes(user.id)
                        ) {
                            return (
                                <div key={user.id} className="item groupuser">
                                    <input
                                        type="checkbox"
                                        checked={selectedUserIds.includes(user.id)}
                                        onChange={() => handleUserSelection(user.id)}
                                    />
                                    <span>{user.name}</span>
                                </div>
                            );
                        } else {
                            return null;
                        }
                    })}

                    <Button onClick={completeUsersAdd}>Add Users In group</Button>
                    {loading && <Spinner animation="grow" />}
                </div>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
              </Modal>
              </div>
            </div>
            <div className="msg_scroll grp_chat_box chat-box" id="chatBox_grp" ref={groupChatBoxRef}>
                {groupMessages.map((message, index) => (
                    <div key={index} className="msg d-flex">
                        <div className='userletter'>
                            {message.user_name.charAt(0)}
                        </div>
                        <ul className="list-unstyled m-0 p-0 group_ul">
                            <li><strong>@{message.user_name}</strong><span className="time px-2">{formatTime(message.created_at)}</span></li>
                            {message.message &&
                              <li><p>{message.message}</p></li>
                            }                          
                            {message.image &&
                              <li className='g_msg_img' onClick={() => handleImageClick(message.image)}>
                                <img width='60px' height='50px' src={message.image} alt="Message Image" />
                              </li>
                            }
                            
                            <hr />
                        </ul>
                    </div>
                ))}
            </div>
            <Modal show={showModal} className='msg_image-show' onHide={handleCloseModal} aria-labelledby="contained-modal-title-vcenter" centered>
              <Modal.Header>
                <Modal.Title></Modal.Title>
                <RxCrossCircled onClick={handleCloseModal} />
              </Modal.Header>
              <Modal.Body className='text-center pt-t pb-5'>
                {selectedImage && <img src={selectedImage} alt="Selected Image" />}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
              </Modal.Footer>
            </Modal>
            <div className="user-input">
              <div className='userletter'>
                  {localStorage.getItem('user_name').charAt(0)}
              </div>
              {/* <img src="assets/images/msg_prof.png" alt="" /> */}
              <input
                type="text"
                className="user_message"
                id="userMessage_grp"
                placeholder="Type your message"
                onKeyPress={(event) => {
                  if (event.key === 'Enter') {
                    sendMessageToGroup('chatBox_grp', 'userMessage_grp');
                  }
                }}
              />
              <div className='gr_img'>
                <FaPlusCircle  onClick={handleIconClick} />                
              </div>
              
                <>
                <Modal show={imagePopshow} className='grp_modal imagepopup' onHide={handleClose}  aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header>
                <Modal.Title>Sent Image</Modal.Title>
                
                    <RxCrossCircled  onClick={closePop} />                  
                
                </Modal.Header>
                <Modal.Body className='text-center pt-t pb-5'>                    
                  <Button variant="secondary" onClick={openimages}>                     
                    <MdAddAPhoto />
                  </Button>
                  <div className='selectimage'>                                      
                    {selectedFile && (
                      <>
                      <RxCrossCircled  onClick={NullImageState} />
                      <img src={selectedFile} />
                      </>
                    )}                 
                  </div>                              
                </Modal.Body>
                <Modal.Footer> 
                {selectedFile && (  
                  <button onClick={() => sendMessageToGroup('chatBox_grp', 'userMessage_grp')}>
                      <i className="fa-solid fa-paper-plane"></i>
                  </button>     
                )}
                </Modal.Footer>
                </Modal>
                </>

              <input id='gr_message_img' className='gr_img d-none' type="file" onChange={handleFileChange} />
              <button onClick={() => sendMessageToGroup('chatBox_grp', 'userMessage_grp')}>
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
        </>
        
      
    </div>
  );
};

export default GroupChat;