import { useEffect, useState } from 'react';
import './App.css';
import { setData } from './Data/dataSlice';
import { useDispatch, useSelector } from 'react-redux';
import allData from './data.json'

function App() {

  const { data } = useSelector((state) => state.data)
  const dispatch = useDispatch();
  let [formData, setFormData] = useState({
    email: '',
    mobile_number: ''
  })

  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 5
  const lastindex = currentPage * recordsPerPage
  const firstIndex = lastindex - recordsPerPage
  const records = data.slice(firstIndex, lastindex)
  const npage = Math.ceil(data.length / recordsPerPage)
  const numbers = [...Array(npage + 1).keys()].slice(1)

  useEffect(() => {
    if (data.length === 0) {
      dispatch(setData(allData))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = (e) => {
    e.preventDefault()
    let { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const Submit = (e) => {
    e.preventDefault();
    const newData = [...data]
    const lastElement = (newData.slice(-1))
    const id = (lastElement[0].id)
    const newformdata = { ...formData, id: id + 1 }
    dispatch(setData([...data, newformdata]))
    setFormData({
      email: '',
      mobile_number: ''
    })
  }

  const Delete = (id) => {
    let newData = data.filter((item) => item.id !== id)
    dispatch(setData(newData))
  }

  const Edit = (id) => {
    const item = data.find((i) => i.id === id)
    setFormData(item)
    let newData = data.filter((item) => item.id !== id)
    dispatch(setData(newData))
  }

  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const nextPage = () => {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1)
    }
  }

  const changeCpage = (id) => {
    setCurrentPage(id)
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
            <th>id</th>
            <th>Email</th>
            <th>Mobile Number</th>
            <th>Action</th>
          </tr>
          {
            records?.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.email}</td>
                <td>{item.mobile_number}</td>
                <td>
                  <button onClick={() => Edit(item.id)} >Edit</button>
                  <button onClick={() => Delete(item.id)} >Delete</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <nav>
        <button href="#" onClick={prevPage}>Prev</button>
        {
          numbers.map((n, i) => (
            <div key={i} className={`number_of_page ${currentPage === n ? 'active' : ''}`}>
              <span onClick={() => changeCpage(n)} className='link'>{n}</span>
            </div>
          ))
        }
        <button href="#" onClick={nextPage}>Next</button>
      </nav>
    </>
  );
}

export default App;
