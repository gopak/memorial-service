import React, { useState } from 'react';
import "./Login.scss";
import ReactModal from 'react-modal';


interface LoginProps {}
const customStyles = {
    content: {
        // top: '50%',
        // left: '50%',
        // right: 'auto',
        // bottom: 'auto',
        // marginRight: '-50%',
        // transform: 'translate(-50%, -50%)',
    },
};
const Login: React.FC<LoginProps> = props => {
    const [showModal, setShowModal] = useState(false)

    const handleClose = () => {
        setShowModal(false)
    }
  return (
      <div className="">
          <button className={"btn btn-link mr-2"}>Вхід</button>
          <button className={"btn"} onClick={() => setShowModal(true)}>Реєстрація</button>
          <ReactModal
              isOpen={showModal}
              shouldCloseOnOverlayClick={true}
              contentLabel="Example Modal"
              onRequestClose={handleClose}
              style={customStyles}
          >
{/*              <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>*/}
              <button onClick={() => setShowModal(false)}>close</button>
              <div>I am a modal</div>
              <form>
                  <input />
                  <button>tab navigation</button>
                  <button>stays</button>
                  <button>inside</button>
                  <button>the modal</button>
              </form>
              <p style={{margin: 50}}>asdasdadasdasdas</p>
              <p style={{margin: 50}}>asdasdadasdasdas</p>
              <p style={{margin: 50}}>asdasdadasdasdas</p>
              <p style={{margin: 50}}>asdasdadasdasdas</p>
              <p style={{margin: 50}}>asdasdadasdasdas</p>
              <p style={{margin: 50}}>asdasdadasdasdas</p>
              <p style={{margin: 50}}>asdasdadasdasdas</p>
              <p style={{margin: 50}}>asdasdadasdasdas</p>
              <p style={{margin: 50}}>asdasdadasdasdas</p>
              <p style={{margin: 50}}>asdasdadasdasdas</p>
              <p style={{margin: 50}}>asdasdadasdasdas</p>
              <p style={{margin: 50}}>asdasdadasdasdas</p>
              <p style={{margin: 50}}>asdasdadasdasdas</p>
              <p style={{margin: 50}}>asdasdadasdasdas</p>
              <p style={{margin: 50}}>asdasdadasdasdas</p>
              <p style={{margin: 50}}>asdasdadasdasdas</p>
              <p style={{margin: 50}}>asdasdadasdasdas</p>
              <p style={{margin: 50}}>asdasdadasdasdas</p>
              <p style={{margin: 50}}>asdasdadasdasdas</p>
              <p style={{margin: 50}}>asdasdadasdasdas</p>
              <p style={{margin: 50}}>asdasdadasdasdas</p>
              <p style={{margin: 50}}>asdasdadasdasdas</p>
              <p style={{margin: 50}}>asdasdadasdasdas</p>
              <p style={{margin: 50}}>asdasdadasdasdas</p>
              <p style={{margin: 50}}>asdasdadasdasdas</p>
              <p style={{margin: 50}}>asdasdadasdasdas</p>
              <p style={{margin: 50}}>asdasdadasdasdas</p>
              <p style={{margin: 50}}>asdasdadasdasdas</p>
              <p style={{margin: 50}}>asdasdadasdasdas</p>
              <p style={{margin: 50}}>asdasdadasdasdas</p>
              <p style={{margin: 50}}>asdasdadasdasdas</p>
              <p style={{margin: 50}}>asdasdadasdasdas</p>
              <p style={{margin: 50}}>asdasdadasdasdas</p>
              <p style={{margin: 50}}>asdasdadasdasdas</p>
              <p style={{margin: 50}}>asdasdadasdasdas</p>
              <p style={{margin: 50}}>asdasdadasdasdas</p>
              <p style={{margin: 50}}>asdasdadasdasdas</p>
              <p style={{margin: 50}}>asdasdadasdasdas</p>
              <p style={{margin: 50}}>asdasdadasdasdas</p>
              <p style={{margin: 50}}>asdasdadasdasdas</p>
              <p style={{margin: 50}}>asdasdadasdasdas</p>
              <p style={{margin: 50}}>asdasdadasdasdas</p>
              <p style={{margin: 50}}>asdasdadasdasdas</p>
              <p style={{margin: 50}}>asdasdadasdasdas</p>
              <p style={{margin: 50}}>asdasdadasdasdas</p>
              <p style={{margin: 50}}>asdasdadasdasdas</p>
              <p style={{margin: 50}}>asdasdadasdasdas</p>
              <p style={{margin: 50}}>asdasdadasdasdas</p>
              <p style={{margin: 50}}>asdasdadasdasdas</p>
              <p style={{margin: 50}}>asdasdadasdasdas</p>
              <p style={{margin: 50}}>asdasdadasdasdas</p>
              <p style={{margin: 50}}>asdasdadasdasdas</p>
          </ReactModal>
          </div>
  );
}

export default Login;
