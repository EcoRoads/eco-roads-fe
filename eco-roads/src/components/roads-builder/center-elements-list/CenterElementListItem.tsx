import {useAppDispatch} from "../../../store/map/hook";
import * as React from "react";
import {Accordion, Form, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import {Center} from "../../../types/roads/roads-common-types";
import {changeRoadsCoveringCenterData} from "../../../store/map/roads-builder/roads-builder.slice";

const CenterElementListItem: React.FC<Center> = (props) => {
    const dispatch = useAppDispatch();
    const [centerElementInfo, setCenterElementInfo] = useState<Center>(props)

    useEffect(() => {
        dispatch(changeRoadsCoveringCenterData(centerElementInfo))
    }, [centerElementInfo])

    const handleOnChange = (event) => {
        setCenterElementInfo({
            ...centerElementInfo,
            radius: event.target.value
        })
    }

    return (
        <>
            <Accordion.Item eventKey={props.id}>
                <Accordion.Header>
                    <Row>
                        {"Center #".concat(centerElementInfo.id)}
                    </Row>
                </Accordion.Header>
                <Accordion.Body>
                    <Form>
                        <Form.Control
                            placeholder={centerElementInfo.radius.toString()}
                            name='radius'
                            onChange={handleOnChange}/>
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
        </>
    )
};

export default CenterElementListItem;