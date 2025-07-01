import Header from "../../components/comon/Header";
import { useEffect, useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";

function Home() {
    const images = [
        "https://images.pexels.com/photos/19921278/pexels-photo-19921278.jpeg",
        "https://images.pexels.com/photos/10827916/pexels-photo-10827916.jpeg",
        "https://images.pexels.com/photos/7335565/pexels-photo-7335565.jpeg",
        "https://images.pexels.com/photos/7108253/pexels-photo-7108253.jpeg",
        "https://images.pexels.com/photos/19213884/pexels-photo-19213884.jpeg",
    ];

    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    });

    return (
        <div className="home">
            <Header />
            <div className="hero-wrapper" style={{ position: "relative", height: "calc(100vh - 80px)", overflow: "hidden" }}>
                <AnimatePresence>
                    <Motion.div
                        key={images[currentImage]}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="hero"
                        style={{
                            backgroundImage: `url(${images[currentImage]})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                        }}
                    >
                        <div className="hero-overlay">
                            <div className="hero-content">
                                <h1 className="hero-title">صحتك تهمنا</h1>
                                <p className="hero-description">
                                    "شفا" هو نظام إلكتروني بسيط وفعال بيساعدك تحجز ميعادك في العيادات الخيرية وأنت في بيتك، بدون ما تتعب أو تستنى في طوابير. بنسهّل على أهل القرى والمناطق البعيدة الوصول لخدمات طبية مجانية بشكل منظم وإنساني. شفا بيربطك بالأطباء والمتطوعين اللي عايزين يخدموا بجد، وبيخلي الرحلة للعلاج أسهل وأسرع بكتير. هدفنا نوصل الرعاية الصحية المجانية لكل محتاج، وندعم مجتمعنا باللي نقدر عليه.
                                </p>
                                <a href="/booking" className="hero-button">
                                    احجز دلوقتي
                                </a>
                            </div>
                        </div>
                    </Motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

export default Home;
