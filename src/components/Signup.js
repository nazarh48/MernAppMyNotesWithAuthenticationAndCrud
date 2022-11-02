import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'


const Signup = (props) => {
  const [credentials, setCredentials] = useState({name:"", email: "", password: "", cpassword:"" })
  let navigate = useNavigate();
  const {name, email, password, cpassword} = credentials;

  const hanldSubmit = async (e) => {
    e.preventDefault();
  if(password===cpassword){
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'

      },
      body: JSON.stringify({name, email, password }) // data we are sending
    });
    const json = await response.json();
    console.log(json)
    if (json.success) {
      // save the auth token
      localStorage.setItem('token', json.authToken);
      navigate('/login');
      props.showAlert("Account Created Successfully, Please Login to continue", "success")
    }
    else {
      props.showAlert('This email Already Exist', 'danger')
    }
  }
  else{
    props.showAlert("Password do not match", "danger")
  }
}

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value }) //here taking the name and their values from the input fields
  }
  return (
    <div className="container mt-2">
      <p className='display-5 text-center'>Signup</p>
      <form onSubmit={hanldSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={onChange} minLength={5} required  />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required />
        </div>

        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
