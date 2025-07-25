import { Container, Row, Col } from "react-bootstrap";
import InternalHero from "../../components/comon/InternalHero";

const AboutUs = () => {
    return (
        <>
            <InternalHero
                title="عن شفا"
                description="شفا منصة بتسهّل على أهل القرى حجز مواعيد العيادات الخيرية وتنظيمها علشان يوصل العلاج للمحتاجين بسهولة وبكرامة."
            />
            <Container className="my-5 about-section section">
                {/* من نحن */}
                <Row className="mb-5">
                    <Col>
                        <h2 className="text-primary mb-3">من نحن</h2>
                        <p>
                            في قلب الريف المصري، كتير من الأهالي بيعانوا علشان يوصلوا لرعاية صحية مناسبة. العيادات الخيرية موجودة، بس التنظيم ضعيف، والزحام بيخلي الناس تستنى بالساعات، وفي ناس بتروح وترجع من غير ما تكشف.
                            من هنا بدأنا "شفا".
                        </p>
                        <p>
                            "شفا" هو نظام إلكتروني بسيط وسريع، اتصمم مخصوص علشان يخدم الناس اللي بجد محتاجة توصل للدكتور بسهولة. إحنا فريق من المطورين والمتطوعين، اجتمعنا على هدف واحد: نسهّل الوصول للعلاج المجاني في القرى، ونخلّي عملية الحجز سهلة ومحترمة لكل إنسان، بدون ما يضيع وقته أو كرامته.
                        </p>
                        <p>
                            هدفنا مش بس نعمل موقع، لكن نخلق تجربة محترمة، منظمة، وآمنة لأهالينا اللي فعلاً يستاهلوا أفضل خدمة.
                        </p>
                    </Col>
                </Row>

                <hr />

                {/* رؤيتنا */}
                <Row className="mb-5 mt-5">
                    <Col>
                        <h3 className="text-success mb-3">رؤيتنا</h3>
                        <p>
                            بنتخيّل مستقبل كل قرية فيها نظام عادل ومنظم بيساعد الناس تكشف وتتعالج بدون وسطة، ولا زحمة، ولا تعب. رؤيتنا إن الرعاية الصحية المجانية تبقى متاحة بسهولة لأي محتاج، وإن كل مريض يلاقي فرصة حقيقية للعلاج، مهما كان فين.
                        </p>
                        <p>
                            إحنا بنحلم بمجتمع صحي، فيه كل فرد قادر يحافظ على صحته بدون ما يحس إنه عبء، أو إنه بيتذل علشان ياخد حقه في العلاج.
                        </p>
                    </Col>
                </Row>

                <hr />

                {/* مهمتنا */}
                <Row className="mb-5 mt-5">
                    <Col>
                        <h3 className="text-success mb-3">مهمتنا</h3>
                        <p>
                            مهمتنا في "شفا" هي إننا نبني نظام إلكتروني بسيط جدًا، يقدر أي حد يستخدمه سواء من موبايله أو من مركز شباب أو جمعية خيرية. النظام بيخلّي الحجز في العيادات الخيرية يتم بكبسة زر، من غير لف ولا دوران.
                        </p>
                        <p>
                            بننظّم المواعيد، بنساعد الدكاترة، وبنرتّب الحالات حسب الأولوية، وبنوفّر للمريض ميعاد ثابت يقدر يعتمد عليه. هدفنا نوصل النظام ده لأكبر عدد ممكن من العيادات، ونربطه بجمعيات ومراكز مجتمعية علشان نغطي كل القرى.
                        </p>
                    </Col>
                </Row>

                <hr />

                <Row className="mt-5">
                    <Col>
                        <h3 className="text-warning mb-4">قيمنا</h3>
                        <Row className="gy-4">
                            <Col md={6}>
                                <div className="value-card">
                                    <h5>💡 البساطة في الاستخدام</h5>
                                    <p>النظام معمول علشان أي حد يستخدمه بسهولة، حتى اللي مش متعلم أو معندوش خبرة بالتقنية.</p>
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="value-card">
                                    <h5>🤝 الشفافية والتعاون</h5>
                                    <p>كل خطوات النظام واضحة، وبنشتغل مع الجمعيات والدكاترة كفريق واحد بدون تعقيدات.</p>
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="value-card">
                                    <h5>❤️ الإنسانية في التعامل</h5>
                                    <p>بنتعامل مع المريض كإنسان قبل أي شيء، ونحترم ظروفه ووقته وكرامته.</p>
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="value-card">
                                    <h5>⚙️ الكفاءة في الأداء</h5>
                                    <p>كل يوم بنطوّر النظام علشان يبقى أسرع وأسهل ويوصل الخدمة بأفضل شكل ممكن.</p>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>

            </Container>
        </>
    );
};

export default AboutUs;
