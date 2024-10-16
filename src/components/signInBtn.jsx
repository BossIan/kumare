import { listDocs, signIn } from "@junobuild/core";
import { createContext } from "react";
import { AuthContext } from './Auth';
import { useContext } from 'react';
function SignInBtn({ className, src, text, leftImg}) {
    const left = createContext();
    const { user } = useContext(AuthContext);
    const list = async () => {
        const {items} = await listDocs({
          collection: 'users',
        });
        
        if (items == undefined || items.length == 0) {
            
          window.location.assign("./new-user")
          return
        }
        window.location.assign("./dashboard")
      };
    function signInfun() {
            if (user !== undefined && user !== null) {
            list()
        } else {
          signIn().then(function () {
            list()
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