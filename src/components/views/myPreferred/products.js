import React , {Component} from 'react'
import preferredProdJson from '../../JsonFiles/PreferredProd'
import PreferredProdList from './PreferredProdList'
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

  getPreferredProdList = (preferredProdJson)=>{

    if(!localStorage.getItem('PreferredProdLocal')){
      let productsAsArray = Object.keys(preferredProdJson).map((pid)=>
                      preferredProdJson[pid]);
      localStorage.setItem('PreferredProdLocal',JSON.stringify(productsAsArray));
    }
    var parseProducts = JSON.parse(localStorage.getItem('PreferredProdLocal'));
    return parseProducts;

  }

  changePreferredProd = (products)=>{
    this.setState(products);
    var toParse = [];
    toParse =JSON.parse(localStorage.getItem('PreferredProdLocal'));
    toParse[0].products = products;
    localStorage.setItem('PreferredProdLocal',JSON.stringify(toParse));
  }
  componentWillMount(){
    if(!this.Auth.loggedIn())
        this.props.history.replace('/');

    var prod = [];
    prod = this.getPreferredProdList(preferredProdJson);
    prod = prod[0].products;
    console.log(prod);

    this.setState({
      products:prod
    });

  }

    render() {
        var products = this.state.products;

      return (

              <PreferredProdList
                changePreferredProd = {this.changePreferredProd}
                products={products}
                />

      );
    }


}

  export default Products;
