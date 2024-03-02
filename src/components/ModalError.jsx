import React from "react";
import { MdError } from "react-icons/md";
import "./modalerror.css";

const ModalError = ({ text }) => {
    return (
        <div className="error-block">
            <h2 className="">{text}</h2>
            <MdError fill="red" width={7} height={7} />
        </div>
    );
};

export default ModalError;
