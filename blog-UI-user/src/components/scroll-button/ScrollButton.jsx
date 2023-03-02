import React from "react";
import styles from "./ScrollButton.module.css";
import useScroll from "./useScroll";

function ScrollButton() {
    const { visible, scrollToTop } = useScroll();
    return (
        <button
            className={styles.btnTop}
            onClick={scrollToTop}
            style={{ display: visible ? "inline" : "none" }}
        >
            TOP
        </button>
    );
}

export default ScrollButton;
