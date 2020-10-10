import React, {useEffect, useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
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
    <SyntaxHighlighter language="cpp" style={docco}>
      {singleCode}
    </SyntaxHighlighter> : null}
    </div>
    </div>
)
}

export default FolderStruct;