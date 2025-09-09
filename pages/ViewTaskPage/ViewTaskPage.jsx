import React from "react";
import PopBrowse from "../../components/PopBrowse/PopBrowse.jsx";
import { useParams, useNavigate } from "react-router-dom";

function ViewTaskPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
  };

  return (
    <PopBrowse
      isOpen={true}
      onClose={handleClose}
      cardId={id}
    />
  );
}

export default ViewTaskPage;