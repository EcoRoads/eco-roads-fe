import {useAppSelector} from "../../../store/map/hook";
import * as React from "react";
import CenterElementListItem from "./CenterElementListItem";
import {Accordion} from "react-bootstrap";
import {shallowEqual} from "react-redux";

const CenterElementAccordionList = (props) => {
    const centerElements = useAppSelector(
        state => [state.roadsCoveringBuilder.roadsCoveringBuildingConfig.center],
        shallowEqual
    );

    return (
        <>
            <Accordion className="mh-100">
                <Accordion.Item eventKey="1">
                    <Accordion.Header>
                        Current Route Elements
                    </Accordion.Header>
                    <Accordion.Body>
                        <Accordion>
                            {centerElements && centerElements.length > 0 && centerElements.map((centerElement) =>
                                <CenterElementListItem
                                    key={centerElement.id}
                                    {...centerElement}
                                />
                            )}
                        </Accordion>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    )
};
export default CenterElementAccordionList;