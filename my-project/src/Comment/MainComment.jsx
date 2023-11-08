import { useEffect, useState } from "react";
import useNode from "./useNode";
import Comment from "./Comment";
import CommentClass from "./CommentClass";
import "./style.css";

const comments = {
  id: 1,
  authorId: "x",
  authorName: "xx",
  items: [],
};

const MainComment = ({ product_id }) => {
  //Here i will get the comments
  const [commentsData, setCommentsData] = useState(null);

  //define the class
  const newCommentClass = new CommentClass();

  //calling the data of comments if Exists

  const callData = async () => {
    const data = await newCommentClass.getData(product_id);
    if (data) {
      console.log(data);
      setCommentsData(data);
    } else {
      console.log("NO data");
    }
  };

  //useEffect

  useEffect(() => {
    callData();
  }, []);

  useEffect(() => {}, [commentsData]);

  console.log("MainComment");

  const saveInFireBase = () => {
    // Here the updatein fire base of comment section will happen

    newCommentClass.saveTheComments(product_id, commentsData);
  };

  const { insertNode, editNode, deleteNode } = useNode();

  const handleInsertNode = (folderId, item) => {
    const finalStructure = insertNode(commentsData, folderId, item);
    setCommentsData(finalStructure);

    saveInFireBase();
  };

  const handleEditNode = (folderId, value) => {
    const finalStructure = editNode(commentsData, folderId, value);
    setCommentsData(finalStructure);
    saveInFireBase();
  };

  const handleDeleteNode = (folderId) => {
    const finalStructure = deleteNode(commentsData, folderId);
    const temp = { ...finalStructure };
    setCommentsData(temp);
    saveInFireBase();
  };

  console.log("Rendering Comment");

  if (commentsData != null) {
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
  } else {
    setCommentsData(comments);

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
};

export default MainComment;
