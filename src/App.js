import { useState } from 'react';
import './App.css';
import { setData } from './Data/dataSlice';
import { useDispatch, useSelector } from 'react-redux';

function App() {

  const { data } = useSelector((state) => state.data)
  const dispatch = useDispatch();

  let [formData, setFormData] = useState({
    email: '',
    mobile_number: ''
  })



  const handleChange = (e) => {
    e.preventDefault()
    let { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const Submit = (e) => {
    e.preventDefault();
    console.log(data)
    dispatch(setData([...data, formData]))
    setFormData({
      email: '',
      mobile_number: ''
    })
  }

  const Delete = (index) => {
    let newData = data.filter((_, i) => i !== index)
    dispatch(setData(newData))
  }

  return (
    <>
      <form onSubmit={Submit}>
        <input type="email" name='email' placeholder='Enter your email' onChange={handleChange} value={formData.email} required /> <br />
        <input type="tel" name='mobile_number' pattern='[0-9]{10}' placeholder='Enter your mobile number' onChange={handleChange} value={formData.mobile_number} required /><br />
        <button type='submit'>Submit</button>
      </form>
      <table>
        <tbody>
          <tr>
            <th>Email</th>
            <th>Mobile Number</th>
            <th>Action</th>
          </tr>
          {
            data.map((item, index) => (

              <tr key={index}>
                <td>{item.email}</td>
                <td>{item.mobile_number}</td>
                <td>
                  <button>Edit</button>
                  <button onClick={() => Delete(index)} >Delete</button>
                </td>
              </tr>
            ))
         }
        </tbody>
      </table>
    </>
  );
}

export default App;
