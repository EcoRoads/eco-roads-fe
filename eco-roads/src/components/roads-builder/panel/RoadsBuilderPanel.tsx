import {Button, Col, Container, Row} from "react-bootstrap";
import {useState} from "react";
import {BuildRoadsCoveringPopup} from "../forms/BuildRoadsCoveringPopup";
import {useAppSelector} from "../../../store/map/hook";
import {FetchRoadsCoveringPopup} from "../forms/FetchRoadsCoveringPopup";
import CenterElementAccordionList from "../center-elements-list/CenterElementAccordionList";

export const RoadsBuilderPanel = () => {
    const roadsCoveringConfig =
        useAppSelector(state => state.roadsCoveringBuilder.roadsCoveringBuildingConfig);

    const [buildRoadsCoveringShow, setBuildRoadsCoveringShow] = useState(false);
    const [fetchRoadsCoveringShow, setFetchRoadsCoveringShow] = useState(false);

    return (
        <Container fluid className="p-3 mh-100 border border-success rounded">
            <Row className="m-3">
                <Col md={6}>
                    <Button variant="success"
                            onClick={() => setBuildRoadsCoveringShow(true)}>
                        Build Roads
                    </Button>
                    <BuildRoadsCoveringPopup
                        roadsCoveringConfig={roadsCoveringConfig}
                        show={buildRoadsCoveringShow}
                        onHide={() => setBuildRoadsCoveringShow(false)}
                    />
                </Col>
                <Col md={6}>
                    <Button variant="success"
                            onClick={() => setFetchRoadsCoveringShow(true)}>
                        Fetch Roads
                    </Button>
                    <FetchRoadsCoveringPopup
                        show={fetchRoadsCoveringShow}
                        onHide={() => setFetchRoadsCoveringShow(false)}
                    />
                </Col>
            </Row>
            <Row>
                <CenterElementAccordionList className="m-1"/>
            </Row>

        </Container>
    );
}