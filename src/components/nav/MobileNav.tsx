import { uppercase } from "../../utils";
import "./mobileNav.css";
import { useState } from "react";
function MobileNav({ maqamList }: { maqamList: string[] }) {
    const [ isOpen ,  setIsOpen] = useState(false);
    return (
        <div className="nav-mobile">
            <div className="hamburger-menu-flex-wrapper">
                <label className="hamburger-menu">
                    <input type="checkbox" checked={isOpen} onChange={() => setIsOpen(!isOpen)} />
                </label>
            </div>
            <aside className="sidebar">
                <nav>
                    <p>Maqams:</p>
                    <ul>
                        {maqamList.map((maqam) => {
                            return (
                                <li key={maqam} onClick={() => setIsOpen(!isOpen)}>
                                    <a href={`#${maqam}`}>{uppercase(maqam)}</a>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </aside>
        </div>
    );
}

export default MobileNav;