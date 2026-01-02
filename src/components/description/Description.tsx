import "./description.css";

function Description({ scale }: { scale: Scale }) {
    const { name } = scale;
    let descriptionMarkup;

    switch(name) {
        case "Rast":
            descriptionMarkup = <p>Maqam {name} is like the western major scale</p>;
            break;
        case "Bayati":
            descriptionMarkup =  <p>Maqam {name} is like the western minor scale</p>;
            break;
        default:
            descriptionMarkup = null;
    }
    return descriptionMarkup;
}

export default Description;
