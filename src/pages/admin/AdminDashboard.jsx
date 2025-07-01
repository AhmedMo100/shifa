import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, Tab, Nav } from "react-bootstrap";
import {
    FaPlus,
    FaEdit,
    FaTrash,
    FaChartBar,
    FaFileAlt,
    FaUsers,
    FaCalendarAlt,
} from "react-icons/fa";
import {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
    onSnapshot,
} from "firebase/firestore";
import { db } from "../../services/firebase";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
    const [articles, setArticles] = useState([]);
    const [newArticle, setNewArticle] = useState({
        title: "",
        content: "",
        image: "",
    });
    const [editId, setEditId] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [users, setUsers] = useState([]);

    // ✅ جلب الحجوزات والمستخدمين
    useEffect(() => {
        const fetchBookings = async () => {
            const bookingsSnapshot = await getDocs(collection(db, "bookings"));
            const bookingsList = bookingsSnapshot.docs.map((doc) => doc.data());
            setBookings(bookingsList);

            const usersList = bookingsList.map((b) => ({
                name: b.name || "-",
                phone: b.phone || "-",
                nationalId: b.nationalId || "-",
            }));
            setUsers(usersList);
        };

        fetchBookings();
    }, []);

    // ✅ جلب المقالات لحظيًا من Firestore
    useEffect(() => {
        const unsub = onSnapshot(collection(db, "articles"), (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setArticles(data);
        });

        return () => unsub();
    }, []);

    // ✅ إضافة أو تعديل مقال
    const handleAddOrEdit = async () => {
        if (!newArticle.title || !newArticle.content) return;

        if (editId) {
            const articleRef = doc(db, "articles", editId);
            await updateDoc(articleRef, newArticle);
            setEditId(null);
        } else {
            await addDoc(collection(db, "articles"), newArticle);
        }

        setNewArticle({ title: "", content: "", image: "" });
    };

    // ✅ تجهيز المقال للتعديل
    const handleEdit = (article) => {
        setNewArticle({
            title: article.title,
            content: article.content,
            image: article.image,
        });
        setEditId(article.id);
    };

    // ✅ حذف مقال
    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "articles", id));
    };

    const bookingsCountByClinic = bookings.reduce((acc, curr) => {
        acc[curr.clinic] = (acc[curr.clinic] || 0) + 1;
        return acc;
    }, {});

    const chartData = Object.entries(bookingsCountByClinic).map(
        ([clinic, count]) => ({
            clinic,
            count,
        })
    );

    return (
        <Tab.Container defaultActiveKey="articles">
            <div className="admin-dashboard d-flex">
                {/* Sidebar */}
                <div
                    className="sidebar p-3"
                    style={{ width: "220px", background: "#f1f1f1" }}
                >
                    <h4 className="mb-4">لوحة التحكم</h4>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                            <Nav.Link eventKey="articles">
                                <FaFileAlt /> المقالات
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="bookings">
                                <FaCalendarAlt /> الحجوزات
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="users">
                                <FaUsers /> المستخدمين
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="analytics">
                                <FaChartBar /> التحليلات
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>

                {/* Main Content */}
                <div className="dashboard-content p-4 flex-grow-1">
                    <Tab.Content>
                        {/* المقالات */}
                        <Tab.Pane eventKey="articles">
                            <h2 className="mb-4">إدارة المقالات</h2>
                            <Form className="mb-4">
                                <Form.Group className="mb-3">
                                    <Form.Label>عنوان المقال</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={newArticle.title}
                                        onChange={(e) =>
                                            setNewArticle({ ...newArticle, title: e.target.value })
                                        }
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>صورة المقال (رابط)</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={newArticle.image}
                                        onChange={(e) =>
                                            setNewArticle({ ...newArticle, image: e.target.value })
                                        }
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>محتوى المقال</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={4}
                                        value={newArticle.content}
                                        onChange={(e) =>
                                            setNewArticle({ ...newArticle, content: e.target.value })
                                        }
                                    />
                                </Form.Group>
                                <Button onClick={handleAddOrEdit}>
                                    {editId ? (
                                        <>
                                            <FaEdit /> تعديل
                                        </>
                                    ) : (
                                        <>
                                            <FaPlus /> إضافة
                                        </>
                                    )}
                                </Button>
                            </Form>

                            <Row>
                                {articles.map((article) => (
                                    <Col md={6} key={article.id} className="mb-4">
                                        <div className="p-3 border rounded">
                                            {article.image && (
                                                <img
                                                    src={article.image}
                                                    alt="article"
                                                    style={{
                                                        width: "100%",
                                                        height: "200px",
                                                        objectFit: "cover",
                                                        marginBottom: "10px",
                                                    }}
                                                />
                                            )}
                                            <h5>{article.title}</h5>
                                            <p>{article.content}</p>
                                            <div>
                                                <Button
                                                    variant="warning"
                                                    size="sm"
                                                    className="me-2"
                                                    onClick={() => handleEdit(article)}
                                                >
                                                    <FaEdit />
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => handleDelete(article.id)}
                                                >
                                                    <FaTrash />
                                                </Button>
                                            </div>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </Tab.Pane>

                        {/* الحجوزات */}
                        <Tab.Pane eventKey="bookings">
                            <h2 className="mb-4">كل الحجوزات</h2>
                            <Row>
                                {bookings.map((b, i) => (
                                    <Col md={6} key={i} className="mb-3">
                                        <div className="p-3 border rounded bg-light">
                                            <h5>{b.name}</h5>
                                            <p>العيادة: {b.clinic}</p>
                                            <p>التاريخ: {b.date}</p>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </Tab.Pane>

                        {/* المستخدمين */}
                        <Tab.Pane eventKey="users">
                            <h2 className="mb-4">قائمة المستخدمين</h2>
                            <Row>
                                {users.map((user, i) => (
                                    <Col md={6} key={i} className="mb-3">
                                        <div className="p-3 border rounded bg-light">
                                            <h5>{user.name}</h5>
                                            <p>رقم الهاتف: {user.phone}</p>
                                            <p>الرقم القومي: {user.nationalId}</p>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </Tab.Pane>

                        {/* التحليلات */}
                        <Tab.Pane eventKey="analytics">
                            <h2 className="mb-4">التحليلات</h2>
                            <h5>عدد الحجوزات حسب العيادة</h5>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={chartData}>
                                    <XAxis dataKey="clinic" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="count" fill="#00bcd4" />
                                </BarChart>
                            </ResponsiveContainer>
                        </Tab.Pane>
                    </Tab.Content>
                </div>
            </div>
        </Tab.Container>
    );
};

export default AdminDashboard;
