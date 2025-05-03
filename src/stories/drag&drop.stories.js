import React from 'react';
import { DragAndDrop } from '../drag&drop';

export default {
    title: "DragAndDrop",
    component: DragAndDrop
}


const Template = () => <DragAndDrop 
    
    onFileUpload={(files) => console.log("Files>>>", files)}
/>
export const DragAndDropComp = Template.bind({});