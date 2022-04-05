import React, { Button, useState } from 'react';
import './App.css';
import {products, categories} from './data';
import Modal from 'react-modal';


Modal.setAppElement(document.getElementById('root'));

let selectedProduct, selectedCategory, minPrice = NaN, maxPrice = NaN;

function App() {
  let name,desc,img,price;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal(id) {
    selectedProduct = products.find((product) => product.id === id);
    if(selectedProduct)
    {
      name = selectedProduct.name;
      desc = selectedProduct.description;
      price = selectedProduct.price;
    }
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    name.textContent = selectedProduct.name;
    desc.textContent = selectedProduct.description;
    img.src = selectedProduct.images.large;
    price.textContent = selectedProduct.price;
  }

  function closeModal() {
    setIsOpen(false);
  }

  function priceFilter() {
    minPrice = parseInt(document.getElementById("iMin").value);
    maxPrice = parseInt(document.getElementById("iMax").value);
    search();
  }

  function categoryFilter(c) {
    selectedCategory = c;
    search();
  }

  function search() {
    let input, filter, table, td, i, tr, txtValue, ptd;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[2];
      ptd = tr[i].getElementsByTagName("td")[1];
      price = ptd.textContent || ptd.innerText;
      price = price.substring(1); // remove $
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1 
              && ((selectedCategory == null) || (selectedCategory && tr[i].className.indexOf(selectedCategory) > -1))
              && ((isNaN(minPrice) && isNaN(maxPrice)) || (!isNaN(maxPrice) && isNaN(minPrice) && price <= maxPrice) || (!isNaN(minPrice) && isNaN(maxPrice) && price >= minPrice) || (!isNaN(maxPrice) && !isNaN(minPrice) && price >= minPrice && price <= maxPrice))
              ) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  return (
    <div className="everything" >
      <h3 className="welcome-message">Abigail's Store</h3>
      <input type="text" id="myInput" onKeyUp={search} placeholder="Search Bar" className="searchBarStar"/>
      <ul id="catlist">
      <li className="category">Categories:</li>
        <li className="category" onClick={() => categoryFilter(null)}>All</li>
        {categories.map(category =>
          <li className="category" key={category.id} onClick={() => categoryFilter(category.id)} >{category.name}</li>
          )}
      </ul>
      <br></br>
      <div className="priceFilter">Price Amount:
      <br></br>
        <input className="priceFilterStar" id="iMin" type="number" placeholder="Minimum Amount"/>
        <input className="priceFilterStar" id="iMax" type="number" size="10px" placeholder="Maximum Amount"/>
        <button onClick={priceFilter}>Go</button>
        <br></br>
      </div>
        <table id="myTable">
            <thead>
            </thead>
            <tbody className="bodiesIn">
                {products.map(product =>
                    <tr className={"bodiestr filter " + product.categoryId} key={product.id} onClick={() => openModal(product.id)}> 
                        <center>
                      <td className="bodies3"><img src={product.images.medium}/></td>
                        <br></br>
                      <td className="bodies2">{product.price}</td>
                        <br></br>
                        <td className="bodies1">{product.name}</td>
                        <br></br>
                        </center>
                    </tr>
                )}
            </tbody>
            <div className="inside" >
            <Modal isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}>
              <h2 className="namebodies" ref={(_name) => (name = _name)}>Hello</h2>
              <img className="bodies6" ref={(_img) => (img = _img)}/>
              <h4 className="bodies7" ref={(_price) => (price = _price)}></h4>
              <h4 className="bodies8" ref={(_desc) => (desc = _desc)}>I am a product</h4>
              <button onClick={closeModal} content="\00d7">X</button>
          </Modal>
          </div>
        </table>
    </div>
  )
}

export default App

