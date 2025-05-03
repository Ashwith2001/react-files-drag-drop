import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useRef } from 'react';
import "./style.css"

/**
 * Nesting example.
 *
 * @param {Object} props
 * @param {string[]} props.acceptFileExtension - List of Valid Extension to be allowed.
 * @param {Function} props.onInvalidFile - Called when File Extension not found in acceptFileExtension
 * @param {Function} props.onFileUpload - Called when File is Uploaded.
 * @param {string} props.acceptFileType - Valid files in input file accept.
 * @param {string} props.DNDTitle - Title inside drop box
 * @param {HTMLElement} props.DNDTitleHTML - Can be an custom html
 * @param {number} props.numberOfFiles - Max Number of Files
 * @param {object} props.ImageProps - Includes Image props like src, width, height, etc
 * @param {import('@fortawesome/react-fontawesome').FontAwesomeIconProps} props.FaIconProps - FontAwesome Icon props like icon, fontSize, class, etc
 */
export const DragAndDrop = ({ acceptFileExtension, onInvalidFile, onFileUpload, acceptFileType, numberOfFiles = 5, FaIconProps, ImageProps, DNDTitle, DNDTitleHTML }) => {
    const fileRef = useRef();
    const inpRef = useRef();

    const onFileChange = (e) => {
        let file = [...e.target.files];
        if (acceptFileExtension && !acceptFileExtension?.includes(file[0].name?.split(".")[file[0].name?.split(".").length - 1])) {
            onInvalidFile && onInvalidFile("Invalid File Extension")
            return;
        }
        onFileUpload && onFileUpload(file);
    }

    const onDragOver = (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (!inpRef.current.className.includes("dragOver")) {
            inpRef.current.className += " dragOver"
        }
    }

    const onDrop = (e) => {
        e.stopPropagation();
        e.preventDefault();
        inpRef.current.className = "draganddrop";
        let fileList = [];
        for (const item of e.dataTransfer?.items) {
            if (item.kind === "file") {
                const file = item.getAsFile();
                if (file.size === 0) {
                    onInvalidFile && onInvalidFile("File Size Zero")
                    return;
                }
                if (acceptFileExtension && !acceptFileExtension?.includes(file.name?.split(".")[file.name?.split(".").length - 1])) {
                    onInvalidFile && onInvalidFile("Invalid File Extension")
                    return;
                }
                fileList.push(file);
            }
        }
        if (fileList.length > numberOfFiles) {
            onInvalidFile && onInvalidFile("Number of Files Exceeded");
            return;
        }
        onFileUpload && onFileUpload(fileList);
    }

    return <>
        <div>
            <div ref={inpRef} onDragLeave={() => { inpRef.current.className = "draganddrop"; }} onDragOver={onDragOver} onDrop={onDrop} onClick={() => fileRef.current?.click()} className="draganddrop">
                {
                    ImageProps ? <img {...ImageProps} /> : <FontAwesomeIcon icon={faCloudArrowUp} fontSize={"50px"} className='main-color' {...FaIconProps} />
                }
                {
                    DNDTitleHTML ? DNDTitleHTML : <h3>{DNDTitle || "Drag and drop here to upload"}</h3>
                }
            </div>
            <input accept={acceptFileType} ref={fileRef} type="file" onChange={onFileChange} className='hidden' />
        </div>
    </>
}

