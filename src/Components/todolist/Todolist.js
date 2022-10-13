import React, { useState, useEffect } from 'react'


// Data Get From Localstorage
const getFromLs = () => {
    let itemlist = localStorage.getItem("items");
    console.log("itemlist", itemlist);
    if (itemlist) {
        return JSON.parse(localStorage.getItem("items"))
    } else {
        return []
    }
}

const Todolist = () => {
    const [data, setData] = useState("");
    const [items, setItems] = useState(getFromLs())
    const [togglebtn, setTogglebtn] = useState(true)
    const [Edititems, setEditItems] = useState(null)
    // Input Change Handler
    const Inputhandler = (e) => {
        console.log("e", e.target.value);
        setData(e.target.value)
    }

    // Add Handler
    const Addhandler = () => {
        if (!data) {
            alert("Please Enter SomeThing!")
        } else if (data && !togglebtn) {
            setItems(
                items.map((ele) => {
                    if (ele.id === Edititems) {
                        return { ...ele, name: data }
                    }
                    return ele
                }),
                setTogglebtn(true),
                setData(""),
                setEditItems(null)
            );
        } else {
            const AllinputData = { id: new Date().getTime().toString(), name: data }
            setItems([...items, AllinputData])
            setData("")
            localStorage.setItem("Items", [...items, data])
        }
    }

    // Data Added To LocalStorage
    useEffect(() => {
        localStorage.setItem("items", JSON.stringify(items))
    }, [items])

    // Delete Handler
    const DeleteHandler = (index) => {
        const deleteItems = items.filter((e) => {
            return index !== e.id
        })
        setItems(deleteItems)
    }

    // Update Handler
    const UpdateHandler = (id) => {
        console.log("id", id);
        const updatedItems = items.find((val) => {
            return val.id === id;
        })
        console.log("updatedItems", updatedItems);
        setTogglebtn(false)
        setData(updatedItems.name)
        setEditItems(id)
    }
    return (
        <div>
            <h1 className='mt'>Todolist In React.js</h1>
            <input type="text" placeholder='Enter Here...' value={data} onChange={Inputhandler} />
            {
                togglebtn ? <button onClick={Addhandler} >Add</button> : <button onClick={Addhandler} >Edit</button>
            }

            {
                items.map((val, index) => {
                    console.log("val", val);
                    return (
                        <div key={val.id} style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "20px", }} >
                            <h1> {val.name} </h1>
                            <button onClick={() => DeleteHandler(val.id)} style={{ marginTop: "8px" }} >Delete</button>
                            <button onClick={() => UpdateHandler(val.id)} style={{ marginTop: "8px" }} >Update</button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Todolist
