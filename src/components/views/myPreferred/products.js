import React , {Component} from 'react'
import preferredProdJson from '../../JsonFiles/PreferredProd'
import PreferredProdList from './PreferredProdList'


class Products extends Component {

  constructor(props) {
    super();

    this.state = {
      products : []
    }
  }

  getPreferredProdList = (preferredProdJson)=>{

    if(!localStorage.PreferredProdLocal){
      let productsAsArray = Object.keys(preferredProdJson).map((pid)=>
                      preferredProdJson[pid]);
      localStorage.PreferredProdLocal= JSON.stringify(productsAsArray);
    }
    var parseProducts = JSON.parse(localStorage.PreferredProdLocal);
    return parseProducts;

  }

  changePreferredProd = (products)=>{
    this.setState(products);
    var toParse = [];
    toParse =JSON.parse(localStorage.PreferredProdLocal);
    toParse[0].products = products;
    localStorage.PreferredProdLocal=JSON.stringify(toParse);
  }
  componentWillMount(){
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
