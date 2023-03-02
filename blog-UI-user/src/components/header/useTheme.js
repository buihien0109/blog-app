import { useEffect, useState } from "react";

const useTheme = () => {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        if (theme === "dark") {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return {
        theme,
        toggleTheme
    };
};

export default useTheme;
