import React, { useEffect } from "react";
import styles from "../Styles/Dashboard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const Dashboard = () => {
    const dispatch = useDispatch();
    const location = useLocation();
  
    return (
        <div className={styles.wrapper}>
            Dashboard Page
        </div>
    );
};

export { Dashboard };
