import React, { useEffect } from 'react';
import styles from '../Styles/ContactMe.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from "react-router-dom";


const ContactMe = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    return (
        <div className={styles.wrapper}>
            ContactMe Page
        </div>
    )
}

export { ContactMe }