import React , {Component} from 'react'
import preferredProdJson from '../../JsonFiles/PreferredProd'
import PreferredProdList from '../PreferredProdList'


class Products extends Component {

  constructor(props) {
    super();

    this.state = {
      products : []
    }

  }

  componentWillMount(){
    let productsAsArray = Object.keys(preferredProdJson).map((pid)=>
                    preferredProdJson[pid]);
    this.setState({
      products:productsAsArray
    });
    console.log(productsAsArray[0].products[1].label);
  }

    render() {
        var products = this.state.products;

      return (

              <PreferredProdList  products={products}/>

      );
    }

  }

  export default Products;
