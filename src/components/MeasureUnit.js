import React from 'react';
import style from 'styled-components';

const UnitWrapper = style.div`
    display: inline-block;
    border: 1px solid black;
    width: 100px;
    height: 100px;
    margin-left: 20px;
    padding: 5px;
`
const UnitValue = style.div`
    margin-top: 5px;
    font-size: 60px;
    font-weight: 500;
`
const UnitName = style.p`
    padding: 0
    margin-top: 5px;
`

const MeasureUnit = (props) => {

    return (
            <UnitWrapper>
                <UnitValue>{props.unitValue}</UnitValue>
                <UnitName>{props.unitType}</UnitName>
            </UnitWrapper>
    );
};

export default MeasureUnit;
