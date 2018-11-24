import React , {Component} from 'react'
import AuthService from '../../AuthService';
class ProductList extends Component {

  constructor(props){
    super(props);
    this.Auth = new AuthService();
    this.state = {
      products: null,
      userProductsId : null
    }
      }

    componentWillMount(){
          this.setState({
            products: this.props.products,
            userProductsId : this.props.userProductsId
          })
        }

  changePreferredProd = (userProductsId)=>{
    this.props.changePreferredProd(userProductsId);
  }

  likeFunction = (event)=>{
    if(this.Auth.loggedIn()){
    var id = event.target.id;
    var userProductsId = this.state.userProductsId;
    userProductsId.push(parseInt(id));
    console.log(userProductsId);
    this.setState(userProductsId);
    //var preffProducts = this.state.preffProducts;
    //console.log(id);
  /*  var products = this.state.products;
    var prodToAdd = this.state.prodToAdd;
    products.map((product) =>{
      //console.log(product);
      if(product.id == id){
      //  console.log(product);
        prodToAdd=product;
        this.state.prodToAdd = prodToAdd;
        products.push(prodToAdd);
        this.setState(products);
      }
    });*/
    this.changePreferredProd(userProductsId);
  }else {
    alert('Login Please');
  }
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
