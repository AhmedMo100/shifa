import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import InternalHero from "../../components/comon/InternalHero";
import { db } from "../../services/firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const MAX_BOOKINGS_PER_DAY = 2;

const BookingPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        nationalId: "",
        hospital: "",
        clinic: "",
        date: "",
    });

    const [formErrors, setFormErrors] = useState({});
    const [hospitals, setHospitals] = useState([]);
    const [clinics, setClinics] = useState([]);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [pdfDoc, setPdfDoc] = useState(null);
    const [formSubmitted, setFormSubmitted] = useState(false);

    useEffect(() => {
        const mockHospitals = [
            { id: 1, name: "مستشفى المنصورة العام", clinics: ["عيادة الباطنة", "عيادة العظام", "عيادة الأطفال"] },
            { id: 2, name: "مستشفى الزقازيق الجامعي", clinics: ["عيادة القلب", "عيادة الأسنان", "عيادة الجلدية"] },
            { id: 3, name: "مستشفى سوهاج المركزي", clinics: ["عيادة الأطفال", "عيادة النساء والتوليد", "عيادة الباطنة"] },
            { id: 4, name: "مستشفى أسيوط الجامعي", clinics: ["عيادة العيون", "عيادة العظام", "عيادة الجلدية"] },
            { id: 5, name: "مستشفى طنطا العام", clinics: ["عيادة القلب", "عيادة الأنف والأذن", "عيادة الأسنان"] },
            { id: 6, name: "مستشفى الإسكندرية التخصصي", clinics: ["عيادة الكبد", "عيادة العيون", "عيادة الأطفال"] },
            { id: 7, name: "مستشفى كفر الشيخ العام", clinics: ["عيادة العظام", "عيادة الباطنة", "عيادة النساء"] },
            { id: 8, name: "مستشفى بني سويف المركزي", clinics: ["عيادة الأطفال", "عيادة الأنف والأذن", "عيادة العيون"] },
            { id: 9, name: "مستشفى الفيوم الجامعي", clinics: ["عيادة القلب", "عيادة الأسنان", "عيادة الجلدية"] },
            { id: 10, name: "مستشفى دمنهور التعليمي", clinics: ["عيادة الباطنة", "عيادة الكلى", "عيادة العيون"] },
        ];
        setHospitals(mockHospitals);
    }, []);

    useEffect(() => {
        const selected = hospitals.find((h) => h.name === formData.hospital);
        setClinics(selected ? selected.clinics : []);
    }, [formData.hospital, hospitals]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setFormErrors({ ...formErrors, [name]: "" });
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.name.trim()) errors.name = "يرجى إدخال الاسم بالكامل.";
        if (!formData.phone.match(/^01[0-9]{9}$/)) errors.phone = "يرجى إدخال رقم هاتف مصري صحيح.";
        if (!formData.nationalId.match(/^[0-9]{14}$/)) errors.nationalId = "الرقم القومي يجب أن يكون 14 رقم.";
        if (!formData.hospital) errors.hospital = "يرجى اختيار المستشفى.";
        if (!formData.clinic) errors.clinic = "يرجى اختيار العيادة.";
        if (!formData.date) errors.date = "يرجى اختيار التاريخ.";

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.addFileToVFS("Amiri-Regular.ttf", window.amiriFont);
        doc.addFont("Amiri-Regular.ttf", "Amiri", "normal");
        doc.setFont("Amiri");
        doc.setFontSize(14);

        doc.text("تأكيد حجز موعد في العيادة", 105, 20, null, null, "center");

        autoTable(doc, {
            styles: { font: "Amiri", fontStyle: "normal", halign: "right" },
            head: [["العنصر", "القيمة"]],
            body: [
                ["الاسم", formData.name],
                ["رقم الهاتف", formData.phone],
                ["الرقم القومي", formData.nationalId],
                ["المستشفى", formData.hospital],
                ["العيادة", formData.clinic],
                ["تاريخ الحجز", formData.date],
            ],
            startY: 30,
            margin: { right: 10, left: 10 },
        });

        return doc;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        setError(null);
        setPdfDoc(null);

        if (!validateForm()) return;

        try {
            const q = query(
                collection(db, "bookings"),
                where("hospital", "==", formData.hospital),
                where("clinic", "==", formData.clinic),
                where("date", "==", formData.date)
            );
            const snapshot = await getDocs(q);

            if (snapshot.size >= MAX_BOOKINGS_PER_DAY) {
                setError("❌ هذا اليوم غير متاح، يرجى اختيار موعد آخر.");
                return;
            }

            await addDoc(collection(db, "bookings"), formData);
            setMessage("✅ تم تسجيل الحجز بنجاح.");
            setFormSubmitted(true);

            try {
                const generatedDoc = generatePDF();
                setPdfDoc(generatedDoc);
            } catch (pdfError) {
                console.error("PDF generation error:", pdfError);
                setMessage("تم تسجيل الحجز");
            }

        } catch (err) {
            console.error("Booking error:", err);
            setError("❌ حدث خطأ أثناء التسجيل. حاول مرة أخرى.");
            setMessage(null);
        }
    };

    const handleDownload = () => {
        if (pdfDoc) pdfDoc.save("booking-confirmation.pdf");
    };

    return (
        <>
            <InternalHero
                title="حجز موعد في العيادة"
                description="سجل بياناتك واحجز ميعادك بسهولة وفي دقائق."
            />

            <Container className="my-5 booking-section">
                <Row className="justify-content-center">
                    <Col md={8}>
                        <h2 className="mb-4 text-center">بيانات الحجز</h2>

                        {message && <Alert variant="success" className="text-center fw-bold">{message}</Alert>}
                        {error && <Alert variant="danger" className="text-center fw-bold">{error}</Alert>}

                        {pdfDoc && (
                            <div className="text-center mb-4">
                                <Button variant="outline-success" onClick={handleDownload}>
                                    تحميل ملف التأكيد
                                </Button>
                            </div>
                        )}

                        {!formSubmitted && (
                            <Form onSubmit={handleSubmit} noValidate>
                                {[
                                    { name: "name", label: "الاسم بالكامل", type: "text" },
                                    { name: "phone", label: "رقم الهاتف", type: "tel" },
                                    { name: "nationalId", label: "الرقم القومي", type: "text" },
                                    { name: "date", label: "تاريخ الحجز", type: "date" },
                                ].map(({ name, label, type }) => (
                                    <Form.Group key={name} className="mb-3 text-end">
                                        <Form.Label>{label}</Form.Label>
                                        <Form.Control
                                            type={type}
                                            name={name}
                                            value={formData[name]}
                                            onChange={handleChange}
                                            isInvalid={!!formErrors[name]}
                                        />
                                        <Form.Control.Feedback type="invalid">{formErrors[name]}</Form.Control.Feedback>
                                    </Form.Group>
                                ))}

                                <Form.Group className="mb-3 text-end">
                                    <Form.Label>المستشفى</Form.Label>
                                    <Form.Select
                                        name="hospital"
                                        value={formData.hospital}
                                        onChange={handleChange}
                                        isInvalid={!!formErrors.hospital}
                                    >
                                        <option value="">اختر المستشفى</option>
                                        {hospitals.map((h) => (
                                            <option key={h.id} value={h.name}>{h.name}</option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">{formErrors.hospital}</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-4 text-end">
                                    <Form.Label>العيادة</Form.Label>
                                    <Form.Select
                                        name="clinic"
                                        value={formData.clinic}
                                        onChange={handleChange}
                                        isInvalid={!!formErrors.clinic}
                                    >
                                        <option value="">اختر العيادة</option>
                                        {clinics.map((c, i) => (
                                            <option key={i} value={c}>{c}</option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">{formErrors.clinic}</Form.Control.Feedback>
                                </Form.Group>

                                <div className="text-center">
                                    <Button type="submit" className="shifa-contact-btn px-5 py-2">تسجيل الحجز</Button>
                                </div>
                            </Form>
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default BookingPage;
