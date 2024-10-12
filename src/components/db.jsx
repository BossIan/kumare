import { setDoc, listDocs } from "@junobuild/core";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../../kumare/src/components/Auth";
import { nanoid } from "nanoid"; 
function Db() {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  useEffect(() => {
    window.addEventListener("reload", list);

    return () => {
      window.removeEventListener("reload", list);
    };
  }, []);

  const list = async () => {
    // TODO: STEP_7_LIST_DOCS
    try {
      const { items } = await listDocs({
        collection: "notes",
      });
      setItems(items);
      console.log(items);
    } catch (error) {
      console.log(error);
      
    }
};
  
  useEffect(() => {


    (async () => await list())();
  }, [user]);

    const add = async () => {
      try {
        const key = nanoid();
        await setDoc({
          collection: "users",
          doc: {
            key,
            data: {
              isNew: "false",
          },
        }
        });
        console.log(key);
        let event = new Event("reload");
        window.dispatchEvent(event);
      } catch (error) {
        console.log(error);
      }
    }

    return(
      <div>
      <button onClick={add}>
        Submit
      </button>

      </div>
    );
}

export default Db;