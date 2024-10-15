import React from 'react';
import logo from './logo.svg';
// import './App.css';
// import './scss/styles.scss';
import {SubmitHandler, useForm} from "react-hook-form";
interface Props {}

type Inputs = {
  example: string
  exampleRequired: string
}

const App: React.FC<Props> = props => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log('SubmitHandler data', data);
  }

/*
  const submitPin = async () => {
    console.log('1111111111111111');

    try {
      const response = await fetch("https://api.restful-api.dev/objects");
      console.log('res', response)
      const data = await response.json()
      console.log('res', data)
    }
    catch(err) {
      console.log('error', err)
    }

    // try{
    //   const response = await fetch('http://192.168.1.1', {
    //     method: "GET",
    //     mode: "no-cors",
    //     cache: "no-cache",
    //     referrerPolicy: "no-referrer"
    //   });
    //   // const data = await response.json();
    //   console.log(`result`, response);
    //   // console.log(`data`, data);
    //   console.log(`result.type: ${response.type}`);
    //   console.log(`result.ok: ${response.ok}`);
    // }
    // catch(err){
    //   console.log(err);
    // }
  }
*/

  return (
      <div className="wrapper"></div>
/*      <div className="App">
        <div className="test"></div>
        <button onClick={submitPin}>Check pin</button>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/!* register your input into the hook by invoking the "register" function *!/}
          <input defaultValue="test" {...register("example")} />

          {/!* include validation with required or other standard HTML validation rules *!/}
          <input {...register("exampleRequired", {required: true})} />
          {/!* errors will return when field validation fails  *!/}
          {errors.exampleRequired && <span>This field is required</span>}

          <input type="submit"/>
        </form>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>*/
  );
}

export default App;
