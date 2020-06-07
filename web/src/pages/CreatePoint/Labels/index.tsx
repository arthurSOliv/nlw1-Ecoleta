import React from 'react';

interface LabelsProps {
    label: string;
    span?: string;
}

const Labels: React.FC<LabelsProps> = (props)=>{
    return (
        <fieldset>
            <legend>
                <h2>{props.label}</h2>
                <span>{props.span}</span>
            </legend>
        </fieldset>
    );
}

export default Labels;