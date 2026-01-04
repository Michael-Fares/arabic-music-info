import "./description.css";

interface DescriptionProps {
    scale: Scale;
    comparingScaleName: ComparisonWesternScale | ComparisonMaqam | null;
    setComparingScaleName: (value: ComparisonWesternScale | ComparisonMaqam | null) => void;
}

function Description({ scale, comparingScaleName, setComparingScaleName }: DescriptionProps) {
    const { name } = scale;
    let descriptionMarkup;

    const handleComparisonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if(!comparingScaleName) {
            setComparingScaleName(e.currentTarget.getAttribute("data-comparing-scale-name") as ComparisonWesternScale | ComparisonMaqam);
        } else {
            setComparingScaleName(null);
        }
    };

    switch(name) {
        case "rast":
            descriptionMarkup = <p>Maqam {name} is like the western <button className="comparison-button" data-comparing-scale-name="major" onClick={handleComparisonClick}>major</button> scale</p>;
            break;
        case "bayati":
            descriptionMarkup =  <p>Maqam {name} is like the western <button className="comparison-button" data-comparing-scale-name="minor" onClick={handleComparisonClick}>minor</button> scale</p>;
            break;
        default:
            descriptionMarkup = null;
    }
    return (
        <div className="description">
            {descriptionMarkup}
        </div>
    );
}

export default Description;
