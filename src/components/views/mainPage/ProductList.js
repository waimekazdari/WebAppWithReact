import React , {Component} from 'react'
//import Products from '../JsonFiles/Products';
//import myPreferred from './myPreferred/products';
class ProductList extends Component {

  constructor(props){
    super(props);
    this.state = {
      products: this.props.products,
      prodToAdd : {}
    }
      }

  changeProd = (prod)=>{
    this.props.changeProducts(prod);
  }

  likeFunction = (event)=>{
    var id = event.target.id;
    //console.log(id);
    var products = this.state.products;
    var prodToAdd = this.state.prodToAdd;
    products.map((product) =>{
      //console.log(product);
      if(product.id === id){
        prodToAdd=product;
      //  console.log(prodToAdd);
        products.push(prodToAdd);
        this.setState(products);
      }
    });
    this.changeProd(products);
  }

  render() {
    var products = this.state.products;
    let rows = [];
    var index = 0;
    products.map((product) =>{
      rows.push(
      <div className="item"  key={index}>
        <img src={require('../../../images/'+product.image+'.jpg')} alt="" width="202" height="173" /><br />
        <span>{product.price}</span><button className="like" id = {product.id} onClick={this.likeFunction}>like</button> <button className="dislike">dislike</button>
      </div>
      );
      index ++;

    });

    return (

              <div id="items">
              {rows}
              </div>

    );
  }

}

export default ProductList;
