import axios from "axios"

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || `priyanshsingh`;
const REPO_NAME = process.env.REPO_NAME || `Cpp-learning`;
const BRANCH_NAME = process.env.BRANCH_NAME || `master`;
const GITHUB_URL = `https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}`;


export const enlistFileFolders = async () => {
    let url = GITHUB_URL + `/git/trees/${BRANCH_NAME}?recursive=1`;
    try
    {
        const folderList = await axios.get(url, {
            headers : {
                "Accept" : "application/vnd.github.3.raw"
            }
        });
        console.log(folderList.data.tree);
        const list = folderList.data.tree;
        return list;

    }
    catch(err){
        console.log(err);
    }
}

export const extractDataFromFile = async( fileURL) => {

    try{
        const rawDATA = await axios(fileURL, {
            headers:{
                "Accept" : "application/vnd.github.3.raw"
            }
        })
        console.log("RAW DATA: ", rawDATA);
        return rawDATA.data
    } catch (err){
        console.log(err);
    }

}