import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { FaEdit, FaTrash } from "react-icons/fa";

import {
  collection,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";

// import Swal from 'sweetalert2'
// // import withReactContent from 'sweetalert2-react-content'
// const MySwal = withReactContent(Swal)

function Show() {
  //1 - Configuramos HOOKS
  const [products, setProducts] = useState([]);

  //2 - Referenciamos a la BD firestore
  const productsCollection = collection(db, "products");

  //3 - Funcion para mostrar todos los docs
  const getProducts = async () => {
    const data = await getDocs(productsCollection);
    setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    console.log(products);
  };

  //4 - Funcion para eliminar un doc
  const deleteProduct = async (id) => {
    const productDoc = doc(db, "products", id);
    await deleteDoc(productDoc);
    getProducts();
  };

  //5 - Funcion de eliminacion para SweetAlert

  //6 - Usamos useEffect
  useEffect(() => {
    getProducts();
    // eslint-disable-next-line
  }, []);

  //7 - devolvemos vista de nuestro componente

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="d-grid gap-2">
              <Link to="/create" className="btn btn-secondary mt-2 mb-2">
                Create
              </Link>
            </div>
            <table className="table">
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Stock</th>
                    <th>Acctions</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.description}</td>
                      <td>{product.stock}</td>
                      <td>
                        <Link to={`/edit/${product.id}`} className="btn btn-light"><FaEdit/></Link>
                        <button onClick={() => {deleteProduct(product.id)}} className="btn btn-danger"><FaTrash/></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Show;
