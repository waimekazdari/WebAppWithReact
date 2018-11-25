import React , {Component} from 'react'
import AuthService from '../../AuthService';
class ProductList extends Component {

  constructor(props){
    super(props);
    this.Auth = new AuthService();
    this.state = {
      products: null,
      userProductsId : null,
      userDislikedProductsId : null
    }
      }

    componentWillMount(){
          this.setState({
            products: this.props.products,
            userProductsId : this.props.userProductsId,
            userDislikedProductsId: this.props.userDislikedProductsId
          })
        }

  handleLike = (userProductsId)=>{
    this.props.handleLike(userProductsId);
    //this.props.changePreferredProd(userProductsId);
  }

  handleDislike = (userProductsId)=>{
    this.props.handleDislike(userProductsId);
  }

// handle like button
  likeFunction = (event)=>{
    if(this.Auth.loggedIn()){
    var id = event.target.id;
    var userProductsId = this.state.userProductsId;
    userProductsId.push(parseInt(id));
    console.log(userProductsId);
    this.setState(userProductsId);
    this.handleLike(userProductsId);
  }else {
    alert('Login Please');
  }
  }

// handle dislike button
  dislikeFunction = (event)=>{
    if(this.Auth.loggedIn()){
    var index = event.target.key;
    console.log('key index:'+index);
    var id = event.target.id;
    var userDislikedProductsId = this.state.userDislikedProductsId;
    userDislikedProductsId.push(parseInt(id));
    console.log('userDislikedProductsId:'+userDislikedProductsId);
    this.setState(userDislikedProductsId);
    this.handleDislike(userDislikedProductsId);
    setTimeout(function() {
      //7200000
        //remove product from the disliked List after 2 hours
        userDislikedProductsId.splice(index,1);
        this.setState(userDislikedProductsId);
        this.handleDislike(userDislikedProductsId);
    }
    .bind(this),
    60000);
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
        <span>{product.price}</span><button className="like" id = {product.id} onClick={this.likeFunction}>like</button> <button className="dislike" id = {product.id} key={index} onClick={this.dislikeFunction}>dislike</button>
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
