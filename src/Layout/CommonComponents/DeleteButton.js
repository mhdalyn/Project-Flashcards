import React from "react";

//shared delete button for all pages that utilize one
export default function DeleteButton({handler, id}) {
    return (
        <button
            className="btn btn-danger"
            onClick={() => handler(id)}>
            <span className="oi oi-trash" />
        </button>
    )
}