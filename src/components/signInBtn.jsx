import { listDocs, signIn } from "@junobuild/core";
import { AuthContext } from './Auth';
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
function SignInBtn({ className, src, text, leftImg}) {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const list = async () => {
        const {items} = await listDocs({
          collection: 'users',
        });
        if (items == undefined || items.length == 0) {
          navigate("/new-user")
          navigate(0);
        return
        }
        navigate("/dashboard")
        navigate(0);
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
      <div>
            {leftImg? (
                <button onClick={signInfun} className={className}>
                <img src={src} alt='signin'/>{text}
                </button>
            ) : (
                <button onClick={signInfun} className={className}>
                {text} <img src={src} alt='signin'/>
                </button>
            )}
      </div>
    )
}

export default SignInBtn;