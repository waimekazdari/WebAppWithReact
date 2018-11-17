import React , {Component} from 'react'
import productsListJson from '../../JsonFiles/Products';
import ProductList from './ProductList'

class Products extends Component {

  constructor(props) {
    super();

    this.state = {
      products : []
    }

  }

getProductsList = (productsListJson)=>{

  if(!localStorage.ProductsLocal){
    let productsAsArray = Object.keys(productsListJson).map((pid)=>
                    productsListJson[pid]);
    localStorage.ProductsLocal= JSON.stringify(productsAsArray);
  }
  var parseProducts = JSON.parse(localStorage.ProductsLocal);
  return parseProducts;

}

  componentWillMount(){
    var prod = [];
    prod = this.getProductsList(productsListJson);

    this.setState({
      products:prod
    });
  }

  changeProducts = (products)=>{
    this.setState(products);
      localStorage.ProductsLocal = JSON.stringify(products);
  }

    render() {
        var products = this.state.products;

      return (

              <ProductList
               products={products}
               changeProducts = {this.changeProducts}
               ></ProductList>

      );
    }

  }

  export default Products;
