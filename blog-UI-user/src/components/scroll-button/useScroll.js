import { useEffect, useState } from "react";

const useScroll = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisible = () => {
            const scrolled = document.documentElement.scrollTop;
            if (scrolled > 300) {
                setVisible(true);
            } else if (scrolled <= 300) {
                setVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisible);

        return () => {
            window.removeEventListener("scroll", toggleVisible);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return {
        visible,
        scrollToTop
    }
}

export default useScroll;