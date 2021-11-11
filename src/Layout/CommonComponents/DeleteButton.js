import React from "react";

export default function DeleteButton({handler, id}) {
    return (
        <button
            className="btn btn-danger"
            onClick={() => handler(id)}>
            <span className="oi oi-trash" />
        </button>
    )
}