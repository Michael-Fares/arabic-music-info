import "./description.css";

function Description({ scale }: { scale: Scale }) {
    const { name } = scale;
    let descriptionMarkup;

    switch(name) {
        case "Rast":
            descriptionMarkup = <p>Maqam {name} is like the western <button className="comparison-button">major</button> scale</p>;
            break;
        case "Bayati":
            descriptionMarkup =  <p>Maqam {name} is like the western <button className="comparison-button">minor</button> scale</p>;
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
