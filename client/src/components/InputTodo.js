import React, { Fragment, useState } from "react";

const InputTodo = () => {
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  const onSubmitForm = async e => {
    e.preventDefault();
    if (!description.trim()) {
      setError("Description cannot be empty");
      return;
    }

    try {
      const body = { description };
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        setDescription("");
        setError(null);
        window.location = "/";
      } else {
        throw new Error("Failed to add todo");
      }
    } catch (err) {
      console.error(err.message);
      setError("Failed to add todo");
    }
  };

  return (
    <Fragment>
      <h1 className="text-center mt-5">Pern Todo List</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={e => {
            setDescription(e.target.value);
            setError(null);
          }}
          placeholder="Enter your todo"
        />
        <button className="btn btn-success">Add</button>
      </form>
      {error && <p className="text-danger mt-2">{error}</p>}
    </Fragment>
  );
};

export default InputTodo;
