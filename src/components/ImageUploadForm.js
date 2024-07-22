import React, { useState } from 'react';

function ImageUploadForm() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [groupImage, setgroupImage] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('image', selectedFile);

    fetch('http://127.0.0.1:8000/api/uploadimage', {
      method: 'post',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        setgroupImage(data.imageUrl);
        // Do something with the returned image URL
      })
      .catch(error => {
        console.error('Error uploading image:', error);
      });
  };

  return (
    <>
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
    <div>
      {groupImage &&
        <img src={groupImage} />
      }
      
    </div>
    </>
  );
}

export default ImageUploadForm;