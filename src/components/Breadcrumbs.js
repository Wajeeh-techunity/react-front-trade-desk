import { Container } from 'react-bootstrap';

function Breadcrumbs({ pageTitle }) {
  return (
    <>
      <Container>
        <h1>{pageTitle}</h1>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <i className="fas fa-caret-right"></i>
          </li>
          <li>
            <span>{pageTitle}</span>
          </li>
        </ul>
      </Container>
    </>
  );
}

export default Breadcrumbs;
