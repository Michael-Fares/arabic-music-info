import { flatPath } from "../../constants";

function Accidental({ type }: { type: string }) {
    if (type === "flat") {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="accidental">
                <path d={flatPath} />
            </svg>
        );
    } else if (type === "half-flat") {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="accidental">
                <path d={flatPath} />
                <line
                    x1="6"
                    y1="10"
                    x2="15"
                    y2="5"
                    stroke="currentColor"
                    stroke-width="2"
                />
            </svg>
        );
    }
}

export default Accidental;
