import { useState, useCallback, useEffect, useRef } from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [nAllowed, setNAllowed] = useState(false)
  const [cAllowed, setCAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef=useRef(null)

  const passwordGenerator = useCallback(
    () => {
      let pass = ""
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
      let nStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
      let cStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_?@#$%&^"
      let nCStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234567890-_?@#$%&^"
      let N = 0
      let rand = 0
      if (!nAllowed && !cAllowed) {
        for (let i = 0; i < length; i++) {
          N = str.length;
          rand = Math.floor(Math.random() * N)
          pass += str[rand];
        }
        setPassword(pass)
      }
      else if (!nAllowed && cAllowed) {
        for (let i = 0; i < length; i++) {
          N = cStr.length;
          rand = Math.floor(Math.random() * N)
          pass += cStr[rand];
        }
        setPassword(pass)
      }
      else if (nAllowed && !cAllowed) {
        for (let i = 0; i < length; i++) {
          N = nStr.length;
          rand = Math.floor(Math.random() * N)
          pass += nStr[rand];
        }
        setPassword(pass)
      }
      else {
        for (let i = 0; i < length; i++) {
          N = nCStr.length;
          rand = Math.floor(Math.random() * N)
          pass += nCStr[rand];
        }
        setPassword(pass)
      }
    },
    [nAllowed, cAllowed, length, setPassword],
  )

  const copyPasswordToClipboard=useCallback(()=>{
    window.navigator.clipboard.writeText(password)
  },[password]) //password was not needed in hear

  useEffect(() => {
    passwordGenerator();
  }, [cAllowed, nAllowed, length, passwordGenerator]);



  return (
    <>
      <h1 className=' m-4 p-4 text-4xl text-center text-white'>Password Generator</h1>
      <div><p className=' m-4 p-4 text-white text-center inline' value={password} ref={passwordRef} >Password: {password}</p>
        <button
  className="bg-blue-500 hover:bg-blue-400 active:bg-blue-600 text-white font-bold py-2 px-4 border-b-4 border-blue-700 active:border-blue-800 hover:border-blue-500 rounded active:translate-y-1 transition duration-150"
  onClick={copyPasswordToClipboard}
>
  Copy
</button>
</div>

      <label><input className='cursor-pointer' type="range" min={8} max={100} value={length}
        onChange={(e) => {
          setLength(e.target.value)
        }}
      />
        <span className=" m-4 p-4 text-gray-700">Length: {length}</span>
      </label>
      <label className="inline-flex items-center">
        <input type="checkbox" className="form-checkbox h-5 w-5 text-green-500 rounded-full" value={cAllowed}
          onChange={() => {
            setCAllowed((prev) => !prev)
          }}
        ></input>
        <span className=" m-4 p-4 text-gray-700">Charecters</span>
      </label>
      <label className="inline-flex items-center">
        <input type="checkbox" className="form-checkbox h-5 w-5 text-green-500 rounded-full" value={nAllowed}
          onChange={() => {
            setNAllowed((prev) => !prev)
          }}
        ></input>
        <span className=" m-4 p-4 text-gray-700">Numbers</span>
      </label>
    </>
  )
}

export default App
