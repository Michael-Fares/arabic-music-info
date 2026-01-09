import "./compareButton.css";
import classNames from "classnames";
import QuestionMark from "../../icons/QuestionMark";

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
                {showsScale}

                <QuestionMark />
            </span>
        </button>
    );
}

export default CompareButton;
