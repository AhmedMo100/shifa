// BlogPage.jsx
import { useEffect, useState } from "react";
import { Container, Row, Col, Form, InputGroup } from "react-bootstrap";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase";
import InternalHero from "../../components/comon/InternalHero";
import { FiSearch } from "react-icons/fi";

const BlogPage = () => {
    const [articles, setArticles] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchArticles = async () => {
            const snapshot = await getDocs(collection(db, "articles"));
            const articlesData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setArticles(articlesData);
        };

        fetchArticles();
    }, []);

    const filteredArticles = articles.filter((article) =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="blog-page">
            {/* Hero Section */}
            <InternalHero
                title="مدونتنا"
                description="تابع معنا آخر المقالات والنصائح المفيدة من شفا"
            />

            {/* Search + Articles */}
            <Container className="my-5">
                {/* ✅ Search Bar with Icon */}
                <InputGroup className="mb-4 search-bar-wrapper">
                    <InputGroup.Text className="search-icon">
                        <FiSearch />
                    </InputGroup.Text>
                    <Form.Control
                        type="text"
                        placeholder="ابحث عن مقال..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-bar"
                    />
                </InputGroup>

                {/* ✅ Articles List */}
                <Row>
                    {filteredArticles.length === 0 && (
                        <p className="text-center text-muted">لا توجد مقالات مطابقة.</p>
                    )}
                    {filteredArticles.map((article) => (
                        <Col key={article.id} md={6} lg={4} className="mb-4">
                            <div className="article-card p-3 border rounded shadow-sm h-100">
                                {article.image && (
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="mb-3"
                                        style={{
                                            width: "100%",
                                            height: "200px",
                                            objectFit: "cover",
                                            borderRadius: "8px",
                                        }}
                                    />
                                )}
                                <h5 className="fw-bold">{article.title}</h5>
                                <p className="text-muted" style={{ fontSize: "0.95rem" }}>
                                    {article.content.length > 100
                                        ? article.content.slice(0, 100) + "..."
                                        : article.content}
                                </p>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default BlogPage;
