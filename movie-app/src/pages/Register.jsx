import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import GoogleLogin from '../components/GoogleLogin';
import CarouselSlider from '../components/CarouselSlider';
import { useDispatch } from 'react-redux';
import { register } from '../redux/actions/authActions';

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isClicked, setIsClicked] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      let data = JSON.stringify({
        name,
        email,
        password,
      });

      dispatch(register(data, navigate));

      let config = {
        method: 'post',
        url: `${import.meta.env.VITE_API}/v1/auth/register`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      };

      const response = await axios.request(config);
      const { token } = response.data.data;

      localStorage.setItem('token', token);

      navigate('/');

      // Temporary solution
      window.location.href = '/';
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response.data.message);
        return;
      }
      toast.error(error.message);
    }
  };

  const handleCloseRegister = () => {
    const register = document.querySelector('.wrapper-register');
    register.classList.remove('active');
  };

  const handleShowPassword = () => {
    setIsClicked(!isClicked);
    var passwordField = document.getElementById('passwordField');
    passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
  };

  return (
    <>
      <>
        <CarouselSlider />
      </>
      <div className="wrapper-register">
        <Container className="d-flex justify-content-center align-item-center">
          <Row className="baris-register">
            <Col>
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <div className="tag-group">
                    <h1 className="tag-register">Create Account</h1>
                    <label onClick={handleCloseRegister} className="cross">
                      <i className="fa-solid fa-forward"></i>
                    </label>
                  </div>
                  <div className="line" id="formBasicEmail">
                    <div className="form-input">
                      <input type="text" placeholder="First Name" className="isi-form" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-icon">
                      <i className="fa-regular fa-user"></i>
                    </div>
                  </div>
                  <div className="line" id="formBasicEmail">
                    <div className="form-input">
                      <input type="email" placeholder="Email Address" className="isi-form" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-icon">
                      <i className="fa-regular fa-envelope"></i>
                    </div>
                  </div>
                  <div className="line" id="formBasicPassword">
                    <div className="form-input">
                      <input type="password" id="passwordField" placeholder="Password" className="isi-form" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="form-icon" onClick={handleShowPassword}>
                      {isClicked ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-regular fa-eye"></i>}
                    </div>
                  </div>
                  {/* <div className="line">
                    <div className="form-input">
                      <input type="password" placeholder="Password Confirmation" className="isi-form" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
                    </div>
                    <div className="form-icon">
                      <i className="fa-regular fa-eye"></i>
                    </div>
                  </div> */}
                  <button type="submit" className="tombol-submit">
                    Register Now
                  </button>
                  <GoogleLogin buttonText="Register with Google" />
                </div>
              </form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Register;
