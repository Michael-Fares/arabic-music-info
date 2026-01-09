import "./compareButton.css";
import classNames from "classnames";
import QuestionMark from "../../icons/QuestionMark";
import { uppercase } from "../../../utils";
interface CompareButtonProps {
    showsScale: ComparisonWesternScale | ComparisonMaqam;
    comparingScaleName: ComparisonWesternScale | ComparisonMaqam | null;
    setComparingScaleName: (
        value: ComparisonWesternScale | ComparisonMaqam | null
    ) => void;
}

function CompareButton({
    showsScale,
    comparingScaleName,
    setComparingScaleName,
}: CompareButtonProps) {
    const scaleName =
        typeof showsScale === "string" ? uppercase(showsScale) : "";
    const handleComparisonClick = () => {
        if (
            !comparingScaleName ||
            (comparingScaleName && comparingScaleName !== showsScale)
        ) {
            setComparingScaleName(
                showsScale as ComparisonWesternScale | ComparisonMaqam
            );
        } else {
            setComparingScaleName(null);
        }
    };
    return (
        <button
            className={classNames({
                "comparison-button": true,
                active:
                    !!comparingScaleName && comparingScaleName === showsScale,
            })}
            data-comparing-scale-name={showsScale}
            onClick={handleComparisonClick}
        >
            <span>
                {uppercase(scaleName)}
                <QuestionMark />
            </span>
        </button>
    );
}

export default CompareButton;
