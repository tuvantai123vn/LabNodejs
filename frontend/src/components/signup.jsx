import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    // Đưa logic xử lý đăng ký ở đây
    console.log(`Name: ${name}, Email: ${email}, Password: ${password}`);
    try {
      const response = await axios.post('http://localhost:4000/user/signup', {
        name,
        email,
        password,
      });

      console.log('Signup success:', response.data);
      navigate("/login");
      // Thực hiện các hành động khác sau khi đăng ký thành công
    } catch (error) {
      console.error('Signup failed:', error.response.data);
      // Xử lý lỗi và hiển thị thông báo lỗi cho người dùng
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Signup</div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSignup}
                >
                  Signup
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
