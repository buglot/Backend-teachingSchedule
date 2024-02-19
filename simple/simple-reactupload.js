import { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);  // ชื่อต้องตรงกับที่ระบุใน upload.single('file') // ตรงกับ req.body.name ใน Express
    formData.append('year', 65);   // ตรงกับ req.body.year ใน Express

    try {
      const response = await axios.post('http://localhost:4133/api/education/Course/uploadfile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const percent = Math.floor((loaded * 100) / total);
          setProgress(percent);
        }
      });
      if(response.data.warning){
        alert(response.data.warning.warnmsg)
        response.data.warning.data.map((v,i)=>{
          alert(`${v.Message}${v.value.name} ${v.value.years}`);
        })
        
      }else{
        alert(response.data.msg);
      }
      
      
    } catch (error) {
      console.log(error)
      alert(error.response.data.msgerror);
      if(error.response.data.warning){
        alert(error.response.data.warning.warnmsg)
        error.response.data.warning.data.map((v,i)=>{
          alert(`${v.Message}${v.value.name} ${v.value.years}`);
        })
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload File</button>
      <div style={{ marginTop: '20px' }}>
        <progress value={progress} max="100" />
        <span>{progress}%</span>
      </div>
    </div>
  );
}

export default App;
