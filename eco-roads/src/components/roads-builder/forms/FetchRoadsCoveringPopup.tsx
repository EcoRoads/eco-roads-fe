import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {useAppDispatch, useAppSelector} from "../../../store/map/hook";
import {useState} from "react";
import {
    fetchRoadsCovering,
} from "../../../store/map/roads-builder/roads-builder.slice";
import * as React from "react";

export const FetchRoadsCoveringPopup = (props) => {
    const dispatch = useAppDispatch();
    const [fetchingRoadsCoveringId, setFetchingRoadsCoveringId] = useState('');

    const handleOnChange = (event) => {
        setFetchingRoadsCoveringId(event.target.value);
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Load last roads covering
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row className="m-1">
                        <Col md={6}>
                            <span>Enter roads covering ID which you want to upload:</span>
                        </Col>
                        <Col md={6}>
                            <Form.Control
                                placeholder="Enter roads covering ID..."
                                name='label'
                                onChange={handleOnChange}/>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success"
                        onClick={() => dispatch(fetchRoadsCovering({
                            param: 'ID', id: fetchingRoadsCoveringId
                        }))}
                >
                    Load routing covering
                </Button>
            </Modal.Footer>
        </Modal>
    );
}