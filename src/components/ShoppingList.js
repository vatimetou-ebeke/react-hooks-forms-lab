import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";
import { v4 as uuid } from "uuid";

function ShoppingList({ items }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("")
  const [submittedItem, setSubmittedItem] = useState(items);
  const [selectName, setSelectName] = useState("")
  const [selectItemCategory, setSelectItemCategory] = useState()

  function handelCategory(event){
    setSelectItemCategory(event.target.value);
  }


  function handleItemName(event) {
  console.log(event.target.value)
    setSelectName(event.target.value);
  }
  function handleSubmit(event) {
    
    event.preventDefault();
    console.log(selectName);
    const newItem = {
      id: uuid(), // the `uuid` library can be used to generate a unique id
      name: selectName,

      category:selectItemCategory,
    };
    const dataArray = [...submittedItem, newItem];
    setSubmittedItem(dataArray);
   
  }


 

  function HandelSearcher(event) {
  setSearch(event.target.value)
  }

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  const itemsToDisplay = submittedItem
  .filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  }).filter(item =>item.name.toLowerCase().includes(search.toLowerCase()))




  return (
    <div className="ShoppingList">

      <ItemForm  onItemFormSubmit ={handleSubmit} handelName={handleItemName} handelCategory={handelCategory} />

      <Filter 
      onCategoryChange={handleCategoryChange} 
      search={search} 
      onSearchChange={HandelSearcher} />
      
      <ul className="Items">
        
        {itemsToDisplay
        .map((item) => (
          <Item key={item.id} name={item.name} category={item.category}  />
        ))}
       
      </ul>
    </div>
  );
}

export default ShoppingList;
