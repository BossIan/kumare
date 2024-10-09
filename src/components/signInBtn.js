import { signIn } from "@junobuild/core";
import { createContext } from "react";
import { AuthContext } from './Auth';
import { useContext } from 'react';
function SignInBtn({ className, src, text, leftImg}) {
    const left = createContext();
    const { user } = useContext(AuthContext);
    function signInfun() {
            if (user !== undefined && user !== null) {
                window.location.assign("./dashboard")
        } else {
          signIn().then(function () {
            window.location.assign("./dashboard")
        })
        }
      }
    return(
        <left.Provider value={{ leftImg }}>
            {leftImg? (
                <button onClick={signInfun} className={className}>
                <img src={src} alt='signin'/>{text}
                </button>
            ) : (
                <button onClick={signInfun} className={className}>
                {text} <img src={src} alt='signin'/>
                </button>
            )}
      
        </left.Provider>
    )
}

export default SignInBtn;