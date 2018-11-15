import React , {Component} from 'react'
import productsListJson from '../../JsonFiles/Products';
import ProductList from '../ProductList'


class Products extends Component {

  constructor(props) {
    super();

    this.state = {
      products : []
    }

  }

  componentWillMount(){
    let productsAsArray = Object.keys(productsListJson).map((pid)=>
                    productsListJson[pid]);
    this.setState({
      products:productsAsArray
    });
  }

    render() {
        var products = this.state.products;

      return (

              <ProductList  products={products}/>

      );
    }

  }

  export default Products;
