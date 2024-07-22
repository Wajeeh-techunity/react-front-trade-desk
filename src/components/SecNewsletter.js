import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function SecNewsLetter() {
  return (
    <>
      <Container>
        <Row>
          <Col lg={2} sm={12}></Col>
          <Col lg={8} sm={12}>
            <div className="NewsletterCon">
              <h2 className="theme-h2">Join our news letter</h2>
              <p>
                Let's join our platform community and start investing in
                cryptocurrency
              </p>
              <form action="index.php">
                <input type="email" placeholder="Enter your email" />
                <input
                  className="btn-primary"
                  type="submit"
                  value="Contact us"
                />
              </form>
            </div>
          </Col>
          <Col lg={2} sm={12}></Col>
        </Row>
      </Container>
    </>
  );
}

export default SecNewsLetter;
