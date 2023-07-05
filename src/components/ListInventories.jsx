import React, { useEffect, useState } from "react";
import { helpers } from "./InventoryHelper";
import "./Inventory.css";

function ListInventories({ inventories , handleDelete, handleUpdate}) {

  return (
    <div className="h-100">
      <h1 className="text-light">Inventories</h1>
      <div className="parent-list">
        <ul className="list p-0 overflow-auto">
          {inventories.map((inventory) => (
            <li key={inventory.id} className="list-item">
              <h2>{inventory.name}</h2>
              <p>Price: {inventory.price}</p>
              <p>Quantity: {inventory.quantity}</p>
              <p>Category: {inventory.category}</p>
              <p>Supplier: {inventory.supplier}</p>
              <div className="d-flex justify-content-evenly">
                <button className="col-5" onClick={(event) => handleUpdate(inventory)}>
                  Update
                </button>
                <button
                  className="col-5"
                  onClick={(event) => handleDelete(inventory.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ListInventories;
