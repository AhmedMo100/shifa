import { Container, Row, Col } from "react-bootstrap";
import InternalHero from "../../components/comon/InternalHero";

const Services = () => {
    return (
        <>
            <InternalHero
                title="خدمات شفا"
                description="في شفا، بنوفّر خدمات بسيطة وفعالة لتسهيل الوصول للعلاج المجاني وتنظيم مواعيد العيادات الخيرية في القرى."
            />

            <div className="section-spacing"></div>

            <Container className="my-5 services-section section">
                {/* الخدمات الأساسية */}
                <Row className="mb-4 mt-5">
                    <Col>
                        <h2 className="mb-4">الخدمات التي نقدمها</h2>
                        <p className="services-description lead text-muted">
                            من خلال شفا، بنقدّم باقة من الخدمات الرقمية اللي بتخدم المرضى، الأطباء، والجمعيات الخيرية بشكل عملي ومحترم.
                        </p>
                    </Col>
                </Row>

                <Row className="gy-4 mb-5">
                    <Col md={6}>
                        <div className="card-block value-card">
                            <h5>🗓️ حجز المواعيد أونلاين</h5>
                            <p>المريض بيقدر يحجز ميعاد كشف من غير ما يروح العيادة، سواء من موبايله أو من مركز شباب أو جمعية قريبة منه.</p>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="card-block value-card">
                            <h5>👨‍⚕️ تنظيم جدول الأطباء</h5>
                            <p>بننظم جدول الدكاترة بشكل دقيق، ونعرض مواعيدهم المتاحة، علشان نمنع التكدس والزحام.</p>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="card-block value-card">
                            <h5>🏥 ربط الجمعيات بالعيادات</h5>
                            <p>بنوصل بين الجمعيات اللي عندها حالات، وبين العيادات اللي عندها دكاترة متطوعين، وكل ده إلكتروني وشفاف.</p>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="card-block value-card">
                            <h5>📊 تقارير ومتابعة</h5>
                            <p>الدكاترة والمتطوعين بيقدروا يتابعوا الحالات، ويحصلوا على تقارير باللي تم علشان نطور الخدمة دايمًا.</p>
                        </div>
                    </Col>
                </Row>

                <hr />

                {/* لماذا تختار شفا؟ */}
                <Row className="mb-4 mt-5">
                    <Col>
                        <h2 className="mb-4">ليه تختار شفا؟</h2>
                        <p className="services-description lead text-muted">
                            بنقدّم أكتر من مجرد خدمة، إحنا بنبني نظام بيساعد المجتمع، ويخلّي حياة الناس أسهل وأكرم.
                        </p>
                    </Col>
                </Row>

                <Row className="gy-4 mb-5">
                    <Col md={6}>
                        <div className="card-block">
                            <h5>🖥️ واجهة سهلة وسريعة</h5>
                            <p>تم تصميم شفا علشان أي حد يقدر يتعامل معاه، حتى اللي بيستخدم الإنترنت لأول مرة.</p>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="card-block">
                            <h5>🤝 تعاون حقيقي</h5>
                            <p>بنشتغل مع الجمعيات والمتطوعين والدكاترة كفريق واحد بهدف خدمة المجتمع.</p>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="card-block">
                            <h5>🔒 بيانات آمنة</h5>
                            <p>خصوصية المستخدم وأمان بياناته من أولوياتنا، وكل حاجة بتتم في سرية تامة.</p>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="card-block">
                            <h5>📈 تطوير مستمر</h5>
                            <p>بنتابع الملاحظات ونحدث المنصة باستمرار علشان تفضل دايمًا فعالة وسهلة.</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Services;
