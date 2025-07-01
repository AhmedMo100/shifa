import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const InternalHero = ({ title, description }) => {
    return (
        <div
            className="internal-hero-section"
            style={{
                backgroundImage: `url('https://images.pexels.com/photos/19921278/pexels-photo-19921278.jpeg')`,
            }}
        >
            <div className="internal-hero-overlay">
                <Container className="internal-hero-content text-center text-white">
                    <h1 className="internal-hero-title">{title}</h1>
                    <p className="internal-hero-description">{description}</p>
                    <Link to="/" className="internal-hero-button mt-3">
                        العودة للرئيسية
                    </Link>
                </Container>
            </div>
        </div>
    );
};

export default InternalHero;
