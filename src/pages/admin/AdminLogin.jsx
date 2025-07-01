import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../services/firebase";
import { Form, Button, Container, Alert } from "react-bootstrap";

const LoginAdmin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // نتحقق من صلاحية الأدمن في Firestore
            const docRef = doc(db, "admins", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                navigate("/dashboard");
            } else {
                setError("ليس لديك صلاحية الدخول كأدمن.");
            }
        } catch (err) {
            setError("فشل تسجيل الدخول. تأكد من البيانات.", err);
        }
    };

    return (
        <Container className="login-container my-5">
            <div className="login-box p-4 rounded shadow-sm">
                <h2 className="text-center mb-4">تسجيل دخول الأدمن</h2>
                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3">
                        <Form.Label>البريد الإلكتروني</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="ادخل البريد"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>كلمة المرور</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="ادخل كلمة المرور"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100">
                        تسجيل الدخول
                    </Button>
                </Form>
            </div>
        </Container>
    );
};

export default LoginAdmin;
