import React, { useState } from "react";
import "./Inventory.css";
import { helpers } from "./InventoryHelper.js";

export const InventoryForm = ({
  handleFormValueChange,
  handleFormSubmit,
  formData,
}) => {
  return (
    <form onSubmit={handleFormSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          name="name"
          type="text"
          id="name"
          value={formData.name}
          onChange={handleFormValueChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleFormValueChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="category">Category:</label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleFormValueChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleFormValueChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="supplier">Supplier:</label>
        <input
          type="text"
          id="supplier"
          name="supplier"
          value={formData.supplier}
          onChange={handleFormValueChange}
          required
        />
      </div>
      <button type="submit">{formData.id==0? "Submit": "Update"}</button>
    </form>
  );
};
