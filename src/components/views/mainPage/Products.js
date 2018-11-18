import React , {Component} from 'react'
import productsListJson from '../../JsonFiles/Products';
import ProductList from './ProductList'
import AuthService from '../../AuthService';
//import { LocalStorage } from "node-localstorage";

//global.localStorage = new LocalStorage('./scratch');

class Products extends Component {

  constructor(props) {
    super();
    this.Auth = new AuthService();

    this.state = {
      products : []
    }

  }

getProductsList = (productsListJson)=>{

  if(!localStorage.getItem('ProductsLocal')){
    let productsAsArray = Object.keys(productsListJson).map((pid)=>
                    productsListJson[pid]);
    localStorage.setItem('ProductsLocal',JSON.stringify(productsAsArray));
  }
  var parseProducts = JSON.parse(localStorage.getItem('ProductsLocal'));
  return parseProducts;

}

  componentWillMount(){
    
    if(!this.Auth.loggedIn())
        this.props.history.replace('/');

    var prod = [];
    prod = this.getProductsList(productsListJson);

    this.setState({
      products:prod
    });
  }

  changeProducts = (products)=>{
    this.setState(products);
      localStorage.setItem('ProductsLocal', JSON.stringify(products));
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
