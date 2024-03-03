import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {useAppDispatch, useAppSelector} from "../../../store/map/hook";
import {useEffect} from "react";
import {
    changeRoadsCoveringConfig, createRoadsCovering,
} from "../../../store/map/roads-builder/roads-builder.slice";
import * as React from "react";

export const BuildRoadsCoveringPopup = (props) => {
    const dispatch = useAppDispatch();
    const roadsCoveringName = useAppSelector(state => state.roadsCoveringBuilder.roadsCoveringBuildingConfig.name);
    const center = useAppSelector(state => state.roadsCoveringBuilder.roadsCoveringBuildingConfig.center);

    useEffect(() => {
    }, [center, roadsCoveringName])

    const handleOnChange = (event) => {
        dispatch(changeRoadsCoveringConfig({
            name: event.target.value
        }))
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
                    Are you ready to build roads covering on map?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row className="m-1">
                        <Col md={6}>
                            <span>Choose unique name for building roads covering:</span>
                        </Col>
                        <Col md={6}>
                            <Form.Control
                                placeholder={roadsCoveringName ? roadsCoveringName : 'Loading...'}
                                name='name'
                                onChange={handleOnChange}/>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success"
                        onClick={() => dispatch(createRoadsCovering({
                                name: roadsCoveringName,
                                center: center
                            })
                        )}>
                    Send routing building request
                </Button>
            </Modal.Footer>
        </Modal>
    );
}