import React, { useState, useEffect } from "react";
import { Button } from "bootstrap";

export function ToDolist() {
	const [list, setlist] = useState([]);

	const myFunction = e => {
		if (e.key === "Enter") {
			setlist([...list, { label: e.target.value, done: false }]);
			e.target.value = "";
		}
	};

	const DeleteItems = indexItem => {
		setlist(prevState =>
			prevState.filter((todo, index) => index !== indexItem)
		);
	};

	const deleteAll = async () => {
		await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/jobannyz",
			{
				method: "DELETE",
				headers: { "Content-Type": "application/json" }
			}
		)
			.then(response => response.json())
			.then(data => console.log(data))
			.catch(error => console.log(error));

		await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/jobannyz",
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify([])
			}
		)
			.then(response => response.json())
			.then(data => console.log(data))
			.catch(error => console.log(error));

		fetch("https://assets.breatheco.de/apis/fake/todos/user/jobannyz", {
			method: "GET",
			headers: { "Content-Type": "application/json" }
		})
			.then(response => response.json())
			.then(data => setlist(data));
	};

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/jobannyz", {
			method: "GET",
			headers: { "Content-Type": "application/json" }
		})
			.then(response => response.json())
			.then(data => setlist(data));
	}, []);

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/jobannyz", {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(list)
		});
	}, [list]);

	return (
		<div id="main" className="container">
			<h1>Lista de Tareas</h1>

			<input
				type="text"
				placeholder="Ingrese la tarea..."
				onKeyDown={event => myFunction(event)}
				className="m-2"
			/>
			<ul className="list-group">
				{list.map((item, index) => {
					return (
						<li
							id="listitem"
							className="list-group-item"
							key={index}>
							{item.label}{" "}
							<i
								className="fas fa-trash"
								onClick={() => DeleteItems(index)}></i>
						</li>
					);
				})}
				<div className="container">
					<div className="m-3 d-inline-block">
						<button
							type="button"
							className="btn btn-danger btn-sm text-white mx-2">
							{list.length}
						</button>
						{list.length > 1 ? "items left" : "item left"}
					</div>
					<div className="m-3 d-inline-block">
						<button
							type="button"
							className="btn btn-warning"
							onClick={() => deleteAll()}>
							Borrar toda la lista!
						</button>
					</div>
				</div>
			</ul>
		</div>
	);
}
