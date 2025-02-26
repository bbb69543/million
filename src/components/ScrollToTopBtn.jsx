import { useState, useEffect, useRef } from "react";
import { KeyboardArrowUp } from "@mui/icons-material";

function ScrollToTopButton(props) {
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const container = document.getElementById(props.containerId);
        if (!container) return;

        containerRef.current = container;

        const toggleVisibility = () => {
            setIsVisible(container.scrollTop > 300); // 當滾動超過 300px 顯示按鈕
        };

        container.addEventListener("scroll", toggleVisibility);
        return () => container.removeEventListener("scroll", toggleVisibility);
    }, [props.containerId]);

    const scrollToTop = () => {
        if (containerRef.current) {
            containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
        }
    };
    return (
        <button
            onClick={scrollToTop}
            className={`scroll-to-top-btn ${isVisible ? "show" : "hide"}`}
        >
            <KeyboardArrowUp fontSize="medium" />
        </button>
    );
};

export default ScrollToTopButton;