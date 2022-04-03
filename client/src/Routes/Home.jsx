import React, { useEffect, useState } from "react";
import styles from "../Styles/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setLoading } from "../Redux/app/actions"

const Home = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const [nameState, setNameState] = useState("");
    const [nameString, setNameString] = useState("");

    const { isLoading } = useSelector((state) => state.app);
    const {
        contract
    } = useSelector((state) => state.app);

    const handleGetMethod = async () => {
        dispatch(setLoading(true))
        // let tempName = await contract.getName();
        // let tempName = await contract.set("user1", 22);
        // let tempName2 = await contract.set("user2", 12);
        // let tempName22 = await contract.set("user2", 52);
        // let tempName222 = await contract.set("user2", 16);
        // let tempName2222 = await contract.set("user2", 81);
        let temp = await contract.get();
        console.log(temp);
        temp.map((el) => {
            return console.log(el.name, el.age.toString())
        })
        // setNameState(tempName);
        dispatch(setLoading(false))

    }

    const handleSetMethod = async() => {
        dispatch(setLoading(true))
        // await contract.setName(nameString);
        await contract.set("user1", 22);
        await contract.set("user2", 12);
        await contract.set("user2", 52);
        await contract.set("user2", 16);
        await contract.set("user2", 81);
        // setNameString("")
        dispatch(setLoading(false))
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <p className={styles.cardText}>{nameState}</p>
                <button onClick={handleGetMethod} className={styles.cardBtn}>Get Name</button>
            </div>
            <div className={styles.card}>
                <input value={nameString} onChange={(e) => setNameString(e.target.value)} className={styles.cardInput}/>
                <button onClick={handleSetMethod} className={styles.cardBtn}>Set Name</button>
            </div>
        </div>
    );
};

export { Home };
