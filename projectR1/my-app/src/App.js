import  {useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] =  useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str+= "1234567890"
    if(charAllowed) str+= "!@#$%^&*-_+=[]{}~`"
    for(let i=1; i<=length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed, setPassword])

  useEffect(()=>{
    passwordGenerator()
  }, [length, numberAllowed, charAllowed])

  //useRef hook
  const passwordRef = useRef(null);

  const copyPasswordToClip = useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
    setCopied((prev)=> {
      return !prev;
    })
  })

  const [copied, setCopied] = useState(false);

  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
      <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input
        type='text'
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='Password'
        readOnly
        ref={passwordRef}
        />
      <button
      onClick={copyPasswordToClip}  
      className={`outline-none px-3 py-0.5 ${copied ? 'bg-green-700' : 'bg-blue-700'} text-white `}>{copied ? 'Copied' : 'Copy'}</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input className='cursor-pointer'
          type="range"
          min={6}
          max={60}
          value={length}
          onChange={(e) => {
            setLength(e.target.value);
            setCopied(false);
        }}
          />
          <label>Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
        <input
          type='checkbox'
          defaultChecked={numberAllowed}
          id='numberInput'
          onChange={()=>{
            setNumberAllowed((prev)=>{
              return !prev
            })
            setCopied(false)
          }        
        }
          //Here, we have to use callback function in setNumberedAllowed() so as we can get the prev value setted by the function and do operations on the prev value now
          />
        <label htmlFor='numberInput'>Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
          type='checkbox'
          defaultChecked={charAllowed}
          id="charInput"
          onChange={()=>{
            setCharAllowed((prev)=> !prev)
            setCopied(false)
          }}
          />
          <label htmlFor='charInput'>Characters</label>
        </div>
      </div>      
   </div>
  );
}

export default App;



//--------------------NOTES--------------------------//
//useEffect(() => {
//Runs on the first render
//And any time any dependency value changes
// }, [prop, state]);