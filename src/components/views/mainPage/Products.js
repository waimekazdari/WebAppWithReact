import React , {Component} from 'react'
import productsListJson from '../../JsonFiles/Products';
import preferredProdJson from '../../JsonFiles/PreferredProd';
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
      userProductsId: null,
      userIndex: null
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
    var AllProducts = [];
    var userProductsId = [];
    var ProductsToShow = [];
    var userIndex = 0;

    AllProducts =  this.getProductsList(productsListJson);
       if(this.Auth.loggedIn()){
         // get user id
         user_id = JSON.parse(localStorage.getItem('user_id'));
         console.log('user_id :'+user_id);

         // get the preferred products list of all users from the local storage using getPreferredProdList function
         PreferredProducts = this.getPreferredProdList(preferredProdJson);

         // get the the preferred products list of the authenticated user
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

          for(var j = 0 ; j<AllProducts.length; j++){
            var exist = false;
             for(var i = 0; i<userProductsId.length; i ++){
               if(userProductsId[i] === AllProducts[j].id){
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
         userProductsId: userProductsId
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
  changePreferredProd = (userProductsId)=>{
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


    render() {
        var products = this.state.products;
        var userProductsId = this.state.userProductsId;
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
                       changePreferredProd = {this.changePreferredProd}
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
