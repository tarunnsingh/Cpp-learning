import React, {useEffect, useState } from 'react';
import CodeViewer from "../Components/CodeViewer/CodeViewer";
import { enlistFolders, extractDataFromFile, extractFileList } from "../API/index"

const FolderStruct = (props) => {
const [folderStructure, setFolderStructure] = useState(null);
const [activeFileList, setActiveFileList] = useState(null);
const [singleCode, setSingleCode] = useState(null);

useEffect(() => {
    const fetchFolderStructure = async () => {
        setFolderStructure(await enlistFolders())
        console.log(folderStructure);
    }   
    fetchFolderStructure();
}, []);


const fetchCodeData = async function(fileURL) {
    setSingleCode(await extractDataFromFile(fileURL));
    console.log(singleCode);
}


const fetchFiles = async(listURL) => {
    setActiveFileList(await extractFileList(listURL))
        console.log("Active File LIST", activeFileList);
    
    
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
    <h2>Folder Here</h2>
    
    <ul>
    {folderStructure ? (
        folderStructure.map((element, index) => {
           return ( 
           <li key={index} onClick={e => fetchFiles(element.url)}>{element.path}</li>
           )
        })
    ): null}
    </ul>
    <ul>
    {activeFileList ? (
        activeFileList.map((fileName, fileIDX) => {
        return ( <li key={fileIDX} onClick={e => fetchCodeData(fileName.url)}>{fileName.path}</li>)
        })
    ) : null}
    </ul>
    <div>
        {singleCode ? 
        <CodeViewer props={singleCode}/> : null}
    </div>
    </div>
)
}

export default FolderStruct;