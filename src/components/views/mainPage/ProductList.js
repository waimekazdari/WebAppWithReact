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
//https://reactjs.org/docs/react-component.html#unsafe_componentwillmount
//This lifecycle was previously named componentWillMount.
// That name will continue to work until version 17.
//Use the rename-unsafe-lifecycles codemod to automatically update your components.
    UNSAFE_componentWillMount(){
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
      var id = event.target.id;
      var userDislikedProductsId = this.state.userDislikedProductsId;
      //var index = event.target.key;
      userDislikedProductsId.push(parseInt(id));
      console.log('userDislikedProductsId:'+userDislikedProductsId);
      this.setState(userDislikedProductsId);
      this.handleDislike(userDislikedProductsId);

      /*await new Promise(resolve => setTimeout(resolve((id, userDislikedProductsId)=>{
        console.log('lol');
        var newList = [];
        for (var i = 0 ; i < userDislikedProductsId.length ; i ++){
          if( parseInt(id) !== userDislikedProductsId[i]){
            newList.push(userDislikedProductsId[i]);
          }
        }
        userDislikedProductsId = newList;

        //userDislikedProductsId = [];

        this.setState(userDislikedProductsId);
        this.handleDislike(userDislikedProductsId);
      }), 6000));*/

      setTimeout(function() {
        //60000 7200000
          //remove product from the disliked List after 2 hours

          //userDislikedProductsId.splice(0,1);

        /*  var newList = [];
          for (var i = 0 ; i < userDislikedProductsId.length ; i ++){
            if( parseInt(id) !== userDislikedProductsId[i]){
              newList.push(userDislikedProductsId[i]);
            }
          }
          userDislikedProductsId = newList;*/

          userDislikedProductsId = [];

          this.setState(userDislikedProductsId);
          this.handleDislike(userDislikedProductsId);
      }
      .bind(this),
      6000);
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
