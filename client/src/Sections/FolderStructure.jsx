import React, {useEffect, useState } from 'react';
import CodeViewer from "../Components/CodeViewer/CodeViewer";
import { enlistFileFolders, extractDataFromFile } from "../API/index"

const FolderStruct = (props) => {
const [folderStructure, setFolderStructure] = useState(null);
const [singleCode, setSingleCode] = useState(null);

useEffect(() => {
    const fetchFolderStructure = async () => {
        setFolderStructure(await enlistFileFolders())
        console.log(folderStructure);
    }   
    fetchFolderStructure()
}, []);

const fetchCodeData = async function(fileURL) {
    setSingleCode(await extractDataFromFile(fileURL));
    console.log(singleCode);
}


const checkFileType = (path) => {
    const extension = path.substr(path.lastIndexOf('.') + 1);
    if(extension === "cpp")
        return true;
    else 
        return false;
}


return (
    <div>
    <h2>Folder Structure Here</h2>
    <ul>
    {folderStructure ? (
        folderStructure.map((element, index) => {
           return ( <li key={index} onClick={e => fetchCodeData(element.url)}>{element.path}</li>)
        })
    ): null}
    </ul>

    <div>
        {singleCode ? 
        <CodeViewer props={singleCode}/> : null}
    </div>
    </div>
)
}

export default FolderStruct;