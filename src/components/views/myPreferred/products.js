import React , {Component} from 'react'
import preferredProdJson from '../../JsonFiles/PreferredProd'
import PreferredProdList from './PreferredProdList'
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
      userIndex: null
    }
  }

  static contextTypes = {
       router: PropTypes.object
     }

  componentWillMount(){
       let user_id = null;
       var PreferredProducts = [];
       var AllProducts = [];
       var userProductsId = [];
       var userProducts = [];
       var userIndex = 0;

       //redirect the user to login if he's/she's not authenticated yet
       if(!this.Auth.loggedIn()){
           this.props.history.replace('/');}
       else {
         user_id = JSON.parse(localStorage.getItem('user_id'));
         console.log('user_id :'+user_id);
       }

       // get the preferred products list of all users from the local storage using getPreferredProdList function
       PreferredProducts = this.getPreferredProdList(preferredProdJson);

       // get the the preferred products list of the authenticated user
       PreferredProducts.map((PreProduct)=>{
         if(PreProduct.id_user === user_id){
             userProductsId = PreProduct.products;
             console.log('userProducts: '+userProductsId);
             AllProducts = JSON.parse(localStorage.getItem('ProductsLocal'));
             for (var i = 0; i<userProductsId.length; i ++){
               for(var j = 0 ; j<AllProducts.length; j++){
                 if(userProductsId[i] === AllProducts[j].id){
                   console.log(AllProducts[j]);
                   userProducts.push(AllProducts[j]);
                 }
               }
             }
             this.setState({
               products:userProducts,
               userIndex:userIndex,
               userProductsId:userProductsId
             });
           }
           userIndex ++;
       });
     }

  handleLogout = ()=>{
      this.Auth.logout()
      this.context.router.history.push(`/`)
      //this.props.history.replace('/');
    }

    // function to get the list of the preferred list from local Storage
  getPreferredProdList = (preferredProdJson)=>{

    if(!localStorage.getItem('PreferredProdLocal')){
      console.log('i am here a wiame yesss somthing wrong ');
      let productsAsArray = Object.keys(preferredProdJson).map((pid)=>
                      preferredProdJson[pid]);
      localStorage.setItem('PreferredProdLocal',JSON.stringify(productsAsArray));
    }
    var parseProducts = JSON.parse(localStorage.getItem('PreferredProdLocal'));
    return parseProducts;

  }


  // function for updating the list of preferred products
  changePreferredProd = (userProductsId)=>{
    this.setState(userProductsId);
    var toParse = [];
    var userIndex = this.state.userIndex;
    toParse =JSON.parse(localStorage.getItem('PreferredProdLocal'));
    toParse[userIndex].products = userProductsId;
    localStorage.setItem('PreferredProdLocal',JSON.stringify(toParse));
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
                      <PreferredProdList
                        changePreferredProd = {this.changePreferredProd}
                        products={products}
                        userProductsId={userProductsId}
                        />
                      </div>
                    </div>
                  </div>
              </section>
              </div>

      );
    }


}

  export default Products;
