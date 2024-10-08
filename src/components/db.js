import { setDoc, listDocs } from "@junobuild/core";
import { useEffect, useState } from "react";

import { nanoid } from "nanoid"; 
function Db() {
  const [items, setItems] = useState([]);
  function listItems() {
    console.log(items);
    
  }

    const add = async () => {
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
      console.log('wea');
    }
      const list = async () => {
        const { user } = await listDocs({
          collection: "users",
        });
        setItems(user);
    };
    useEffect(() => {
      (async () => await list())();
    })
    return(
      <div>
      <button onClick={add}>
        Submit
      </button>
      <button onClick={listItems}>
        List
      </button>
      </div>
    );
}

export default Db;