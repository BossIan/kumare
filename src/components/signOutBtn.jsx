import { signOut } from "@junobuild/core";
import { useNavigate } from "react-router-dom";

export function SignOutBtn() {
    const navigate = useNavigate();
    function signOutBtn() {
        signOut().then(
            function () {
                navigate("/")
            }
        )
    }
    return(
       <button onClick={signOutBtn}>Feedback</button>
    )
}

export default SignOutBtn;