import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import './Profile.css';

const Profile = () => {
  return (
    <Container>
        <h2 className='welcome'>Welcome Anjali!</h2>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
            <Card className="card-profile">
                <Card.Body className="card-body">
                    <Card.Title className="card-title-profile">Profile</Card.Title>
                        <Card.Text className="card-text-profile">
                            <strong className='text-area'>First Name:</strong> Anjali<br />
                            <strong className='text-area'>Last Name:</strong> Benjamin<br />
                            <strong className='text-area'>Email:</strong> anjali.rachel@gmail.com
                        </Card.Text>
                </Card.Body>
            </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
