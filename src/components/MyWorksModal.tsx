import "./AboutMe.css";
import { Card, Button, Row, Col, Container } from "react-bootstrap";

interface MyWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function MyWorksModal({ isOpen, onClose }: MyWorksModalProps) {
  if (!isOpen) return null;

  return (
    <div className="overlay" onClick={onClose}>
      <div className="window" onClick={(e) => e.stopPropagation()}>
        <div className="window__title-bar">
          <div className="window__title">My Works</div>
          <button className="window__btn" onClick={onClose}>
            &times;
            <span className="a11y-visually-hidden">Close</span>
          </button>
        </div>
        <div className="window__body">
          <h2>My Works</h2>
          <p>
            Here are some of my recent projects and works. Each project
            showcases different aspects of my skills and experience.
          </p>
          <h3>Projects</h3>
          <Container>
            <Row className="g-4 mb-4">
              <Col xs={12} md={6}>
                <Card>
                  <Card.Img variant="top" src="Poke.png" />
                  <Card.Body>
                    <Card.Title>Pokemon Quiz</Card.Title>
                    <Card.Text>
                      This is a quiz game about Pokemon. It is a simple quiz
                      game that allows you to test your knowledge about Pokemon.
                    </Card.Text>
                    <Button
                      variant="primary"
                      onClick={() =>
                        window.open(
                          "https://github.com/KazuyaMagari/Poke",
                          "_blank"
                        )
                      }
                    >
                      See Code
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} md={6}>
                <Card>
                  <Card.Img variant="top" src="first.png" />
                  <Card.Body>
                    <Card.Title>My First Three.js Project</Card.Title>
                    <Card.Text>
                      This is my first Three.js project. It is a simple 3D in
                      defalut. The theme is space which means expoloring the
                      unkonwn world.
                    </Card.Text>
                    <Button
                      variant="primary"
                      onClick={() =>
                        window.open(
                          "https://github.com/KazuyaMagari/Three-Web",
                          "_blank"
                        )
                      }
                    >
                      See Code
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row className="g-4">
              <Col xs={12} md={6}>
                <Card>
                  <Card.Img variant="top" src="BreakOut.png" />
                  <Card.Body>
                    <Card.Title>BreakOut Game</Card.Title>
                    <Card.Text>
                      This is a breakout game. It is a simple game that allows
                      you to test your skills. I used Unity to make this game
                      and blender for modeling.
                    </Card.Text>

                    {/* <Button
                      variant="primary"
                      onClick={() =>
                        window.open(
                          "https://github.com/KazuyaMagari/BreakOut",
                          "_blank"
                        )
                      }
                    >
                      See Code
                    </Button> */}
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} md={6}>
                <Card>
                  <Card.Img variant="top" src="holder.js/100px180" />
                  <Card.Body>
                    <Card.Title>
                      Image Search by Emotion (in progress)
                    </Card.Title>
                    <Card.Text>
                      This is a image search by emotion. I used React, Django,
                      and PixelBay API, and Bootstrap.
                    </Card.Text>
                    {/* <Button variant="primary">Go somewhere</Button> */}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default MyWorksModal;
