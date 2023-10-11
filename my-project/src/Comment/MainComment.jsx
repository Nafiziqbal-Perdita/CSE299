import { useState } from "react";
import useNode from "./useNode";
import Comment from "./Comment";
import "./style.css"

const comments = {
    id: 1,
    authorId:"x",
    authorName:"xx",
    items: [],
};

const MainComment = () => {
    console.log("MainComment");


    //Here i will get the comments
    const [commentsData, setCommentsData] = useState(comments);

    const { insertNode, editNode, deleteNode } = useNode();

    const handleInsertNode = (folderId, item) => {
       
        const finalStructure = insertNode(commentsData, folderId, item);
        setCommentsData(finalStructure);
    };

    const handleEditNode = (folderId, value) => {
        const finalStructure = editNode(commentsData, folderId, value);
        setCommentsData(finalStructure);
    };

    const handleDeleteNode = (folderId) => {
        const finalStructure = deleteNode(commentsData, folderId);
        const temp = { ...finalStructure };
        setCommentsData(temp);
    };

    console.log(commentsData);

    return (
        <div className="App">
            <Comment
                handleInsertNode={handleInsertNode}
                handleEditNode={handleEditNode}
                handleDeleteNode={handleDeleteNode}
                comment={commentsData}
            />
        </div>
    );

}

export default MainComment;