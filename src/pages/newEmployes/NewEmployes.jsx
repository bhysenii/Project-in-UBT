import "./newEmployes.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import { employesInputs } from "../../formSource";
import { Link } from 'react-router-dom'

const NewEmployes = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({})
  const [error, setError] = useState(false)

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleClick = async (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append("file", file)
    data.append("upload_preset", "upload")
    try {
      const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/awgers/image/upload", data)

      const { url } = uploadRes.data

      const newuser = {
        ...info,
        img: url,
      }

      await axios.post("/Employees", newuser)
    } catch (error) {
      console.log(error)

    }

  }
  console.log(info);

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {employesInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input onChange={handleChange} type={input.type} placeholder={input.placeholder} id={input.id} />
                </div>
              ))}
              <button onClick={handleClick}>Send</button>
              {error && "Something went wrong!"}
              <Link to="/employes">See all Employees</Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewEmployes;
