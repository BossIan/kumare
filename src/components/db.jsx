import { listDocs } from "@junobuild/core";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "./Auth";
import Dashboard from "./dashboard";
function Db() {
  const { user } = useContext(AuthContext);
  const [userData, setData] = useState(0);

  const list = async () => {
    const {items} = await listDocs({
      collection: 'users',
    });
    setData(items)
    if (items == undefined || items.length == 0) {
        
      // window.location.assign("./new-user")
      return
    }
  };

  useEffect(() => {
    (async () => await list())();
  }, []);

// try {
//   const key = nanoid();
//   await setDoc({
//     collection: "users",
//     doc: {
//       key,
//       data: {
//         isNew: "true",
//     },
//   }
//   });
//   let event = new Event("reload");
//   window.dispatchEvent(event);
// } catch (error) {
//   console.log(error);
// }
console.log(userData);

if (userData.length !== 0) {
  return (
  <Dashboard/>
)
}
  
}

export default Db;