import React , {Component} from 'react'
import productsListJson from '../../JsonFiles/Products';
import preferredProdJson from '../../JsonFiles/PreferredProd';
import dislikedProdJson from '../../JsonFiles/DislikedProd';
import ProductList from './ProductList'
import AuthService from '../../AuthService';
import Header from '../Header'
import PropTypes from 'prop-types'

//import { LocalStorage } from "node-localstorage";

//global.localStorage = new LocalStorage('./scratch');

class Products extends Component {

  constructor(props) {
    super();
    this.Auth = new AuthService();

    this.state = {
      products : [],
      userProductsId: [],
      userDislikedProductsId: [],
      userIndex: null,
      userDisIndex: null
    }

  }

  static contextTypes = {
       router: PropTypes.object
     }

// At first we will compare th list of products exist in the stock and
// the preferred products list of the user. if a product exist in the preferred list
// we will not show it in the main page
  componentWillMount(){
    this.initComponent();
     }

  initComponent = ()=>{

    let user_id = null;
    var PreferredProducts = [];
    var DislikedProducts = [];
    var AllProducts = [];
    var userProductsId = [];
    var userDislikedProductsId = [];
    var ProductsToShow = [];
    var userIndex = 0;
    var userDisIndex = 0;

    AllProducts =  this.getProductsList(productsListJson);
       if(this.Auth.loggedIn()){
         // get user id
         user_id = JSON.parse(localStorage.getItem('user_id'));
         console.log('user_id :'+user_id);

         // get the preferred products list of all users from the local storage using getPreferredProdList function
         PreferredProducts = this.getPreferredProdList(preferredProdJson);

         // get the preferred products list of all users from the local storage using getPreferredProdList function
         DislikedProducts = this.getDislikedProdList(dislikedProdJson);

         // get the preferred products list of the authenticated user
         PreferredProducts.map((PreProduct)=>{
           if(PreProduct.id_user === user_id){
               userProductsId = PreProduct.products;
               console.log('userProducts: '+userProductsId);
               this.setState({
                 userIndex:userIndex
               });
              }
              userIndex ++;
         });

         // get the disliked products list of the authenticated user
         DislikedProducts.map((DisProduct)=>{
           if(DisProduct.id_user === user_id){
               userDislikedProductsId = DisProduct.products;
               console.log('userDislikedProductsId: '+userDislikedProductsId);
               this.setState({
                 userDisIndex:userDisIndex
               });
              }
              userDisIndex ++;
         });

          for(var j = 0 ; j<AllProducts.length; j++){
            var exist = false;
            //verify if the item is a preferred one for the user
             for(var i = 0; i<userProductsId.length; i ++){
               if(userProductsId[i] === AllProducts[j].id){
                 exist = true;
             }
           }
           //verify if the item is disliked from the user
           for(var i = 0; i<userDislikedProductsId.length; i ++){
             if(userDislikedProductsId[i] === AllProducts[j].id){
               exist = true;
           }
         }
           if(exist === false){
             console.log(AllProducts[j]);
             ProductsToShow.push(AllProducts[j]);
           }
       }
     }// end if authenticated
       else {
         ProductsToShow= this.getProductsList(productsListJson);
       }

         this.setState({
         products:ProductsToShow,
         userProductsId: userProductsId,
         userDislikedProductsId: userDislikedProductsId
       });
  }// end initComponent function

     // function to get the list of the preferred list from local Storage
   getPreferredProdList = (preferredProdJson)=>{

     if(!localStorage.getItem('PreferredProdLocal')){
       let productsAsArray = Object.keys(preferredProdJson).map((pid)=>
                       preferredProdJson[pid]);
       localStorage.setItem('PreferredProdLocal',JSON.stringify(productsAsArray));
     }
     var parseProducts = JSON.parse(localStorage.getItem('PreferredProdLocal'));
     return parseProducts;

   }

   // function to get the list of the disliked list from local Storage
   getDislikedProdList = (dislikedProdJson)=>{

     if(!localStorage.getItem('DislikedProdLocal')){
       let productsAsArray = Object.keys(dislikedProdJson).map((pid)=>
                       preferredProdJson[pid]);
       localStorage.setItem('DislikedProdLocal',JSON.stringify(productsAsArray));
     }
     var parseProducts = JSON.parse(localStorage.getItem('DislikedProdLocal'));
     return parseProducts;

   }

   //function to get list products from local storage
  getProductsList = (productsListJson)=>{

    if(!localStorage.getItem('ProductsLocal')){
      let productsAsArray = Object.keys(productsListJson).map((pid)=>
                      productsListJson[pid]);
      localStorage.setItem('ProductsLocal',JSON.stringify(productsAsArray));
    }
    var parseProducts = JSON.parse(localStorage.getItem('ProductsLocal'));
    return parseProducts;

  }

  handleLogout = ()=>{
      this.Auth.logout()
      this.context.router.history.push(`/`)
    }

  /*changeProducts = (products)=>{
    this.setState(products);
    localStorage.setItem('ProductsLocal', JSON.stringify(products));
  }*/

  // function for updating the list of preferred products
  handleLike = (userProductsId)=>{
    this.setState({userProductsId:userProductsId });
    var toParse = [];
    var userIndex = this.state.userIndex;
    toParse =JSON.parse(localStorage.getItem('PreferredProdLocal'));
    console.log('toParse');
    console.log(toParse);
    console.log(userIndex);
    toParse[userIndex].products = userProductsId;
    localStorage.setItem('PreferredProdLocal',JSON.stringify(toParse));
    //just to refresh the page
    this.props.history.replace('/');
      //this.initComponent();
      //this.forceUpdate();
  }

  // function for updating the list of disliked products
  handleDislike = (userDislikedProductsId)=>{
    this.setState({userDislikedProductsId:userDislikedProductsId });
    var toParse = [];
    var userDisIndex = this.state.userDisIndex;
    toParse =JSON.parse(localStorage.getItem('DislikedProdLocal'));
    console.log('toParse');
    console.log(toParse);
    console.log(userDisIndex);
    toParse[userDisIndex].products = userDislikedProductsId;
    localStorage.setItem('DislikedProdLocal',JSON.stringify(toParse));
    //just to refresh the page
    this.props.history.replace('/');
      //this.initComponent();
      //this.forceUpdate();
  }


    render() {
        var products = this.state.products;
        var userProductsId = this.state.userProductsId;
        var userDislikedProductsId = this.state.userDislikedProductsId;
      return (
              <div>
              <Header
              handleLogout = {this.handleLogout}
              ></Header>
              <section id="content">
                <div id="wrapper">
                  <div id="content_inside">
                    <div id="main_block" className="style1">
                      <ProductList
                       products={products}
                       userProductsId = {userProductsId}
                       userDislikedProductsId = {userDislikedProductsId}
                       handleLike = {this.handleLike}
                       handleDislike = {this.handleDislike}
                       ></ProductList>
                 </div>
               </div>
             </div>
         </section>
               </div>

      );
    }

  }

  export default Products;
